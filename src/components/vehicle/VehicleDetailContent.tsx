import type { Vehicle } from "@/lib/types";
import { getVehicleImageAlt, buildWhatsIncluded } from "@/lib/vehicle-detail";
import {
  getFaultCount,
  formatFaultCount,
  CONDITION_LEDGER_INTRO,
  TRADE_CONDITION_INTRO,
} from "@/lib/condition-ledger";
import { Gallery } from "@/components/vehicle/Gallery";
import { VehicleDetailSection } from "@/components/vehicle/VehicleDetailSection";
import { VehicleSummaryPanel } from "@/components/vehicle/VehicleSummaryPanel";
import { VehicleVideoSection } from "@/components/vehicle/VehicleVideoSection";
import { ConditionLedger } from "@/components/vehicle/ConditionLedger";
import { TradeConditionLedger } from "@/components/trade/TradeConditionLedger";
import { MotHistory } from "@/components/vehicle/MotHistory";
import { DocumentsAndHistory } from "@/components/vehicle/DocumentsAndHistory";
import { RunningCosts } from "@/components/vehicle/RunningCosts";
import { LocationSection } from "@/components/vehicle/LocationSection";
import { VehicleContactSection } from "@/components/vehicle/VehicleContactSection";

export interface VehicleDetailContentProps {
  vehicle: Vehicle;
  /** Hide inline contact section — e.g. trade listings use offer flow */
  hideContactSection?: boolean;
  /** Trade clearance layout — grouped faults, no running costs */
  tradeMode?: boolean;
}

/**
 * Shared vehicle detail layout — gallery + sticky summary + grouped content cards.
 * Section order unchanged per Phase 1 scope.
 */
export function VehicleDetailContent({
  vehicle,
  hideContactSection,
  tradeMode = false,
}: VehicleDetailContentProps) {
  const title         = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const whatsIncluded = buildWhatsIncluded(vehicle);
  const imageAlts     = vehicle.images.map((_, i) => getVehicleImageAlt(vehicle, i));
  const faultCount    = getFaultCount(vehicle.conditionItems);

  return (
    <article className="w-full min-w-0">
      <div className="lg:grid lg:grid-cols-[22rem_minmax(0,1fr)] xl:grid-cols-[24rem_minmax(0,1fr)] lg:gap-8 xl:gap-10 lg:items-start">
        {/* Desktop summary — sticky panel on the left */}
        <aside className="hidden lg:block min-w-0">
          <VehicleSummaryPanel
            sticky
            vehicle={vehicle}
            whatsIncluded={whatsIncluded}
            hideContact={hideContactSection}
          />
        </aside>

        {/* Main column — gallery + detail cards */}
        <div className="min-w-0 space-y-5">
          <Gallery images={vehicle.images} alts={imageAlts} />

          <div className="lg:hidden">
            <VehicleSummaryPanel
              vehicle={vehicle}
              whatsIncluded={whatsIncluded}
              hideContact={hideContactSection}
            />
          </div>

          <div className="space-y-5">
            {vehicle.videoUrl ? (
              <VehicleDetailSection
                id="video"
                title="Walkaround video"
                description="Cold start, declared faults, interior and electrics — where recorded for this vehicle."
              >
                <VehicleVideoSection
                  embedded
                  src={vehicle.videoUrl}
                  posterImage={vehicle.images[0]}
                  posterAlt={vehicle.images[0] ? imageAlts[0] : undefined}
                  title={`${title} walkaround video`}
                />
              </VehicleDetailSection>
            ) : null}

            <VehicleDetailSection
              id="condition"
              title="What's wrong with it"
              description={tradeMode ? TRADE_CONDITION_INTRO : CONDITION_LEDGER_INTRO}
              badge={faultCount > 0 ? formatFaultCount(faultCount) : undefined}
            >
              {tradeMode ? (
                <TradeConditionLedger items={vehicle.conditionItems} />
              ) : (
                <ConditionLedger embedded items={vehicle.conditionItems} />
              )}
            </VehicleDetailSection>

            <VehicleDetailSection id="mot" title="MOT history">
              <MotHistory embedded history={vehicle.motHistory} />
            </VehicleDetailSection>

            <VehicleDetailSection id="documents" title="Service history and paperwork">
              <DocumentsAndHistory embedded vehicle={vehicle} />
            </VehicleDetailSection>

            {!tradeMode ? (
              <VehicleDetailSection id="costs" title="Running costs">
                <RunningCosts
                  embedded
                  costs={vehicle.runningCosts}
                  formerKeepers={vehicle.formerKeepers}
                />
              </VehicleDetailSection>
            ) : null}

            <VehicleDetailSection id="location" title="Where we are">
              <LocationSection embedded />
            </VehicleDetailSection>

            {!hideContactSection ? (
              <div className="lg:hidden">
                <VehicleDetailSection id="contact" title="Contact">
                  <VehicleContactSection embedded />
                </VehicleDetailSection>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
