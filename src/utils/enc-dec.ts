export function encrypt(data: any) {
  return JSON.stringify(data);
}

export function decrypt(data: string) {
  return JSON.parse(data);
}
