export async function useStrapiFetch<T = any>(
  endpoint: string,
  options: any = {}
) {
  const config = useRuntimeConfig();
  const baseURL = config.public.strapiUrl;

  const token = process.client ? localStorage.getItem("token") : null;

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await $fetch<T>(endpoint, {
    baseURL,
    headers,
    ...options,
  });

  console.log("📡 Fetch response:", response);

  return response ?? {};
}
