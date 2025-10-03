import { TypographyH2, TypographyMuted } from "@/components/custom/Typography";
import { Separator } from "@/components/ui/separator";

export default function SalesSummaryCard({
  label,
  value,
  showVertical,
  showHorizontal,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4 relative">
      <div className="flex-1">
        <TypographyMuted>{label}</TypographyMuted>
        <TypographyH2>{value}</TypographyH2>
      </div>

      {/* Vertical Separator (Desktop only) */}
      {showVertical && (
        <Separator
          orientation="vertical"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-12 hidden md:block"
        />
      )}

      {/* Horizontal Separator (Mobile only) */}
      {showHorizontal && (
        <Separator orientation="horizontal" className="block md:hidden mt-4" />
      )}
    </div>
  );
}
