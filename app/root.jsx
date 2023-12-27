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

import { NavigationBar } from "./classes/navigationBar"
import { Footer, FooterLink } from "./classes/footer"
import { renderPageLinks } from "./classes/pageHelpers"

import styles from "~/styles.css"
// use webpack css loader instead? v
import carouselStyles from "~/../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"


export function links() {
  return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: carouselStyles }]
}

export function meta(){
  return [{ title: "GBH Open Vault" }]
}

export async function loader() {
  // lift these env vars from process.env so they can be injected into window
  return json({
    ENV: {
      AAPB_HOST: process.env.AAPB_HOST
    }
  })
}

export default function App() {
  var data = useLoaderData()

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
