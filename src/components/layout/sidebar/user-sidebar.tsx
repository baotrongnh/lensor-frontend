'use client'

import { useState } from 'react'
import { FaHome, FaMoneyCheckAlt, FaPhotoVideo, FaTools, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import NavbarLink from './navbar-link'
import { Divider } from '@mantine/core'

export default function UserSidebar() {
     const [active, setActive] = useState(0)

     const sidebarItems = [
          {
               label: 'Forum',
               icon: <FaHome />,
               href: '/forum'
          },
          {
               label: 'Profile',
               icon: <FaUser />,
               href: '/profile/36'
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
          <nav className='h-screen bg-black text-white-custom sticky top-0'>
               <h1 className='py-8'>LENSOR</h1>
               <Divider /> 
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
