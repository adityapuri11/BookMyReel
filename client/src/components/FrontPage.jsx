import React from 'react'
import { assets } from '../assets/assets'
import {CalendarIcon, ClockIcon, ArrowRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const HeroSection = () => {

    const navigate = useNavigate() 
    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 
           bg-[url("/frontpage.jpg")] bg-cover bg-center h-screen'>

            {/* <img
                src={assets.marvelLogo}
                alt=""
                className="max-h-11 lg:h-11 mt-20"
            /> */}

            <h1 className='text-5xl md:text-[50px] md:leading-18 font-semibold max-w-110'>
               
                I Know What You Did Last Summer
            </h1>

            <div className='flex items-center gap-4 text-gray-300'>
                <span>Horror |Mystery |Thriller</span>
                
                <div className='flex items-center gap-1'>
                    <CalendarIcon className='w-4.5 h-4.5' />
                    2025
                </div>

                <div className='flex items-center gap-1'>
                    <ClockIcon className='w-4.5 h-4.5' />
                    1h 51m
                </div>

            </div>

            <p className='max-w-md text-gray-300'>
                When five friends inadvertently cause a deadly car accident, they cover up their involvement and make a pact to keep it a secret rather than face the consequences. A year later, their past comes back to haunt them and they're forced to confront a horrifying truth: someone knows what they did last summer... and is hell-bent on revenge. As one by one the friends are stalked by a killer, they discover this has happened before, and they turn to two survivors of the legendary Southport Massacre of 1997 for help.
            </p>

            <button  onClick={ ()=> navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull 
            transition rounded-full font-medium cursor-pointer'>
                Explore Movies
                <ArrowRight className="w-5 h-5" />
            </button>

        </div>
    )
}

export default HeroSection
