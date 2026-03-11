export async function parseJsonSafe(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || "Unexpected response." };
  }
}

export async function handleApiResponse(response: Response) {
  const data = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}