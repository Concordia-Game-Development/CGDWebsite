import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "app/css/background-animation.css";
import "app/css/animations.css";
import cgdpink from "assets/icons/cgd-transp-pink.png";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import styles from "./css/tailwind.css";

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: stylesheet },
// ];

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [
    { icon: "./favicon.ico" },
    { property: "og:image", content: "/assets/ogImg/landing.png" },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="og:image" content="/assets/ogImg/landing.png" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div>
          <div className="flex h-[85svh] flex-col place-content-center items-center gap-4">
            <h1 className="text-4xl">
              {isRouteErrorResponse(error)
                ? `${error.status} | ${error.statusText}`
                : error instanceof Error
                ? error.message
                : "Unknown Error"}
            </h1>
            <a href="/" className="text-2xl text-primary hover:underline">
              Return to safety
            </a>
          </div>
          <div className="background h-full">
            <span>
              <img
                src={cgdpink}
                alt="cgd pink alternate logo"
                className="floaties"
              />
            </span>
            <span>
              <img
                src={cgdpink}
                alt="cgd pink alternate logo"
                className="floaties"
              />
            </span>
            <span>
              <img
                src={cgdpink}
                alt="cgd pink alternate logo"
                className="floaties"
              />
            </span>
            <span>
              <img
                src={cgdpink}
                alt="cgd pink alternate logo"
                className="floaties"
              />
            </span>
            <span>
              <img
                src={cgdpink}
                alt="cgd pink alternate logo"
                className="floaties"
              />
            </span>
          </div>
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="og:image" content="/assets/ogImg/landing.png" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
