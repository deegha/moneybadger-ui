interface IFetchApi<TBody> {
  method: "POST" | "GET" | "PUT" | "DELETE";
  baseURL: string;
  resource: string;
  body?: TBody;
  protectedRoute?: boolean;
  responseType?: "json" | "blob";
  externalHeaders?: Record<string, string>;
}

export const serviceHandler = async <TResponse, TBody = undefined>({
  method,
  body,
  baseURL,
  resource,
  externalHeaders,
}: IFetchApi<TBody>): Promise<TResponse> => {
  const url = baseURL + resource;

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (externalHeaders) {
    headers = {
      ...headers,
      ...externalHeaders,
    };
  }

  const response = await fetch(url, {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (response.status === 401) {
    throw Error("Unauthorized");
  }

  // 2. Default JSON handling
  const data = await response.json();

  if (data.error === true) {
    throw data.data;
  }

  return data as TResponse;
};
