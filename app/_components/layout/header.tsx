'use client'

import { Avatar, AvatarImage } from '../ui/avatar'

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
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
  const { data } = useSession()
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)

  const handleSignInClick = () => signIn('google')

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
    <header className="mx-auto flex items-center justify-between px-5 py-5 shadow-sm shadow-[#ccc]">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo Marca da empresa"
          width="183"
          height="32"
        />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full" asChild>
          <Button variant="outline">
            <div className="flex items-center gap-2">
              <MenuIcon size={24} />
              {data?.user ? (
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={data.user.image ?? ''}
                    width={100}
                    height={100}
                  />
                </Avatar>
              ) : (
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/user.png" width={100} height={100} />
                </Avatar>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[250px]">
          {data?.user ? (
            <>
              <DropdownMenuLabel className="font-bold text-primary">
                <span>Dados do Usuário</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex w-full flex-col gap-1 px-2 py-3 text-xs">
                <p className="font-semibold ">
                  Usuário:
                  <span className="capitalize text-primary-GRAY">
                    {data?.user?.name}
                  </span>
                </p>
                <p className="font-semibold ">
                  E-mail:
                  <span className="text-primary-GRAY">{data?.user?.email}</span>
                </p>
              </div>
              <DropdownMenuSeparator />
              <Button
                variant="outline"
                onClick={handleSignOutClick}
                disabled={isSignOutLoading}
                className="mt-4 w-full"
              >
                {isSignOutLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <div className="flex w-full items-center gap-1">
                  <span className="font-semibold text-primary ">Sair</span>
                </div>
              </Button>
            </>
          ) : (
            <>
              <DropdownMenuLabel className="font-bold text-primary">
                <span>Faça seu Login!</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Button
                variant="outline"
                onClick={handleSignInClick}
                disabled={isSignOutLoading}
                className="mt-4 w-full"
              >
                <div className="flex w-full items-center gap-1">
                  <span className="font-semibold text-primary hover:no-underline">
                    Login
                  </span>
                </div>
              </Button>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
