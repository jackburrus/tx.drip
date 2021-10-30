import type { NextPage } from 'next';
import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { Pane } from '../src/components/Pane';
import { useUniData } from '../src/recoil/hooks/useUniData';
import { useEffect, useState } from 'react';
import { arbitumClient, mainnetClient, optimismClient, SWAP_DATA_QUERY } from '../src/lib/apollo';
import { useQuery } from '@apollo/client';

const Home: NextPage = () => {
	// Load all transactions into an array for table
	const [allTransactions, setAllTransactions] = useState([]);

	const {
		loading: mainnetDataLoading,
		error,
		data: MainnetData,
	} = useQuery(SWAP_DATA_QUERY, {
		client: mainnetClient,
		notifyOnNetworkStatusChange: true,
		pollInterval: 5000,
		onCompleted: () => console.log('Completed'),
		onError: (error) => console.log(error),
	});
	const {
		loading: optimismDataLoading,
		error: optimismError,
		data: OptimismData,
	} = useQuery(SWAP_DATA_QUERY, {
		client: optimismClient,
		notifyOnNetworkStatusChange: true,
		pollInterval: 5000,
		onCompleted: () => console.log('Completed'),
		onError: (error) => console.log(error),
	});
	const {
		loading: arbitumDataLoading,
		error: arbitumError,
		data: ArbitumData,
	} = useQuery(SWAP_DATA_QUERY, {
		client: arbitumClient,
		notifyOnNetworkStatusChange: true,
		pollInterval: 5000,
		onCompleted: () => console.log('Completed'),
		onError: (error) => console.log(error),
	});

	const [releaseFloor, setReleaseFloor] = useState(false);

	useEffect(() => {
		if (!mainnetDataLoading) {
			const { transactions } = MainnetData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					// console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					setAllTransactions((oldArray) => [...oldArray, data]);
				}
			});
		}
		if (!arbitumDataLoading) {
			const { transactions } = ArbitumData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					// console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					setAllTransactions((oldArray) => [...oldArray, data]);
				}
			});
		}
		if (!optimismDataLoading) {
			const { transactions } = OptimismData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					// console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					setAllTransactions((oldArray) => [...oldArray, data]);
				}
			});
		}
		// console.log(allTransactions);
	}, [MainnetData, ArbitumData, OptimismData]);

	return (
		<chakra.main display="flex" height="100vh">
			<Flex direction="column" flex={1}>
				<Pane
					color={'#24303B'}
					title="Mainnet"
					data={MainnetData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
				/>

				<Pane
					type="Stats"
					// color="#212528"
					color="white"
					data={allTransactions}
				/>
			</Flex>

			<Flex direction="column" flex={1}>
				<Pane
					color={'#FB7267'}
					title="Optimism"
					data={OptimismData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
				/>
				<Pane
					color={'#4faeec'}
					title="Arbitum"
					data={ArbitumData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
				/>
			</Flex>
		</chakra.main>
	);
};

export default Home;
