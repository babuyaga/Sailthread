import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that are accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/clerk-webhook(.*)',
  '/api/drive-activity/notification(.*)',
  '/api/payment/success(.*)',
  '/api/templates(.*)',
]);


// Define ignored routes that should bypass authentication
const ignoredRoutes = createRouteMatcher([
  '/api/auth/callback/discord(.*)',
  '/api/auth/callback/notion(.*)',
  '/api/auth/callback/slack(.*)',
  '/api/flow(.*)',
  '/api/cron/wait(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route matches one of the ignored routes, skip authentication
  if (ignoredRoutes(req)) {
    return NextResponse.next();
  }

  // If the route is not public, protect it using Clerk's `auth.protect()` method
  if (!isPublicRoute(req)) {
    await auth.protect(); // Protects the route if it's not public
  }

  return NextResponse.next(); // Proceed to the requested route
});

// Configuration for route matching
export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always run for API routes (adjust path matching as needed)
    '/(api|trpc)(.*)',
  ],
}
