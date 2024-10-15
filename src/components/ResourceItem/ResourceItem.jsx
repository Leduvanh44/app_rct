import Card from "@/components/Card"
import Table from "@/components/Table"

function ResourceItem({ label, quantiy = {}, headers, body, onLabelClick, onBtnClick }) {
    return (
        <Card data-component="ResourceItem" className="h-full">
            <div className="flex items-center justify-between">
                <h2 className="cursor-pointer underline transition-all hover:text-primary-1" onClick={onLabelClick}>
                    {label}
                </h2>
                {/* <Button onClick={onBtnClick}>Tạo mới...</Button> */}
            </div>

            <div className="heading-20-b mt-6 mb-4 justify-around xl:flex">
                <div className="flex items-center">
                    <span className="w-[120px]">Tổng số</span>
                    <span className="heading-20-s">{quantiy.all ?? 0}</span>
                </div>
                {/* <div className="mt-2 flex items-center xl:mt-0">
                    <span className="w-[120px]">Khả dụng</span>
                    <span className="heading-20-s">{quantiy.available ?? 0}</span>
                </div> */}
            </div>

            <Table headers={headers} body={body} className="scroll-y h-[calc(100%-138px)]" sticky />
        </Card>
    )
}

export default ResourceItem
