'use client'

import { colorsTuple, createTheme, MantineProvider, MantineRadiusValues } from '@mantine/core'
import React from 'react'

const theme = createTheme({
     fontFamily: "inherit",
     colors: {
          main: colorsTuple('#8c4aea'),
          dynamic: colorsTuple(
               Array.from({ length: 10 }, (_, index) => '#FFC0CB')
          ),
     },
     primaryColor: 'main',
     defaultRadius: 'md'
})

export default function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
     
     return (
          <MantineProvider theme={theme} defaultColorScheme='dark'>
               {children}
          </MantineProvider>
     )
}
