import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/faith/landing-full.png"
          alt="FAITH Protocol"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Invisible clickable area on the top-right Enter Dashboard button inside the image */}
      <Link
        href="/dashboard"
        aria-label="Enter Dashboard"
        className="absolute right-[7.5%] top-[3.7%] z-20 hidden h-[5.5%] w-[16%] rounded-md border border-cyan-100/0 transition hover:border-cyan-100/50 hover:bg-cyan-100/10 md:block"
      />

      {/* Invisible clickable area on the center Enter Dashboard button inside the image */}
      <Link
        href="/dashboard"
        aria-label="Enter Dashboard"
        className="absolute left-[51.5%] top-[43.5%] z-20 hidden h-[4.7%] w-[15%] -translate-x-1/2 rounded-md border border-cyan-100/0 transition hover:border-cyan-100/50 hover:bg-cyan-100/10 md:block"
      />

      {/* Mobile fallback because the full image becomes small on phones */}
      <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center px-5 md:hidden">
        <Link
          href="/dashboard"
          className="w-full max-w-sm rounded-xl border border-cyan-100/50 bg-black/70 px-6 py-4 text-center text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_0_30px_rgba(125,211,252,0.35)] backdrop-blur-md"
        >
          Enter Dashboard
        </Link>
      </div>
    </main>
  );
}
