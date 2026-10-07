import * as THREE from "three";
import type { TimelineMoment } from "../../data/timelineData";
import {
  createRouteMarkerGeometry,
  RADIAL_SEGMENTS,
  setRouteMarkerPose,
} from "./timelineRouteGeometry";

type RouteMarker = {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.TorusGeometry, THREE.MeshPhysicalMaterial>;
  material: THREE.MeshPhysicalMaterial;
};

export function createTimelineRouteObjects({
  scene,
  milestones,
  curve,
  milestoneProgress,
  routeRadius,
  pathSegments,
  materials,
}: {
  scene: THREE.Scene;
  milestones: readonly TimelineMoment[];
  curve: THREE.CatmullRomCurve3;
  milestoneProgress: number[];
  routeRadius: number;
  pathSegments: number;
  materials: THREE.Material[];
}) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 1.1));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-5.5, 6, 12);
  scene.add(keyLight);

  const edgeLight = new THREE.DirectionalLight(0xffffff, 0.55);
  edgeLight.position.set(5, -4, -8);
  scene.add(edgeLight);

  const routeGeometry = new THREE.TubeGeometry(
    curve,
    pathSegments,
    routeRadius,
    RADIAL_SEGMENTS,
    false,
  );
  const softShadowGeometry = new THREE.TubeGeometry(
    curve,
    pathSegments,
    routeRadius * 1.2,
    RADIAL_SEGMENTS,
    false,
  );
  const softShadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.1,
    depthTest: true,
    depthWrite: false,
    toneMapped: false,
  });
  materials.push(softShadowMaterial);

  const softShadow = new THREE.Mesh(softShadowGeometry, softShadowMaterial);
  softShadow.position.set(routeRadius * 0.22, -routeRadius * 0.34, -0.8);
  softShadow.renderOrder = 1;
  softShadow.geometry.setDrawRange(0, 0);

  scene.add(softShadow);

  const routeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x171717,
    metalness: 0.16,
    roughness: 0.4,
    clearcoat: 0.44,
    clearcoatRoughness: 0.32,
    transparent: false,
    opacity: 1,
  });
  materials.push(routeMaterial);
  const route = new THREE.Mesh(routeGeometry, routeMaterial);
  route.renderOrder = 3;
  route.geometry.setDrawRange(0, 0);
  scene.add(route);

  const routeCapGeometry = new THREE.SphereGeometry(routeRadius, 32, 24);
  const routeStartCap = new THREE.Mesh(routeCapGeometry, routeMaterial);
  const routeEndCap = new THREE.Mesh(routeCapGeometry, routeMaterial);
  routeStartCap.renderOrder = 3;
  routeEndCap.renderOrder = 3;
  routeStartCap.visible = false;
  routeEndCap.visible = false;
  scene.add(routeStartCap, routeEndCap);

  const markerGeometry = createRouteMarkerGeometry(routeRadius);
  const inactiveColor = new THREE.Color(0x888888);
  const activeColor = new THREE.Color(0xf5f5f5);
  const inactiveEmissive = new THREE.Color(0x000000);
  const activeEmissive = new THREE.Color(0x242424);
  const markers: RouteMarker[] = [];

  milestones.forEach((_, index) => {
    const group = new THREE.Group();
    const progress = milestoneProgress[index] ?? 0;
    setRouteMarkerPose(group, curve, progress, routeRadius);
    group.scale.setScalar(1);

    const material = new THREE.MeshPhysicalMaterial({
      color: inactiveColor,
      emissive: 0x000000,
      transparent: false,
      opacity: 1,
      depthTest: true,
      depthWrite: true,
      roughness: 0.24,
      metalness: 0.56,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
    });
    materials.push(material);

    const mesh = new THREE.Mesh(markerGeometry, material);
    mesh.renderOrder = 4;
    group.add(mesh);
    scene.add(group);
    markers.push({ group, mesh, material });
  });

  return {
    activeColor,
    activeEmissive,
    inactiveColor,
    inactiveEmissive,
    markerGeometry,
    markers,
    materials,
    route,
    routeCapGeometry,
    routeEndCap,
    routeStartCap,
    softShadow,
  };
}
