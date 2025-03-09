import { Collage } from "../../pages/CollagePage";
import CollageCard from "./CollageCard";

import styles from "./CollageItems.module.css";

type CollageGalleryProps = {
	collages: Collage[];
};

export const CollageGallery = ({ collages }: CollageGalleryProps) => {
	return (
		<div className={styles.collageItemsContainer}>
			{collages.map((item) => (
				<CollageCard collage={item} />
			))}
		</div>
	);
};
