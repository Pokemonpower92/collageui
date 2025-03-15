import { ApiResponse, useApi } from "../hooks/UseApi/UseApi";
import { ImageSet } from "./ImageSetPage";

import styles from "./CreateCollagePage.module.css";
import { DataLoader } from "../components/common/DataLoader/DataLoader";

export interface TargetImage {
	db_id: number;
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
}

const CreateCollagePage = () => {
	const {
		isLoading: targetsLoading,
		error: targetsError,
		response: targets,
	} = useApi<ApiResponse<TargetImage[]>>("/api/targets");

	const {
		isLoading: setsLoading,
		error: setsError,
		response: imageSets,
	} = useApi<ApiResponse<ImageSet[]>>("/api/imagesets");

	const isLoading = targetsLoading || setsLoading;
	const error = targetsError || setsError ? "Error loading form data" : null;
	const formData =
		targets && imageSets
			? {
					targets: targets?.data,
					imageSets: imageSets?.data,
			  }
			: null;

	return (
		<div className={styles.createCollagePage}>
			<DataLoader state={{ isLoading, error, response: formData }}>
				<p>
					Hello! {isLoading} {error} {JSON.stringify(formData)}
				</p>
			</DataLoader>
		</div>
	);
};

export default CreateCollagePage;
