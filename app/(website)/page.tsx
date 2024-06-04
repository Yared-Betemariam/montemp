/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import AboutApp from "@/components/website/AboutApp";
import FAQ from "@/components/website/FAQ";
import Pricing from "@/components/website/Pricing";
import Testimonials from "@/components/website/Testimonials";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col flex-1">
      <section className="wrapper py-12 flex gap-12 items-center">
        <div className="flex flex-col gap-6 flex-1 justify-center items-center">
          <div className="text-6xl font-bold flex flex-col text-center items-center justify-center max-w-[700px]">
            <h1 className="flex gap-6">
              <span>The Best</span>
              <p className="bg-primary p-2 shadow text-gray-200 text-[3.35rem] rotate-2 px-4">
                NextJs
              </p>
            </h1>
            <span>and MongoDB database</span>
          </div>
          <p className="text-lg max-w-prose text-center opacity-70">
            Montemp is my "currently using tempalte or boilerpate for my saas"
            all my saas that is and it is the best
          </p>
          <div className="space-x-4">
            <Link href={"/auth/sign-in"}>
              <Button size={"lg"} className="rounded-xl text-base space-x-4">
                <span>Get started now</span>
              </Button>
            </Link>
            <Link href={"#about"}>
              <Button
                size={"lg"}
                variant={"outline"}
                className="rounded-xl text-base"
              >
                Learn more
              </Button>
            </Link>
          </div>
        </div>
        {/* <Image
          src={"/hero.png"}
          alt="hero"
          width={2125}
          height={2099}
          className="max-w-[45%]"
        /> */}
      </section>
      <AboutApp />
      <Pricing />
      <Testimonials />
      <FAQ />
      <section className="wrapper flex flex-col items-center justify-between gap-6 py-20">
        <h1 className="text-5xl font-bold">Don't waste any more time</h1>
        <span className="text-lg opacity-70">
          get started making good email right now
        </span>
        <Link href={"/auth/sign-up"}>
          <Button size={"lg"} className="rounded-xl text-base">
            Get started
          </Button>
        </Link>
      </section>
    </main>
  );
}
