import Link from "next/link";
import { Navbar }  from "@/components/navigation/Navbar";
import { Footer }  from "@/components/navigation/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-sm">
          <p className="num text-6xl font-black text-[var(--color-surface-3)] mb-6">404</p>
          <h1 className="type-h3 text-[var(--color-text)] mb-2">Page not found</h1>
          <p className="type-small text-[var(--color-text-muted)] mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Go home
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-5 py-2.5 border border-[var(--color-border-strong)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors"
            >
              Browse cars
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
