import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 빌드 중 ESLint 오류를 무시
    ignoreDuringBuilds: true,
  },
  // 외부 이미지 도메인을 사용하기 위해 추가. 나중에 api 연동시 삭제
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'ggumtlebucket.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default withPWAConfig(nextConfig);
