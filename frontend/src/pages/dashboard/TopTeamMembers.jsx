"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TypographyH4 } from "@/components/custom/Typography";
import { useState } from "react";

// Mock team data
const teamData = [
    {
        name: "Abhijeet",
        completion: 0,
        avatar: "/avatars/01.png",
    },
    {
        name: "Sneha",
        completion: 60,
        avatar: "/avatars/02.png",
    },
    {
        name: "Ravi",
        completion: 90,
        avatar: "/avatars/03.png",
    },
];

export function TopTeamMembers() {
    const [filter, setFilter] = useState("tasks");

    return (
        <Card>
            <div className="flex flex-row justify-between items-center">
                <TypographyH4>
                    Top Team Members
                </TypographyH4>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-32 h-8">
                        <SelectValue placeholder="By Tasks" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tasks">By Tasks</SelectItem>
                        <SelectItem value="goals">By Goals</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="h-56 overflow-y-auto scrollbar-hide">
                <Table className="border-none">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/2">Name</TableHead>
                            <TableHead className="text-right">Completion</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamData.map((member, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center gap-2 font-medium">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    {member.name}
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {member.completion}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
