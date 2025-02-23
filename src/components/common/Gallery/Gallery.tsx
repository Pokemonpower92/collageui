import ImageCard from "../ImageCard/ImageCard";
import styles from "./Gallery.module.css";

export interface ImageData {
	id: string;
	name?: string;
	description?: string;
}

type GalleryProps = {
	items: ImageData[];
};

export const Gallery = ({ items }: GalleryProps) => {
	return (
		<>
			<ul className={styles.gallery}>
				{items.map((item) => (
					<li className={styles.galleryItem} key={String(item.id)}>
						<ImageCard imageData={item} />
					</li>
				))}
			</ul>
		</>
	);
};
