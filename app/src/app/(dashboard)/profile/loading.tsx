import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Profile Header */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full bg-zinc-800" />

            <div className="flex-1 text-center sm:text-left">
              <Skeleton className="h-7 w-40 mx-auto sm:mx-0 bg-zinc-800" />
              <Skeleton className="h-4 w-24 mt-2 mx-auto sm:mx-0 bg-zinc-800" />
              <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                <Skeleton className="h-6 w-20 rounded-full bg-zinc-800" />
                <Skeleton className="h-6 w-24 rounded-full bg-zinc-800" />
              </div>
            </div>

            <div className="w-full sm:w-48">
              <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
              <Skeleton className="h-2 w-full rounded-full bg-zinc-800" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-4">
              <Skeleton className="w-10 h-10 rounded-lg bg-zinc-800 mb-3" />
              <Skeleton className="h-3 w-16 bg-zinc-800" />
              <Skeleton className="h-5 w-20 mt-1 bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Badges Section */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <Skeleton className="h-6 w-24 bg-zinc-800" />
          <Skeleton className="h-4 w-48 mt-1 bg-zinc-800" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                <Skeleton className="h-8 w-8 rounded bg-zinc-700 mb-2" />
                <Skeleton className="h-4 w-20 bg-zinc-700" />
                <Skeleton className="h-3 w-16 mt-1 bg-zinc-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-zinc-800" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between py-2 border-b border-zinc-800">
                <Skeleton className="h-4 w-24 bg-zinc-800" />
                <Skeleton className="h-4 w-32 bg-zinc-800" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
