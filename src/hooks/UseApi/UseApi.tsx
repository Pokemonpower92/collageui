// UseApi.ts
import { useEffect, useState } from "react";

export interface ApiResponse<T> {
	data: T;
	statusCode: number;
}

export interface ApiState<T> {
	isLoading: boolean;
	error: string | null;
	response: T | null;
}

export function useApi<T>(url: string, options: RequestInit = {}): ApiState<T> {
	const [state, setState] = useState<ApiState<T>>({
		isLoading: true,
		error: null,
		response: null,
	});

	useEffect(() => {
		let mounted = true;

		const fetchData = async () => {
			let nextState: ApiState<T>;

			try {
				const response = await fetch(url, {
					...options,
					headers: {
						"Content-Type": "application/json",
						...options.headers,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				nextState = {
					response: data,
					error: null,
					isLoading: false,
				};
			} catch (error) {
				nextState = {
					response: null,
					error:
						error instanceof Error
							? error.message
							: "An unknown error occurred",
					isLoading: false,
				};
			}

			if (!mounted) return;
			setState(nextState);
		};

		fetchData();
		return () => {
			mounted = false;
		};
	}, [url, JSON.stringify(options)]);

	return state;
}
