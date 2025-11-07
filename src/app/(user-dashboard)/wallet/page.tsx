"use client"

import { Button } from '@/components/ui/button'
import { BanknoteArrowDown, Eye, EyeOff, Plus } from 'lucide-react'
import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table-advanced'
import { transactionColumns, Transaction } from "./columns"

export default function Wallet() {
     const [hideBallance, setHideBallance] = useState(true)

     // Mock data - replace with API call
     const transactions: Transaction[] = [
          {
               id: "m5gr84i9",
               amount: 316,
               status: "success",
               email: "ken99@example.com",
               description: 'Lorem lorem lorem lorem lorem lorem',
               type: 'Withdraw',
               date: '20/03/2004'
          }
     ]

     const handleDeposit = async () => {
          // TODO: Implement deposit logic
     }

     const handleWithdraw = async () => {
          // TODO: Implement withdraw logic
     }

     return (
          <div className='p-5'>
               {/* Balance Card */}
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

               {/* Transactions Table */}
               <div className='bg-accent w-full p-5 rounded-2xl shadow-2xl border mt-5'>
                    <h1 className='text-2xl font-bold mb-4'>Transaction History</h1>
                    <DataTable
                         columns={transactionColumns}
                         data={transactions}
                         searchKey="email"
                         searchPlaceholder="Filter by email..."
                         pageSize={10}
                    />
               </div>
          </div>
     )
}
