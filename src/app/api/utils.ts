export function toMySQLDatetime(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 19).replace('T', ' ')
}
