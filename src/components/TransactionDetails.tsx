import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSpring, animated, useTransition } from 'react-spring';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowForwardIcon } from '@chakra-ui/icons';
// import { Address, Balance } from 'eth-components/ant';
import Address from './Address';
import { ethers } from 'ethers';
interface Props {}

const mainnetAlchemy = new ethers.providers.StaticJsonRpcProvider(process.env.ALCHEMY_MAINNET);

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const findIcon = (code: string): string => {
	// console.log(code)
	try {
		return require(`../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`);
	} catch (err) {
		// return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg')
		return require('../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
	}
};

export const TransactionDetails = (props: Props) => {
	const { swapDetails } = props;

	const listToRender = [];

	// useEffect(() => {
	// 	console.log(mainnetAlchemy);
	// }, []);

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
				<motion.div
					style={{ position: 'relative' }}
					animate={{ y: 5, opacity: 1 }}
					transition={{ ease: 'easeIn', delay: 0.1 }}
				>
					<Flex direction={'column'} justify="space-around" align={'center'} height={150}>
						<Image src={findIcon(swapDetails['token0'].symbol)} width={100} height={100} alt="crypto-icon" />
						<Text fontSize={24} fontFamily={'Nunito'} color={'#fff'}>
							{swapDetails['token0'].name}
						</Text>
					</Flex>
				</motion.div>
				<Flex height={150} align={'center'}>
					<motion.div
						style={{ position: 'relative' }}
						animate={{ y: 5, opacity: 1 }}
						transition={{ ease: 'easeIn', delay: 0.13 }}
					>
						<ArrowForwardIcon color={'white'} width={50} height={50} />
					</motion.div>
				</Flex>

				<motion.div
					style={{ position: 'relative' }}
					animate={{ y: 5, opacity: 1 }}
					transition={{ ease: 'easeIn', delay: 0.15 }}
				>
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
				<motion.div
					style={{ position: 'relative' }}
					animate={{ y: 5, opacity: 1 }}
					transition={{ ease: 'easeIn', delay: 0.17 }}
				>
					<Flex
						flex={1}
						//  border={'1px solid blue'}
						height={75}
						direction={'column'}
						justify="center"
						align={'center'}
					>
						<Text color={'#686B7A'}>Amount USD</Text>
						<Text fontSize={30} color={'#FEFEFF'}>
							{formatter.format(swapDetails.amountUSD)}
						</Text>
					</Flex>
				</motion.div>
				<motion.div
					style={{ position: 'relative' }}
					animate={{ y: 5, opacity: 1 }}
					transition={{ ease: 'easeIn', delay: 0.17 }}
				>
					<Flex
						flex={1}
						//  border={'1px solid blue'}
						height={75}
						direction={'column'}
						justify="center"
						align={'center'}
					>
						<Text color={'#686B7A'}>Sender</Text>
						{/* <Text fontSize={30} color={'#FEFEFF'}>
							{swapDetails.sender}
						</Text> */}
						{/* <Address provider={process.env.ALCHEMY_MAINNET}  /> */}
						{/* <Address address={swapDetails.sender} ensProvider={mainnetAlchemy} fontSize={16} /> */}
						<Text fontSize={30} color={'white'}>
							{/* <RiExternalLinkFill /> */}
							{swapDetails.sender.substr(0, 6)}
						</Text>
					</Flex>
				</motion.div>
				<motion.div
					style={{ position: 'relative' }}
					animate={{ y: 5, opacity: 1 }}
					transition={{ ease: 'easeIn', delay: 0.17 }}
				>
					<Flex
						flex={1}
						//  border={'1px solid blue'}
						height={75}
						direction={'column'}
						justify="center"
						align={'center'}
					>
						<Text color={'#686B7A'}>Receiver</Text>
						{/* <Text fontSize={30} color={'#FEFEFF'}>
							{swapDetails.sender}
						</Text> */}
						{/* <Address provider={process.env.ALCHEMY_MAINNET}  /> */}
						{/* <Address address={swapDetails.sender} ensProvider={mainnetAlchemy} fontSize={16} /> */}
						<Text fontSize={30} color={'white'}>
							{/* <RiExternalLinkFill /> */}
							{swapDetails.recipient.substr(0, 6)}
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
				<motion.div
					style={{ position: 'relative' }}
					animate={{ y: 5, opacity: 1 }}
					transition={{ ease: 'easeIn', delay: 0.17 }}
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
						{/* <Text fontSize={30} color={'#FEFEFF'}>
							{swapDetails.sender}
						</Text> */}
						{/* <Address provider={process.env.ALCHEMY_MAINNET}  /> */}
						{/* <Address address={swapDetails.sender} ensProvider={mainnetAlchemy} fontSize={16} /> */}
						<Text fontSize={30} color={'white'}>
							{/* <RiExternalLinkFill /> */}
							{parseFloat(ethers.utils.formatUnits(swapDetails.transaction.gasPrice, 'gwei')).toFixed(2)}
							{/* {parseFloat(ethers.utils.formatUnits(swapDetails.transaction.gasUsed, 'gwei'))} */}
							{/* {swapDetails.transaction.gasUsed} */}
						</Text>
					</Flex>
				</motion.div>
			</Flex>
		</Flex>
	);
};
