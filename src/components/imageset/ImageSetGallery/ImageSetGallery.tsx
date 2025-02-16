import { ApiResponse, useApi } from "../../../hooks/UseApi";
import { ImageSet } from "../../../pages/ImageSetPage";
import { DataLoader } from "../../common/DataLoader/DataLoader";
import { Gallery } from "../../common/Gallery/Gallery";

type ImageSetGalleryProps = {
	imageSet: ImageSet;
};

type ImageSetImages = {
	db_id: string;
	id: string;
	imageset_id: string;
	file_name: string;
	r: string;
	g: string;
	b: string;
	a: string;
	created_at: string;
	updated_at: string;
};

export function ImageSetGallery({ imageSet }: ImageSetGalleryProps) {
	const { isLoading, error, response } = useApi<ApiResponse<ImageSetImages[]>>(
		`/api/imagesetimages/${imageSet.id}`
	);
	return (
		<DataLoader state={{ isLoading, error, response }}>
			{response && (
				<Gallery
					items={response.data.map((item) => {
						return { id: item.id };
					})}
				/>
			)}
		</DataLoader>
	);
}
