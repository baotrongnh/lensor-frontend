import Link from 'next/link'
import React from 'react'

interface NavbarLinkProps {
     label: string,
     icon: React.ReactNode,
     href: string,
     isActive: boolean,
     onClick: () => void
}

export default function NavbarLink({ label, icon, href, isActive, onClick }: NavbarLinkProps) {
     return (
          <Link
               href={href}
               className={
                    `flex items-center gap-3 py-3 pl-5 hover:opacity-80 hover:bg-gradient-to-r from-neutral-700 to-40% duration-200 ${isActive && 'bg-gradient-to-r from-neutral-700 to-40% duration-200 font-bold'}`
               }
               onClick={onClick}
          >
               {icon}
               <span className='font-light'>{label}</span>
          </Link>
     )
}
