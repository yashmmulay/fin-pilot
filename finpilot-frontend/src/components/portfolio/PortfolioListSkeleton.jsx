import PortfolioCardSkeleton from "./PortfolioCardSkeleton";

function PortfolioListSkeleton() {

    return (

        <div className="grid gap-6 lg:grid-cols-2">

            {Array.from({ length: 4 }).map((_, index) => (

                <PortfolioCardSkeleton
                    key={index}
                />

            ))}

        </div>

    );

}

export default PortfolioListSkeleton;