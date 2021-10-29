import type { NextPage } from 'next';
import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import { Pane } from '../src/components/Pane';
const Home: NextPage = () => {
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
