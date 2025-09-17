import { Canvas } from "@react-three/fiber";
import "../Three/Scene/canvas.scss";
import { useCamera } from "../../Context/CameraContext";
import CameraController from "@/Features/DigitalTwin/Controller/CameraController";
import SideBar from "@/Features/DigitalTwin/Components/SideBar/SideBar";
import { useEffect, useState } from "react";
import Model from "./Model/Model";
import "./Scene/canvas.scss";
import { useParams } from "react-router-dom";

const MainScene = (props: { useSideBar?: boolean }) => {
	const zoomValue = 1.1;
	const { cameraState, setCameraState } = useCamera();
	const [modelType, setModelType] = useState<"body" | "cardio">("body");
	const { systemName } = useParams();

	const ZOOM_FACTOR = 1.05;
	const DEFAULT_ZOOM = 10;
	const MAX_ZOOM = 60;
	const MIN_ZOOM = DEFAULT_ZOOM;

	useEffect(() => {
		// Set appropriate model type based on system name
		if (systemName?.toLowerCase() === "cardiovascular") {
			setModelType("cardio");
			// Adjust camera for cardio view
			setCameraState({
				targetPosition: [0, 20, 200],
				targetZoom: 15,
			});
		} else {
			setModelType("body");
			// Reset camera for body view
			setCameraState({
				targetPosition: [0, 0, 200],
				targetZoom: 8,
			});
		}
	}, [systemName, setCameraState]);

	const handleZoomIn = () => {
		const newZoom = cameraState.targetZoom * ZOOM_FACTOR;
		if (newZoom <= MAX_ZOOM) {
			setCameraState({
				...cameraState,
				targetZoom: newZoom,
			});
		}
	};

	const handleZoomOut = () => {
		const newZoom = cameraState.targetZoom / ZOOM_FACTOR;
		if (newZoom >= MIN_ZOOM) {
			setCameraState({
				...cameraState,
				targetZoom: newZoom,
			});
		} else {
			setCameraState({
				...cameraState,
				targetZoom: DEFAULT_ZOOM,
			});
		}
	};

	const nextZoomIn = cameraState.targetZoom * ZOOM_FACTOR;
	const isZoomInDisabled = nextZoomIn > MAX_ZOOM;
	const nextZoomOut = cameraState.targetZoom / ZOOM_FACTOR;
	const isZoomOutDisabled = nextZoomOut < MIN_ZOOM;

	return (
		<div className='canvas-container'>
			{props.useSideBar ? (
				<SideBar onModelChange={setModelType} modelType={modelType} />
			) : null}
			<div className='canvas-wrapper'>
				<Canvas
					orthographic
					camera={{
						near: 0.0001,
						far: 20000,
						zoom: cameraState.targetZoom,
						position: cameraState.targetPosition,
					}}
				>
					<CameraController />
					<Model
						key={modelType}
						scale={[zoomValue, zoomValue, zoomValue]}
						position={[0, (-zoomValue * 70) / 2 - 1, 0]}
						modelType={modelType}
					/>
				</Canvas>
				<div className='canvas-controls'>
					<button
						onClick={handleZoomIn}
						className='control-btn'
						disabled={isZoomInDisabled}
					>
						<span>+</span>
					</button>
					<button
						onClick={handleZoomOut}
						className='control-btn'
						disabled={isZoomOutDisabled}
					>
						<span>−</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default MainScene;
