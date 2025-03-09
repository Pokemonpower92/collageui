import { useState } from "react";
import { ApiResponse, useApi } from "../../hooks/UseApi/UseApi";
import { Collage } from "../../pages/CollagePage";
import { DataLoader } from "../common/DataLoader/DataLoader";
import ImageCard from "../common/ImageCard/ImageCard";
import { Modal } from "../common/Modal/Modal";

import styles from "./CollageCard.module.css";

type CollageCardProps = {
	collage: Collage;
};

export interface CollageImage {
	db_id: number;
	id: string;
	collage_id: string;
	created_at: string;
	updated_at: string;
}

const CollageCard = ({ collage: collage }: CollageCardProps) => {
	const { isLoading, error, response } = useApi<ApiResponse<CollageImage>>(
		`/api/collageimages/${collage.id}`
	);
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => {
		setIsOpen(true);
	};

	return (
		<div key={collage.id} className={styles.collageContainer}>
			<p className={styles.collageName}>{collage.name}</p>
			<p className={styles.collageDescription}>{collage.description}</p>
			<button className={styles.collageButton} onClick={handleClick}>
				View Collage
			</button>
			<Modal
				isOpen={isOpen}
				title={`${collage.name}`}
				onClose={() => setIsOpen(false)}
			>
				<DataLoader state={{ isLoading, error, response }}>
					{response && (
						<ImageCard
							imageData={{
								id: response.data.id,
							}}
						/>
					)}
				</DataLoader>
			</Modal>
		</div>
	);
};

export default CollageCard;
