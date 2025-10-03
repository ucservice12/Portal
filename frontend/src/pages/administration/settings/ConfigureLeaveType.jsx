"use client"

import * as React from "react"
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table"
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

// Initial data
const initialData = [
    { name: "Leave Annual", status: true },
    { name: "Leave Sick", status: true },
    { name: "Time Off", status: true },
]

function ConfigureLeaveType() {
    const [data, setData] = React.useState(initialData)

    // Update status toggle
    const toggleStatus = (index) => {
        const newData = [...data]
        newData[index].status = !newData[index].status
        setData(newData)
    }

    const columns = [
        {
            accessorKey: "name",
            header: "Leave Type",
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const index = row.index
                const isChecked = row.original.status
                return (
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleStatus(index)}
                        />
                        <span className={isChecked ? "text-green-600" : "text-red-600"}>
                            {isChecked ? "Enabled" : "Disabled"}
                        </span>
                    </div>
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
        console.log("Saved Leave Types:", data)
    }

    return (
        <div className="space-y-6">
            <Table className="sm:max-w-[400px]">
                <TableHeader className="bg-[#FBFCFE]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={handleSave}>Save</Button>
        </div>
    )
}

export default ConfigureLeaveType
