import PortfolioCard from "./PortfolioCard";

function PortfolioList({
    portfolio,
    totalPortfolioValue,
    onEdit,
    onDelete,
}) {

    if (portfolio.length === 0) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
                No assets found.
            </div>
        );
    }

    return (

        <div className="grid gap-6 lg:grid-cols-2">

            {portfolio.map((asset) => (

                <PortfolioCard
                    key={asset.id}
                    asset={asset}
                    totalPortfolioValue={totalPortfolioValue}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );
}

export default PortfolioList;