import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const Navbar = () => {
  const { data: session } = useSession()

  const user = session?.user

  return (
    <header className="fixed -top-1 left-0 z-10 w-full">
      <div className="absolute left-0 top-0 flex w-full items-center justify-between bg-background/60 px-8 py-6 backdrop-blur-md">
        <span className="w-[200px] text-nowrap text-2xl font-semibold">
          💎 Marketplace
        </span>
        <div className="flex w-full items-center justify-end gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.image || ''} />
                <AvatarFallback>{user?.name && user.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
