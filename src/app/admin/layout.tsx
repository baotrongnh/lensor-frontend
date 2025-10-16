import Sidebar from '@/components/layout/sidebar/sidebar'
import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
     const sidebarAdmin = [
          {
               title: 'MANAGEMENT',
               subs: [
                    {
                         label: 'User',
                         icon: <FaUser />,
                         href: '/admin/user'
                    },
                    {
                         label: 'Analyze',
                         icon: <FaUser />,
                         href: '/admin/analyze'
                    },
               ]
          },
     ]

     return (
          <div className='grid grid-cols-[auto_1fr]'>
               <Sidebar listItems={sidebarAdmin} />
               <div className='p-4'>
                    {children}
               </div>
          </div>
     )
}
