import { useQuery } from '@apollo/client';
import { chakra, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Pane } from '../src/components/Pane';
import { TransactionDetails } from '../src/components/TransactionDetails';
import { arbitumClient, mainnetClient, optimismClient, SWAP_DATA_QUERY } from '../src/lib/apollo';

const Home: NextPage = () => {
	// Load all transactions into an array for table
	const [allTransactions, setAllTransactions] = useState([]);

	// Usequery function for Uniswap mainnet data on V3
	const {
		loading: mainnetDataLoading,
		error,
		data: MainnetData,
	} = useQuery(SWAP_DATA_QUERY, {
		client: mainnetClient,
		notifyOnNetworkStatusChange: true,
		pollInterval: 5000,
		onCompleted: () => console.log('Completed for Mainnet successfully'),
		onError: (error) => console.log(error),
	});

	// Usequery hook for optimism data
	const {
		loading: optimismDataLoading,
		error: optimismError,
		data: OptimismData,
	} = useQuery(SWAP_DATA_QUERY, {
		client: optimismClient,
		notifyOnNetworkStatusChange: true,
		pollInterval: 5000,
		onCompleted: () => console.log('Completed for Optimism successfully'),
		onError: (error) => console.log(error),
	});

	// Usequery hook for arbitum data
	// TODO: handle error data
	const {
		loading: arbitumDataLoading,
		error: arbitumError,
		data: ArbitumData,
	} = useQuery(SWAP_DATA_QUERY, {
		client: arbitumClient,
		notifyOnNetworkStatusChange: true,
		pollInterval: 5000,
		onCompleted: () => console.log('Completed for Arbitrum successfully'),
		onError: (error) => console.log(error),
	});

	// Release the floor beneath the spheres when allTransaction data reaches > 100
	const [releaseFloor, setReleaseFloor] = useState(false);

	// Listen for the sphere to be hovered and set this state to true
	const [swapHovered, setSwapHovered] = useState(false);

	// Once the swap is hovered, set the swapDetails for displaying on "Transaction Details" pane
	const [swapDetails, setSwapDetails] = useState(null);

	// Map over the mainnet data, check for duplicates to remove, and add the uniques to allTransactions
	useEffect(() => {
		if (!mainnetDataLoading && MainnetData) {
			const { transactions } = MainnetData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					setAllTransactions((oldArray) => [{ Network: 'Mainnet', ...data }, ...oldArray]);
				}
			});
		}
	}, [MainnetData]);

	// Map over the optimism data, check for duplicates to remove, and add the uniques to allTransactions
	useEffect(() => {
		if (!optimismDataLoading) {
			const { transactions } = OptimismData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					setAllTransactions((oldArray) => [{ Network: 'Optimism', ...data }, ...oldArray]);
				}
			});
		}
	}, [OptimismData]);

	// Map over the arbitrum data, check for duplicates to remove, and add the uniques to allTransactions
	useEffect(() => {
		if (!arbitumDataLoading) {
			const { transactions } = ArbitumData;
			transactions.map((tx) => {
				const data = tx.swaps[0] ? tx.swaps[0] : null;

				if (!allTransactions.includes(data) && data) {
					setAllTransactions((oldArray) => [{ Network: 'Arbitrum', ...data }, ...oldArray]);
				}
			});
		}
	}, [ArbitumData]);

	// Listen for the floor to be released on initial render
	// TODO check to see if this is actually needed
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
					type="Ball"
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
					type="Ball"
					color={'#ea8685'}
					title="Optimism"
					data={OptimismData}
					releaseFloor={releaseFloor}
					setReleaseFloor={setReleaseFloor}
					setSwapHovered={setSwapHovered}
					setSwapDetails={setSwapDetails}
				/>
				<Pane
					type="Ball"
					color={'#786fa6'}
					// color={'#596275'}
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
