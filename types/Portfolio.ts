export interface CurrentPortfolio {
  id: number;
  userId: string;
  depositWithdrawal: number;
  savingTimeDeposit: number;
  investment: number;
  foreignCurrency: number;
  pension: number;
  etc: number;
}

export interface GoalPortfolio {
  id: number;
  userId: string;
  depositWithdrawalRatio: number;
  savingTimeDepositRatio: number;
  investmentRatio: number;
  foreignCurrencyRatio: number;
  pensionRatio: number;
  etcRatio: number;
  templateId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioResponse {
  currentPortfolio: CurrentPortfolio;
  goalPortfolio: GoalPortfolio;
}
