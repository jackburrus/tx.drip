import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { arbitumData, mainnetData, optimismData } from '../atoms';

export const useUniData = () => {
	const [arbitum, setArbitum] = useRecoilState(arbitumData);
	const [mainnet, setMainnet] = useRecoilState(mainnetData);
	const [optimism, setOptimism] = useRecoilState(optimismData);

	const optimismState = useRef(optimism);
	const arbitumState = useRef(arbitum);
	const mainnetState = useRef(mainnet);

	useEffect(() => {
		setArbitum(['hello world!!!']);
	}, []);

	// useEffect(() => {
	// 	arbitumState.current = arbitum;
	// }, [arbitum]);

	// useEffect(() => {
	// 	mainnetState.current = mainnet;
	// }, [mainnet]);

	const updateData = (data, protocol) => {
		// console.log(data);
		// data.transactions.map((tx) => {
		// 	const data = tx.swaps[0] ? tx.swaps[0] : null;
		// 	if (!protocol.includes(data) && data) {
		// 		console.log(tx.swaps[0] ? tx.swaps[0].id : null);
		// 		if (protocol === 'arbitrum') {
		// 			setArbitum((arbitrum) => [...arbitrum, data]);
		// 		} else if (protocol === 'mainnet') {
		// 			setMainnet((mainnet) => [...mainnet, data]);
		// 		} else if (protocol === 'optimism') {
		// 			setOptimism((optimism) => [...optimism, data]);
		// 		}
		// 	}
		// });
	};
	// return [optimismState, mainnetState, arbitumState, updateData];
	return [arbitum, mainnet, optimism];
	// return [arbitum, mainnet, optimism, updateData] as const;
};
