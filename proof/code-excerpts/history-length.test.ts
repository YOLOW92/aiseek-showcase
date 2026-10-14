  it("counts the days of history before a day", () => {
    expect(historyDaysBefore(null, "2026-10-10")).toBe(0);
    expect(historyDaysBefore("2026-10-06", "2026-10-06")).toBe(0);
    expect(historyDaysBefore("2026-10-06", "2026-10-10")).toBe(4);
  });
