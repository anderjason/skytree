export function setIsEqualToSet(
  firstSet: Set<any>,
  secondSet: Set<any>
): boolean {
  if (firstSet.size !== secondSet.size) {
    return false;
  }

  let allMatch = true;
  firstSet.forEach((value: any) => {
    if (!secondSet.has(value)) {
      allMatch = false;
    }
  });

  return allMatch;
}
