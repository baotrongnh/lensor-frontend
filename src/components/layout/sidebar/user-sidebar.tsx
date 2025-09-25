'use client'

import { useState } from 'react'
import { FaHome, FaMoneyCheckAlt, FaPhotoVideo, FaTools, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import NavbarLink from './navbar-link'

export default function UserSidebar() {
     const [active, setActive] = useState(0)

     const sidebarItems = [
          {
               label: 'Home',
               icon: <FaHome />,
               href: '/home'
          },
          {
               label: 'Profile',
               icon: <FaUser />,
               href: '/profile'
          },
          {
               label: 'Message',
               icon: <FaMessage />,
               href: '/message'
          },
          {
               label: 'Purchases',
               icon: <FaMoneyCheckAlt />,
               href: '/purchases'
          },
          {
               label: 'Gallery',
               icon: <FaPhotoVideo />,
               href: '/gallery'
          },
          {
               label: 'Setting',
               icon: <FaTools />,
               href: '/setting'
          }
     ]

     return (
          <nav className='border-r-2 h-screen dark:bg-black'>
               <h1>LENSOR</h1>

               <div className='mt-10'>
                    {sidebarItems.map((item, index) =>
                         <NavbarLink
                              key={index}
                              href={item.href}
                              label={item.label}
                              icon={item.icon}
                              isActive={index === active}
                              onClick={() => setActive(index)}
                         />
                    )}
               </div>
          </nav>
     )
}
