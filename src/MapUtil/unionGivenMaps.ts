export function unionGivenMaps<K, V>(...iterables: Map<K, V>[]): Map<K, V> {
  const result = new Map<K, V>();

  for (let iterable of iterables) {
    for (let item of iterable) {
      const [key, val] = item;
      result.set(key, val);
    }
  }

  return result;
}
