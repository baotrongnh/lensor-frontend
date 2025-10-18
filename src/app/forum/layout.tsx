import { ForumSidebarLeft } from '@/components/forum/sidebar/forum-sidebar-left'
import { ForumSidebarRight } from '@/components/forum/sidebar/forum-sidebar-right'
import MainHeader from '@/components/layout/header/main-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function ForumLayout({ children }: { children: React.ReactNode }) {
     return (
          <>
               <MainHeader />
               <SidebarProvider>
                    <ForumSidebarLeft/>
                    <SidebarInset>
                         <header className="bg-background sticky top-16 flex h-14 shrink-0 items-center gap-2">
                              <div className="flex flex-1 items-center gap-2 px-3">
                                   <SidebarTrigger />
                                   <Separator
                                        orientation="vertical"
                                        className="mr-2 data-[orientation=vertical]:h-4"
                                   />
                                   <Breadcrumb>
                                        <BreadcrumbList>
                                             <BreadcrumbItem>
                                                  <BreadcrumbPage className="line-clamp-1">
                                                       Forum
                                                  </BreadcrumbPage>
                                             </BreadcrumbItem>
                                        </BreadcrumbList>
                                   </Breadcrumb>
                              </div>
                         </header>
                         <div className='max-w-[700px] mx-auto'>
                              {children}
                         </div>
                    </SidebarInset>
                    <ForumSidebarRight />
               </SidebarProvider>
          </>
     )
}
