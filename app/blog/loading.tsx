export default function BlogLoading() {
  return (
    <div className="blog-loading-shell pt-32 sm:pt-36">
      <div className="page-shell py-10 sm:py-12">
        <div
          aria-label="Loading blog"
          className="blog-loading-panel overflow-hidden rounded-[1.35rem] border border-[rgb(17_22_17/8%)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
          role="status"
        >
          <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-end">
            <div>
              <div className="blog-loading-shimmer h-9 w-24 rounded-full" />
              <div className="blog-loading-shimmer mt-7 h-5 w-60 rounded-full" />
              <div className="mt-6 space-y-3">
                <div className="blog-loading-shimmer h-14 w-full max-w-[40rem] rounded-[0.65rem]" />
                <div className="blog-loading-shimmer h-14 w-11/12 max-w-[34rem] rounded-[0.65rem]" />
              </div>
              <div className="mt-7 space-y-3">
                <div className="blog-loading-shimmer h-4 w-full max-w-[38rem] rounded-full" />
                <div className="blog-loading-shimmer h-4 w-10/12 max-w-[34rem] rounded-full" />
                <div className="blog-loading-shimmer h-4 w-7/12 max-w-[28rem] rounded-full" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="blog-loading-shimmer min-h-[17rem] rounded-[1rem]" />
              <div className="grid gap-4">
                <div className="blog-loading-shimmer min-h-[8rem] rounded-[1rem]" />
                <div className="blog-loading-shimmer min-h-[8rem] rounded-[1rem]" />
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {["Lawn care", "Seasonal cleanup", "Property notes", "Booking prep"].map((label) => (
              <div
                aria-hidden="true"
                className="blog-loading-shimmer h-11 rounded-full"
                key={label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
