import { Link } from "react-router-dom";
import { CollageItems } from "../components/collage/CollageItems";
import { DataLoader } from "../components/common/DataLoader/DataLoader";
import { ApiResponse, useApi } from "../hooks/UseApi/UseApi";

import styles from "./CollagePage.module.css";

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
			<div className={styles.collagePage}>
				<Link to="/createcollage" className={styles.collageCreateLink}>
					Create your own!
				</Link>
				{response && <CollageItems collages={response.data} />}
			</div>
		</DataLoader>
	);
};

export default CollagePage;
