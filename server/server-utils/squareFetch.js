const SQUARE_BASE_URL = "https://connect.squareup.com";

export async function squareFetch(path, options = {}) {
  const {
    method = "POST",
    body,
    signal,
    headers = {},
  } = options;

  const response = await fetch(`${SQUARE_BASE_URL}${path}`, {
    method,
    signal,
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Square API error ${response.status}: ${message}`);
  }

  return response.json();
}