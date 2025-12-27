'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPassword, type AuthState } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail } from 'lucide-react'

const initialState: AuthState = {}

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPassword, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Reset your password</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {state.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {state.error}
            </div>
          )}

          {state.success ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                <p className="font-medium">Check your email!</p>
                <p className="mt-1 text-green-400/80">
                  We&apos;ve sent you a password reset link.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Link>
              </Button>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
              >
                {pending ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          )}
        </CardContent>

        {!state.success && (
          <CardFooter className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-zinc-400 hover:text-zinc-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
