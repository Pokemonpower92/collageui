import { ApiService } from "./ApiService";

export interface ImageSet {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
export interface ImageSetResponse {
  data: ImageSet[];
  status_code: number;
}

export class ImageSetService {
  #api: ApiService;

  constructor(api: ApiService) {
    this.#api = api;
  }

  async getImageSets(): Promise<ImageSetResponse> {
    return await this.#api.get<ImageSetResponse>("/imagesets");
  }
}
