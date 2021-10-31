import { useSphere } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { CoinManifest } from './CoinManifest';

interface Props {
	count: number;
	data: any;
}

export const scale = (fromRange, toRange) => {
	const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
	return (from) => (from - fromRange[0]) * d + toRange[0];
};

export const WrappedSphere = (props: Props) => {
	const { count, data, setTxData } = props;
	const { viewport } = useThree();
	const [hover, setHover] = useState(false);
	const [texturePath, setTexturePath] = useState('/FormattedImages/GENERIC.png');
	const texture = useTexture(texturePath);

	useEffect(() => {
		const coin = CoinManifest.filter((coin) => coin.symbol === data['token0'].symbol);
		if (coin.length > 0) {
			// console.log(coin[0]['Image Path']);
			// setTexturePath('/FormattedImages/AAVE.png');
			setTexturePath(coin[0]['Image Path']);
		} else if (data['token0'].name === 'Wrapped Ethereum') {
			setTexturePath('/FormattedImages/ETH.png');
		} else {
			setTexturePath('/FormattedImages/GENERIC.png');
		}
	}, []);

	useEffect(() => {
		console.log(scale([0, 1000], [0, 10])(Math.floor(data['amountUSD'])));
	}, []);

	// console.log(tokenName)
	const [ref] = useSphere((index) => ({
		mass: 100,
		position: [4 - Math.random() * 8, viewport.height, 0, 0],
		args: [1],
	}));

	const size = scale([0, 100000], [0, 1])(Math.floor(data['amountUSD']));

	return (
		<instancedMesh
			onPointerOver={() => {
				// console.log(data);
				setTxData(data);
				setHover(true);
			}}
			onPointerOut={() => {
				setTxData(null);
				setHover(false);
			}}
			ref={ref}
			castShadow
			receiveShadow
			args={[null, null, 1]}
		>
			<sphereBufferGeometry args={[size, 32, 32]} />
			<meshLambertMaterial
				// color={!texturePath ? '#efb914' : null}
				// map={texturePath}
				map={texture}
			/>
		</instancedMesh>
	);
};
