import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TypographyH4 } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Branding() {
    const [primaryColor, setPrimaryColor] = useState("#000000");
    const [secondaryColor, setSecondaryColor] = useState("#ffffff");
    const [smallLogo, setSmallLogo] = useState(null);
    const [bigLogo, setBigLogo] = useState(null);

    const onDropSmall = useCallback((acceptedFiles) => {
        setSmallLogo(acceptedFiles[0]);
    }, []);

    const onDropBig = useCallback((acceptedFiles) => {
        setBigLogo(acceptedFiles[0]);
    }, []);

    const {
        getRootProps: getRootSmall,
        getInputProps: getInputSmall,
        isDragActive: isSmallActive,
    } = useDropzone({ onDrop: onDropSmall, accept: { "image/*": [] } });

    const {
        getRootProps: getRootBig,
        getInputProps: getInputBig,
        isDragActive: isBigActive,
    } = useDropzone({ onDrop: onDropBig, accept: { "image/*": [] } });

    const handleSave = () => {
        console.log("Primary Color:", primaryColor);
        console.log("Secondary Color:", secondaryColor);
        console.log("Small Logo:", smallLogo);
        console.log("Big Logo:", bigLogo);
        // TODO: Upload to backend
    };

    const handleDiscard = () => {
        setPrimaryColor("#000000");
        setSecondaryColor("#ffffff");
        setSmallLogo(null);
        setBigLogo(null);
    };

    return (
        <div className="max-w-3xl">
            <TypographyH4>Branding Details</TypographyH4>

            {/* Color Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="grid gap-2">
                    <Label>Primary Color</Label>
                    <Input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-12 p-1 border rounded-md"
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Secondary Color</Label>
                    <Input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="h-12 p-1 border rounded-md"
                    />
                </div>
            </div>

            {/* Logo Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="grid gap-2">
                    <Label>Small Logo</Label>
                    <div
                        {...getRootSmall()}
                        className={cn(
                            "flex items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer transition-all",
                            isSmallActive ? "bg-muted/40 border-primary" : "bg-muted/20"
                        )}
                    >
                        <input {...getInputSmall()} />
                        {smallLogo ? (
                            <p className="text-sm">{smallLogo.name}</p>
                        ) : (
                            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Big Logo</Label>
                    <div
                        {...getRootBig()}
                        className={cn(
                            "flex items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer transition-all",
                            isBigActive ? "bg-muted/40 border-primary" : "bg-muted/20"
                        )}
                    >
                        <input {...getInputBig()} />
                        {bigLogo ? (
                            <p className="text-sm">{bigLogo.name}</p>
                        ) : (
                            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
                <Button variant="outline" size="sm" onClick={handleDiscard}>
                    Discard
                </Button>
                <Button size="sm" onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
