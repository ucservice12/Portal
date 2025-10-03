import React, { useState } from "react"
import { Trash2, Plus } from "lucide-react"
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
import { TypographyH3, TypographyH4 } from "@/components/custom/Typography"

export default function DocumentList() {
    const [documents, setDocuments] = useState([
        { id: 1, label: "Adhar Card" },
        { id: 2, label: "Pan Card" },
        { id: 3, label: "Bank Passbook" },
        { id: 4, label: "Adhar Card" },
    ])

    const [newLabel, setNewLabel] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDelete = (id) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    }

    const handleAdd = () => {
        if (newLabel.trim() === "") return
        const newDoc = { id: Date.now(), label: newLabel.trim() }
        setDocuments((prev) => [...prev, newDoc])
        setNewLabel("")
        setDialogOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <TypographyH4>Document List</TypographyH4>

                {/* Dialog Trigger */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus />
                            Create
                        </Button>
                    </DialogTrigger>

                    {/* Dialog Content */}
                    <DialogContent className="max-w-[80%]">
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                            <TypographyH3>Add Documents</TypographyH3>
                            <Input
                                placeholder="Enter document label"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                            />
                        </div>

                        <DialogFooter className="mt-6">
                            <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAdd}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Document Table */}
            <Table>
                <TableHeader className="bg-[#FBFCFE]">
                    <TableRow>
                        <TableHead>Sr.No.</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc, index) => (
                        <TableRow key={doc.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{doc.label}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(doc.id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
