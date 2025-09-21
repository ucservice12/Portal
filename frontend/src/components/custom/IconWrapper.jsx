import * as Icons from "lucide-react";
import clsx from "clsx"; // <-- Add this line

export function IconWrapper({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className,
  onClick,
}) {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    return <span className="text-red-500">⚠️ Icon not found</span>;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      onClick={onClick}
      className={clsx("cursor-pointer transition-colors", className)}
    />
  );
}
