import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import React from 'react';

export const TxTable = (props) => {
	const { txData } = props;
	const data = React.useMemo(
		() => txData,
		// [
		// 	{
		// 		fromUnit: 'inches',
		// 		toUnit: 'millimetres (mm)',
		// 		factor: 25.4,
		// 	},
		// 	{
		// 		fromUnit: 'feet',
		// 		toUnit: 'centimetres (cm)',
		// 		factor: 30.48,
		// 	},
		// 	{
		// 		fromUnit: 'yards',
		// 		toUnit: 'metres (m)',
		// 		factor: 0.91444,
		// 	},
		// ],
		[],
	);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Amount USD',
				accessor: 'amountUSD',
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
						<Tr {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
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
