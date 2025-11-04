"use client"

import { Button } from '@/components/ui/button'
import { BanknoteArrowDown, Eye, EyeOff, Plus } from 'lucide-react'
import { useState } from 'react'
import { DataTableDemo, Payment } from "./data-table"

export default function Wallet() {
     const [hideBallance, setHideBallance] = useState(true)

     const handleDeposit = async () => {

     }

     const handleWithdraw = async () => {

     }

     return (
          <div className='p-5'>
               <div className='bg-primary/15 w-full flex items-center justify-between py-8 px-12 rounded-2xl shadow-2xl border'>
                    <div className='flex flex-col gap-2'>
                         <div className='flex items-center gap-2'>
                              <span className='text-5xl font-bold tracking-tight text-balance pb-0.5 select-none w-60'>
                                   ${hideBallance ? '*.***.***' : '5.000.000'}
                              </span>
                              <div className='cursor-pointer' onClick={() => setHideBallance(!hideBallance)}>
                                   {hideBallance ? <EyeOff /> : <Eye />}
                              </div>
                         </div>
                         <span className='select-none'>Current Wallet Ballance</span>
                    </div>

                    <div className='flex gap-3'>
                         <Button onClick={handleDeposit}>
                              <Plus />
                              Deposit
                         </Button>
                         <Button variant='outline' onClick={handleWithdraw}>
                              <BanknoteArrowDown />
                              Withdraw
                         </Button>
                    </div>
               </div>

               <div className='bg-accent w-full p-3 rounded-2xl shadow-2xl border mt-5'>
                    <h1>History Transaction</h1>
                    <DataTableDemo />
               </div>
          </div>
     )
}
