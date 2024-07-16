export default function SkeletonLoader({
  count,
  SkeletonComponent,
}: {
  count: number;
  SkeletonComponent: React.ComponentType;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </>
  );
}
