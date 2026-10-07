import * as THREE from "three";

export const CAMERA_DISTANCE = 18;
export const CAMERA_FOV = 34;
export const RADIAL_SEGMENTS = 16;

const ROUTE_X = [0.72, -0.68, 0.7, -0.74, 0.84, -0.62];
const ROUTE_Z = [0.84, -0.28, 0.62, -0.7, 0.76, -0.36];
const RING_LOCAL_NORMAL = new THREE.Vector3(0, 0, 1);

export function createRouteMarkerGeometry(routeRadius: number) {
  return new THREE.TorusGeometry(
    routeRadius * 1.55,
    routeRadius * 0.42,
    32,
    72,
  );
}

export function setRouteMarkerPose(
  group: THREE.Group,
  curve: THREE.CatmullRomCurve3,
  progress: number,
  routeRadius: number,
) {
  group.position.copy(curve.getPointAt(progress));
  // Keep the collar just in front of the cable so tight bends cannot cut
  // through its surface and make the closed ring look broken.
  group.position.z += routeRadius * 0.08;
  const markerNormal = curve.getTangentAt(progress).normalize();
  group.quaternion.setFromUnitVectors(RING_LOCAL_NORMAL, markerNormal);
}

export function getRouteRadius(stageHeight: number, viewportWidth: number) {
  const diameter = THREE.MathUtils.clamp(viewportWidth * 0.08, 72, 150);
  const visibleWorldHeight =
    2 * CAMERA_DISTANCE * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));

  return (diameter * visibleWorldHeight) / (2 * Math.max(stageHeight, 1));
}

export function createRouteCurve(
  count: number,
  aspect: number,
  contentHeightRatio: number,
) {
  const safeCount = Math.max(count, 2);
  const halfViewHeight = CAMERA_DISTANCE * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
  const halfViewWidth = halfViewHeight * aspect;
  const points = Array.from({ length: safeCount }, (_, index) => {
    const progress = (index + 0.5) / safeCount;
    const shapeIndex = index % ROUTE_X.length;
    const z = ROUTE_Z[shapeIndex];
    const perspectiveCompensation = (CAMERA_DISTANCE - z) / CAMERA_DISTANCE;
    return new THREE.Vector3(
      ROUTE_X[shapeIndex] * halfViewWidth * 0.76 * perspectiveCompensation,
      (1 - progress * contentHeightRatio * 2) * halfViewHeight * perspectiveCompensation,
      z,
    );
  });

  const linePoints = [new THREE.Vector3(0, halfViewHeight * 0.84, 0)];
  points.forEach((point, index) => {
    linePoints.push(point);
    if (index === points.length - 1) return;

    const finalApproach = index === points.length - 2;
    let bridgeX = index % 2 === 0 ? 1.08 : -1.08;
    if (finalApproach) bridgeX = ROUTE_X[(index + 1) % ROUTE_X.length];
    const boundaryProgress = (index + 1) / safeCount;
    linePoints.push(
      new THREE.Vector3(
        bridgeX * halfViewWidth * 0.76,
        (1 - boundaryProgress * contentHeightRatio * 2) * halfViewHeight,
        0,
      ),
    );
  });

  const finalMilestone = points[points.length - 1];
  const tailPerspective = (CAMERA_DISTANCE - finalMilestone.z) / CAMERA_DISTANCE;
  const verticalLead = new THREE.Vector3(
    finalMilestone.x,
    -halfViewHeight * 0.98 * tailPerspective,
    finalMilestone.z,
  );
  const handoffPoint = new THREE.Vector3(
    finalMilestone.x,
    -halfViewHeight * 1.18 * tailPerspective,
    finalMilestone.z,
  );
  const routePoints = [...linePoints, verticalLead, handoffPoint];
  const lineCurve = new THREE.CatmullRomCurve3(
    routePoints,
    false,
    "centripetal",
    0.28,
  );

  const arcLengths = lineCurve.getLengths();
  const totalLength = arcLengths[arcLengths.length - 1] || 1;
  const milestoneProgress = points.map((_, index) => {
    const knotIndex = 1 + index * 2;
    const knotT = knotIndex / (routePoints.length - 1);
    const lengthIndex = knotT * (arcLengths.length - 1);
    const lowerIndex = Math.floor(lengthIndex);
    const upperIndex = Math.min(lowerIndex + 1, arcLengths.length - 1);
    const fraction = lengthIndex - lowerIndex;
    const distance = THREE.MathUtils.lerp(
      arcLengths[lowerIndex] ?? 0,
      arcLengths[upperIndex] ?? totalLength,
      fraction,
    );

    return distance / totalLength;
  });

  return { lineCurve, milestoneProgress };
}

export function getContentHeightRatio(host: HTMLElement, stageHeight: number) {
  const grid = host.closest<HTMLElement>(".journey-story-grid");
  if (!grid) return 1;
  return THREE.MathUtils.clamp(
    grid.clientHeight / Math.max(stageHeight, 1),
    0.1,
    1,
  );
}

export function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}
