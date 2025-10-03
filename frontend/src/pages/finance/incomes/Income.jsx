import CurrentSalesPayment from "@/pages/sales/current-sales/CurrentSalesPayment";
import { TypographyH2 } from "@/components/custom/Typography";

export default function Income() {
  return (
    <>
      <TypographyH2 className="mb-4">Income Details</TypographyH2>
      <CurrentSalesPayment />
    </>
  );
}
