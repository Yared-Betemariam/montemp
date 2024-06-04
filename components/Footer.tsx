"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { navLinks } from "./Header";

const Footer = () => {
  const date = new Date();
  return (
    <footer className=" bg-gradient-to-br from-zinc-900 to-slate-900 border-t border-black py-6 text-gray-200 shadow-md">
      <section className="wrapper flex py-12 items-start justify-between gap-12">
        <div className="flex flex-col gap-3">
          <Logo w />
          <span className="text-lg opacity-80 max-w-[16rem]">
            The simplest and best saas boilerplate
          </span>
          <span className="text-sm opacity-50 font-normal">
            Copyright &copy;. {date.getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end ml-auto">
          <p className="text-lg font-semibold opacity-80 mb-3">Links</p>
          <div className="flex flex-col items-end gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={"opacity-75 text-base"}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <p className="text-lg font-semibold opacity-80 mb-1">Legal</p>
          <Link href={"/terms"}>
            <Button
              variant={"link"}
              className="text-gray-200/75 hover:text-gray-200/90 p-0 h-auto text-base"
            >
              Terms of services
            </Button>
          </Link>
          <Link href={"/privacy-policy"}>
            <Button
              variant={"link"}
              className="text-gray-200/75 hover:text-gray-200/90 p-0 h-auto text-base"
            >
              Privacy policy
            </Button>
          </Link>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
