import React from "react";
import logo from "@/../public/images/logo-light.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 md:px-8">
        <div className="md:flex md:items-start md:gap-8">
          <div className="text-teal-600">
            <Image src={logo} alt="logo" height={70} width={70} quality={90} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 md:mt-0 md:grid-cols-5 md:gap-y-16">
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold">Get the latest news!</h2>

                <p className="mt-4 text-slate-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                  non cupiditate quae nam molestias.
                </p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-3 md:flex md:items-end">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>

                <div className="flex flex-col gap-4 border border-gray-100 p-2 focus-within:ring sm:items-center">
                  <Input
                    type="email"
                    id="UserEmail"
                    placeholder="john@rhcp.com"
                    className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                  />

                  <Button className="mt-1 w-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none sm:mt-0 sm:w-auto sm:shrink-0">
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium">Services</p>

              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    1on1 Coaching
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Company Review
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Accounts Review
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    HR Consulting
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    SEO Optimisation
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium">Company</p>

              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Reviews
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Blog
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Contact Us
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Faq
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Our Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-16 md:flex md:items-center md:justify-between">
          <div className="text-sm">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm font-medium transition hover:text-teal-600"
            >
              Privacy Policy
            </a>
            <span className="mx-4 text-sm"> | </span>
            <a
              href="#"
              className="text-sm font-medium transition hover:text-teal-600"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
