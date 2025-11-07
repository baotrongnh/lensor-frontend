"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Editable from "@/components/ui/editable"

// Type definition - easy to sync with API
export type Product = {
     id: string
     imageBefore: string
     imageAfter: string
     title: string
     price: string
}

// Create columns with callbacks for actions
export const createProductColumns = (
     onUpdateTitle: (id: string, newTitle: string) => void,
     onUpdatePrice: (id: string, newPrice: string) => void,
     onEdit: (id: string) => void,
     onDelete: (id: string) => void,
     onHide: (id: string) => void,
     onViewProduct: (id: string) => void
): ColumnDef<Product>[] => [
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
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         ID
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
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
               cell: ({ row }) => {
                    return (
                         <div className="w-25 h-20 relative">
                              <Image
                                   src={row.getValue("imageAfter")}
                                   alt="After"
                                   fill
                                   className="object-cover rounded"
                              />
                         </div>
                    )
               },
          },
          {
               accessorKey: "title",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Title
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <Editable
                         value={row.getValue("title")}
                         onSave={(newValue) => onUpdateTitle(row.original.id, newValue)}
                    />
               ),
          },
          {
               accessorKey: "price",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Price
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <Editable
                         value={row.getValue("price")}
                         onSave={(newValue) => onUpdatePrice(row.original.id, newValue)}
                    />
               ),
          },
          {
               id: "actions",
               enableHiding: false,
               cell: ({ row }) => {
                    const product = row.original

                    return (
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                   </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                   <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(product.id)}
                                   >
                                        Copy product ID
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator />
                                   <DropdownMenuItem onClick={() => onViewProduct(product.id)}>
                                        View product
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onClick={() => onEdit(product.id)}>
                                        Edit
                                   </DropdownMenuItem>
                                   <DropdownMenuItem onClick={() => onHide(product.id)}>
                                        Hide
                                   </DropdownMenuItem>
                                   <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => onDelete(product.id)}
                                   >
                                        Delete
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    )
               },
          },
     ]
