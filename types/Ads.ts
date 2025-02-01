export type Ad = {
  id: number;
  productType: string;
  productName: string;
  riskRating: string;
  yield: string;
  link: string;
  locationType: string;
  bannerImageUrl?: string; // 옵셔널 속성 추가
};

export type AdsResponse = {
  code: number;
  message: string;
  data: {
    mainAds: Ad[];
  };
};

export type GroupAd = {
  id: number;
  locationType: string;
  adType: string;
  bannerImageUrl: string;
  link: string;
};
