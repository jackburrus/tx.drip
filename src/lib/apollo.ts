import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const mainnetClient = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
	cache: new InMemoryCache(),
	queryDeduplication: true,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
});

export const optimismClient = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
	cache: new InMemoryCache(),
	queryDeduplication: true,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
});
export const arbitumClient = new ApolloClient({
	uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal',
	cache: new InMemoryCache(),
	queryDeduplication: true,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
});

export const SWAP_DATA_QUERY = gql`
	query GetUniData {
		transactions(first: 10, orderDirection: desc, orderBy: timestamp) {
			swaps {
				timestamp
				id
				amountUSD
				token0 {
					id
					name
					symbol
				}
				token1 {
					id
					name
					symbol
				}
			}
		}
	}
`;
