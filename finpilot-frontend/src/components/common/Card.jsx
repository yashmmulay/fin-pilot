function Card({ children, className = "" }) {
    return (
        <div
            className={`
                rounded-xl
                bg-white
                shadow-sm
                border
                border-gray-200
                p-6
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;