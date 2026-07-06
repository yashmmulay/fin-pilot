function RiskAlerts({ risks }) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
                Risk Alerts
            </h2>

            {risks.length === 0 ? (

                <p className="text-gray-500">
                    No risk alerts 🎉
                </p>

            ) : (

                <div className="space-y-4">

                    {risks.map((risk, index) => (

                        <div
                            key={index}
                            className="rounded-lg border p-4"
                        >

                            <h3 className="font-semibold">
                                {risk.title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {risk.message}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default RiskAlerts;