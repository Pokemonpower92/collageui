import { DataLoader } from "../components/common/DataLoader/DataLoader";
import { Gallery } from "../components/common/Gallery/Gallery";
import { ApiResponse, useApi } from "../hooks/UseApi";

interface Collage {
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
			{response && <Gallery items={response.data} />}
		</DataLoader>
	);
};

export default CollagePage;
