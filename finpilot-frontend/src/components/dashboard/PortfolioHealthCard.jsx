import {
    FaHeartPulse,
    FaShieldHeart,
} from "react-icons/fa6";

function PortfolioHealthCard({ health }) {

    const percentage = health.score;

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        Portfolio Health

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Overall quality of your portfolio

                    </p>

                </div>

                <div className="rounded-full bg-blue-50 p-3">

                    <FaHeartPulse
                        className="text-2xl text-blue-600"
                    />

                </div>

            </div>

            {/* Score */}

            <div className="mt-8 flex items-end justify-between">

                <div>

                    <h1
                        className={`text-5xl font-bold ${health.color}`}
                    >

                        {health.score}

                    </h1>

                    <p
                        className={`mt-2 text-lg font-semibold ${health.color}`}
                    >

                        {health.status}

                    </p>

                </div>

                <div className="text-right">

                    <p className="text-sm text-gray-500">

                        Health Score

                    </p>

                    <p className="text-2xl font-semibold">

                        /100

                    </p>

                </div>

            </div>

            {/* Progress */}

            <div className="mt-8">

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                    <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-700"
                        style={{
                            width: `${percentage}%`
                        }}
                    />

                </div>

            </div>

            {/* Breakdown */}

            <div className="mt-8 space-y-4">

                {health.breakdown.map((item) => (

                    <div
                        key={item.title}
                        className="flex items-center justify-between"
                    >

                        <div className="flex items-center gap-2">

                            <FaShieldHeart
                                className="text-sm text-blue-600"
                            />

                            <span className="text-gray-700">

                                {item.title}

                            </span>

                        </div>

                        <span className="font-semibold">

                            {item.score}/{item.max}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default PortfolioHealthCard;