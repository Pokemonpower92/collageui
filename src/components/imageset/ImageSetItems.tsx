import { ImageSet } from "../../pages/ImageSetPage";
import { ImageSetCard } from "./ImageSetCard";

import styles from "./ImageSetItems.module.css";

interface ImageSetItemsProps {
	imageSets: ImageSet[];
}

export const ImageSetItems = ({ imageSets }: ImageSetItemsProps) => {
	return (
		<div className={styles.imageSetItemsContainer}>
			{imageSets.map((item) => (
				<ImageSetCard key={item.id} imageSet={item} />
			))}
		</div>
	);
};
