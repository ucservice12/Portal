import { useState } from "react"
import { TypographyH4 } from '@/components/custom/Typography'
import { CalendarInput } from '@/components/custom/Calendar'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"

export default function OrganazationDetails() {
    const [attendanceType, setAttendanceType] = useState("")

    return (
        <div className='max-w-5xl'>
            <>
                <TypographyH4>
                    Organization Basic details
                </TypographyH4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3'>
                    <Input type="text" placeholder="organazation Name" />
                    <Input type="text" placeholder="Organazation tagline" />
                </div>
                <div>
                    <Label className='mt-4'>Description</Label>
                    <Textarea
                        placeholder="Organazation description"
                        className='mt-2'
                    />
                </div>
            </>

            <>
                <TypographyH4 className='pt-3 mt-4 border-t border-gray-200'>
                    Contact Details
                </TypographyH4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3'>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>Lattitude</Label>
                        <Input type="text" />
                    </div>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>Longitude</Label>
                        <Input type="text" />
                    </div>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>Contact Number</Label>
                        <Input type="text" />
                    </div>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>City</Label>
                        <Input type="text" />
                    </div>
                    <CalendarInput
                        label="Date of Establishment"
                        placeholder="MM/DD/YYYY"
                    />
                    <div className='grid gap-2'>
                        <Label className='ml-1'>GST Number</Label>
                        <Input type="text" />
                    </div>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>Address</Label>
                        <Textarea />
                    </div>
                </div>
            </>

            <>
                <TypographyH4 className='pt-3 mt-4 border-t border-gray-200'>
                    Attendance Settings
                </TypographyH4>
                <div className="relative sm:w-[400px] w-full mt-3">
                    <Select value={attendanceType} onValueChange={setAttendanceType}>
                        <SelectTrigger className="sm:w-[450px] w-full pr-8">
                            <SelectValue placeholder="Select Attendance Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">Project hours</SelectItem>
                                <SelectItem value="banana">Time in Time out as TimeSheet</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {attendanceType && (
                        <button
                            type="button"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
                            onClick={() => setAttendanceType("")}
                            tabIndex={-1}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </>

            <>
                <TypographyH4 className='pt-3 mt-4 border-t border-gray-200'>
                    Working Hour setting
                </TypographyH4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3'>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>Full Day Hour</Label>
                        <Input type="number" />
                    </div>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>Half Day Hour</Label>
                        <Input type="number" />
                    </div>
                </div>
            </>

            <>
                <TypographyH4 className='pt-3 mt-4 border-t border-gray-200'>
                    Leaves Setting
                </TypographyH4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3'>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>No Of Leaves</Label>
                        <Input type="number" />
                    </div>
                    <div className='grid gap-2'>
                        <Label className='ml-1'>No Of Medical Leaves</Label>
                        <Input type="number" />
                    </div>
                </div>

                <RadioGroup defaultValue="yes" className="flex items-center mt-6">
                    <Label>Allow Past Leaves</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="yes" />
                        <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                    </div>
                </RadioGroup>
            </>

            <div className='flex items-center gap-4 justify-end mt-4 mb-6'>
                <Button size='sm' variant='outline'>
                    Discard
                </Button>
                <Button size='sm'>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}