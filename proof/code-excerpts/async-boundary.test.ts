  it("the API never runs research synchronously", () => {
    const bad = sources
      .filter((s) => s.pkg === "apps/api" && /\b(runResearch|resumeResearch|finalizeWaitingRun|buildResearchGraph)\b/.test(s.text))
      .map((s) => s.file);
    expect(bad).toEqual([]);
  });
