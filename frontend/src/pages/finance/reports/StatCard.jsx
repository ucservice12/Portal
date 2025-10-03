import { Card } from "@/components/ui/card";
import { TypographyH2 } from "@/components/custom/Typography";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { TypographyMuted } from "@/components/custom/Typography";

export function StatCard({
  label,
  value,
  percentage,
  isPositive = true,
  icon,
}) {
  const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Card className="@container/card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-accent-foreground">{icon}</span>
          <TypographyMuted>{label}</TypographyMuted>
        </div>
        <div className="flex justify-between items-center w-full">
          <TypographyH2>{value}</TypographyH2>
          <div className={`flex gap-1 items-center text-md ${trendColor}`}>
            <TrendIcon size={24} />
            {percentage}%
          </div>
        </div>
      </div>
    </Card>
  );
}
