export default function ConversationItemSkeleton() {
  return (
    <div className="group flex items-center gap-4 rounded-lg p-4 transition-colors">
      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300"></div>
      <div className="grid flex-1 gap-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-300"></div>
          </div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
