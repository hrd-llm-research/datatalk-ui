export default function formatCreatedAt(timestamp) {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 10);
}
