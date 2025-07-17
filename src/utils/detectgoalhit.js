import * as THREE from 'three';

/**
 * Checks if the ball is within a threshold distance of any goal.
 * @param {Ref} ballRef - Ref to the ball's mesh object.
 * @param {Array<Ref>} goalRefs - Array of 6 goal refs.
 * @param {number} threshold - Distance threshold to detect a hit.
 * @returns {number|null} - Index of the goal hit (0–5) or null if none.
 */
export function detectGoalHit(ballRef, goalRefs, threshold = 1.5) {
  if (!ballRef.current) return null;

  const ballPos = new THREE.Vector3().copy(ballRef.current.position);

  for (let i = 0; i < goalRefs.length; i++) {
    const goal = goalRefs[i];
    if (!goal.current) continue;

    const goalPos = new THREE.Vector3();
    goal.current.getWorldPosition(goalPos); // safer than .position

    const distance = ballPos.distanceTo(goalPos);

    if (distance < threshold) {
      return i;
    }
  }

  return null;
}

