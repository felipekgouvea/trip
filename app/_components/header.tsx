'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Loader2, MenuIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Header = () => {
  const { data } = useSession()
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)

  const handleSignInClick = () => signIn()

  const handleSignOutClick = async () => {
    setIsSignOutLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSignOutLoading(false)
    }
  }

  return (
    <header className="mx-auto flex items-center justify-between px-5 py-5">
      <Image
        src="/logo.png"
        alt="Logo Marca da empresa"
        width="183"
        height="32"
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full" asChild>
          <Button variant="outline">
            <div className="flex items-center gap-2">
              <MenuIcon size={24} />
              {data?.user && (
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={data.user.image ?? ''}
                    width={100}
                    height={100}
                  />
                  <AvatarFallback>
                    {data.user.name?.split(' ')[0][1]}
                    {data.user.name?.split(' ')[0][0]}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[250px]">
          <DropdownMenuLabel className="font-bold text-primary">
            {data?.user ? (
              <span>Dados do Usuário</span>
            ) : (
              <span>Faça seu login!</span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data?.user ? (
            <div className="flex w-full flex-col gap-1 px-2 py-3 text-xs">
              <p className="font-semibold ">
                Usuário:{' '}
                <span className="text-primary-GRAY">{data?.user?.name}</span>
              </p>
              <p className="font-semibold ">
                E-mail:{' '}
                <span className="text-primary-GRAY">{data?.user?.email}</span>
              </p>
            </div>
          ) : (
            ''
          )}
          <DropdownMenuSeparator />
          <div className="mt-4 w-full">
            {data?.user ? (
              <Button
                variant="outline"
                onClick={handleSignOutClick}
                disabled={isSignOutLoading}
                className="w-full"
              >
                {isSignOutLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <div className="flex w-full items-center gap-1">
                  <span className="font-semibold text-primary hover:no-underline">
                    Sair
                  </span>
                </div>
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleSignInClick}
                disabled={isSignOutLoading}
                className="w-full"
              >
                <div className="flex w-full items-center gap-1">
                  <span className="font-semibold text-primary hover:no-underline">
                    Login
                  </span>
                </div>
              </Button>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
