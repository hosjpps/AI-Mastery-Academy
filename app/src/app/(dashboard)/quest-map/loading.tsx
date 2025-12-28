import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function QuestMapLoading() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-36 bg-zinc-800" />
        <Skeleton className="h-4 w-48 mt-2 bg-zinc-800" />
      </div>

      {/* Track Skeletons */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-xl bg-zinc-800" />
                  <div>
                    <Skeleton className="h-5 w-32 bg-zinc-800" />
                    <Skeleton className="h-4 w-24 mt-1 bg-zinc-800" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="hidden sm:block w-32 h-2 bg-zinc-800 rounded-full" />
                  <Skeleton className="h-6 w-12 bg-zinc-800 rounded-full" />
                  <Skeleton className="h-5 w-5 bg-zinc-800 rounded" />
                </div>
              </div>
            </CardHeader>
            {i === 1 && (
              <CardContent className="pt-0 space-y-6">
                {/* Subtrack skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 bg-zinc-800 rounded" />
                      <Skeleton className="h-5 w-28 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-4 w-8 bg-zinc-800" />
                  </div>

                  {/* Quest skeletons */}
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-4 p-3 rounded-lg">
                          <Skeleton className="w-8 h-8 rounded-full bg-zinc-800" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-48 bg-zinc-800" />
                            <Skeleton className="h-4 w-64 mt-1 bg-zinc-800" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-16 bg-zinc-800 rounded-full" />
                            <Skeleton className="h-6 w-16 bg-zinc-800 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
