'use client'

import React from 'react';
import { Container } from '@mantine/core';
import Link from 'next/link';
import { LoginForm } from './login-form';

export default function Page() {
  return (
    <Container
      strategy="grid"
      size={'xl'}
      className="h-screen w-screen bg-gradient-to-br from-[#7b2ff2] via-[#412175] to-[#1a1a2e] flex justify-center items-center py-8 px-1"
    >
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center shadow-purple-400 shadow-md bg-white h-[92vh] w-full border-white-1 rounded-4xl overflow-hidden p-6">
        <div className="relative flex flex-col justify-center items-center w-full md:w-5/12 h-full rounded-4xl bg-white text-black text-center py-8 md:py-0">
          <Link href='/' >
            <h1 className='font-extrabold text-3xl md:text-4xl text-purple-700 mb-1 md:mb-2 drop-shadow-md'>
              Lensor
            </h1>
          </Link>
          <h2 className='font-bold text-xl md:text-2xl italic text-black mb-4 md:mb-10  tracking-wide'>
            Make your perfect portfolio
          </h2>
          <LoginForm />
        </div>

        <div className="w-full md:w-7/12 h-64 md:h-full bg-[url('/Login-image.jpg')] bg-cover bg-center rounded-4xl "></div>
      </div>
    </Container >
  )
}