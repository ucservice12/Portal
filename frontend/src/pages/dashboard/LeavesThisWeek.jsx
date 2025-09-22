import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { TypographyH4 } from '@/components/custom/Typography'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

// Sample data
const leavesData = [
    { name: 'Amol', date: '2025-07-03', status: 'Approved' },
    { name: 'Sneha', date: '2025-07-04', status: 'Pending' },
    { name: 'Ravi', date: '2025-07-05', status: 'Rejected' },
    { name: 'Neha', date: '2025-07-06', status: 'Approved' },
    { name: 'Kiran', date: '2025-07-07', status: 'Pending' },
]

export function LeavesThisWeek() {
    return (
        <Card>
            <TypographyH4>Leaves This Week</TypographyH4>

            <div className="sm:h-64 h-56 overflow-y-auto scrollbar-hide">
                <Table className="border-none">
                    <TableCaption />
                    <TableHeader>
                        <TableRow>
                            <TableHead>Person</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leavesData.length > 0 ? (
                            leavesData.map((leave, index) => (
                                <TableRow key={index}>
                                    <TableCell>{leave.name}</TableCell>
                                    <TableCell>{leave.date}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={leave?.status} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No leaves this week.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}
