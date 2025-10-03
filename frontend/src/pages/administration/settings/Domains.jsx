"use client"

import React, { useState } from "react"
import { Plus, Trash2, Pencil, TriangleAlert } from "lucide-react"
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
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TypographyH3, TypographyH4 } from "@/components/custom/Typography"

export default function Domains() {
    const [domains, setDomains] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [formData, setFormData] = useState({ name: "", description: "" })

    const openCreateDialog = () => {
        setFormData({ name: "", description: "" })
        setSelectedIndex(null)
        setDialogOpen(true)
    }

    const openEditDialog = (index) => {
        setFormData(domains[index])
        setSelectedIndex(index)
        setDialogOpen(true)
    }

    const openDeleteDialog = (index) => {
        setSelectedIndex(index)
        setConfirmDialogOpen(true)
    }

    const handleSave = () => {
        if (formData.name.trim() === "") return

        if (selectedIndex !== null) {
            const updated = [...domains]
            updated[selectedIndex] = formData
            setDomains(updated)
        } else {
            setDomains([...domains, formData])
        }

        setDialogOpen(false)
        setFormData({ name: "", description: "" })
        setSelectedIndex(null)
    }

    const handleDelete = () => {
        const updated = [...domains]
        updated.splice(selectedIndex, 1)
        setDomains(updated)
        setConfirmDialogOpen(false)
        setSelectedIndex(null)
    }

    return (
        <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Domain List</h2>
                <Button onClick={openCreateDialog}>
                    <Plus className="mr-2 w-4 h-4" />
                    Create
                </Button>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg border bg-background">
                <Table>
                    <TableHeader className="bg-[#FBFCFE]">
                        <TableRow>
                            <TableHead>Domain Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {domains.map((domain, index) => (
                            <TableRow key={index}>
                                <TableCell>{domain.name}</TableCell>
                                <TableCell>{domain.description}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => openEditDialog(index)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <TypographyH3>{selectedIndex !== null ? "Edit Domain" : "Add Domain"}</TypographyH3>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Domain Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter domain name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Input
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter description"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirm Dialog */}
            <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <DialogContent>
                    <DialogTitle className="flex items-center gap-3">
                        <TriangleAlert color="orange" />
                        Confirm Deletion
                    </DialogTitle>
                    <p>Are you sure you want to delete this domain?</p>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
