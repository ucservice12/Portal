import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const occasions = [
  {
    srNo: 1,
    occasion: "Birthday",
    date: "2025-06-10",
  },
  {
    srNo: 2,
    occasion: "Wedding",
    date: "2025-06-11",
  },
  {
    srNo: 3,
    occasion: "Anniversary",
    date: "2025-06-12",
  },
  {
    srNo: 4,
    occasion: "Festival",
    date: "2025-06-13",
  },
  {
    srNo: 5,
    occasion: "Baby Shower",
    date: "2025-06-14",
  },
  {
    srNo: 6,
    occasion: "Housewarming",
    date: "2025-06-15",
  },
  {
    srNo: 7,
    occasion: "Engagement",
    date: "2025-06-16",
  },
];

export default function Holiday() {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader className="bg-[#FBFCFE]">
        <TableRow>
          <TableHead>SR NO.</TableHead>
          <TableHead>Occasion</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {occasions?.map((occasion) => (
          <TableRow key={occasion.srNo}>
            <TableCell className="font-medium">{occasion?.srNo}</TableCell>
            <TableCell>{occasion?.occasion}</TableCell>
            <TableCell>{occasion?.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
