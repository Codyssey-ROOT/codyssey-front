export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const REISSUE_PATH = "/auth/reissue";
const LOGIN_PAGE_PATH = "/";

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>;

interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  params?: QueryParams;
  body?: unknown;
  shouldSkipReissue?: boolean;
}

const buildUrl = (path: string, params?: QueryParams) => {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url.toString();
};

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

let reissuePromise: Promise<boolean> | null = null;

const reissueTokens = () => {
  reissuePromise ??= fetch(buildUrl(REISSUE_PATH), { method: "POST", credentials: "include" })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      reissuePromise = null;
    });
  return reissuePromise;
};

const request = async <T>(
  method: string,
  path: string,
  { params, body, shouldSkipReissue, headers, ...init }: RequestOptions = {},
): Promise<T> => {
  const send = () =>
    fetch(buildUrl(path, params), {
      ...init,
      method,
      credentials: "include",
      headers: body === undefined ? headers : { "Content-Type": "application/json", ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

  let response = await send();

  if (response.status === 401 && !shouldSkipReissue) {
    const isReissued = await reissueTokens();
    if (!isReissued) {
      window.location.replace(LOGIN_PAGE_PATH);
      throw new HttpError(401, "로그인이 만료되었어요");
    }
    response = await send();
  }

  const data = await parseBody(response);
  if (!response.ok) {
    throw new HttpError(response.status, `요청에 실패했어요 (${response.status})`, data);
  }
  return data as T;
};

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options),
  put: <T>(path: string, options?: RequestOptions) => request<T>("PUT", path, options),
  patch: <T>(path: string, options?: RequestOptions) => request<T>("PATCH", path, options),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};
