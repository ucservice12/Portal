import React, { useState } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Plus, Trash } from "lucide-react"
import { TypographyH3, TypographyH4 } from "@/components/custom/Typography"
import { CalendarInput } from '@/components/custom/Calendar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Holiday() {
    const [holidayData, setHolidayData] = useState([
        {
            year: 2000,
            startDate: "2000-02-12",
            endDate: "2000-10-12",
            occasions: [
                { occasion: "Holiday", date: "2000-10-12" },
                { occasion: "Festival", date: "2000-05-20" },
            ],
        },
        {
            year: 2001,
            startDate: "2001-03-01",
            endDate: "2001-11-15",
            occasions: [{ occasion: "Festival", date: "2001-08-22" }],
        },
    ])

    const [dialogOpen, setDialogOpen] = useState(false)
    const [formData, setFormData] = useState({ year: "", startDate: "", endDate: "" })
    const [selectedYear, setSelectedYear] = useState(null)
    const [editIndex, setEditIndex] = useState(null)

    const [occasionDialog, setOccasionDialog] = useState(false)
    const [occasionForm, setOccasionForm] = useState({ occasion: "", date: "" })
    const [editOccasionIndex, setEditOccasionIndex] = useState(null)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleOccasionChange = (e) => {
        setOccasionForm({ ...occasionForm, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        const newEntry = {
            year: parseInt(formData.year),
            startDate: formData.startDate,
            endDate: formData.endDate,
            occasions: [],
        }

        if (editIndex !== null) {
            const updated = [...holidayData]
            updated[editIndex] = { ...updated[editIndex], ...newEntry }
            setHolidayData(updated)
        } else {
            setHolidayData([...holidayData, newEntry])
        }

        setFormData({ year: "", startDate: "", endDate: "" })
        setEditIndex(null)
        setDialogOpen(false)
    }

    const handleEdit = (index) => {
        const data = holidayData[index]
        setFormData({
            year: data.year,
            startDate: data.startDate,
            endDate: data.endDate,
        })
        setEditIndex(index)
        setDialogOpen(true)
    }

    const handleDelete = (index) => {
        const updated = holidayData.filter((_, i) => i !== index)
        setHolidayData(updated)
        setSelectedYear(null)
    }

    const handleAddOccasion = () => {
        const updated = holidayData.map((h) => {
            if (h.year === selectedYear) {
                const newOccasion = { ...occasionForm }
                const newOccasions = [...h.occasions]
                if (editOccasionIndex !== null) {
                    newOccasions[editOccasionIndex] = newOccasion
                } else {
                    newOccasions.push(newOccasion)
                }
                return { ...h, occasions: newOccasions }
            }
            return h
        })
        setHolidayData(updated)
        setOccasionForm({ occasion: "", date: "" })
        setEditOccasionIndex(null)
        setOccasionDialog(false)
    }

    const handleEditOccasion = (index) => {
        const data = holidayData.find((h) => h.year === selectedYear)
        setOccasionForm(data.occasions[index])
        setEditOccasionIndex(index)
        setOccasionDialog(true)
    }

    const handleDeleteOccasion = (index) => {
        const updated = holidayData.map((h) => {
            if (h.year === selectedYear) {
                const newOccasions = h.occasions.filter((_, i) => i !== index)
                return { ...h, occasions: newOccasions }
            }
            return h
        })
        setHolidayData(updated)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="flex justify-end w-full">
                            <Button
                                onClick={() => {
                                    setFormData({ year: "", startDate: "", endDate: "" })
                                    setEditIndex(null)
                                }}
                            >
                                <Plus />
                                Add Year
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <TypographyH3>{editIndex !== null ? "Edit Holiday Year" : "Add Holiday Year"}</TypographyH3>
                            <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="text"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                    placeholder="Year"
                                />
                            </div>
                            <div className="flex justify-between gap-4">
                                <CalendarInput
                                    label="Start Date"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                />
                                <CalendarInput
                                    label="End Date"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Responsive Table */}
            <div className="w-full overflow-x-auto rounded-lg border bg-background">
                <Table>
                    <TableHeader className="bg-[#FBFCFE]">
                        <TableRow>
                            <TableHead className="text-center">Year</TableHead>
                            <TableHead className="text-center">Start Date</TableHead>
                            <TableHead className="text-center">End Date</TableHead>
                            <TableHead className="text-center">Occasions</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {holidayData.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium text-center">{row.year}</TableCell>
                                <TableCell className="text-center">{row.startDate}</TableCell>
                                <TableCell className="text-center">{row.endDate}</TableCell>
                                <TableCell className="text-center">{row.occasions.length}</TableCell>
                                <TableCell className="space-x-2 text-center">
                                    <Button size="sm" variant="outline" onClick={() => setSelectedYear(row.year)}>
                                        View
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(idx)}>
                                        <Pencil />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Occasions Table */}
            {selectedYear && (
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <TypographyH4>Occasions in {selectedYear}</TypographyH4>
                        <Dialog open={occasionDialog} onOpenChange={setOccasionDialog}>
                            <DialogTrigger asChild>
                                <Button onClick={() => {
                                    setOccasionForm({ occasion: "", date: "" })
                                    setEditOccasionIndex(null)
                                }}>
                                    <Plus />
                                    Add Occasion
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <TypographyH3>{editOccasionIndex !== null ? "Edit Occasion" : "Add Occasion"}</TypographyH3>
                                    <DialogTitle></DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="occasion">Occasion</Label>
                                        <Input
                                            id="occasion"
                                            name="occasion"
                                            value={occasionForm.occasion}
                                            onChange={handleOccasionChange}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <CalendarInput
                                        label="Date of Birth"
                                        value={occasionForm.date}
                                        onChange={handleOccasionChange}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button variant="destructive" onClick={() => setOccasionDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddOccasion}>Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="w-full overflow-x-auto rounded-lg border bg-background mt-2">
                        <Table>
                            <TableHeader className="bg-[#FBFCFE]">
                                <TableRow>
                                    <TableHead className="text-center">Occasion</TableHead>
                                    <TableHead className="text-center">Date</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {holidayData.find((y) => y.year === selectedYear)?.occasions.map((occ, i) => (
                                    <TableRow key={i} className="text-center">
                                        <TableCell>{occ.occasion}</TableCell>
                                        <TableCell>{occ.date}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Button size="sm" variant="outline" onClick={() => handleEditOccasion(i)}>
                                                <Pencil />
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDeleteOccasion(i)}>
                                                <Trash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}