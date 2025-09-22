import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TypographyH4 } from "@/components/custom/Typography";
import { Link } from "react-router-dom";

export function MyLeaves() {
    return (
        <Card>
            <TypographyH4>My Leaves</TypographyH4>
            <Table className="border-none">
                <TableHeader>
                    <TableRow>
                        <TableHead>Leave Type</TableHead>
                        <TableHead>Used</TableHead>
                        <TableHead>Remaining</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Annual</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Sick</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>C-off</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Link to="/employee/calendar/leaves">
                <Button className="w-full">
                    Request Leave
                </Button>
            </Link>
        </Card>
    );
}
