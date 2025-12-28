import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-48 bg-zinc-800" />
        <Skeleton className="h-4 w-72 mt-2 bg-zinc-800" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-4">
              <Skeleton className="w-10 h-10 rounded-lg bg-zinc-800 mb-3" />
              <Skeleton className="h-3 w-16 bg-zinc-800" />
              <Skeleton className="h-6 w-24 mt-1 bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Level Progress */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-xl bg-zinc-800" />
              <div>
                <Skeleton className="h-5 w-24 bg-zinc-800" />
                <Skeleton className="h-4 w-32 mt-1 bg-zinc-800" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 bg-zinc-800 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded-full bg-zinc-800" />
        </CardContent>
      </Card>

      {/* Continue Learning */}
      <div>
        <Skeleton className="h-6 w-40 mb-4 bg-zinc-800" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg bg-zinc-800" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-36 bg-zinc-800" />
                    <Skeleton className="h-4 w-24 mt-1 bg-zinc-800" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-2 w-full rounded-full bg-zinc-800" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Challenge */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 bg-zinc-800 rounded" />
            <Skeleton className="h-5 w-32 bg-zinc-800" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-3/4 mt-2 bg-zinc-800" />
          <Skeleton className="h-10 w-28 mt-4 bg-zinc-800 rounded-lg" />
        </CardContent>
      </Card>
    </div>
  )
}
