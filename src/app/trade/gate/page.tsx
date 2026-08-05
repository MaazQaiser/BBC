import { redirect } from "next/navigation";

/** Legacy route — redirects to business verification. */
export default function TradeGateRedirectPage() {
  redirect("/trade/verify");
}
