"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { TimelineMoment } from "../../data/timelineData";
import { createTimelineRouteObjects } from "./createTimelineRouteObjects";
import {
  CAMERA_DISTANCE,
  CAMERA_FOV,
  RADIAL_SEGMENTS,
  clamp01,
  createRouteMarkerGeometry,
  createRouteCurve,
  getContentHeightRatio,
  getRouteRadius,
  setRouteMarkerPose,
} from "./timelineRouteGeometry";

interface TimelineRouteSceneProps {
  milestones: TimelineMoment[];
  progress: number;
  activeMilestoneIndex: number;
  reducedMotion: boolean;
  onReady: () => void;
  onUnavailable: () => void;
}

export default function TimelineRouteScene({
  milestones,
  progress,
  activeMilestoneIndex,
  reducedMotion,
  onReady,
  onUnavailable,
}: TimelineRouteSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const scheduleRenderRef = useRef<(() => void) | null>(null);
  const progressRef = useRef(progress);
  const activeIndexRef = useRef(activeMilestoneIndex);

  useEffect(() => {
    progressRef.current = progress;
    activeIndexRef.current = activeMilestoneIndex;
    scheduleRenderRef.current?.();
  }, [activeMilestoneIndex, progress]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reducedMotion) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;
    let animationFrame = 0;
    let visible = false;
    let disposed = false;
    let hasReportedReady = false;
    let previousFrameTime = 0;
    let handleContextLost: ((event: Event) => void) | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    const materials: THREE.Material[] = [];

    const releaseResources = () => {
      const geometries = new Set<THREE.BufferGeometry>();
      scene?.traverse((object) => {
        if (object instanceof THREE.Mesh && !geometries.has(object.geometry)) {
          geometries.add(object.geometry);
          object.geometry.dispose();
        }
      });
      materials.forEach((material) => material.dispose());
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };

    try {
      const routeScene = new THREE.Scene();
      scene = routeScene;
      camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 80);
      camera.position.set(0, 0, CAMERA_DISTANCE);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setSize(host.clientWidth || 1, host.clientHeight || 1, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.04;
      host.appendChild(renderer.domElement);

      let contentHeightRatio = getContentHeightRatio(host, host.clientHeight || 1);
      let curves = createRouteCurve(
        milestones.length,
        (host.clientWidth || 1) / (host.clientHeight || 1),
        contentHeightRatio,
      );
      let curve = curves.lineCurve;
      let routeRadius = getRouteRadius(host.clientHeight || 1, window.innerWidth);
      const pathSegments = Math.max(1200, milestones.length * 240);
      const routeObjects = createTimelineRouteObjects({
        scene: routeScene,
        milestones,
        curve,
        milestoneProgress: curves.milestoneProgress,
        routeRadius,
        pathSegments,
        materials,
      });
      let routeCapGeometry = routeObjects.routeCapGeometry;
      let markerGeometry = routeObjects.markerGeometry;

      const render = (frameTime = performance.now()) => {
        animationFrame = 0;
        if (disposed || !visible || !renderer || !camera || !scene) return;

        const targetProgress = clamp01(progressRef.current);
        const delta = previousFrameTime
          ? Math.min((frameTime - previousFrameTime) / 1000, 0.05)
          : 1 / 60;
        previousFrameTime = frameTime;
        const visibleSegments = Math.floor(pathSegments * targetProgress);
        const visibleVertexCount = visibleSegments * RADIAL_SEGMENTS * 6;
        routeObjects.route.geometry.setDrawRange(0, visibleVertexCount);
        routeObjects.softShadow.geometry.setDrawRange(0, visibleVertexCount);
        routeObjects.routeStartCap.visible = visibleSegments > 0;
        routeObjects.routeEndCap.visible = visibleSegments > 0;
        if (routeObjects.routeEndCap.visible) {
          const capProgress = visibleSegments / pathSegments;
          routeObjects.routeStartCap.position.copy(curve.getPointAt(0));
          routeObjects.routeEndCap.position.copy(curve.getPointAt(capProgress));
        }

        let markerAnimating = false;
        routeObjects.markers.forEach(({ group, material }, index) => {
          const active = index === activeIndexRef.current;
          const targetScale = active ? 1.08 : 1;
          group.scale.setScalar(
            THREE.MathUtils.damp(group.scale.x, targetScale, 18, delta),
          );
          material.color.lerp(active ? routeObjects.activeColor : routeObjects.inactiveColor, 0.2);
          material.emissive.lerp(
            active ? routeObjects.activeEmissive : routeObjects.inactiveEmissive,
            0.2,
          );
          if (Math.abs(group.scale.x - targetScale) > 0.012) markerAnimating = true;
        });

        try {
          renderer.render(scene, camera);
        } catch {
          onUnavailable();
          return;
        }

        if (!hasReportedReady) {
          hasReportedReady = true;
          onReady();
        }
        if (markerAnimating && visible) {
          animationFrame = window.requestAnimationFrame(render);
        }
      };

      const scheduleRender = () => {
        if (visible && !animationFrame) animationFrame = window.requestAnimationFrame(render);
      };
      scheduleRenderRef.current = scheduleRender;

      const resize = () => {
        if (!renderer || !camera) return;
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        const nextRadius = getRouteRadius(height, window.innerWidth);
        const radiusChanged = Math.abs(nextRadius - routeRadius) > routeRadius * 0.005;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        contentHeightRatio = getContentHeightRatio(host, height);
        curves = createRouteCurve(milestones.length, width / height, contentHeightRatio);
        curve = curves.lineCurve;
        routeObjects.route.geometry.dispose();
        routeObjects.softShadow.geometry.dispose();
        routeObjects.route.geometry = new THREE.TubeGeometry(
          curve,
          pathSegments,
          nextRadius,
          RADIAL_SEGMENTS,
          false,
        );
        routeObjects.softShadow.geometry = new THREE.TubeGeometry(
          curve,
          pathSegments,
          nextRadius * 1.2,
          RADIAL_SEGMENTS,
          false,
        );
        routeRadius = nextRadius;
        routeObjects.softShadow.position.set(nextRadius * 0.22, -nextRadius * 0.34, -0.8);

        if (radiusChanged) {
          routeCapGeometry.dispose();
          routeCapGeometry = new THREE.SphereGeometry(routeRadius, 32, 24);
          routeObjects.routeStartCap.geometry = routeCapGeometry;
          routeObjects.routeEndCap.geometry = routeCapGeometry;

          markerGeometry.dispose();
          markerGeometry = createRouteMarkerGeometry(routeRadius);
          routeObjects.markers.forEach(({ mesh }) => {
            mesh.geometry = markerGeometry;
          });
        }

        routeObjects.markers.forEach(({ group }, index) => {
          const markerProgress = curves.milestoneProgress[index] ?? 0;
          setRouteMarkerPose(group, curve, markerProgress, routeRadius);
        });
        scheduleRender();
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        scheduleRender();
        if (!visible && animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      }, { rootMargin: "80px" });
      visibilityObserver.observe(host);

      handleContextLost = (event) => {
        event.preventDefault();
        onUnavailable();
      };
      renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
      renderer.domElement.addEventListener("webglcontextcreationerror", onUnavailable);
      resize();
    } catch {
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      scheduleRenderRef.current = null;
      releaseResources();
      onUnavailable();
      return;
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      scheduleRenderRef.current = null;
      if (handleContextLost) {
        renderer?.domElement.removeEventListener("webglcontextlost", handleContextLost);
      }
      renderer?.domElement.removeEventListener("webglcontextcreationerror", onUnavailable);
      releaseResources();
    };
  }, [milestones, onReady, onUnavailable, reducedMotion]);

  return <div ref={hostRef} className="journey-route-canvas" aria-hidden="true" />;
}
