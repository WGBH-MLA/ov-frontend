import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link
} from "@remix-run/react"

import {NavigationBar} from "./classes/navigationBar"
import {Footer, FooterLink} from "./classes/footer"
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

export default function App() {
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
        <ScrollRestoration />
        <Scripts />
        { process.env.NODE_ENV === "development" && <LiveReload />}
        <Footer />
      </body>
    </html>
  )
}
