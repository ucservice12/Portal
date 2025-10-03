import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeaveManageTable() {
  const leaveTypes = [
    { type: "Annual Leaves", allocated: 10, taken: 1, remaining: 9 },
    { type: "Medical Leaves", allocated: 5, taken: 1, remaining: 4 },
    { type: "C-OFF Leaves", allocated: 3, taken: 0, remaining: 3 },
    { type: "Unpaid Leaves", allocated: "-", taken: 0, remaining: "-" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Leave Type</TableHead>
          <TableHead>Allocated</TableHead>
          <TableHead>Taken</TableHead>
          <TableHead>Remaining</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveTypes.map((leave, idx) => (
          <TableRow key={idx}>
            <TableCell>{leave.type}</TableCell>
            <TableCell>{leave.allocated}</TableCell>
            <TableCell>{leave.taken}</TableCell>
            <TableCell>{leave.remaining}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
