import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log('middleware call auth');
  const didLogin = !!session?.user;
  console.log('🚀 ~ middleware ~ didLogin:', didLogin);

  const signinPath = '/start';
  const consentPath = '/mydata/consent';

  // 로그인하지 않은 경우의 처리
  if (!didLogin && req.nextUrl.pathname !== signinPath) {
    return NextResponse.redirect(new URL(`/start`, req.url));
  }

  // 로그인했을 때의 처리
  if (didLogin) {
    const permission = session.user.permission;

    // permission이 0인 경우
    if (permission === 0) {
      // consent 페이지가 아닌 다른 페이지로 접근하려 할 때
      if (req.nextUrl.pathname !== consentPath) {
        return NextResponse.redirect(new URL(consentPath, req.url));
      }
    }
    // permission이 0이 아닌 경우
    else {
      // consent 페이지로 접근하려 할 때
      if (req.nextUrl.pathname === consentPath) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // 로그인 상태에서 signin 페이지 접근 시
    if (req.nextUrl.pathname === signinPath) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|sign-up|sign-in|start|$).*)',
    '/login',
    '/',
    '/mydata/consent', // consent 페이지 추가
  ],
};
