import Sidebar from '@/components/layout/sidebar/sidebar'
import React from 'react'
import { FaHome, FaLayerGroup, FaMoneyCheckAlt, FaShoppingCart, FaTools, FaUser } from 'react-icons/fa'
import { FaCircleQuestion, FaMessage, FaShop } from 'react-icons/fa6'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     const sidebar = [
          {
               title: 'MAIN MENU',
               subs: [
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
                         label: 'Create Portfolio',
                         icon: <FaLayerGroup />,
                         href: '/portfolio'
                    },
                    {
                         label: 'Message',
                         icon: <FaMessage />,
                         href: '/message'
                    },
               ]
          },
          {
               title: 'MARKETPLACES',
               subs: [
                    {
                         label: 'Marketplace',
                         icon: <FaShop />,
                         href: '/marketplace'
                    },
                    {
                         label: 'Purchased Presets',
                         icon: <FaMoneyCheckAlt />,
                         href: '/purchased-presets'
                    },
                    {
                         label: 'Cart',
                         icon: <FaShoppingCart />,
                         href: '/cart'
                    },
               ]
          },
          {
               title: 'Settings',
               subs: [
                    {
                         label: 'Setting',
                         icon: <FaTools />,
                         href: '/setting'
                    },
                    {
                         label: 'Help',
                         icon: <FaCircleQuestion />,
                         href: '/help'
                    },
               ]
          }
     ]

     return (
          <div className='grid grid-cols-[auto_1fr]'>
               <div>
                    <Sidebar listItems={sidebar} />
               </div>
               <section>
                    {children}
               </section>
          </div>
     )
}
