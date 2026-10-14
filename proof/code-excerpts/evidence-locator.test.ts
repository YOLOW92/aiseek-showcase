  it("HYPOTHESIS: direct claim without a locator", () => {
    expect(decideClass({ directlyStated: true, evidence: [ev({ hasLocator: false })], hasRationale: false }).target).toBe("HYPOTHESIS");
  });
