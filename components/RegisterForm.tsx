'use client'

import { useState } from 'react'
import { User, UserWithoutId } from '@/lib/models'
import { addUser } from '@/lib/action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const DEFAULT_IS_ADMIN: boolean = false

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [img, setImage] = useState('')
  const [isAdmin, setIsAdmin] = useState(DEFAULT_IS_ADMIN)

  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData: UserWithoutId = {
      username,
      email,
      password,
      img,
      isAdmin,
    }

    try {
      await addUser(formData)
      router.push('/api/auth/signin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="  p-4 border-2 border-primary rounded-md">
      <div className="flex justify-center p-2 ">
        <Link href="/">
          <Image
            src="/icons/leafs.svg"
            alt="logo"
            width={30}
            height={30}
            className="w-full h-full object-cover bg-primary  "
          />
        </Link>
      </div>
      <form
        className="w-96  flex flex-col gap-4 p-6"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="first and last name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Your photo"
          value={img}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Input
          type="hidden"
          name="isAdmin"
          value={`${DEFAULT_IS_ADMIN}`}
        />
        <Button
          className="bg-primary text-white hover:bg-red-800 "
          type="submit"
        >
          Registration
        </Button>
        <Link
          href="/api/auth/signin"
          className="flex gap-2"
        >
          You already have an account? <b className="text-primary">Login</b>
        </Link>
      </form>
    </div>
  )
}

export default RegisterForm
