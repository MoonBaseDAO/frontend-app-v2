
import { DesktopAccountDropDown } from "@/components/account-dropdown/desktop";
import { taskNavigations, userNavigations } from "@/mock/navigations";
import { classNames } from "@/utils";

export const DesktopSidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
      <div className="flex flex-shrink-0 items-center px-6">
        <img
          className="h-8 w-auto"
          src="/logo.jpg"
          alt="Your Company"
        />
        <h2 className="text-purple-500 px-4 font-bold">MoonBase</h2>
      </div>
      <DesktopAccountDropDown />
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {taskNavigations.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </div>
        <div className="mt-8">
          {/* Secondary navigation */}
          <div className="mt-1 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
            {userNavigations.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}