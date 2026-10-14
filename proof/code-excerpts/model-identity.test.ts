  it("keeps model numbers apart", () => {
    expect(modelCodes("NVIDIA B200")).toEqual(["b200"]);
    expect(modelCodes("GLM 5.3")).toEqual(["glm5.3"]);
    expect(modelCodes("华为 Mate 90 Pro")).toEqual(["mate90"]);
    expect(sameModelCodes("NVIDIA B200", "NVIDIA H200")).toBe(false);
    expect(sameModelCodes("麒麟 9035", "麒麟9035")).toBe(true);
    expect(sameModelCodes("Toyota", "トヨタ")).toBe(true);
  });
