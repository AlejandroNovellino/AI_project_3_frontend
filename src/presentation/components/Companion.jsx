import * as THREE from "three";
import { /*useState,*/ useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail, Float, Line, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Companion(props) {
	return (
		<Canvas camera={{ position: [0, 0, 10] }}>
			<color attach="background" args={["black"]} />
			<Float
				speed={props.isPlaying ? 10 : props.speed}
				rotationIntensity={props.isPlaying ? 1.5 : props.rotationIntensity}
				floatIntensity={props.isPlaying ? 7 : props.floatIntensity}
				scale={props.isPlaying ? 1.15 : 1}>
				<Atom
					isLoading={props.isLoading}
					eyeColor={props.eyeColor}
					isPlaying={props.isPlaying}
				/>
			</Float>
			<Stars saturation={0} count={400} speed={0.5} />
			<EffectComposer>
				<Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
			</EffectComposer>
		</Canvas>
	);
}

function Atom(props) {
	// Hold state for hovered and clicked events
	//const [hovered, hover] = useState(false);
	//const [clicked, click] = useState(false);
	// Ref
	const ref = useRef();

	useFrame((state, delta) => {
		if (props.isLoading) {
			ref.current.rotation.z += delta;
		}
	});

	const points = useMemo(
		() =>
			new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
				100
			),
		[]
	);

	return (
		<group {...props} ref={ref}>
			<Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
			<Line
				worldUnits
				points={points}
				color="turquoise"
				lineWidth={0.3}
				rotation={[0, 0, 1]}
			/>
			<Line
				worldUnits
				points={points}
				color="turquoise"
				lineWidth={0.3}
				rotation={[0, 0, -1]}
			/>
			<Electron
				position={[0, 0, 0.5]}
				speed={props.isPlaying || props.isLoading ? 6 : 4}
			/>
			<Electron
				position={[0, 0, 0.5]}
				rotation={[0, 0, Math.PI / 3]}
				speed={props.isPlaying || props.isLoading ? 6.5 : 4.5}
			/>
			<Electron
				position={[0, 0, 0.5]}
				rotation={[0, 0, -Math.PI / 3]}
				speed={props.isPlaying || props.isLoading ? 7 : 5}
			/>
			<Sphere args={[0.55, 64, 64]}>
				<meshBasicMaterial color={props.eyeColor} toneMapped={false} />
			</Sphere>
		</group>
	);
}

function Electron({ radius = 2.75, speed = 5, ...props }) {
	const ref = useRef();

	useFrame(state => {
		const t = state.clock.getElapsedTime() * speed;
		ref.current.position.set(
			Math.sin(t) * radius,
			(Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
			0
		);
	});

	return (
		<group {...props}>
			<Trail
				width={5}
				length={2}
				color={new THREE.Color(2, 1, 10)}
				attenuation={t => t * t}>
				<mesh ref={ref}>
					<sphereGeometry args={[0.25]} />
					<meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
				</mesh>
			</Trail>
		</group>
	);
}
