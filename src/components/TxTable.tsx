import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import React from 'react';

export const TxTable = (props) => {
	const { txData } = props;
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
		() => txData,

		[txData],
	);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Amount USD',
				accessor: 'amountUSD',
				width: 90,
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
