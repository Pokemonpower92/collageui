import { useEffect, useState } from "react";

export interface ImageApiState {
	isLoading: boolean;
	error: string | null;
	imageUrl: string | null;
	blob: Blob | null;
}

export function useImageApi(
	url: string,
	options: RequestInit = {}
): ImageApiState {
	const [state, setState] = useState<ImageApiState>({
		isLoading: true,
		error: null,
		imageUrl: null,
		blob: null,
	});

	useEffect(() => {
		let mounted = true;

		const fetchData = async () => {
			setState((prev) => ({
				...prev,
				isLoading: true,
				error: null,
				imageUrl: null,
				blob: null,
			}));

			try {
				const response = await fetch(url, {
					...options,
					headers: {
						...options.headers,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const blob = await response.blob();
				const objectUrl = URL.createObjectURL(blob);

				if (!mounted) {
					URL.revokeObjectURL(objectUrl);
					return;
				}

				setState({
					imageUrl: objectUrl,
					blob,
					error: null,
					isLoading: false,
				});
			} catch (error) {
				if (!mounted) return;
				setState({
					imageUrl: null,
					blob: null,
					error:
						error instanceof Error
							? error.message
							: "An unknown error occurred",
					isLoading: false,
				});
			}
		};

		fetchData();

		return () => {
			mounted = false;
			setState((prev) => {
				if (prev.imageUrl) {
					URL.revokeObjectURL(prev.imageUrl);
				}
				return prev;
			});
		};
	}, [url, JSON.stringify(options)]);

	useEffect(() => {
		return () => {
			if (state.imageUrl) {
				URL.revokeObjectURL(state.imageUrl);
			}
		};
	}, []);

	return state;
}
