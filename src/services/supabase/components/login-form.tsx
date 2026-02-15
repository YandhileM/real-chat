"use client"
import { cn } from '@/lib/utils'
import { createClient } from '@/services/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/`,
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              onClick={() => handleSocialLogin('github')}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Continue with GitHub'}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button
              onClick={() => handleSocialLogin('google')}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Continue with Google'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
