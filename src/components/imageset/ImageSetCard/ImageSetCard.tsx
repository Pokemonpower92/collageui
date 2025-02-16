import { ImageSet } from "../../../pages/ImageSetPage";

export type ImageSetCardProps = {
	imageSet: ImageSet;
};

export const ImageSetCard = ({ imageSet }: ImageSetCardProps) => {
	return (
		<>
			<p>{imageSet.name}</p>
			<p>{imageSet.description}</p>
		</>
	);
};
