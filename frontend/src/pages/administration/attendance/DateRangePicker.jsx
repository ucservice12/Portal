"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateRangePicker() {
    const [date, setDate] = React.useState(new Date())

    return (
        <div className="flex md:flex-row flex-col items-center gap-2">
            <Select defaultValue="today">
                <SelectTrigger className="md:w-[180px] w-full">
                    <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
            </Select>
            <Popover>
                <PopoverTrigger asChild className='sm:w-[240px] w-full'>
                    <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    )
}

