import { Card } from "@/components/ui/card";
import { TypographyH4, TypographyP, TypographyMuted } from "@/components/custom/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const birthdays = [
    { name: "Amol", date: "June 27" },
    { name: "Sneha", date: "July 3" },
    { name: "Ravi", date: "July 9" },
    { name: "Neha", date: "July 15" },
];

export function Birthdays() {
    return (
        <Card>
            <TypographyH4>
                Birthdays This Month
            </TypographyH4>
            <div className="h-56 overflow-y-auto scrollbar-hide">
                {birthdays.map((person, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                    >
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <TypographyP>{person.name}</TypographyP>
                            <TypographyMuted>{person.date}</TypographyMuted>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
