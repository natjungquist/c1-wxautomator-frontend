// Author: Natalie Jungquist
//
// This component serves as the shared layout for the application, including:
// - A navigation bar (`NavBar`) at the top of the page
// - A main content area where dynamic content is rendered via `children`
// - A footer (`Footer`) at the bottom of the page
// The layout is used to wrap common components and maintain a consistent page structure across the app.

import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

function SharedLayout ({ children }) {
  return (
    <div>
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default SharedLayout
