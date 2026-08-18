import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** Legacy enquiry route — offers replaced enquiries. */
export default async function TradeEnquiryRedirectPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/trade/vehicles/${id}/offer`);
}
