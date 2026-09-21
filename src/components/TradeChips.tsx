import { Droplets, Zap } from "lucide-react";
import type { Trade } from "@/lib/content";

/** Colour = trade. Amber is electrical, blue is plumbing; services covering both show both chips. */
export default function TradeChips({ trade }: { trade: Trade }) {
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {(trade === "electrical" || trade === "both") && (
        <span className="chip chip-electrical">
          <Zap size={14} aria-hidden="true" />
          Electrical
        </span>
      )}
      {(trade === "plumbing" || trade === "both") && (
        <span className="chip chip-plumbing">
          <Droplets size={14} aria-hidden="true" />
          Plumbing
        </span>
      )}
    </span>
  );
}
