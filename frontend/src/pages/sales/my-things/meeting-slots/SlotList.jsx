import { useState } from "react";
import { Trash2, Pencil, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddMOMDialog from "./AddMOMDialog";
import EditSlotDialog from "./EditSlotDialog";

const mockSlots = [
  { from: "00:00", to: "00:15" },
  { from: "01:00", to: "01:15" },
  { from: "02:00", to: "02:15" },
  { from: "03:00", to: "03:15" },
];

export default function SlotList() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMOMDialog, setShowMOMDialog] = useState(false);

  const openEdit = (index) => {
    setSelectedIndex(index);
    setShowEditDialog(true);
  };

  const openMOM = (index) => {
    setSelectedIndex(index);
    setShowMOMDialog(true);
  };

  const closeDialogs = () => {
    setSelectedIndex(null);
    setShowEditDialog(false);
    setShowMOMDialog(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {mockSlots.map((slot, index) => (
        <Card key={index} className="border-2 border-primary">
          <div>
            <p className="text-sm font-semibold mb-2">From : {slot.from}</p>
            <div className="flex gap-2 mb-2 flex-wrap">
              <Button variant="secondary" className="bg-gray-400 text-white">
                Add to GCalendar
              </Button>
              <Button variant="secondary" className="bg-red-300 text-white">
                Add to iCalendar
              </Button>
            </div>
            <p className="text-sm font-semibold">To : {slot.to}</p>
          </div>
          {/* Action Buttons */}
          <div className="flex sm:flex-row items-center gap-4 sm:gap-2 self-end">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => openEdit(index)}
            >
              <Pencil />
            </Button>
            <Button
              variant="goast"
              className="bg-green-600 text-white"
              size="icon"
              onClick={() => openMOM(index)}
            >
              <NotebookPen />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 />
            </Button>
          </div>
        </Card>
      ))}

      {/* Dialogs */}
      <EditSlotDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={() => {
          alert("Slot Updated");
          closeDialogs();
        }}
      />

      <AddMOMDialog
        open={showMOMDialog}
        onOpenChange={setShowMOMDialog}
        onSave={() => {
          alert("MOM Saved");
          closeDialogs();
        }}
      />
    </div>
  );
}
