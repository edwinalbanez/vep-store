function AppContent({
  className,
  children,
  ...props
}) {
  return (
    <div
      className={`flex flex-col flex-1 overflow-hidden bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { AppContent };
