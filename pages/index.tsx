import type { NextPage } from 'next';
import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { Pane } from '../src/components/Pane';
import { useUniData } from '../src/recoil/hooks/useUniData';
import { useEffect, useState } from 'react';
import { arbitumClient, mainnetClient, optimismClient, SWAP_DATA_QUERY } from '../src/lib/apollo';
import { useQuery } from '@apollo/client';
import { TransactionDetails } from '../src/components/TransactionDetails';

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
	const [swapHovered, setSwapHovered] = useState(false);
	const [swapDetails, setSwapDetails] = useState(null);

	useEffect(() => {
		if (!optimismDataLoading) {
			const { transactions } = OptimismData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					// console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					setAllTransactions((oldArray) => [{ Network: 'Optimism', ...data }, ...oldArray]);
				}
			});
		}
		// console.log(allTransactions);
	}, [OptimismData]);

	useEffect(() => {
		if (!arbitumDataLoading) {
			const { transactions } = ArbitumData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					// console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					setAllTransactions((oldArray) => [{ Network: 'Arbitrum', ...data }, ...oldArray]);
				}
			});
		}
	}, [ArbitumData]);

	useEffect(() => {
		if (!mainnetDataLoading && MainnetData) {
			const { transactions } = MainnetData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					// console.log(tx.swaps[0] ? tx.swaps[0].id : null);
					setAllTransactions((oldArray) => [{ Network: 'Mainnet', ...data }, ...oldArray]);
				}
			});
		}
	}, [MainnetData]);

	useEffect(() => {
		if (releaseFloor) {
			setReleaseFloor(false);
		}
	}, []);

	return (
		<chakra.main display="flex" height="100vh">
			<Flex direction="column" flex={1}>
				<Pane
					color={'#95afc0'}
					// color={'#24303B'}
					title="Mainnet"
					data={MainnetData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
					setSwapHovered={setSwapHovered}
					setSwapDetails={setSwapDetails}
				/>
				{swapHovered && swapDetails ? (
					<TransactionDetails swapDetails={swapDetails} />
				) : (
					<Pane
						type="Stats"
						// color="#212528"
						color="white"
						data={allTransactions}
						setAllTransactions={setAllTransactions}
					/>
				)}
			</Flex>

			<Flex direction="column" flex={1}>
				<Pane
					// color={'#ff7979'}
					color={'#ea8685'}
					title="Optimism"
					data={OptimismData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
					setSwapHovered={setSwapHovered}
					setSwapDetails={setSwapDetails}
				/>
				<Pane
					// color={'#686de0'}
					color={'#596275'}
					title="Arbitrum"
					data={ArbitumData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
					setSwapHovered={setSwapHovered}
					setSwapDetails={setSwapDetails}
				/>
			</Flex>
		</chakra.main>
	);
};

export default Home;
