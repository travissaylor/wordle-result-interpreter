export default function TransformationCard({
    name,
    description,
    emoji,
    onTransform,
}) {
    return (
        <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                    {name}
                </h2>
                <h1 className="text-5xl text-indigo-900 leading-none flex items-center justify-center pb-4 mb-4 border-b border-grety-200">
                    {emoji}
                </h1>
                <p className="flex items-center text-grey-600 mb-2">
                    {description}
                </p>
                <button onClick={onTransform} className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                    Transform
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
