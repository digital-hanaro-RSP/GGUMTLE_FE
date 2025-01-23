export type transferReq = {
  amount: number;
  dreamAccountId?: number;
};

export type accountInfoRes = {
  id: number;
  balance: number;
  total: number;
};
