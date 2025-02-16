import ImageCard from "../ImageCard/ImageCard";

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
			<ul>
				{items.map((item) => (
					<li key={String(item)}>
						<ImageCard imageData={item} />
					</li>
				))}
			</ul>
		</>
	);
};
