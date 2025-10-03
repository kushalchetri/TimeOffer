import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhooks/(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isAdminRoute = createRouteMatcher(["/admin", "/admin/(.*)"]);
const isEmployeeRoute = createRouteMatcher(["/employee", "/employee/(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    // Not signed in → redirect to sign in for non-public routes
    if (!isPublicRoute(req)) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    return NextResponse.next();
  }

  // Fetch fresh user metadata from Clerk (forces latest publicMetadata)
  const clerkClient = (await import("@clerk/nextjs/server")).clerkClient;
  const user = await(await clerkClient()).users.getUser(userId);
  const metadata = user.publicMetadata as {
    onboardingCompleted?: boolean;
    role?: "ADMIN" | "EMPLOYEE";
    companyId?: string;
  };

  const onboardingCompleted = metadata.onboardingCompleted ?? false;
  const role = metadata.role ?? null;

  // Redirect logic for homepage
  if (req.nextUrl.pathname === "/") {
    if (!onboardingCompleted) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (role === "EMPLOYEE") {
      return NextResponse.redirect(new URL("/employee", req.url));
    }
  }

  // Onboarding page redirect if already completed
  if (isOnboardingRoute(req) && onboardingCompleted) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (role === "EMPLOYEE") {
      return NextResponse.redirect(new URL("/employee", req.url));
    }
  }

  // Admin route protection
  if (isAdminRoute(req) && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Employee route protection
  if (isEmployeeRoute(req) && role !== "EMPLOYEE") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
