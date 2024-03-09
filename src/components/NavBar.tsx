import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'

export const Navbar = () => {
  const { data: session } = useSession()

  const user = session?.user

  return (
    <header className="fixed -top-1 left-0 z-10 w-full">
      <div className="absolute left-0 top-0 flex w-full items-center justify-between border-b border-b-border/40 bg-background/20 px-8 py-6 backdrop-blur-md">
        <span className="w-[200px] text-nowrap text-2xl font-semibold">💎</span>
        <div className="flex w-full items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.image || ''} />
              <AvatarFallback>
                {(user?.name && user.name[0]) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
          <Button className="ml-4" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
