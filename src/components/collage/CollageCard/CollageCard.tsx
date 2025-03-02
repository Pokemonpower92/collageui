import { useState } from "react";
import { ApiResponse, useApi } from "../../../hooks/UseApi";
import { Collage } from "../../../pages/CollagePage";
import { DataLoader } from "../../common/DataLoader/DataLoader";
import ImageCard from "../../common/ImageCard/ImageCard";
import { Modal } from "../../common/Modal/Modal";

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
		<>
			<p>{collage.name}</p>
			<p>{collage.description}</p>
			<button onClick={handleClick}>View Collage</button>
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
		</>
	);
};

export default CollageCard;
