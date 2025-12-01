import { Skeleton } from "@/components/ui/skeleton"

const ProfileSkeleton = () => (
  <div className="bg-gray-50 min-h-screen">
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center gap-8">
        
        <div className="flex w-full gap-6 items-center flex-wrap">
          <Skeleton className="w-32 h-32 rounded-full" />

          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />

            <div className="flex gap-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        {/* Posts Skeleton */}
        <div className="w-full flex flex-col gap-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>

      </div>
    </main>
  </div>
)

export default ProfileSkeleton