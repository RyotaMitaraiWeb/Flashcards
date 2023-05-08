export function toShortDate(dateString: string) {
  const date = new Date(dateString).toLocaleDateString('ger', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return date;
}