import NavBar from '@/components/NavBar'
import React from 'react'
import Hero from './components/Hero'
import Footer from '../components/Footer'

export default function Inventory() {
    return (
        <>
            <NavBar change={true} />
            <Hero />
            <Footer />
        </>
    )
}
