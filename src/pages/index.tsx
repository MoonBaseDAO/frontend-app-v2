import Example from '@/layouts/example'
import Head from 'next/head'
import { Inter } from '@next/font/google';
import { pinnedProjects, projects } from '@/mock/projects';
import { classNames } from '@/utils';
import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, EllipsisVerticalIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      Overview
    </>
  )
}
