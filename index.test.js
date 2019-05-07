import {
  indentList,
  indentListNative,
  indentListNative2,
  isPermutationString
} from "./index";

describe("function tests", () => {
  describe("make list indent", () => {
    test("indent list by lodash uniq, [1, 2, 1] should be [1, 2]", () => {
      expect(indentList([1, 2, 1]).sort()).toEqual([1, 2].sort());
    });
    test("indent by function indentListNative, [1, 2, 1] should be [1, 2]", () => {
      expect(indentListNative([1, 2, 1]).sort()).toEqual([1, 2].sort());
    });
    test("indent by function indentListNative, [12, 11, 12, 21, 41, 43, 21] should be [12, 11, 21, 41, 43]", () => {
      expect(indentListNative([12, 11, 12, 21, 41, 43, 21]).sort()).toEqual(
        [12, 11, 21, 41, 43].sort()
      );
    });
    test("indent by function indentListNative2, [12, 11, 12, 21, 41, 43, 21] should be [12, 11, 21, 41, 43]", () => {
      expect(indentListNative2([12, 11, 12, 21, 41, 43, 21]).sort()).toEqual(
        [12, 11, 21, 41, 43].sort()
      );
    });
  });

  describe("is Permutation String", () => {
    test("test is permutation string of ttes", () => {
      expect(isPermutationString("test", "ttes")).toBe(true);
    });

    test("test is permutation string of TSET", () => {
      expect(isPermutationString("test", "TSET")).toBe(true);
    });

    test("test is not permutation string of ttest", () => {
      expect(isPermutationString("test", "ttest")).toBe(false);
    });

    test("test is not permutation string of WTSET", () => {
      expect(isPermutationString("test", "WTSET")).toBe(false);
    });
  });
});
