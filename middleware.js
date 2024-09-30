import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req) {
  // Assume you store the user authentication status in a cookie
  const token = req.cookies.get('next-auth.session-token');
  
  // Define the paths you want to block for authenticated users
  const blockedPaths = ['/login', '/signup'];

  // If the user is authenticated and trying to access login or signup page, redirect them to the homepage
  if (token && blockedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If the user is not authenticated and trying to access protected routes (e.g., profile), redirect them to the login page
  const protectedRoutes = ['/profile', '/dashboard', '/settings','/wishlist','/user-history'];

  if (!token && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the user to proceed if the conditions above are not met
  return NextResponse.next();
}

// Apply the middleware to specific paths
export const config = {
  matcher: ['/login/:path*', '/signup', '/profile'], // Protect login, signup, and profile routes
};
