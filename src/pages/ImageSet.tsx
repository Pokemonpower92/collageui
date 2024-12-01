import { useApi } from "../hooks/UseApi";
import { ApiService } from "../services";
import { ImageSetService } from "../services/ImageSetService";

const api = new ApiService("/api");
const imageSetService = new ImageSetService(api);
const getImageSets = () => imageSetService.getImageSets();

const ImageSet = () => {
  const { data, error, loading } = useApi(getImageSets);
  console.log("data: ", data);
  const getContent = () => {
    if (loading) {
      return <p>loading...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    return (
      <ul>{data?.data.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
    );
  };
  return <>{getContent()}</>;
};

export default ImageSet;
