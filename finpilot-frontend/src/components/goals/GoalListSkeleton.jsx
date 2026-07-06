function GoalListSkeleton() {

    return (

        <div className="grid gap-6 lg:grid-cols-2">

            {Array.from({ length: 4 }).map((_, index) => (

                <div
                    key={index}
                    className="animate-pulse rounded-xl border bg-white p-6 shadow-sm"
                >

                    {/* Header */}

                    <div className="flex items-start justify-between">

                        <div>

                            <div className="h-6 w-44 rounded bg-gray-200"></div>

                            <div className="mt-3 h-4 w-24 rounded bg-gray-200"></div>

                            <div className="mt-2 h-5 w-28 rounded bg-gray-300"></div>

                        </div>

                        <div className="h-7 w-20 rounded-full bg-gray-200"></div>

                    </div>

                    {/* Progress */}

                    <div className="mt-8">

                        <div className="mb-3 flex justify-between">

                            <div className="h-4 w-20 rounded bg-gray-200"></div>

                            <div className="h-4 w-12 rounded bg-gray-200"></div>

                        </div>

                        <div className="h-3 rounded-full bg-gray-200"></div>

                        <div className="mt-3 h-4 w-40 rounded bg-gray-200"></div>

                    </div>

                    {/* Details */}

                    <div className="mt-8 space-y-4">

                        {Array.from({ length: 3 }).map((_, i) => (

                            <div
                                key={i}
                                className="flex justify-between"
                            >

                                <div className="h-4 w-32 rounded bg-gray-200"></div>

                                <div className="h-4 w-24 rounded bg-gray-300"></div>

                            </div>

                        ))}

                    </div>

                    {/* Footer */}

                    <div className="mt-8 flex items-center justify-between border-t pt-5">

                        <div className="h-7 w-24 rounded-full bg-gray-200"></div>

                        <div className="h-10 w-24 rounded-lg bg-gray-300"></div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default GoalListSkeleton;