import CurrentSalesPayment from "@/pages/sales/current-sales/CurrentSalesPayment";
import { TypographyH1 } from "@/components/custom/Typography";

export default function Transactions() {
  return (
    <div className="space-y-6">
      <TypographyH1>Transactions</TypographyH1>
      <CurrentSalesPayment />
    </div>
  );
}
