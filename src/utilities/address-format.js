export default function formatAddress(address) {
  if (address.city && address.province && address.country) {
    return `${address.city} ${address.province}, ${address.country}`;
  }

  if (address.city && address.province) {
    return `${address.city}, ${address.province}`;
  }

  if (address.city && address.country) {
    return `${address.city}, ${address.country}`;
  }

  if (address.country) {
    return address.country;
  }

  // probably doesn't look great, but better than nothing
  if (address.text) {
    return address.text;
  }

  // pray this looks alright
  return '';
}
