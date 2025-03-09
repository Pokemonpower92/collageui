import { DataLoader } from "../components/common/DataLoader/DataLoader";
import { ImageSetItems } from "../components/imageset/ImageSetItems";
import { ApiResponse, useApi } from "../hooks/UseApi/UseApi";

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
			{response && <ImageSetItems imageSets={response.data} />}
		</DataLoader>
	);
};

export default ImageSetPage;
