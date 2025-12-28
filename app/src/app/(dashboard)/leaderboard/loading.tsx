import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function LeaderboardLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-36 bg-zinc-800" />
        <Skeleton className="h-4 w-48 mt-2 bg-zinc-800" />
      </div>

      {/* Top 3 Podium */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="py-8">
          <div className="flex items-end justify-center gap-4">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <Skeleton className="h-16 w-16 rounded-full bg-zinc-800" />
              <Skeleton className="h-4 w-20 mt-2 bg-zinc-800" />
              <Skeleton className="h-3 w-16 mt-1 bg-zinc-800" />
              <div className="mt-2 w-24 h-20 rounded-t-lg bg-zinc-800" />
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mb-4">
              <Skeleton className="h-20 w-20 rounded-full bg-zinc-800" />
              <Skeleton className="h-5 w-24 mt-2 bg-zinc-800" />
              <Skeleton className="h-4 w-20 mt-1 bg-zinc-800" />
              <div className="mt-2 w-28 h-28 rounded-t-lg bg-zinc-800" />
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <Skeleton className="h-14 w-14 rounded-full bg-zinc-800" />
              <Skeleton className="h-4 w-20 mt-2 bg-zinc-800" />
              <Skeleton className="h-3 w-16 mt-1 bg-zinc-800" />
              <div className="mt-2 w-24 h-16 rounded-t-lg bg-zinc-800" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings List */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <Skeleton className="h-5 w-32 bg-zinc-800" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
              <div
                key={rank}
                className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/30"
              >
                <Skeleton className="w-8 h-6 bg-zinc-700" />
                <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 bg-zinc-700" />
                  <Skeleton className="h-3 w-20 mt-1 bg-zinc-700" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 bg-zinc-700" />
                  <Skeleton className="h-3 w-12 mt-1 bg-zinc-700" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
