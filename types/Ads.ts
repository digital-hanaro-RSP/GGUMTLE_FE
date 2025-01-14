export type Ad = {
  Id: number;
  productType: string;
  productName: string;
  riskRating: string;
  yield: string;
  bannerImageUrl: string | null;
  link: string;
  locationType: string;
};

export type AdsResponse = {
  code: number;
  error: string | null;
  message: string;
  data: {
    ads: Ad[];
  };
};
