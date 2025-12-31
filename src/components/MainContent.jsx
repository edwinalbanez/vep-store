function MainContent({ className, children, ...props }) {
  return (
    <main
      className={`flex-1 relative w-full overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
    </main>
  );
}

export { MainContent };
