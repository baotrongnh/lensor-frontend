"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

// Type definition - easy to sync with API
export type StatisticData = {
     date: string
     desktop: number
     mobile: number
     total: number
     growth: string
}

// Column definitions - easy to customize
export const statisticsColumns: ColumnDef<StatisticData>[] = [
     {
          accessorKey: "date",
          header: ({ column }) => (
               <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => {
               const date = new Date(row.getValue("date"))
               return (
                    <div className="font-medium">
                         {date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                         })}
                    </div>
               )
          },
     },
     {
          accessorKey: "desktop",
          header: ({ column }) => (
               <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    Desktop
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => (
               <div className="text-center font-medium">
                    {row.getValue("desktop")}
               </div>
          ),
     },
     {
          accessorKey: "mobile",
          header: ({ column }) => (
               <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    Mobile
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => (
               <div className="text-center font-medium">
                    {row.getValue("mobile")}
               </div>
          ),
     },
     {
          accessorKey: "total",
          header: ({ column }) => (
               <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    Total Views
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => (
               <div className="text-center font-bold">
                    {row.getValue("total")}
               </div>
          ),
     },
     {
          accessorKey: "growth",
          header: "Growth",
          cell: ({ row }) => {
               const growth = row.getValue("growth") as string
               const isPositive = growth.startsWith("+")
               return (
                    <div
                         className={`text-center font-medium ${isPositive ? "text-green-600" : "text-red-600"
                              }`}
                    >
                         {growth}
                    </div>
               )
          },
     },
]
