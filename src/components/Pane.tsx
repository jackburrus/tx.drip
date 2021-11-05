import { Box, Center, chakra, Container, Flex, Text } from '@chakra-ui/react';
import BallPit from './Ballpit';
import { TxTable } from './TxTable';

import { Dispatch, SetStateAction } from 'react';

interface PaneTypes {
	color: string;
	title: 'Mainnet' | 'Arbitrum' | 'Optimism';
	type: 'Ball' | 'Stats';
	data: any;
	releaseFloor: boolean;
	setReleaseFloor: Dispatch<SetStateAction<boolean>>;
	// TODO setup the types for the transaction data
	setAllTransactions?: Dispatch<SetStateAction<any>>;
	// TODO setup the types for the swap data
	setSwapDetails: Dispatch<SetStateAction<any>>;
	setSwapHovered: Dispatch<SetStateAction<boolean>>;
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
			<BallPit
				color={[props.color]}
				title={title}
				data={data}
				releaseFloor={releaseFloor}
				setReleaseFloor={setReleaseFloor}
				setSwapDetails={setSwapDetails}
				setSwapHovered={setSwapHovered}
			/>
		</Flex>
	);
};
