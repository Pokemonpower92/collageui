import { CollageGallery } from "../components/collage/CollageItems";
import { DataLoader } from "../components/common/DataLoader/DataLoader";
import { ApiResponse, useApi } from "../hooks/UseApi/UseApi";

export interface Collage {
	db_id: number;
	id: string;
	name: string;
	description: string;
	image_set_id: string;
	target_image_id: string;
	created_at: string;
	updated_at: string;
}

const CollagePage = () => {
	const { isLoading, error, response } =
		useApi<ApiResponse<Collage[]>>("/api/collages");
	return (
		<DataLoader state={{ isLoading, error, response }}>
			{response && <CollageGallery collages={response.data} />}
		</DataLoader>
	);
};

export default CollagePage;
