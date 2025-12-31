const Admin = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6 h-48 shadow-sm">
          {/* <Test/> */}
          <div className="w-full h-full bg-gradient-to-br from-gray-50 dark:from-zinc-800 to-gray-100 dark:to-black rounded-lg"></div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6 h-48 shadow-sm">
          {/* <DemoDropdown   /> */}
          <div className="w-full h-full bg-gradient-to-br from-gray-50 dark:from-zinc-800 to-gray-100 dark:to-black rounded-lg"></div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6 h-48 shadow-sm">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 dark:from-zinc-800 to-gray-100 dark:to-black rounded-lg"></div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800  rounded-lg border border-gray-200 dark:border-zinc-700 p-6 shadow-sm">
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gray-50 dark:from-zinc-800 to-gray-100 dark:to-black rounded-lg"></div>
      </div>
    </>
  );
}

export { Admin }