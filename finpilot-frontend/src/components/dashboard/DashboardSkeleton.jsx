function DashboardSkeleton() {

    return (

        <div className="space-y-4 animate-pulse">

            {/* Header */}

            <div className="h-36 rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />

            {/* KPI Cards */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {[...Array(4)].map((_, index) => (

                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div className="space-y-2">

                                <div className="h-3 w-24 rounded bg-slate-200" />

                                <div className="h-7 w-32 rounded bg-slate-300" />

                            </div>

                            <div className="h-12 w-12 rounded-xl bg-slate-200" />

                        </div>

                        <div className="mt-5 h-3 w-28 rounded bg-slate-200" />

                    </div>

                ))}

            </div>

            {/* Row 1 */}

            <div className="grid gap-4 xl:grid-cols-2">

                {/* Portfolio Insights */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <div className="h-5 w-40 rounded bg-slate-300" />

                            <div className="mt-2 h-3 w-24 rounded bg-slate-200" />

                        </div>

                        <div className="h-10 w-16 rounded-full bg-slate-200" />

                    </div>

                    <div className="space-y-5">

                        {[...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className="flex items-center justify-between"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="h-10 w-10 rounded-full bg-slate-200" />

                                    <div>

                                        <div className="h-3 w-24 rounded bg-slate-200" />

                                        <div className="mt-2 h-4 w-20 rounded bg-slate-300" />

                                    </div>

                                </div>

                                <div className="h-5 w-16 rounded bg-slate-300" />

                            </div>

                        ))}

                    </div>

                </div>

                {/* Goal Card */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <div className="h-5 w-44 rounded bg-slate-300" />

                            <div className="mt-2 h-3 w-40 rounded bg-slate-200" />

                        </div>

                        <div className="h-10 w-10 rounded-full bg-slate-200" />

                    </div>

                    <div className="mt-6 h-8 w-56 rounded bg-slate-300" />

                    <div className="mt-6">

                        <div className="mb-3 flex justify-between">

                            <div className="h-3 w-20 rounded bg-slate-200" />

                            <div className="h-3 w-10 rounded bg-slate-200" />

                        </div>

                        <div className="h-3 rounded-full bg-slate-200" />

                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">

                        {[...Array(2)].map((_, index) => (

                            <div
                                key={index}
                                className="rounded-xl bg-slate-100 p-3"
                            >

                                <div className="h-3 w-20 rounded bg-slate-200" />

                                <div className="mt-3 h-5 w-24 rounded bg-slate-300" />

                            </div>

                        ))}

                    </div>

                    <div className="mt-5 h-12 rounded-xl bg-slate-100" />

                    <div className="mt-5 flex justify-between">

                        <div className="h-4 w-28 rounded bg-slate-200" />

                        <div className="h-6 w-20 rounded-full bg-slate-200" />

                    </div>

                </div>

            </div>

            {/* Row 2 */}

            <div className="grid gap-4 xl:grid-cols-2">

                {/* Allocation */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="h-5 w-44 rounded bg-slate-300" />

                    <div className="mt-2 h-3 w-52 rounded bg-slate-200" />

                    <div className="mt-8 flex justify-center">

                        <div className="h-64 w-64 rounded-full border-[24px] border-slate-200" />

                    </div>

                </div>

                {/* Risk */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="h-5 w-36 rounded bg-slate-300" />

                    <div className="mt-2 h-3 w-52 rounded bg-slate-200" />

                    <div className="mt-6 space-y-4">

                        {[...Array(3)].map((_, index) => (

                            <div
                                key={index}
                                className="rounded-xl border border-slate-200 p-4"
                            >

                                <div className="flex gap-3">

                                    <div className="h-8 w-8 rounded-full bg-slate-200" />

                                    <div className="flex-1">

                                        <div className="h-4 w-36 rounded bg-slate-300" />

                                        <div className="mt-2 h-3 w-full rounded bg-slate-200" />

                                        <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardSkeleton;