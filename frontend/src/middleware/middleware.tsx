import { BACKEND_URL } from '../constants';

export function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.match(/^\/[a-zA-Z0-9_-]+$/)) {
    const slug = url.pathname.slice(1);

    return Response.redirect(`${BACKEND_URL}/urls/${slug}`, 307);
  }

  return new Response(null, { status: 404 });
}
