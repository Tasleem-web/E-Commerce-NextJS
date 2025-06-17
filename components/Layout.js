import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <Notify />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

    </div>
  )
}
