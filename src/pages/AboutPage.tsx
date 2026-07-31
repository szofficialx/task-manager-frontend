function AboutPage() {
  return (
    <>
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Project
        </p>

        <h1 className="text-3x1 font-bold text-slate-900">
          About
        </h1>
      </header>

      <section className="rounded-2x1 border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-x1 font-semibold text-slate-900">
          React Task Manager
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          This task manager was built with React,
          TypeScript, React Router, Tailwind CSS, and
          Local Storage.
        </p>

        <p className="mt-3 leading-7 text-slate-600">
          It supports creating, editing, deleting,
          searching, filtering, and completing tasks.
        </p>
      </section>
    </>
  );
}

export default AboutPage;