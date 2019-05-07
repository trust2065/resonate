import _ from "lodash";

export const indentList = originArray => {
  return _.uniq(originArray);
};

// time complexity of sort(quick sort) is O(n log(n)), loop is O(n)
export const indentListNative = originArray => {
  const sortedArray = originArray.sort();
  const result = [sortedArray[0]];
  let lastPushedElement = result[0];

  for (let i = 1; i < sortedArray.length; i++) {
    const element = sortedArray[i];
    if (element !== lastPushedElement) {
      result.push(element);
      lastPushedElement = element;
    }
  }
  return result;
};

export const indentListNative2 = originArray => {
  return [...new Set(originArray)];
};

// use memory space to exchange time
// +1 when alphabet occur in string1, -1 when in string2
// if all alphabets are 0 in the end, it is permutation
export const isPermutationString = (string1, string2) => {
  if (string1.length !== string2.length) {
    return false;
  } else {
    let alphabets = {};
    for (let i = 0; i < string1.length; i++) {
      const element1 = string1[i].toLowerCase();
      const element2 = string2[i].toLowerCase();
      alphabets = countAlphabets(alphabets, element1, 1);
      alphabets = countAlphabets(alphabets, element2, -1);
    }

    for (const key in alphabets) {
      if (alphabets.hasOwnProperty(key)) {
        const element = alphabets[key];
        if (element !== 0) {
          return false;
        }
      }
    }

    return true;
  }
};

const countAlphabets = (alphabets, element, offset) => {
  if (alphabets[element]) {
    alphabets[element] += offset;
  } else {
    alphabets[element] = offset;
  }
  return alphabets;
};
