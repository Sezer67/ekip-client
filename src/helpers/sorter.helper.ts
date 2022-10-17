const ascendingSortByNumberOrString = <T>(array: T[], key: string): T[] => {
  const sortedArray = array.slice().sort((a, b) => {
    let variable1 = (a as any)[key];
    let variable2 = (b as any)[key];
    debugger;
    if (typeof (a as any)[key] === "string") {
      variable1 = (a as any)[key].toLowerCase();
      variable2 = (b as any)[key].toLowerCase();
    }
    if (variable1 > variable2) {
      return 1;
    } else if (variable1 < variable2) {
      return -1;
    }
    return 0;
  });
  return sortedArray;
};

const descendingSortByNumberOrString = <T>(array: T[], key: string): T[] => {
  return array.slice().sort((a, b) => {
    let variable1 = (a as any)[key];
    let variable2 = (b as any)[key];
    if (typeof (a as any)[key] === "string") {
      variable1 = (a as any)[key].toLowerCase();
      variable2 = (b as any)[key].toLowerCase();
    }
    if (variable1 > variable2) {
      return -1;
    } else if (variable1 < variable2) {
      return 1;
    }
    return 0;
  });
};

export const sorter = <T>(
  key: string,
  array: T[],
  sort: "ASC" | "DESC"
): T[] => {
  if (sort === "ASC") {
    debugger;
    return ascendingSortByNumberOrString(array, key);
  } else {
    debugger;
    return descendingSortByNumberOrString(array, key);
  }
};
