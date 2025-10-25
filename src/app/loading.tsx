export default function Loading() {
  // Un simple spinner centré
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-neutral-900 dark:border-white"></div>
    </div>
  );
}
