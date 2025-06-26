export async function getCoordinatesFromAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK" || !data.results.length) {
    throw new Error("Failed to geocode address.");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { latitude: lat, longitude: lng };
}
