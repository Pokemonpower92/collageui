import { ApiResponse, useApi } from "../hooks/UseApi";

// The specific resource type
interface ImageSet {
	db_id: number;
	id: string;
	name: string;
	description: string;
	created_at: string; // or Date if you parse it
	updated_at: string;
}

const ImageSet = () => {
	const { result, isLoading } =
		useApi<ApiResponse<ImageSet[]>>("/api/imagesets");
	const getContent = () => {
		if (isLoading) {
			return <p>loading...</p>;
		}
		if (!result?.ok) {
			return <p>Error: {result?.error}</p>;
		}
		return (
			<ul>
				{result.value.data.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		);
	};
	return <>{getContent()}</>;
};

export default ImageSet;
