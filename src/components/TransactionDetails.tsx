import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSpring, animated, useTransition } from 'react-spring';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowForwardIcon } from '@chakra-ui/icons';
interface Props {}

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

	useEffect(() => {
		listToRender.push(swapDetails['token0'].name);
		listToRender.push(swapDetails['token1'].name);
	}, [swapDetails]);

	return (
		<Flex display={'flex'} flex={1} bg={'#111727'}>
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
		</Flex>
	);
};
