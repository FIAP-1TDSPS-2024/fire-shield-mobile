const BASE_URL = "https://app-fire-shield.azurewebsites.net/api";

let authToken: string | null = null;

export const setToken = (token: string) => {
  authToken = token;
};

export const clearToken = () => {
  authToken = null;
};

export const request = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options?.headers as Record<string, string> | undefined),
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `Erro ${response.status}`);
    } catch (e) {
      if (e instanceof SyntaxError)
        throw new Error(text || `Erro ${response.status}`);
      throw e;
    }
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
};
