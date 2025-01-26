export type Ad = {
  id: number;
  productType: string;
  productName: string;
  riskRating: string;
  yield: string;
  link: string;
  locationType: string;
};

export type AdsResponse = {
  code: number;
  message: string;
  data: Ad;
};

export type GroupAd = {
  id: number;
  localtionType: string;
  adType: string;
  bannerImageUrl: string;
  link: string;
};
