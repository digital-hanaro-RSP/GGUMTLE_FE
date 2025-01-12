/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 빌드 중 ESLint 오류를 무시
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
