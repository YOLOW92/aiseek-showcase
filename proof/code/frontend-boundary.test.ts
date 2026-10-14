  it("web and admin never touch PostgreSQL, queues or model providers", () => {
    const banned =
      /^(pg|pg-boss|@aiseek\/(database|queue|model-router|research-engine|evidence-engine|graph-engine|finance-engine|signal-engine|intelligence-engine|watch-engine|dossier-engine|notification|billing|auth|source-engine|document-client))$/;
    const bad = sources
      .filter((s) => s.pkg === "apps/web" || s.pkg === "apps/admin")
      .flatMap((s) => s.imports.filter((i) => banned.test(i)).map((i) => `${s.file} imports ${i}`));
    expect(bad).toEqual([]);
  });
