interface props {
  title: string
}

export const Topbar = ({ title }: props) => {
  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{title}</h1>
      </div>
    </div>
  );
}