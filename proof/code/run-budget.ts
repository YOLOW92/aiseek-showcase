export function evaluateRunBudget(budget: RunBudget, used: RunUsage, estimatedTokens: number, estimatedCost: number): void {
  if (budget.tokenMax !== null && used.tokens + estimatedTokens > budget.tokenMax) {
    throw new BudgetExceededError("RUN_BUDGET_EXCEEDED", "research run token budget exceeded");
  }
  if (budget.costMax !== null && used.cost + estimatedCost > budget.costMax) {
    throw new BudgetExceededError("RUN_BUDGET_EXCEEDED", "research run cost budget exceeded");
  }
}
