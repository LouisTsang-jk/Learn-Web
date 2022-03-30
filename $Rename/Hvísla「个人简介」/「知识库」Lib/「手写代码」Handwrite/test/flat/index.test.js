const flat = require("./index");

describe("run flat", () => {
  it("level 0", () => {
    expect(flat([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });
  it("level 1", () => {
    expect(flat([1, 2, 3, [4]])).toEqual([1, 2, 3, 4]);
  });

  it("level 2", () => {
    expect(flat([1, 2, 3, [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
  });

  it("level 3", () => {
    expect(flat([1, 2, 3, [4, [5]]], 2)).toEqual([1, 2, 3, 4, 5]);
  });
});
