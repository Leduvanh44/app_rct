import { useState, useEffect, useCallback } from "react"
import ApexChart from "react-apexcharts"

import ToggleButtons from "@/components/ToggleButtons"
import { mutilSeriesRangeBarChartConfig } from "@/config"
import { useCallApi } from "@/hooks"
import { orderApi } from "@/services/api"
import { convertISOToLocaleDate, convertDataProductionSchedule } from "@/utils/functions"
import { PRODUCTION_SCHEDULE_TABLE_COLUMNS } from "@/utils/tableColumns"
import Table from "@/components/Table/Table"

function ProductionSchedule() {
    const callApi = useCallApi()

    const [chartData, setChartData] = useState([])
    const [tableData, setTableData] = useState([])
    const [actived, setActived] = useState(0)
    const fetchWorkOrders = useCallback(() => {
        callApi([orderApi.workOrder.getWorkOrders("")], ([workOrder]) => {
            setTableData(workOrder.items)
            setChartData(convertDataProductionSchedule(workOrder.items))
        })
    }, [callApi])
    useEffect(() => {
        fetchWorkOrders()
    }, [fetchWorkOrders])
    console.log(chartData)
    console.log(tableData)
    return (
        <div data-component="ProductionSchedule" className="h-full w-full">
            <div>
                <ToggleButtons
                    // titles={["Theo máy", "Theo sản phẩm", "Dạng bảng"]}
                    titles={["Dạng Gantt", "Dạng bảng"]}
                    active={actived}
                    onClick={setActived}
                />
            </div>
            <div className="h-[calc(100%-40px)] w-full">
                {actived === 1 ? (
                    <Table headers={PRODUCTION_SCHEDULE_TABLE_COLUMNS} body={tableData} />
                ) : (
                    <ApexChart
                        series={chartData}
                        options={mutilSeriesRangeBarChartConfig}
                        type="rangeBar"
                        height={chartData.length * 100}
                        width="100%"
                    />
                )}
            </div>
        </div>
    )
}

export default ProductionSchedule
