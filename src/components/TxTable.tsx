import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box, Flex } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import React, { useEffect } from 'react';
import Image from 'next/image';
// create function that converts a timestamp to date
const convertTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000);
	const hours = date.getHours();
	const minutes = '0' + date.getMinutes();
	const seconds = '0' + date.getSeconds();
	const ampm = hours >= 12 ? 'pm' : 'am';
	const formattedTime = hours + ':' + minutes.substr(-2) + ' ' + ampm;
	return formattedTime;
};

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const TxTable = (props) => {
	const { txData, setAllTransactions } = props;
	console.log(txData);
	// const data = React.useMemo(
	// 	() => [
	// 		{ amountUSD: '$200', token0: { name: 'BTC' }, token1: { name: 'BTC' } },
	// 		{ amountUSD: '$200', token0: { name: 'BTC' }, token1: { name: 'BTC' } },
	// 		{ amountUSD: '$200', token0: { name: 'BTC' }, token1: { name: 'BTC' } },
	// 		{ amountUSD: '$200', token0: { name: 'BTC' }, token1: { name: 'BTC' } },
	// 		{ amountUSD: '$200', token0: { name: 'BTC' }, token1: { name: 'BTC' } },
	// 		{ amountUSD: '$200', token0: { name: 'BTC' }, token1: { name: 'BTC' } },
	// 	],

	// 	[],
	// );
	const data = React.useMemo(
		() => txData.slice(0, 20),

		[txData],
	);

	useEffect(() => {
		if (data.length > 200) {
			setAllTransactions(data.slice(0, 100));
		}
	}, [txData]);

	const getNetworkImage = (network) => {
		switch (network) {
			case 'Mainnet':
				return '/NetworkIcons/eth.png';

			case 'Arbitrum':
				return '/NetworkIcons/arbitrum.png';

			case 'Optimism':
				return '/NetworkIcons/optimism.png';

			default:
				return '/NetworkIcons/eth.png';
		}
	};

	const columns = React.useMemo(
		() => [
			{
				Header: 'Network',
				accessor: 'Network',
				Cell: (row) => (
					<Flex direction={'row'}>
						<Image src={getNetworkImage(row.value)} width={20} height={20} />

						{row.value}
					</Flex>
				),
			},
			{
				Header: 'Time',
				accessor: 'timestamp',
				Cell: (row) => convertTimestamp(row.value),
			},
			{
				Header: 'Amount USD',
				accessor: 'amountUSD',
				width: 90,
				Cell: (row) => '$' + numberWithCommas(parseFloat(row.value).toFixed(2)),
			},
			{
				Header: 'Token From',
				accessor: 'token0.name',
			},
			{
				Header: 'Token To',
				accessor: 'token1.name',
			},
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// },
			// {
			// 	Header: 'Timestamp',
			// 	accessor: 'timestamp',
			// 	isNumeric: true,
			// },
		],
		[],
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

	return txData ? (
		<Table {...getTableProps()}>
			<Thead bg={'#202839'}>
				{headerGroups.map((headerGroup, index) => (
					<Tr key={index} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, index) => (
							<Th
								borderBottomColor={'#202737'}
								fontFamily={'Nunito'}
								color={'#697480'}
								key={index}
								{...column.getHeaderProps(column.getSortByToggleProps())}
								isNumeric={column.isNumeric}
							>
								{column.render('Header')}
								<chakra.span pl="4">
									{column.isSorted ? (
										column.isSortedDesc ? (
											<TriangleDownIcon color={'#697480'} aria-label="sorted descending" />
										) : (
											<TriangleUpIcon color={'#697480'} aria-label="sorted ascending" />
										)
									) : null}
								</chakra.span>
							</Th>
						))}
					</Tr>
				))}
			</Thead>
			<Tbody bg={'#111727'} {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<Tr maxWidth="100" {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<Td
									borderBottomColor={'#202737'}
									fontFamily={'Nunito'}
									color={'#697480'}
									maxWidth="100"
									{...cell.getCellProps()}
									isNumeric={cell.column.isNumeric}
								>
									{cell.render('Cell')}
								</Td>
							))}
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	) : null;
};
