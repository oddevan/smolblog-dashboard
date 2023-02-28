import useSWR from 'swr';

const getAuthHeader = () => `Basic YWRtaW46ZkdIYSA2cTBHIDh0TlIgdDRWZyBwVURzIEVxRjI=`;

const anonGet = (endpoint: string) => fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`);

const authGet = (endpoint: string) => fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`, {
	method: 'GET',
	headers: { Authorization: getAuthHeader() },
	credentials: 'omit'
});

export const useUser = () => {
	const { data, error, isLoading } = useSWR('/me', authGet);

	return {
		user: data,
		isLoading,
		isError: error
	}
};