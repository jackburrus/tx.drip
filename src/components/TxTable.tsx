import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import React from 'react';

export const TxTable = (props) => {
	const { txData } = props;
	console.log(txData);
	const data = React.useMemo(
		() => txData,

		[],
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
			{
				Header: 'ID',
				accessor: 'id',
			},
			{
				Header: 'Timestamp',
				accessor: 'timestamp',
				isNumeric: true,
			},
		],
		[],
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

	return (
		<Table {...getTableProps()}>
			<Thead>
				{headerGroups.map((headerGroup, index) => (
					<Tr key={index} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, index) => (
							<Th key={index} {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric}>
								{column.render('Header')}
								<chakra.span pl="4">
									{column.isSorted ? (
										column.isSortedDesc ? (
											<TriangleDownIcon aria-label="sorted descending" />
										) : (
											<TriangleUpIcon aria-label="sorted ascending" />
										)
									) : null}
								</chakra.span>
							</Th>
						))}
					</Tr>
				))}
			</Thead>
			<Tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<Tr maxWidth="100" {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<Td maxWidth="100" {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
									{cell.render('Cell')}
								</Td>
							))}
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};
