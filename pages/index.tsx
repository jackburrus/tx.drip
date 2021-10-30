import type { NextPage } from 'next';
import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { Pane } from '../src/components/Pane';
import { useUniData } from '../src/recoil/hooks/useUniData';
import { useEffect, useState } from 'react';
import { arbitumClient, mainnetClient, optimismClient, SWAP_DATA_QUERY } from '../src/lib/apollo';
import { useQuery } from '@apollo/client';
const Home: NextPage = () => {
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
