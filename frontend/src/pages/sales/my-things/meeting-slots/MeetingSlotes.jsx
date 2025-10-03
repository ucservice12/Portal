import AddSlotsDialog from "./AddSlotsDialog";
import { Input } from "@/components/ui/input";
import SlotList from "./SlotList";

export default function MeetingSlotes() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Input type="date" className="w-fit" />
        <AddSlotsDialog />
      </div>
      <SlotList />
    </div>
  );
}
