export default function ConversationItemSkeleton() {
  return (
    <div className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-muted">
      <div className="skeleton skeleton-avatar h-12 w-12 border"></div>{" "}
      <div className="grid flex-1 gap-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="skeleton skeleton-text mb-1 h-4 w-full"></div>{" "}
            <div className="skeleton skeleton-text h-3 w-2/3"></div>{" "}
          </div>
          <div className="skeleton skeleton-text h-3 w-1/3"></div>{" "}
        </div>
        <div className="skeleton skeleton-text h-4 w-full"></div>{" "}
      </div>
    </div>
  );
}
