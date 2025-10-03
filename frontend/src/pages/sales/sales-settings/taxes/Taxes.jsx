import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TypographyH3 } from "@/components/custom/Typography"
import AddTaxDialog from "./AddTaxDialog";

export default function Taxes() {
    const [customTaxes, setCustomTaxes] = useState([]);
    const [editingTax, setEditingTax] = useState(null);
    const [showAddTax, setShowAddTax] = useState(false);

    const handleAddOrUpdateTax = (tax) => {
        if (editingTax) {
            // Edit existing tax
            setCustomTaxes((prev) =>
                prev.map((t) => (t.id === editingTax.id ? { ...t, ...tax } : t))
            );
        } else {
            // Add new tax
            setCustomTaxes((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    ...tax,
                },
            ]);
        }

        setEditingTax(null);
        setShowAddTax(false);
    };

    const handleEdit = (tax) => {
        setEditingTax(tax);
        setShowAddTax(true);
    };

    const handleDelete = (id) => {
        setCustomTaxes((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <TypographyH3>Taxes Details</TypographyH3>
                <Button
                    onClick={() => {
                        setEditingTax(null);
                        setShowAddTax(true);
                    }}
                >
                    <Plus />
                    Create Taxes
                </Button>
            </div>

            <div className="rounded-md">
                <Table>
                    <TableCaption />
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Percentage</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            customTaxes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                                        No taxes added.
                                    </TableCell>
                                </TableRow>
                            )
                                : (
                                    customTaxes.map((tax, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="text-center">{tax?.title}</TableCell>
                                            <TableCell className="text-center">{tax?.percentage}</TableCell>
                                            <TableCell className="text-center space-x-3">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(tax)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600"
                                                    onClick={() => handleDelete(tax.id)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                        }
                    </TableBody>
                    <TableFooter />
                </Table>
            </div>

            <AddTaxDialog
                open={showAddTax}
                onClose={() => {
                    setEditingTax(null);
                    setShowAddTax(false);
                }}
                onAdd={handleAddOrUpdateTax}
                defaultValue={editingTax}
                isEdit={!!editingTax}
            />
        </>
    );
}
