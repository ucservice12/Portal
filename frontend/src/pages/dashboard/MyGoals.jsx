import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TypographyH4 } from "@/components/custom/Typography";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

// Sample goals data
const goalsData = [
    { name: "Increase sales by 10%", date: "Q3 2025", status: "In Progress" },
    { name: "Launch new website", date: "2025-08-01", status: "Pending" },
    { name: "Team training program", date: "2025-07-15", status: "Completed" },
    { name: "Reduce churn rate", date: "Q4 2025", status: "In Progress" },
    { name: "Customer feedback survey", date: "2025-07-20", status: "Pending" },
    { name: "Expand to new region", date: "2025-09-01", status: "Pending" },
    { name: "Upgrade internal tools", date: "2025-07-30", status: "Completed" },
];

export function MyGoals() {
    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
                <TypographyH4>My Goals</TypographyH4>
                <Link to="/employee/goals/dashboard">
                    <Button size="sm">View</Button>
                </Link>
            </div>

            <div className="sm:h-64 h-56 scrollbar-hide overflow-y-auto">
                <Table className="border-none">
                    <TableCaption />
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {goalsData.length > 0 ? (
                            goalsData.map((goal, index) => (
                                <TableRow key={index}>
                                    <TableCell className="whitespace-normal break-words">{goal.name}</TableCell>
                                    <TableCell className="whitespace-normal break-words">{goal.date}</TableCell>
                                    <TableCell className="whitespace-normal break-words">
                                        <StatusBadge status={goal.status} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No goals available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {goalsData.length === 0 && (
                <CardContent className="text-sm text-muted-foreground">
                    No data available
                </CardContent>
            )}
        </Card>
    );
}
