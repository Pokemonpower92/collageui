import { Collage } from "../../pages/CollagePage";
import CollageCard from "./CollageCard";

import styles from "./CollageItems.module.css";

type CollageItemsProps = {
	collages: Collage[];
};

export const CollageItems = ({ collages }: CollageItemsProps) => {
	return (
		<div className={styles.collageItemsContainer}>
			{collages.map((item) => (
				<CollageCard key={item.id} collage={item} />
			))}
		</div>
	);
};
