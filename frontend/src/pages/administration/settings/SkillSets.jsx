"use client"

import { useState } from "react"
import { Trash2, Plus, Pencil, TriangleAlert } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TypographyH3 } from "@/components/custom/Typography"

export default function SkillSets() {
    const [skills, setSkills] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentSkill, setCurrentSkill] = useState({ label: "", description: "" })
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const handleSave = () => {
        if (editIndex !== null) {
            const updated = [...skills]
            updated[editIndex] = currentSkill
            setSkills(updated)
            setEditIndex(null)
        } else {
            setSkills([...skills, currentSkill])
        }
        setCurrentSkill({ label: "", description: "" })
        setIsDialogOpen(false)
    }

    const handleDelete = () => {
        if (deleteIndex !== null) {
            const updated = [...skills]
            updated.splice(deleteIndex, 1)
            setSkills(updated)
            setDeleteIndex(null)
        }
        setIsDeleteDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <TypographyH3>Skill Sets</TypographyH3>

            <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditIndex(null)}>
                            <Plus /> Create
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <TypographyH3>
                                {editIndex !== null ? "Edit Skill Set" : "Add Skill Set"}
                            </TypographyH3>
                            <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={currentSkill.label}
                                    onChange={(e) => setCurrentSkill({ ...currentSkill, label: e.target.value })}
                                    placeholder="Enter skill label"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={currentSkill.description}
                                    onChange={(e) => setCurrentSkill({ ...currentSkill, description: e.target.value })}
                                    placeholder="Enter skill description"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border bg-background">
                <Table>
                    <TableHeader className="bg-[#FBFCFE]">
                        <TableRow>
                            <TableHead>Label</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills.map((skill, index) => (
                            <TableRow key={index}>
                                <TableCell>{skill.label}</TableCell>
                                <TableCell>{skill.description}</TableCell>
                                <TableCell className="text-right flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setCurrentSkill(skill)
                                            setEditIndex(index)
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setDeleteIndex(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-3">
                                                    <TriangleAlert color="orange" />
                                                    Confirm Deletion
                                                </DialogTitle>
                                            </DialogHeader>
                                            <p>Are you sure you want to delete this skill?</p>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
