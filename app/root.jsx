import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"
import { json } from "@remix-run/node"
import { useEffect } from 'react';

import { NavigationBar } from "./classes/navigationBar"
import { Footer } from "./classes/footer"
import {
  getServerState,
} from 'react-instantsearch';
import { renderToString } from 'react-dom/server';

import "./styles/styles.css"
import "./styles/colors.css"
import "@fontsource/red-hat-display"
import "@fontsource/red-hat-text"
// use webpack css loader instead? v

// Links to include in the header. Left empty in case we want to easily add some later.
// Stylesheets are now bundled correctly, so we don't need to include them here.
export function links() {
  return []
}

export function meta(){
  return [{ title: "GBH Open Vault" }]
}

// const serverUrl = 'https://elastic.wgbh-mla.org';

export async function loader() {
  // lift these env vars from process.env so they can be injected into window
  return json({
    ENV: {
      AAPB_HOST: process.env.AAPB_HOST || "https://americanarchive.org",
      OV_API_URL: process.env.OV_API_URL || "http://localhost:8000"
    },

  })
}

export default function App() {
  var data = useLoaderData()

  useEffect(() => {
    let lastScrollTop = 0;
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', function() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        mobileMenu.style.top = "-7rem";
      } else {
        mobileMenu.style.top = "0";
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
        <link rel="icon" href="/favicon.ico" />
        {/* <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/satellite-min.css"
    /> */}
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

        <Footer />
      </body>
    </html>
  )
}
