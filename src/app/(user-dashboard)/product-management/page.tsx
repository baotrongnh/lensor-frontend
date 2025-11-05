"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import DataTable from './data-table'
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/path"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Editable from "@/components/ui/editable"

export type Product = {
     id: string
     imageBefore: string,
     imageAfter: string,
     title: string,
     price: string
}

// EditableCell component for inline editing

export default function ProductManagement() {
     const [data, setData] = useState<Array<Product>>([
          {
               id: 'preset_1sfdwz',
               imageAfter: '/images/default-fallback-image.png',
               imageBefore: '/images/default-fallback-image.png',
               price: '3',
               title: 'Preset for portrait'
          }
     ])

     const handleUpdateTitle = (id: string, newTitle: string) => {
          setData(prev => prev.map(item =>
               item.id === id ? { ...item, title: newTitle } : item
          ))
          console.log(`Updated product ${id} title to: ${newTitle}`)
     }

     const handleUpdatePrice = (id: string, newPrice: string) => {
          setData(prev => prev.map(item =>
               item.id === id ? { ...item, price: newPrice } : item
          ))
          console.log(`Updated product ${id} price to: ${newPrice}`)
     }

     const router = useRouter()

     const columns: ColumnDef<Product>[] = [
          {
               id: "select",
               header: ({ table }) => (
                    <Checkbox
                         checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && "indeterminate")
                         }
                         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                         aria-label="Select all"
                    />
               ),
               cell: ({ row }) => (
                    <Checkbox
                         checked={row.getIsSelected()}
                         onCheckedChange={(value) => row.toggleSelected(!!value)}
                         aria-label="Select row"
                    />
               ),
               enableSorting: false,
               enableHiding: false,
          },
          {
               accessorKey: "id",
               header: "ID",
          },
          {
               accessorKey: "imageBefore",
               header: "Image Before",
               cell: ({ row }) => {
                    return (
                         <div className="w-25 h-20 relative">
                              <Image
                                   src={row.getValue("imageBefore")}
                                   alt="Before"
                                   fill
                                   className="object-cover rounded"
                              />
                         </div>
                    )
               },
          },
          {
               accessorKey: "imageAfter",
               header: "Image After",
          },
          {
               accessorKey: "title",
               header: "Title",
               cell: ({ row }) => (
                    <Editable
                         value={row.getValue("title")}
                         onSave={(newValue) => handleUpdateTitle(row.original.id, newValue)}
                    />
               ),
          },
          {
               accessorKey: "price",
               header: "Price",
               cell: ({ row }) => (
                    <Editable
                         value={row.getValue("price")}
                         onSave={(newValue) => handleUpdatePrice(row.original.id, newValue)}
                    />
               ),
          },
          {
               id: "actions",
               enableHiding: false,
               cell: ({ row }) => {
                    const product = row.original

                    const handleEdit = async (id: string) => {
                         console.log(`Edit ${id}`)
                    }

                    const handleDelete = async (id: string) => {
                         console.log(`Delete ${id}`)
                    }

                    const handleHide = async (id: string) => {
                         console.log(`Hide ${id}`)
                    }

                    return (
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal />
                                   </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                   <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(product.id)}
                                   >
                                        Copy product ID
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator />
                                   <DropdownMenuItem onClick={() => router.push(`${ROUTES.MARKETPLACE}/${product.id}`)}>
                                        View product
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onClick={() => handleEdit(product.id)}>Edit</DropdownMenuItem>
                                   <DropdownMenuItem onClick={() => handleHide(product.id)}>Hide</DropdownMenuItem>
                                   <DropdownMenuItem
                                        variant='destructive'
                                        onClick={() => handleDelete(product.id)}
                                   >
                                        Delete
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    )
               },
          },
     ]

     return (
          <div className="container mx-auto py-10">
               <DataTable columns={columns} data={data} />
          </div>
     )
}


