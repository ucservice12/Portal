"use client"

import * as React from "react"
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table"
import { TypographyH3 } from "@/components/custom/Typography"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const defaultDays = [
    { day: "Monday", active: true },
    { day: "Tuesday", active: true },
    { day: "Wednesday", active: true },
    { day: "Thursday", active: true },
    { day: "Friday", active: true },
    { day: "Saturday", active: true },
    { day: "Sunday", active: false },
]

export default function BussinessDay() {
    const [data, setData] = React.useState(defaultDays)

    const toggleActive = (index) => {
        const updated = [...data]
        updated[index].active = !updated[index].active
        setData(updated)
    }

    const columns = [
        {
            accessorKey: "day",
            header: "Day",
            cell: ({ row }) => <div>{row.getValue("day")}</div>,
        },
        {
            accessorKey: "active",
            header: "Action",
            cell: ({ row }) => {
                const index = row.index
                const isChecked = row.original.active

                return (
                    <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleActive(index)}
                        className="border-blue-600 data-[state=checked]:bg-blue-600"
                    />
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleSave = () => {
        console.log("Saved days:", data)
        // You can send this to your backend
    }

    return (
        <div className="w-full max-w-md space-y-4">
            <TypographyH3>Week Off Policy</TypographyH3>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#FBFCFE]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="text-base font-light">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="text-right">
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}
