import { BACKEND_URL } from '../constants';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = new URL(request.url);

  const excludedPaths = [
    '/dashboard',
    '/dashboard/settings',
    '/about',
    '/signin',
    '/signup',
    '/settings'
  ];

  if (excludedPaths.includes(url.pathname)) {
    return NextResponse.next()
  }

  if (url.pathname.match(/^\/[a-zA-Z0-9_-]+$/)) {
    const slug = url.pathname.slice(1);

    return Response.redirect(`${BACKEND_URL}/urls/${slug}`, 307);
  }

  return new Response(null, { status: 404 });
}
