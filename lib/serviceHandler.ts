interface IFetchApi<TBody> {
  method: "POST" | "GET" | "PUT" | "DELETE";
  baseURL: string;
  resource: string;
  body?: TBody;
  protectedRoute?: boolean;
  responseType?: "json" | "blob";
}

export const serviceHandler = async <TResponse, TBody = undefined>({
  method,
  body,
  baseURL,
  resource,
}: IFetchApi<TBody>): Promise<TResponse> => {
  const url = baseURL + resource;

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  // 2. Default JSON handling
  const data = await response.json();

  if (data.error === true) {
    throw data.data;
  }

  return data as TResponse;
};
