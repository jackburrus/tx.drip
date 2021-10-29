import type { NextPage } from 'next';
import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { Pane } from '../src/components/Pane';
import { useUniData } from '../src/recoil/hooks/useUniData';
import { useEffect } from 'react';
const Home: NextPage = () => {
	// const [mainnetData, updateData] = useUniData();
	const [optimism, updateData] = useUniData();

	useEffect(() => {
		updateData(['Hello', 'World']);
		// console.log(open);
	}, []);

	return (
		<chakra.main display="flex" height="100vh">
			<Flex direction="column" flex={1}>
				<Pane
					color={'#24303B'}
					title="Mainnet"
					//  data={MainnetData}
				/>

				<Pane type="Stats" color="#212528" />
			</Flex>

			<Flex direction="column" flex={1}>
				<Pane
					color={'#FB7267'}
					title="Optimism"
					//  data={OptimismData}
				/>
				<Pane
					color={'#4faeec'}
					title="Arbitum"
					// data={ArbitumData}
				/>
			</Flex>
		</chakra.main>
	);
};

export default Home;
