import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600"> 
        Error 404
      </p>

      <h1 className="mt-3 text-3x1 font-bold text-slate-900">
        Page not found
      </h1>

      <p className="mt-3 text-slate-600">
        The page you requested does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-x1 bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
      >
        Return home
      </Link>
    </section>
  );
}

export default NotFoundPage;