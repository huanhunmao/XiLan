// jest 断言库  测试断言指的是 是否可以符合测试结果
test("test common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});

test("test to be true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("test number", () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test("test object", () => {
  // 判断值是否相同
  expect({ name: "xilan" }).toEqual({ name: "xilan" });
});
