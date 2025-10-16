import Sidebar from '@/components/layout/sidebar/sidebar'
import { ROUTES } from '@/constants/path'
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
                         href: ROUTES.FORUM
                    },
                    {
                         label: 'Profile',
                         icon: <FaUser />,
                         href: ROUTES.PROFILE('36')
                    },
                    {
                         label: 'Create Portfolio',
                         icon: <FaLayerGroup />,
                         href: ROUTES.PORTFOLIO
                    },
                    {
                         label: 'Message',
                         icon: <FaMessage />,
                         href: ROUTES.MESSAGE
                    },
               ]
          },
          {
               title: 'MARKETPLACES',
               subs: [
                    {
                         label: 'Marketplace',
                         icon: <FaShop />,
                         href: ROUTES.MARTKETPLACE
                    },
                    {
                         label: 'Purchased Presets',
                         icon: <FaMoneyCheckAlt />,
                         href: ROUTES.PURCHASED_PRESET
                    },
                    {
                         label: 'Cart',
                         icon: <FaShoppingCart />,
                         href: ROUTES.CART
                    },
               ]
          },
          {
               title: 'SETTINGS',
               subs: [
                    {
                         label: 'Setting',
                         icon: <FaTools />,
                         href: ROUTES.SETTING
                    },
                    {
                         label: 'Help',
                         icon: <FaCircleQuestion />,
                         href: ROUTES.HELP
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
