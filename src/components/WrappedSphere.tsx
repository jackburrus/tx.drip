import { useSphere } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';

interface Props {
	count: number;
}

export const WrappedSphere = (props: Props) => {
	const { viewport } = useThree();
	// const texture = useTexture('/FormattedImages/AAVE.png');

	// console.log(tokenName)
	const [ref] = useSphere((index) => ({
		mass: 100,
		position: [4 - Math.random() * 8, viewport.height, 0, 0],
		args: [1],
	}));
	return (
		<instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 1]}>
			<sphereBufferGeometry args={[1, 32, 32]} />
			<meshLambertMaterial
				color={'black'}
				// map={texture}
			/>
		</instancedMesh>
	);
};
