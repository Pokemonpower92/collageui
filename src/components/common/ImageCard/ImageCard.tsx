import { useImageApi } from "../../../hooks/UseImageApi";
import { DataLoader } from "../DataLoader/DataLoader";
import { ImageData } from "../Gallery/Gallery";

import styles from "./ImageCard.module.css";

type ImageCardProps = {
	imageData: ImageData;
};

const ImageCard = ({ imageData }: ImageCardProps) => {
	const { isLoading, error, imageUrl } = useImageApi(
		`/api/files/${imageData.id}`
	);
	return (
		<DataLoader state={{ isLoading, error, response: imageUrl }}>
			<div className={styles.imageCardContainer}>
				{imageData.name && <p>{imageData.name}</p>}
				{imageData.description && <p>{imageData.description}</p>}
				{imageUrl && (
					<img
						src={imageUrl}
						alt={imageData.name || "Image"}
						className="max-w-full h-auto"
					/>
				)}
			</div>
		</DataLoader>
	);
};

export default ImageCard;
