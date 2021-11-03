import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane, useSphere } from '@react-three/cannon';
import { OrbitControls, Text } from '@react-three/drei';
import { WrappedSphere } from './WrappedSphere';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Loader from './LoadingAnimation';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

function Mouse() {
	const { viewport } = useThree();
	const [, api] = useSphere(() => ({ type: 'Kinematic', args: [6] }));
	return useFrame((state) =>
		api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7),
	);
}

// A physical plane without visual representation
function Plane({ color, ...props }) {
	usePlane(() => ({ ...props }));
	return null;
}

// Creates a crate that catches the spheres
const Borders = (props) => {
	const { txs, settxs, releaseFloor } = props;
	const { viewport } = useThree();

	// useEffect(() => {
	// 	if (txs.length > 20) {
	// 		settxs([]);
	// 	}
	// }, [txs]);
	return (
		<>
			{/* This is the base of the container */}
			{/* {txs.length > 50 && } */}
			{!releaseFloor ? <Plane position={[0, -viewport.height / 4, 0]} rotation={[-Math.PI / 2, 0, 0]} /> : null}

			{/* These two are the sides of the container */}
			<Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
			<Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

			{/* This is the top of the container */}
			<Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />

			{/* No idea what this one is. But removing it breaks the app */}
			<Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
		</>
	);
};

export default function BallPit(props) {
	const { color, title, data, releaseFloor, setReleaseFloor, setSwapDetails, setSwapHovered, title } = props;
	const [txs, settxs] = useState([]);
	const [txData, setTxData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadingColor, setColor] = useState('#ffffff');
	useEffect(() => {
		if (data) {
			// const newCount = count.filter((val) => !data.transactions.includes(val))
			// console.log(data)

			data.transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!txs.includes(data) && data) {
					console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					settxs((oldArray) => [...oldArray, data]);
				}
			});
		}
		// console.log(txs);
	}, [data, txs]);

	useEffect(() => {
		console.log(txs && txs.length);
		// setReleaseFloor(true);
		if (txs.length > 100) {
			setReleaseFloor(true);
		}
		if (txs.length < 100) {
			// console.log('not releasing floor');
			setReleaseFloor(false);
			// settxs([]);
		}
	}, [txs]);

	useEffect(() => {
		if (releaseFloor) {
			// console.log('releasing floor');
			setTimeout(() => {
				settxs([]);
			}, 2000);
		}
	}, [releaseFloor]);

	return (
		<Canvas
			frameloop="demand"
			shadows
			gl={{
				stencil: false,
				depth: false,
				alpha: false,
				antialias: false,
			}}
			camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
		>
			<fog attach="fog" args={['red', 25, 40]} />
			<color attach="background" args={color} />
			<ambientLight intensity={2} />
			{/* <Loader /> */}
			{/* <Text
				scale={[10, 10, 10]}
				color="white" // default
				position={[-5, 0, 0]}
				// anchorX="left" // default
				// anchorY="bottom-baseline"
				// default
			>
				{txData ? txData['token0'].name : null}
			</Text> */}
			<Text
				scale={[10, 10, 10]}
				color="white" // default
				position={[0, 0, 0]}
				anchorX="center" // default
				anchorY="top" // default
			>
				{title}
			</Text>
			<Text
				scale={[10, 10, 10]}
				color="white" // default
				position={[0, 0, 0]}
				anchorX="center" // default
				anchorY="top-baseline" // default
			>
				{txs.length} Swaps
			</Text>
			)
			<directionalLight
				position={[50, 50, 25]}
				angle={0.3}
				intensity={2}
				castShadow
				shadow-mapSize-width={64}
				shadow-mapSize-height={64}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			<directionalLight position={[-10, -10, -5]} intensity={0.5} />
			<Physics gravity={[0, -50, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
				<group position={[0, 0, -10]}>
					{/* <Mouse /> */}
					<Borders txs={txs} settxs={settxs} releaseFloor={releaseFloor} />
					{/* <InstancedSpheres /> */}
					{txs.map((c, index) => {
						// console.log(c)
						return (
							<WrappedSphere
								key={index}
								data={c}
								setTxData={setTxData}
								setSwapDetails={setSwapDetails}
								setSwapHovered={setSwapHovered}
								title={title}
							/>
						);
					})}
				</group>
			</Physics>
			<OrbitControls />
			{/* <Post /> */}
		</Canvas>
	);
}
