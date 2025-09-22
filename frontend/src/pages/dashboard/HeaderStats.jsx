import { Card, CardContent } from "@/components/ui/card";
import { Target, Book, BarChart3, ClipboardList } from "lucide-react";
import { TypographyH2, TypographyH3, TypographyMuted } from "@/components/custom/Typography";

export function HeaderStats() {
    const stats = [
        { label: "Tasks Completed", value: "0/0", icon: <ClipboardList size={22} /> },
        { label: "Goals Completed", value: "0/0", icon: <Target size={22} /> },
        { label: "Ongoing Projects", value: "0/1", icon: <BarChart3 size={22} /> },
        { label: "Course Completed", value: "0/0", icon: <Book size={22} /> },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <div className="flex gap-4">
                        <div className="bg-slate-200 w-11 h-11 p-3 flex justify-center items-center text-accent-foreground rounded-full">{stat.icon}</div>
                        <div className="grid gap-2">
                            <TypographyMuted>{stat?.label}</TypographyMuted>
                            <TypographyH2 className="text-primary">{stat?.value}</TypographyH2>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
