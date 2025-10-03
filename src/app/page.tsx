import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, BellRing, ClipboardCheck } from "lucide-react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId, sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role === "ADMIN") {
    redirect("/admin");
  } else if (sessionClaims?.metadata?.role === "EMPLOYEE") {
    redirect("/employee");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sm:block flex flex-col justify-between sm:h-30 sm:w-16 md:flex lg:flex-row lg:h-20 lg:w-270 lg:px-6 items-center justify-between">
        <Link href="/" className="mt-2 block sm:flex items-center justify-center md:mt-0 lg:flex items-center justify-center">
          <span className="lg:text-2xl font-bold">TimeOffer</span>
        </Link>
      <nav className="flex mt-3 md:mt-0 lg:gap-20 gap-2">
          <Link
            href="/features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="/tutorial"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex mt-3 mb-2 md:mt-0 mb-0 gap-4">
        <SignedOut>
          <SignInButton 
          />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Effortless Time Off Management
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Streamline your company&apos;s time off requests, approvals,
                    and tracking all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                  <Button variant={"outline"} asChild>
                    <Link href="/features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/dashboard-screenshot.jpg"
                    alt="Dashboard screenshot"
                    width={600}
                    height={400}
                    priority
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent h-8">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <div className="bg-red-500 w-2 h-2 rounded-full" />
                      <div className="bg-yellow-500 w-2 h-2 rounded-full" />
                      <div className="bg-green-500 w-2 h-2 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to manage your time off requests,
                  approvals, and tracking all in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col justify-center space-y-4 h-[190px]">
                    <Paperclip className="w-10 h-10 text-black" />
                    <div className="space-y-2 mb-5">
                      <h3 className="text-xl font-bold">
                        Easy Request Submission
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Employees can submit time off requests directly through
                        the platform.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col justify-center space-y-4">
                    <BellRing className="w-10 h-10" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        Streamlined Approvals
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Managers receive instant notifications and can approve or deny requests with a single click, ensuring faster decision-making.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col justify-center space-y-4">
                    <ClipboardCheck className="h-10 w-10" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        Comprehensive Tracking
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                       Employees and managers can view a clear history of requests, balances, and usage, helping teams stay organized and transparent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
