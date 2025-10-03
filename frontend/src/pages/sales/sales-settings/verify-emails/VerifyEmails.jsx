// components/pages/VerifyEmails.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { useState } from "react"
import { TypographyH3 } from "@/components/custom/Typography"
import SendEmailDialog from "./SendEmailDialog"

const dummyUsers = [
    { name: "Alice", email: "alice@example.com", isVerified: false },
    { name: "Bob", email: "bob@example.com", isVerified: true },
    { name: "Charlie", email: "charlie@example.com", isVerified: false },
]

export default function VerifyEmails() {
    const [users, setUsers] = useState(dummyUsers)
    const [selectedEmail, setSelectedEmail] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleVerifyClick = (email) => {
        setSelectedEmail(email)
        setDialogOpen(true)

        // Simulate marking verified after 2.5s
        setTimeout(() => {
            setUsers((prev) =>
                prev.map((user) =>
                    user.email === email ? { ...user, isVerified: true } : user
                )
            )
        }, 2500)
    }

    return (
        <>
            <TypographyH3>Verify Emails</TypographyH3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Is Verified</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-center">
                                <StatusBadge status={user.isVerified ? "Yes" : "No"} />
                            </TableCell>
                            <TableCell className="text-center">
                                {!user.isVerified && (
                                    <Button size="sm" onClick={() => handleVerifyClick(user.email)}>
                                        Verify
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <SendEmailDialog
                open={dialogOpen}
                email="user@example.com"
                onClose={() => setDialogOpen(false)}
                onSuccess={() => console.log("Marked as verified")}
                title="Send Email Verification"
            />
        </>
    )
}
