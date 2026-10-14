  it("folds traditional Chinese and Japanese kanji to simplified", () => {
    expect(nameKey("日本銀行")).toBe(nameKey("日本银行"));
    expect(nameKey("臺積電")).toBe(nameKey("台积电"));
    expect(nameKey("経済産業省")).toBe(nameKey("经济产业省"));
    expect(nameKey("台風27号")).toBe(nameKey("台风27号"));
  });
