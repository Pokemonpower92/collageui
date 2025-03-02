import { Collage } from "../../../pages/CollagePage";
import CollageCard from "../CollageCard/CollageCard";
import styles from "../../common/Gallery/Gallery.module.css";

type GalleryProps = {
	items: Collage[];
};

export const CollageGallery = ({ items }: GalleryProps) => {
	return (
		<>
			<ul className={styles.gallery}>
				{items.map((item) => (
					<li className={styles.galleryItem} key={String(item.id)}>
						<CollageCard collage={item} />
					</li>
				))}
			</ul>
		</>
	);
};
