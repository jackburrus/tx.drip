import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';

interface PaneTypes {
	color: string;
	title: 'Mainnet' | 'Arbitum' | 'Optimism';
	type: 'Ball' | 'Stats';
	data: any;
}

export const Pane: React.FC<PaneTypes> = (props) => {
	const { color, title, type, data } = props;
	return type == 'Stats' ? (
		<Flex flex="1" bg={props.color}>
			<Center flex="1">
				<Text color="white">Stats</Text>
			</Center>
		</Flex>
	) : (
		<Flex flex="1" position="relative" bg={color}>
			{/* <Box display={'flex'} position="absolute" top={10} left={20}>
				<Text fontSize={30} color="white">
					{title}
				</Text>
			</Box> */}
			{/* <BallPit color={[props.color]} title={title} data={data} /> */}
		</Flex>
	);
};
