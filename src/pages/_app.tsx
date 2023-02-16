import { MobileAccountDropDown } from '@/components/account-dropdown/mobile'
import { Sidebar } from '@/layouts/sidebar'
import '@/styles/globals.css'
import { Bars3CenterLeftIcon } from '@heroicons/react/20/solid'
import type { AppProps } from 'next/app'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-end items-center px-4 sm:px-6 lg:px-8">
            <MobileAccountDropDown />
          </div>
        </div>
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}
