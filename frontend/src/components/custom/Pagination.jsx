import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Reusable Pagination component
export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center my-4">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ArrowLeft /> Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            size="sm"
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
