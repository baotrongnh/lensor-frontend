"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/path"
import { DataTable } from '@/components/ui/data-table-advanced'
import { createProductColumns, Product } from "./columns"

export default function ProductManagement() {
     const router = useRouter()

     // Mock data - replace with API call
     const [data, setData] = useState<Product[]>([
          {
               id: 'preset_1sfdwz',
               imageAfter: '/images/default-fallback-image.png',
               imageBefore: '/images/default-fallback-image.png',
               price: '3',
               title: 'Preset for portrait'
          }
     ])

     // Action handlers - easy to connect to API
     const handleUpdateTitle = (id: string, newTitle: string) => {
          setData(prev => prev.map(item =>
               item.id === id ? { ...item, title: newTitle } : item
          ))
          console.log(`Updated product ${id} title to: ${newTitle}`)
          // TODO: Call API to update title
     }

     const handleUpdatePrice = (id: string, newPrice: string) => {
          setData(prev => prev.map(item =>
               item.id === id ? { ...item, price: newPrice } : item
          ))
          console.log(`Updated product ${id} price to: ${newPrice}`)
          // TODO: Call API to update price
     }

     const handleEdit = (id: string) => {
          console.log(`Edit ${id}`)
          // TODO: Implement edit logic
     }

     const handleDelete = (id: string) => {
          console.log(`Delete ${id}`)
          // TODO: Call API to delete product
     }

     const handleHide = (id: string) => {
          console.log(`Hide ${id}`)
          // TODO: Call API to hide product
     }

     const handleViewProduct = (id: string) => {
          router.push(`${ROUTES.MARKETPLACE}/${id}`)
     }

     // Create columns with action callbacks
     const columns = createProductColumns(
          handleUpdateTitle,
          handleUpdatePrice,
          handleEdit,
          handleDelete,
          handleHide,
          handleViewProduct
     )

     return (
          <div className="p-5">
               <div className="bg-accent w-full p-5 rounded-2xl shadow-2xl border">
                    <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                    <DataTable
                         columns={columns}
                         data={data}
                         searchKey="title"
                         searchPlaceholder="Filter by product title..."
                         pageSize={10}
                    />
               </div>
          </div>
     )
}


