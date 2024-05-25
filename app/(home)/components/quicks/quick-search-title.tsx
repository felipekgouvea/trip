interface QuickSearcTitleProps {
  title: string
}

const QuickSearchTitle = ({ title }: QuickSearcTitleProps) => {
  return (
    <div className="flex items-center">
      <div className="h-[1px] w-full bg-[#717171]"></div>
      <h2 className="text-normal whitespace-nowrap px-5 font-semibold text-[#717171]">
        {title}
      </h2>
      <div className="h-[1px] w-full bg-[#717171]"></div>
    </div>
  )
}

export default QuickSearchTitle
