import { ConditionLedgerFault } from "@/components/vehicle/ConditionLedger";
import type { ConditionItem } from "@/lib/types";
import {
  getFaultCount,
  formatFaultCount,
  groupTradeConditionItems,
  TRADE_CONDITION_CLOSING,
  CONDITION_LEDGER_EMPTY,
} from "@/lib/condition-ledger";

interface TradeConditionLedgerProps {
  items: ConditionItem[];
}

export function TradeConditionLedger({ items }: TradeConditionLedgerProps) {
  const count = getFaultCount(items);
  const groups = groupTradeConditionItems(items);

  if (count === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
        {CONDITION_LEDGER_EMPTY}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text)] mb-4">
            {group.label}
            <span className="num font-medium text-[var(--color-text-muted)] ml-2">
              {formatFaultCount(group.items.length)}
            </span>
          </h3>
          <ol className="space-y-8 sm:space-y-10 list-none m-0 p-0">
            {group.items.map((item) => (
              <ConditionLedgerFault key={item.id} item={item} />
            ))}
          </ol>
        </div>
      ))}

      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed pt-4 border-t border-[var(--color-border)]">
        {TRADE_CONDITION_CLOSING}
      </p>
    </div>
  );
}
