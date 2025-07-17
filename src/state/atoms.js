import { atom } from 'jotai';

export const cameraTransitionAtom = atom(false);  // Added for camera transition toggle
export const cameraZoomStartedAtom = atom(false);
export const goalHitAtom = atom(null); // ✅ This must be here
