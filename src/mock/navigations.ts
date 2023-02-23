import { BriefcaseIcon, CurrencyDollarIcon, GlobeAltIcon } from '@heroicons/react/20/solid';
import { Bars4Icon, BoltIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ClockIcon, HomeIcon, InboxIcon, StarIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const taskNavigations = [
  { name: 'Inbox', href: '/inbox', icon: InboxIcon, current: false },
  { name: 'Today', href: '#', icon: CalendarDaysIcon, current: false },
  { name: 'Upcoming', href: '#', icon: BoltIcon, current: false },
  { name: 'Important', href: '#', icon: StarIcon, current: false },
  { name: 'Meetings', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trash', href: '#', icon: TrashIcon, current: false },
];

export const userNavigations = [
  { name: 'My Org', href: '/myorg', icon: GlobeAltIcon, current: false },
  { name: 'Discover', href: '/discover', icon: BriefcaseIcon, current: false },
  { name: 'Bounties', href: '#', icon: CurrencyDollarIcon, current: false },
  { name: 'Chat', href: '#', icon: ChatBubbleLeftRightIcon, current: false },
]