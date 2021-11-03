import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import BallPit from './Ballpit';
import { TxTable } from './TxTable';

interface PaneTypes {
	color: string;
	title: 'Mainnet' | 'Arbitrum' | 'Optimism';
	type: 'Ball' | 'Stats';
	data: any;
}

export const Pane: React.FC<PaneTypes> = (props) => {
	const {
		color,
		title,
		type,
		data,
		releaseFloor,
		setReleaseFloor,
		setAllTransactions,
		setSwapDetails,
		setSwapHovered,
	} = props;
	return type == 'Stats' ? (
		<Flex overflow={'scroll'} flex="1" bg={props.color}>
			{data && <TxTable txData={data} setAllTransactions={setAllTransactions} />}
		</Flex>
	) : (
		<Flex flex="1" position="relative" bg={color}>
			{/* <Box display={'flex'} position="absolute" top={10} left={20}>
				<Text fontSize={30} color="white">
					{title}
				</Text>
			</Box> */}
			<BallPit
				color={[props.color]}
				title={title}
				data={data}
				releaseFloor={releaseFloor}
				setReleaseFloor={setReleaseFloor}
				setSwapDetails={setSwapDetails}
				setSwapHovered={setSwapHovered}
				title={title}
			/>
		</Flex>
	);
};
