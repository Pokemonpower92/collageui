import { useEffect, useState } from "react";

export type Result<T, E = string> =
	| { ok: true; value: T }
	| { ok: false; error: E };

export type ApiState<T> = {
	result: Result<T> | null;
	isLoading: boolean;
};

// The response envelope
export interface ApiResponse<T> {
	status_code: number;
	data: T;
}

export type RequestOptions = RequestInit & {
	headers?: Record<string, string>;
};

export function useApi<T>(
	url: string,
	options: RequestOptions = {}
): ApiState<T> {
	const [state, setState] = useState<ApiState<T>>({
		result: null,
		isLoading: true,
	});

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
				console.log("Attempting fetch to:", url);
				console.log("With options:", options);

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
				const result = await response.json();
				if (mounted) {
					setState({
						result: { ok: true, value: result },
						isLoading: false,
					});
				}
			} catch (error) {
				if (mounted) {
					setState({
						result: {
							ok: false,
							error:
								error instanceof Error
									? error.message
									: "An unknown error occurred",
						},
						isLoading: false,
					});
				}
			}
		};
		fetchData();
		return () => {
			mounted = false;
		};
	}, [url, JSON.stringify(options)]);

	return state;
}
