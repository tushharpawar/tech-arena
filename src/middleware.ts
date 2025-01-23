import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPulicRoute = createRouteMatcher([
    "/sign-up",
    "/sign-in",
    "/"
])

// const isPublicApiRoute = createRouteMatcher([
     
// ])

export default clerkMiddleware(async (auth,req)=>{
    const {userId} = await auth()
    const currentUrl = new URL(req.url)

    const isAccessingPublicRoute = currentUrl.pathname === "/"
    // const isApiRequest = currentUrl.pathname.startsWith("/api")

    // in case of logged in

    if(userId && isPulicRoute(req) && !isAccessingPublicRoute){
        return NextResponse.redirect(new URL("/",req.url))
    }

    //in case of not logged in

    if(!userId){
        if(!isPulicRoute(req)){
            return NextResponse.redirect(new URL("/sign-in",req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}