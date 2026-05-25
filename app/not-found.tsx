import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-bold text-mba-red">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">
        Page Not Found
      </h1>
      <p className="mt-2 text-mba-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-mba-red px-6 py-3 font-semibold text-white hover:bg-mba-red/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
