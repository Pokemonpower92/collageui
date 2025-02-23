import { useState } from "react";
import { ImageSet } from "../../../pages/ImageSetPage";
import { ImageSetGallery } from "../ImageSetGallery/ImageSetGallery";
import { Modal } from "../../common/Modal/Modal";

export type ImageSetCardProps = {
	imageSet: ImageSet;
};

export const ImageSetCard = ({ imageSet }: ImageSetCardProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(true);
	};

	return (
		<>
			<p>{imageSet.name}</p>
			<p>{imageSet.description}</p>
			<button onClick={handleClick}>View Images</button>
			<Modal
				isOpen={isOpen}
				title={`${imageSet.name} Images`}
				onClose={() => setIsOpen(false)}
			>
				<ImageSetGallery imageSet={imageSet} />
			</Modal>
		</>
	);
};
