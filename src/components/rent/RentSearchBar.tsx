import { Search } from "lucide-react";
import { Container } from "@/components/layout/Container";

interface RentSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function RentSearchBar({ value, onChange }: RentSearchBarProps) {
  return (
    <div className="relative z-30 -mt-14 sm:-mt-16 lg:-mt-[4.5rem]">
      <Container>
        <div className="max-w-xl mx-auto">
          <label htmlFor="rent-search" className="sr-only">
            Search hire vehicles
          </label>
          <div
            className={[
              "relative rounded-[var(--radius-xl)] border border-[var(--color-border)]",
              "bg-white shadow-[var(--shadow-lg)] overflow-hidden",
            ].join(" ")}
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="rent-search"
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search by make or model"
              className={[
                "w-full h-14 pl-11 pr-4 bg-transparent",
                "text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]",
                "text-sm sm:text-base font-medium",
                "border-0 outline-none ring-0",
                "focus:outline-none focus:ring-0",
              ].join(" ")}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
