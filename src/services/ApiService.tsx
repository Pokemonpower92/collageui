export class ApiService {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async #fetchWithError(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const response = await fetch(this.#baseUrl + url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Api error: ${response.status}`);
    }
    return response;
  }

  async get<T>(url: string): Promise<T> {
    const resp = await this.#fetchWithError(url);
    return resp.json();
  }
}
