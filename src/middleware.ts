
import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server'

const publicRoutes = [
  { path: '/', whenAuthenticated: 'redirect' },
] as const


const REDIRECT_WHEN_UNAUTHENTICATED_ROUTE = '/'

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = req.cookies.get('access_token')?.value
  //console.log('Middleware: Checking authentication token:', authToken)

  if(!authToken && publicRoute) {
    return NextResponse.next()
  }

  if(!authToken && !publicRoute) {
    const redirectURL = req.nextUrl.clone()
    redirectURL.pathname = REDIRECT_WHEN_UNAUTHENTICATED_ROUTE
    //console.log('Redirecting unauthenticated user to login page', redirectURL)
    return NextResponse.redirect(redirectURL)
  }

  if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectURL = req.nextUrl.clone()
    redirectURL.pathname = '/dashboard'
    //console.log('Redirecting authenticated user to home page', redirectURL)
    return NextResponse.redirect(redirectURL)
  }

  if(authToken && !publicRoute){
    //check if the token is expired
    //if expired remove and redirect to login
    //Apply a refresh strategy if needed
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}