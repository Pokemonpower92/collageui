import { useState } from "react";
import { ImageSet } from "../../pages/ImageSetPage";
import { ImageSetGallery } from "../imagesetimage/ImageSetImageGallery";
import { Modal } from "../common/Modal/Modal";

import styles from "./ImageSetCard.module.css";

export type ImageSetCardProps = {
	imageSet: ImageSet;
};

export const ImageSetCard = ({ imageSet }: ImageSetCardProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(true);
	};

	return (
		<div className={styles.imageSetCardContainer}>
			<p className={styles.imageSetName}>{imageSet.name}</p>
			<p className={styles.imageSetdescription}>{imageSet.description}</p>
			<button className={styles.imageSetButton} onClick={handleClick}>
				View Images
			</button>
			<Modal
				isOpen={isOpen}
				title={`${imageSet.name} Images`}
				onClose={() => setIsOpen(false)}
			>
				<ImageSetGallery imageSet={imageSet} />
			</Modal>
		</div>
	);
};
