export function serverReq(
  method: 'POST' | 'DELETE' | 'PATCH' | 'PUT',
  body: object,
) {
  return {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
}
