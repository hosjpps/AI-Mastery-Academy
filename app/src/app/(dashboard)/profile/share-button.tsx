'use client'

import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareProfileButtonProps {
  username: string
}

export function ShareProfileButton({ username }: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/u/${username}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username} on AI Mastery Academy`,
          text: `Check out my AI learning progress on AI Mastery Academy!`,
          url,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
      onClick={handleShare}
      title={copied ? 'Copied!' : 'Share profile'}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
    </Button>
  )
}
