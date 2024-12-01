import { useApi } from "../hooks/UseApi";
import { ApiService } from "../services";
import { CollageService } from "../services/CollageService";

const api = new ApiService("/api");
const collageService = new CollageService(api);
const getImageSets = () => collageService.getImageSets();

export const HomePage = () => {
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
