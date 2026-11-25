// JSF-206: single ranked list. Source origin is metadata only. Stable sort (ties keep input order, never source-based).
export function rank(listings, scoreField = 'total_score') {
  return listings.map((l, i) => [l, i]).sort((a, b) => (b[0][scoreField] ?? 0) - (a[0][scoreField] ?? 0) || a[1] - b[1]).map(([l]) => l);
}
