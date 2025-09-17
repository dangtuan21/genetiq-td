import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useCamera } from "../../../Context/CameraContext";
import {
	SCENE_CONSTANTS,
	CAMERA_SETTINGS,
	TRANSITION_CAMERA_SETTINGS,
	INTERMEDIATE_CAMERA_SETTINGS,
} from "./Constants/SceneConstants";
import { ModelType } from "./Types/ZoomTypes";
import Model from "../Model/Model";
import CameraController from "../../../Controller/CameraController";
import SideBar from "../../SideBar/SideBar";
import ZoomControls from "./Controls/ZoomControls";
import "./canvas.scss";

interface MainSceneProps {
	selectedCategory: string | null;
}

const MainScene: React.FC<MainSceneProps> = ({ selectedCategory }) => {
	const { cameraState, setCameraState } = useCamera();
	const [modelType, setModelType] = useState<ModelType>(() =>
		selectedCategory === "cardiovascular" ? "cardio" : "body",
	);
	const [previousModelType, setPreviousModelType] = useState<ModelType | null>(
		null,
	);
	const [isModelHidden, setIsModelHidden] = useState(false);
	const [startNewModelFade, setStartNewModelFade] = useState(true);
	const [pendingCameraConfig, setPendingCameraConfig] = useState<{
		position: [number, number, number];
		zoom: number;
	} | null>(() => {
		// Initialize camera config based on selected Category
		if (selectedCategory === "cardiovascular") {
			return {
				position: [0, 20, 200],
				zoom: 20,
			};
		} else {
			return {
				position: [0, 0, 200],
				zoom: 8,
			};
		}
	});
	const { MODEL_ZOOM_VALUE } = SCENE_CONSTANTS;

	const moveCamera = (
		position: [number, number, number],
		zoom: number,
		delay = 0,
	) => {
		setTimeout(() => {
			setCameraState({
				targetPosition: position,
				targetZoom: zoom,
			});
		}, delay);
	};

	const handleModelTransitionComplete = () => {
		if (pendingCameraConfig) {
			if (modelType === "cardio") {
				moveCamera(pendingCameraConfig.position, pendingCameraConfig.zoom);
				setPendingCameraConfig(null);
				setStartNewModelFade(true);
			} else {
				setIsModelHidden(true);
				moveCamera(
					TRANSITION_CAMERA_SETTINGS.POSITION,
					TRANSITION_CAMERA_SETTINGS.ZOOM,
				);

				setTimeout(() => {
					moveCamera(
						INTERMEDIATE_CAMERA_SETTINGS.POSITION,
						INTERMEDIATE_CAMERA_SETTINGS.ZOOM,
						0,
					);

					setTimeout(() => {
						moveCamera(pendingCameraConfig.position, pendingCameraConfig.zoom);
						setIsModelHidden(false);
						setPendingCameraConfig(null);
						setStartNewModelFade(true);
					}, 190);
				}, 280);
			}
		} else {
			setStartNewModelFade(true);
		}
	};

	useEffect(() => {
		console.log("Selected Category changed:", selectedCategory);
		if (!selectedCategory) return;

		if (selectedCategory === "cardiovascular") {
			console.log("Switching to cardio model");
			const cardioConfig = {
				position: [0, 20, 200] as [number, number, number],
				zoom: 15,
			};
			handleModelChange("cardio", cardioConfig);
		} else if (selectedCategory === "total") {
			console.log("Switching to body model");
			const bodyConfig = {
				position: [0, 0, 200] as [number, number, number],
				zoom: 8,
			};
			handleModelChange("body", bodyConfig);
		}
	}, [selectedCategory]);

	const handleModelChange = (
		type: ModelType,
		cameraConfig: {
			position: [number, number, number];
			zoom: number;
		},
	) => {
		if (type === modelType && !isModelHidden) {
			return;
		}

		// Only proceed with model/camera changes if we're switching to a different model
		setStartNewModelFade(false);
		setPreviousModelType(modelType);
		setModelType(type);
		setPendingCameraConfig(cameraConfig);
	};

	return (
		<div className='canvas-container'>
			<SideBar onModelChange={handleModelChange} modelType={modelType} />
			<div className='canvas-wrapper'>
				<Canvas
					orthographic
					camera={{
						near: CAMERA_SETTINGS.NEAR,
						far: CAMERA_SETTINGS.FAR,
						zoom: cameraState.targetZoom,
						position: cameraState.targetPosition,
					}}
				>
					<CameraController />
					{previousModelType && (
						<Model
							key={`previous-${previousModelType}`}
							scale={[MODEL_ZOOM_VALUE, MODEL_ZOOM_VALUE, MODEL_ZOOM_VALUE]}
							position={[0, (-MODEL_ZOOM_VALUE * 70) / 2 - 1 - 5, 0]}
							modelType={previousModelType}
							isFading={true}
							onTransitionComplete={handleModelTransitionComplete}
							isHidden={isModelHidden}
						/>
					)}
					<Model
						key={`current-${modelType}`}
						scale={[MODEL_ZOOM_VALUE, MODEL_ZOOM_VALUE, MODEL_ZOOM_VALUE]}
						position={[0, (-MODEL_ZOOM_VALUE * 70) / 2 - 1 - 8, 0]}
						modelType={modelType}
						isNew={true}
						isHidden={isModelHidden}
						startFadeIn={startNewModelFade}
						onModelChange={handleModelChange}
					/>
				</Canvas>
				<ZoomControls />
			</div>
		</div>
	);
};

export default MainScene;
