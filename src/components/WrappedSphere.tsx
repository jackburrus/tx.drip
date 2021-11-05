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

const getNetworkUrl = (network) => {
	switch (network) {
		case 'Mainnet':
			return 'https://etherscan.io/tx/';
		case 'Optimism':
			return 'https://optimistic.etherscan.io/tx/';
		case 'Arbitrum':
			return 'https://arbiscan.io/tx/';
		default:
			return 'https://etherscan.io/tx/';
	}
};

export const WrappedSphere = (props: Props) => {
	const { count, data, setTxData, setSwapHovered, setSwapDetails, title } = props;
	const { viewport } = useThree();
	const [hover, setHover] = useState(false);
	const [texturePath, setTexturePath] = useState('/GENERIC.png');
	const texture = useTexture(texturePath);

	useEffect(() => {
		const coin = CoinManifest.filter((coin) => coin.symbol === data['token1'].symbol);
		if (coin.length > 0) {
			setTexturePath(coin[0]['Image Path']);
		} else if (data['token1'].name === 'Wrapped Ethereum' || data['token1'].name === 'Wrapped Ether') {
			setTexturePath('/ETH.png');
		} else if (data['token1'].name == 'WETH') {
			setTexturePath('/ETH.png');
		} else if (data['token1'].name == 'Tether USD') {
			setTexturePath('/Tether.png');
		} else {
			setTexturePath('/GENERIC.png');
		}
	}, []);

	const [ref] = useSphere((index) => ({
		mass: 100,
		position: [4 - Math.random() * 8, viewport.height, 0, 0],
		args: [1],
	}));

	const size = scale([0, 100000], [0, 1])(Math.floor(data['amountUSD']));

	return (
		<instancedMesh
			onPointerOver={() => {
				setTxData(data);
				setHover(true);
				setSwapHovered(true);
				setSwapDetails(data);
			}}
			onPointerOut={() => {
				setTxData(null);
				setHover(false);
				setSwapHovered(false);
				setSwapDetails(null);
			}}
			// write an onclick that navigates to a website
			onClick={() => {
				window.open(getNetworkUrl(title) + data.transaction.id);
			}}
			ref={ref}
			castShadow
			receiveShadow
			args={[null, null, 1]}
		>
			<sphereBufferGeometry args={[1, 32, 32]} />
			<meshLambertMaterial
				// color={!texturePath ? '#efb914' : null}
				// map={texturePath}
				map={texture}
			/>
		</instancedMesh>
	);
};
