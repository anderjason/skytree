export function setIsEqual(firstSet: Set<any>, secondSet: Set<any>): boolean {
  if (firstSet == null && secondSet == null) {
    return true;
  }

  if (firstSet == null || secondSet == null) {
    return false;
  }

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
