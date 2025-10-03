import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/custom/Typography";
import AddProductDialog from "./AddProductDialog";
import { EMPTY_ITEM } from "../../current-sales/invoice/InvoiceItemDialog";

import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductService() {
  const [customItems, setCustomItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // null = create mode
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddOrUpdateProduct = (item) => {
    if (editingItem) {
      // update mode
      setCustomItems((prev) =>
        prev.map((p) => (p.id === editingItem.id ? { ...p, ...item } : p))
      );
    } else {
      // create mode
      setCustomItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...item,
        },
      ]);
    }

    setEditingItem(null);
    setShowAddProduct(false);
  };

  const handleDelete = (id) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddProduct(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <TypographyH3>Products details</TypographyH3>
        <Button
          onClick={() => {
            setEditingItem(null);
            setShowAddProduct(true);
          }}
        >
          <Plus />
          Create Product
        </Button>
      </div>

      <Table>
        <TableCaption />
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customItems.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No products added.
              </TableCell>
            </TableRow>
          ) : (
            customItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter />
      </Table>

      <AddProductDialog
        open={showAddProduct}
        onClose={() => {
          setEditingItem(null);
          setShowAddProduct(false);
        }}
        onAdd={handleAddOrUpdateProduct}
        defaultValue={editingItem || EMPTY_ITEM}
        isEdit={!!editingItem}
      />
    </>
  );
}
