import { DataLoader } from "../components/common/DataLoader/DataLoader";
import { ImageSetCard } from "../components/imageset/ImageSetCard/ImageSetCard";
import { ApiResponse, useApi } from "../hooks/UseApi";

export interface ImageSet {
	db_id: number;
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
}

const ImageSetPage = () => {
	const { isLoading, error, response } =
		useApi<ApiResponse<ImageSet[]>>("/api/imagesets");

	return (
		<DataLoader state={{ isLoading, error, response }}>
			{response && (
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{response.data.map((imageSet) => (
						<ImageSetCard key={imageSet.id} imageSet={imageSet} />
					))}
				</div>
			)}
		</DataLoader>
	);
};

export default ImageSetPage;
