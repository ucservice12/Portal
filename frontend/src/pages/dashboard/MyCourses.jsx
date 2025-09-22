import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Sample course data
const coursesData = [
    { name: "React Basics", date: "2025-07-01", progress: 40 },
    { name: "Advanced CSS", date: "2025-07-03", progress: 70 },
    { name: "Node.js Mastery", date: "2025-07-04", progress: 90 },
    { name: "TypeScript Essentials", date: "2025-07-05", progress: 60 },
    { name: "UI/UX Fundamentals", date: "2025-07-06", progress: 30 },
    { name: "Data Structures", date: "2025-07-07", progress: 50 },
    { name: "Fullstack Capstone", date: "2025-07-08", progress: 85 },
];

export function MyCourses() {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <TypographyH4>My Courses</TypographyH4>
                <Button size="sm">View</Button>
            </div>

            <div className="sm:h-64 h-56 overflow-y-auto scrollbar-hide">
                <Table className="border-none">
                    <TableCaption />
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Progress</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coursesData.length > 0 ? (
                            coursesData.map((course, index) => (
                                <TableRow key={index}>
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>{course.date}</TableCell>
                                    <TableCell>
                                        <div className="w-10 h-10 rounded-full relative flex items-center justify-center"
                                            style={{
                                                background: `conic-gradient(#4f46e5 ${course.progress * 3.6}deg, #e5e7eb 0deg)`,
                                            }}
                                        >
                                            <span className="text-xs absolute text-center text-foreground font-medium">
                                                {course.progress}%
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No courses available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {coursesData.length === 0 && (
                <CardContent className="text-sm text-muted-foreground">
                    No data available
                </CardContent>
            )}
        </Card>
    );
}
