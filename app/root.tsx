import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useEffect } from 'react'
import { ToastContainer, toast, Flip } from 'react-toastify'

import { HomeMeta } from '~/classes/meta'
import { NavigationBar } from '~/classes/navigationBar'
import { Footer } from '~/classes/footer'

import 'react-toastify/dist/ReactToastify.css'
import '~/styles/styles.css'
import '~/styles/colors.css'
import '@fontsource/red-hat-display'
import '@fontsource/red-hat-text'

// Links to include in the header. Left empty in case we want to easily add some later.
// Stylesheets are now bundled correctly, so we don't need to include them here.
export function links() {
  return [{ rel: 'icon', href: '/favicon.ico', type: 'image/png' }]
}

export const meta: MetaFunction = () => [
  { title: `GBH Open Vault` },
  {
    name: 'description',
    content: `Explore scholar exhibits and collections from the GBH Archives.`,
  },
  ...HomeMeta,
]

export async function loader() {
  // lift these env vars from process.env so they can be injected into window
  return {
    ENV: {
      AAPB_HOST: process.env.AAPB_HOST || 'https://americanarchive.org',
      OV_API_URL: process.env.OV_API_URL || 'http://localhost:8000',
      ORGAN_URL: process.env.ORGAN_URL || 'http://localhost:9000',
    },
  }
}

export default function App() {
  var data = useLoaderData()
  // if (import.meta.env.LEGACY) {
  //   console.log('legacy browser detected')
  // }

  useEffect(() => {
    let lastScrollTop = 0
    const mobileMenu = document.getElementById('mobile-menu')

    window.addEventListener('scroll', function () {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        mobileMenu.style.top = '-7rem'
      } else {
        mobileMenu.style.top = '0'
      }
      lastScrollTop = scrollTop
    })
  }, []) // Empty array means this effect runs once on component mount
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />

        {
          <script src='https://www.googletagmanager.com/gtag/js?id=G-H82X285XCF'></script>
        }
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H82X285XCF');`,
          }}
        />
      </head>
      <body>
        {meta.env && meta.env.LEGACY ? (
          <div className='legacy-warning'>
            <h3>You are using an outdated browser.</h3>
            <p>
              Please upgrade to a modern browser to view all the features of
              this site.
            </p>
            {/* TODO: Make this dismissable */}
          </div>
        ) : null}
        <ToastContainer />
        <NavigationBar />
        <Outlet />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Footer />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.log('error', error)
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <title>Oh no!</title>
      </head>
      <body>
        <NavigationBar />
        <div className='page-body-container'>
          {isRouteErrorResponse(error) ? (
            <>
              <h1>{error.status} error</h1>
              <h3>{error.data}</h3>
              <p>{error.statusText}</p>
            </>
          ) : (
            <div className='error-container'>
              <h1>Oh no!</h1>
              <p>Oops! Something went wrong. Please try again later.</p>
            </div>
          )}
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
