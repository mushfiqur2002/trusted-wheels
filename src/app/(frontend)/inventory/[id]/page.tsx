
export default function InventoryDetails({ }) {
    return (
        <div className="w-full flex flex-col xl:px-12 px-6 mt-20 text-[var(--secondary-text-color)] bg-[var(--primary-background-color)]">
            <h1 className="capitalize flex gap-1 text-[18px] font-medium">
                <span>inventory</span>
                <span>{`>`}</span>
                <span className="text-[rgba(240,11,31,1)]">details</span>
            </h1>
            {/* image gallery */}
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
