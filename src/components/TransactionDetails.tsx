import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSpring, animated, useTransition } from 'react-spring';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowForwardIcon } from '@chakra-ui/icons';
// import { Address, Balance } from 'eth-components/ant';
import Address from './Address';
import { ethers } from 'ethers';
import { weiToEther } from 'essential-eth';
interface Props {}

// const mainnetAlchemy = new ethers.providers.StaticJsonRpcProvider(
// 	'https://eth-mainnet.alchemyapi.io/v2/' + process.env.ALCHEMY_MAINNET,
// );

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const findIcon = (code: string): string => {
	console.log(code);
	try {
		if (code === 'WETH') {
			return require(`../../node_modules/cryptocurrency-icons/svg/color/ETH.svg`);
		} else {
			return require(`../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`);
		}
	} catch (err) {
		console.log(err);
		// return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg')
		return require('../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
	}
};

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
		},
	},
};

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
};

export const TransactionDetails = (props: Props) => {
	const { swapDetails } = props;
	const [ensSender, setEnsSender] = React.useState('');
	const [ensRecipient, setEnsRecipient] = React.useState('');

	// const getEnsDetails = async (address: string, type: string) => {
	// 	const ensName = await mainnetAlchemy.lookupAddress(address);

	// 	if (type === 'sender') {
	// 		setEnsSender(ensName);
	// 	}
	// 	if (type === 'recipient') {
	// 		setEnsRecipient(ensName);
	// 	}
	// };

	// useEffect(() => {
	// 	// getEnsDetails('Examples ENS address here', 'sender');
	// 	getEnsDetails(swapDetails.sender, 'sender');
	// 	getEnsDetails(swapDetails.recipient, 'recipient');
	// }, []);

	const listToRender = [];

	return (
		<Flex display={'flex'} flexWrap={'wrap'} direction={'column'} flex={1} bg={'#111727'}>
			<Flex
				// border={'1px solid red'}
				display={'flex'}
				width={'100%'}
				direction="row"
				mt={20}
				align={'flex-start'}
				justify="space-evenly"
			>
				<motion.div variants={container} initial="hidden" animate="show">
					<Flex direction={'column'} justify="space-around" align={'center'} height={150}>
						<Image src={findIcon(swapDetails['token0'].symbol)} width={100} height={100} alt="crypto-icon" />
						<Text fontSize={24} fontFamily={'Nunito'} color={'#fff'}>
							{swapDetails['token0'].name}
						</Text>
					</Flex>
				</motion.div>
				<Flex height={150} align={'center'}>
					<motion.div variants={container} initial="hidden" animate="show">
						<ArrowForwardIcon color={'white'} width={50} height={50} />
					</motion.div>
				</Flex>

				<motion.div variants={container} initial="hidden" animate="show">
					<Flex direction={'column'} justify="space-around" align={'center'} height={150}>
						<Image src={findIcon(swapDetails['token1'].symbol)} width={100} height={100} alt="crypto-icon" />
						<Text fontSize={24} fontFamily={'Nunito'} color={'#fff'}>
							{swapDetails['token1'].name}
						</Text>
					</Flex>
				</motion.div>
			</Flex>
			<Flex
				// border={'1px solid red'}
				mt={5}
				display={'flex'}
				flex={2}
				width={'100%'}
				direction="row"
				align={'flex-start'}
				justify="space-evenly"
			>
				{/* REbuild */}
				<Flex
					flex={1}
					//  border={'1px solid blue'}
					height={75}
					direction={'column'}
					justify="center"
					align={'center'}
				>
					<Text fontFamily={'Nunito'} color={'#686B7A'}>
						Amount USD
					</Text>
					<Text fontFamily={'Nunito'} fontSize={24} color={'#FEFEFF'}>
						{formatter.format(swapDetails.amountUSD)}
					</Text>
				</Flex>

				<Flex
					flex={1}
					//  border={'1px solid blue'}
					height={75}
					direction={'column'}
					justify="center"
					align={'center'}
				>
					<Text fontFamily={'Nunito'} color={'#686B7A'}>
						Sender
					</Text>

					<Text fontFamily={'Nunito'} fontSize={30} color={'white'}>
						{/* {ensSender ? ensSender : swapDetails.sender.substr(0, 6)} */}
						{swapDetails.sender.substr(0, 6)}
					</Text>
				</Flex>

				<Flex
					flex={1}
					//  border={'1px solid blue'}
					height={75}
					direction={'column'}
					justify="center"
					align={'center'}
				>
					<Text fontFamily={'Nunito'} color={'#686B7A'}>
						Receiver
					</Text>

					<Text fontFamily={'Nunito'} fontSize={30} color={'white'}>
						{/* {ensRecipient ? ensRecipient : swapDetails.recipient.substr(0, 6)} */}
						{swapDetails.recipient.substr(0, 6)}
					</Text>
				</Flex>
			</Flex>
			<Flex
				// border={'1px solid red'}
				mt={5}
				display={'flex'}
				flex={2}
				width={'100%'}
				direction="row"
				align={'flex-start'}
				justify="space-evenly"
			>
				<Flex
					flex={1}
					//  border={'1px solid blue'}
					height={75}
					direction={'column'}
					justify="center"
					align={'center'}
				>
					<Text color={'#686B7A'}>Gas Price</Text>

					<Text fontSize={30} color={'white'}>
						{/* <RiExternalLinkFill /> */}
						{/* {parseFloat(ethers.utils.formatUnits(swapDetails.transaction.gasPrice, 'gwei'))} Gwei */}
						{parseFloat(ethers.utils.formatUnits(swapDetails.transaction.gasPrice, 'gwei')).toFixed(2)} gwei
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
