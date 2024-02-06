import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData
} from "@remix-run/react"
import { json } from "@remix-run/node"
import { useEffect } from 'react';

import { NavigationBar } from "./classes/navigationBar"
import { Footer, FooterLink } from "./classes/footer"
import { renderPageLinks } from "./classes/pageHelpers"

import styles from "~/styles/styles.css"
import colors from "~/styles/colors.css"
// use webpack css loader instead? v
import carouselStyles from "~/../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"


export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: colors },
    { rel: "stylesheet", href: carouselStyles },
  ]
}

export function meta(){
  return [{ title: "GBH Open Vault" }]
}

export async function loader() {
  // lift these env vars from process.env so they can be injected into window
  return json({
    ENV: {
      AAPB_HOST: process.env.AAPB_HOST || "https://americanarchive.org",
      OV_API_URL: process.env.OV_API_URL || "http://localhost:8000"
    }
  })
}

export default function App() {
  var data = useLoaderData()

  useEffect(() => {
    let lastScrollTop = 0;
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebarMenu = document.getElementsByClassName('page-sidebar')[0];
    const initialSidebarTop = sidebarMenu?.offsetTop;

    window.addEventListener('scroll', function() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        mobileMenu.style.top = "-7rem";
      } else {
        mobileMenu.style.top = "0";
      }
      if (scrollTop > initialSidebarTop) {
        sidebarMenu.style.position = "fixed";
        sidebarMenu.style.top = "0";
      } else {
        sidebarMenu.style.position = "static";
      }
      lastScrollTop = scrollTop;
    });
  }, []); // Empty array means this effect runs once on component mount
  

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavigationBar />
        <Outlet />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />

        { process.env.NODE_ENV === "development" && <LiveReload />}
        <Footer />
      </body>
    </html>
  )
}
