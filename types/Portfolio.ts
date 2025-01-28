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

export type InvestmentType =
  | 'CONSERVATIVE'
  | 'MODERATELY_CONSERVATIVE'
  | 'BALANCED'
  | 'MODERATELY_AGGRESSIVE'
  | 'AGGRESSIVE';

export interface InvestmentTypeResponse {
  userName: string;
  investmentType: InvestmentType;
}

export interface PortfolioTemplate {
  id: number;
  name: InvestmentType;
  depositWithdrawalRatio: number;
  savingTimeDepositRatio: number;
  investmentRatio: number;
  foreignCurrencyRatio: number;
  pensionRatio: number;
  etcRatio: number;
}

export interface PortfolioTemplatesResponse {
  templates: PortfolioTemplate[];
}

export interface ManualPortfolioResponse {
  id: number;
  userId: string;
  depositWithdrawalRatio: number;
  savingTimeDepositRatio: number;
  investmentRatio: number;
  foreignCurrencyRatio: number;
  pensionRatio: number;
  etcRatio: number;
  createdAt: string;
  updatedAt: string;
}

export interface getPortfolioRecommendationResponse {
  investmentType: InvestmentType;
  estimatedInvestRatio: number;
  recommended: true;
}
