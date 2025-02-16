import { ReactNode } from "react";
import { ApiState } from "../../../hooks/UseApi";

interface DataLoaderProps<T> {
	state: ApiState<T>;
	children: ReactNode;
}

/**
 * DataLoader renders components based on the state of an api response.
 * @param DataLoaderProps The state of the api response and the children.
 * @returns The children components.
 */
export function DataLoader<T>({ state, children }: DataLoaderProps<T>) {
	if (state.isLoading) {
		return <p>loading...</p>;
	}

	if (state.error) {
		return <p>Error: {state.error}</p>;
	}

	return <>{children}</>;
}
