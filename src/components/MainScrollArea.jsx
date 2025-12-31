function MainScrollArea({
  children = "",
  className,
}) {
  return (
    <main
      className={`min-w-0 overflow-y-auto overflow-x-hidden flex-1 p-4 md:p-8 dark:bg-black ${className}`}
    >
      {children}
    </main>
  );
}

export { MainScrollArea };
