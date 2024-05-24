interface QuickSearcTitleProps {
  title: string
}

const QuickSearchTitle = ({ title }: QuickSearcTitleProps) => {
  return (
    <div className="flex items-center">
      <div className="h-[1px] w-full bg-gray-300"></div>
      <h2 className="whitespace-nowrap px-5 text-sm font-normal text-secondary">
        {title}
      </h2>
      <div className="h-[1px] w-full bg-gray-300"></div>
    </div>
  )
}

export default QuickSearchTitle
