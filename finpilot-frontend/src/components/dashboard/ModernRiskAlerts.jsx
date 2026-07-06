import {
    FaCircleCheck,
    FaTriangleExclamation,
    FaCircleInfo,
    FaShieldHalved,
} from "react-icons/fa6";

function ModernRiskAlerts({ alerts }) {

    const styles = {

        HIGH: {
            bg: "bg-red-50",
            border: "border-red-200",
            icon: "text-red-600",
            badge: "bg-red-100 text-red-700",
            Icon: FaTriangleExclamation,
        },

        MEDIUM: {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            icon: "text-yellow-600",
            badge: "bg-yellow-100 text-yellow-700",
            Icon: FaCircleInfo,
        },

        SUCCESS: {
            bg: "bg-green-50",
            border: "border-green-200",
            icon: "text-green-600",
            badge: "bg-green-100 text-green-700",
            Icon: FaCircleCheck,
        },

    };

    return (

        <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            {/* Header */}

            <div className="mb-4 flex-shrink-0">

                <h2 className="text-lg font-bold text-slate-900">

                    Portfolio Risks

                </h2>

                <p className="text-xs text-gray-500">

                    Actionable insights for improving your portfolio.

                </p>

            </div>

            {alerts.length === 0 ? (

                <div className="flex flex-1 flex-col items-center justify-center text-center">

                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                        <FaShieldHalved className="text-4xl text-slate-400" />

                    </div>

                    <h3 className="text-xl font-semibold text-slate-900">

                        No Risk Analysis

                    </h3>

                    <p className="mt-2 max-w-xs text-sm text-slate-500">

                        Add portfolio assets to receive personalized
                        risk insights and diversification analysis.

                    </p>

                </div>

            ) : (

                <div className="mt-2 max-h-[300px] space-y-3 overflow-y-auto pr-2">

                    {alerts.map((alert, index) => {

                        const style =
                            styles[alert.severity] || styles.MEDIUM;

                        const Icon = style.Icon;

                        return (

                            <div
                                key={index}
                                className={`rounded-lg border px-3 py-3 ${style.bg} ${style.border}`}
                            >

                                <div className="flex items-start gap-3">

                                    <Icon
                                        className={`mt-0.5 text-lg ${style.icon}`}
                                    />

                                    <div className="flex-1">

                                        <div className="flex items-center justify-between">

                                            <h3 className="text-sm font-semibold">

                                                {alert.title}

                                            </h3>

                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${style.badge}`}
                                            >

                                                {alert.severity}

                                            </span>

                                        </div>

                                        <p className="mt-1 text-sm leading-5 text-gray-600">

                                            {alert.message}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

}

export default ModernRiskAlerts;