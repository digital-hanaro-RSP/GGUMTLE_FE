import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export const useApi = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchApi = async (apiRoute: string, options: RequestInit = {}) => {
    const url = `${baseUrl}/data${apiRoute}`;
    const headers = new Headers(options.headers);

    // JWT 체크가 필요없는 경로 목록
    const publicRoutes = ['/sign-up/profile'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // public route가 아닐 경우에만 JWT 체크
    if (!isPublicRoute && !session?.user?.jwt) {
      throw new Error('No JWT token found');
    }

    // JWT가 있는 경우에만 Authorization 헤더 추가
    if (session?.user?.jwt) {
      headers.set('Authorization', `Bearer ${session.user.jwt}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  };

  return { fetchApi };
};
