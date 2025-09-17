export const SCENE_CONSTANTS = {
	ZOOM_FACTOR: 1.05,
	DEFAULT_ZOOM: 10,
	MAX_ZOOM: 60,
	MIN_ZOOM: 10,
	MODEL_ZOOM_VALUE: 1.1,
} as const;

export const CAMERA_SETTINGS = {
	NEAR: 0.1,
	FAR: 2000,
	DEFAULT_POSITION: [0, 0, 800] as [number, number, number],
	DEFAULT_ZOOM: 5,
} as const;

export const TRANSITION_CAMERA_SETTINGS = {
	POSITION: [0, 0, 2000] as [number, number, number],
	ZOOM: 0.8,
} as const;

export const INTERMEDIATE_CAMERA_SETTINGS = {
	POSITION: [0, 0, 1800] as [number, number, number],
	ZOOM: 0.9,
} as const;
