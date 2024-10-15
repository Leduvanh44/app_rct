import cl from "classnames"
import Card from "@/components/Card"

function ValueItem({ value, label, height = 100, color = "#4D7EB3", className }) {
    return (
        <div data-component="ValueItem" className={cl("w-fit", className)} style={{ height }}>
            <Card className="flex h-full w-full flex-col items-center justify-between">
                <div className="heading-20-b" style={{ color }}>
                    {value}
                </div>
                <div className="text-16-b">{label}</div>
            </Card>
        </div>
    )
}

export default ValueItem
