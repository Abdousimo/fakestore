// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/profile')) {
    const token = request.cookies.get('accessToken'); // Check if the user has a valid token
    // If no token is found, redirect to login
    if (!token) {
      return Response.redirect(new URL('/login', request.url));
    }
  }

  // if (pathname.startsWith('/')) {
  //   const token = request.cookies.get('accessToken'); 
  //   if (token) {
  //     return Response.redirect(new URL('/profile/products', request.url));
  //   }
  // }


    return NextResponse.next();

}
