function PortfolioCardSkeleton() {

    return (

        <div className="animate-pulse rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex justify-between">

                <div className="space-y-3">

                    <div className="h-6 w-48 rounded bg-gray-200"></div>

                    <div className="h-4 w-20 rounded bg-gray-200"></div>

                    <div className="h-6 w-24 rounded-full bg-gray-200"></div>

                </div>

                <div className="h-8 w-20 rounded bg-gray-200"></div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">

                {Array.from({ length: 6 }).map((_, index) => (

                    <div key={index}>

                        <div className="mb-2 h-3 w-24 rounded bg-gray-200"></div>

                        <div className="h-5 w-20 rounded bg-gray-300"></div>

                    </div>

                ))}

            </div>

            <div className="mt-8 flex gap-3">

                <div className="h-10 flex-1 rounded bg-gray-200"></div>

                <div className="h-10 flex-1 rounded bg-gray-200"></div>

            </div>

        </div>

    );

}

export default PortfolioCardSkeleton;