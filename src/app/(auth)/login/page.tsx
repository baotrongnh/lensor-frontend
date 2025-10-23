import React from 'react';
import Link from 'next/link';
import { LoginForm } from './components/login-form';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import Image from 'next/image'

export default function Page() {
  return (
    <div className=" flex justify-center items-center h-screen w-screen dark:bg-gradient-to-br from-[#27282A] to-black py-0 px-2 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center shadow-purple-400 shadow-md h-[650px] w-[1200px] border-white-1 rounded-4xl overflow-hidden p-6 ">
        <div className="flex flex-col justify-center items-center w-full md:w-4/12 h-full rounded-4xl text-center py-8 md:py-0">
          <Link href='/' >
            <h1 className='font-extrabold text-3xl md:text-4xl text-main-theme mb-4 md:mb-10 drop-shadow-md'>
              Lensor
            </h1>
          </Link>
          <LoginForm />
        </div>

        {/* <div className="w-full hidden md:w-7/12 h-full bg-[url('/camera1.jpg')] bg-cover bg-center rounded-4xl p-10 relative md:flex items-end">
          <h2 className='uppercase font-extrabold opacity-40 text-5xl md:text-[51px] select-none text-white tracking-wide pb-4'>
            Where vision <br />meets opportunity
          </h2>
        </div> */}
        <div className='flex flex-col w-full md:w-8/12 gap-0 justify-center items-center h-full'>
          <div className='w-full h-1/2 relative flex justify-center items-center'>
            <InfiniteSlider speedOnHover={20} gap={24}>
              <Image
                src="https://i.pinimg.com/1200x/3e/d5/5b/3ed55b7a8edad9e811900cd55ca50f05.jpg"
                alt="Urban Photography Preset"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/d9/b2/97/d9b29715b473dd0a5b37e1bc9929907b.jpg"
                alt="Nature Portrait Collection"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/736x/3f/93/c6/3f93c61810a9a68442366031087841a9.jpg"
                alt="Vintage Film Presets"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/7d/66/04/7d6604111a2fb44b73a4bc8b643e479d.jpg"
                alt="Happy Robot 032"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/95/5b/43/955b437d7a0a91f60b944abf6a99a544.jpg"
                alt="Cinematic LUT Pack"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/b4/fe/42/b4fe428c83502f66bbd2af43ae20b1dc.jpg"
                alt="Abstract 3D Models"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
            </InfiniteSlider>
          </div>
          <div className='w-full h-1/2 relative'>
            <InfiniteSlider speedOnHover={20} gap={24} reverse>
              <Image
                src="https://i.pinimg.com/1200x/3e/d5/5b/3ed55b7a8edad9e811900cd55ca50f05.jpg"
                alt="Urban Photography Preset"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/d9/b2/97/d9b29715b473dd0a5b37e1bc9929907b.jpg"
                alt="Nature Portrait Collection"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/736x/3f/93/c6/3f93c61810a9a68442366031087841a9.jpg"
                alt="Vintage Film Presets"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/7d/66/04/7d6604111a2fb44b73a4bc8b643e479d.jpg"
                alt="Happy Robot 032"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/95/5b/43/955b437d7a0a91f60b944abf6a99a544.jpg"
                alt="Cinematic LUT Pack"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
              <Image
                src="https://i.pinimg.com/1200x/b4/fe/42/b4fe428c83502f66bbd2af43ae20b1dc.jpg"
                alt="Abstract 3D Models"
                height={300}
                width={400}
                className="object-cover rounded-2xl"
              />
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </div >
  )
}