import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ChooseCurrency() {
    const [currency, setCurrency] = useState("");

    const handleSave = () => {
        console.log("Selected Currency:", currency);
        // Do something with the selected currency (e.g., save to backend)
    };

    return (
        <div className="flex sm:flex-row flex-col sm:items-center gap-2">
            <Select onValueChange={(value) => setCurrency(value)}>
                <SelectTrigger className="sm:w-[250px] w-full">
                    <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="SGD">SGD</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={handleSave}>Save Changes</Button>
        </div>
    );
}
