import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <Notify />
      <Modal />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

    </div>
  )
}
