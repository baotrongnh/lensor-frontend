'use client'

import React from 'react'
import { Container, Flex } from '@mantine/core';
import Link from 'next/link';
import { LoginForm } from './LoginForm'

export default function Page() {
  return (
    <Container
      strategy="grid"
      size={'xl'}
      className="h-screen w-screen bg-gradient-to-br from-[#7b2ff2] via-[#f357a8] to-[#1a1a2e] flex justify-center items-center py-8 px-1"
    >
      <Flex className="flex-col md:flex-row gap-6 justify-center items-center bg-white h-full w-full border-white-1 rounded-4xl overflow-hidden p-6">

        <div className="relative flex flex-col justify-center items-center w-full md:w-5/12 h-full rounded-4xl bg-white text-black text-center py-8 md:py-0">
          <Link href='/' >
            <h1 className='font-extrabold text-3xl md:text-4xl text-purple-700 mb-1 md:mb-2 drop-shadow-md'>
              Lensor
            </h1>
          </Link>
          <h2 className='font-bold text-xl md:text-2xl italic text-black mb-6 md:mb-15 tracking-wide'>
            Make your perfect portfolio
          </h2>
          <LoginForm />
        </div>

        {/*This is the Image */}
        <div className="w-full md:w-7/12 h-64 md:h-full bg-[url('/Login_image.jpg')] bg-cover bg-center rounded-4xl "></div>
      </Flex>
    </Container >
  )
}