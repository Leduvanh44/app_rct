import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ApexChart from "react-apexcharts"
import { BsBarChartSteps } from "react-icons/bs"
import { toast } from "react-toastify"

import { schedulingActions } from "@/store"
import { paths, mutilSeriesRangeBarChartConfig } from "@/config"
import { orderApi, hierarchyApi, InjectionMachineApi } from "@/services/api"
import { useCallApi } from "@/hooks"
import {
    getEquipmentListOfMaterial,
    isoToTimestamp,
    addTimeToDateTime,
    subTimeToDateTime,
    compareTime,
    formatDateTime,
    getCurrentDateTime,
    getPrerequisteOperationList,
} from "@/utils/functions"

import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Card from "@/components/Card"
import { Log } from "oidc-react"

function ProductSScheduling() {
    const callApi = useCallApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shifts } = useSelector((state) => state.setting)
    const shiftOptions = shifts.map((item, index) => ({ key: item.description, value: index }))
    const schedulingProducts = useSelector((state) => state.scheduling.schedulingProducts) // lưu list đơn sản xuất đang được điều độ
    const [equipments, setEquipments] = useState([])
    const [showChart, setShowChart] = useState(false)
    const [chartSeries, setChartSeries] = useState([])
    const outputs = useRef([])
    const handleSetValue = (index, keysAndValues) => {
        const newValue = schedulingProducts.map((item, _index) =>
            index !== _index ? item : { ...item, ...keysAndValues },
        )
        dispatch(schedulingActions.setSchedulingProducts(newValue))
    }
    const handleSubmit = () => {
        // const { data, valid } = handleScheduledData(schedulingProducts, shifts, true)

        // if (valid) {
        const apis = schedulingProducts.map((item) =>
            orderApi.workOrder.updateWorkOrders(item, item.manufacturingOrder, item.workOrderId),
        )

        callApi(
            apis,
            (res) => {
                navigate(paths.schedule)
                dispatch(schedulingActions.removeSchedulingProducts())
            },
            "Tạo kế hoạch sản xuất thành công",
        )
    }
    const handleAutoScheduling = async () => {
        let payload = schedulingProducts.map((item) => ({
            ...item,
            manufacturingOrderId: item.manufacturingOrder,
        }))

        let data = {
            orderIds: payload,
        }

        try {
            const response = await InjectionMachineApi.autoScheduling.createAutoScheduling(data)
            // Handle the response data here
            console.log(response)
            let dispatchData = response.map((item) => ({
                ...item,
                workOrderStatus: 2,
                startTime: item.startTime.split(".")[0],
                endTime: item.endTime.split(".")[0],
            }))
            dispatch(schedulingActions.setSchedulingProducts(dispatchData))
            toast.success("Tự động điều độ thành công!") // Add this line
        } catch (error) {
            // Handle errors here
            console.error(error)
            toast.error("Failed to dispatch data.") // Add this line
        }
    }
    useEffect(() => {
        let chartData = schedulingProducts.map((item) => {
            return {
                name: item.workOrderId,
                data: [
                    { x: item.manufacturingOrder, y: [isoToTimestamp(item.startTime), isoToTimestamp(item.endTime)] },
                ],
            }
        })
        setChartSeries(chartData)
    }, [schedulingProducts, shifts])

    useEffect(() => {}, [schedulingProducts[0].startTime])
    return (
        <div
            data-component="ProductSScheduling"
            className="3xl:scroll-x container h-full 3xl:w-[calc(100vw-120px)] 3xl:px-2"
        >
            <div className="mt-5 flex items-center gap-5 pb-5">
                <Button onClick={handleSubmit}>Xác nhận</Button>
                <Button onClick={() => setShowChart(!showChart)} transparent={!showChart}>
                    <BsBarChartSteps />
                </Button>
                <Button onClick={handleAutoScheduling} className="ml-auto">
                    Tự động điều độ
                </Button>
            </div>
            {showChart && (
                <Card className="scroll-y mb-2 max-h-[50%] w-full">
                    <ApexChart
                        series={chartSeries}
                        options={mutilSeriesRangeBarChartConfig}
                        type="rangeBar"
                        height={chartSeries.length * 100}
                        width="100%"
                    />
                </Card>
            )}
            <div className="flex w-full min-w-[1660px] gap-8 pt-2">
                <div className="text-16-b w-32 pl-5">workOrderId</div>
                <div className="text-16-b w-28">manuOrder</div>
                <div className="text-16-b w-20">Status</div>
                <div className="text-16-b grow">workCenter</div>
                <div className="text-16-b w-[250px]">startTime</div>
                <div className="text-16-b w-[250px]">endTime</div>
                <div className="text-16-b w-[200px] pr-5">Ngày đến hạn</div>
            </div>

            <div className="w-full min-w-[1660px]">
                {schedulingProducts.map((item, index) => (
                    <SchedulingItem
                        item={item}
                        index={index}
                        schedulingProducts={schedulingProducts}
                        handleSetValue={handleSetValue}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductSScheduling

function SchedulingItem({ item, index, schedulingProducts, handleSetValue }) {
    const callApi = useCallApi()

    const [workCenterOutput, setWorkCenterOutput] = useState([])
    useEffect(() => {
        callApi(
            () => hierarchyApi.WorkCenterOutput.getWorkCenterOutput(item.manufacturingOrder),
            (res) => {
                setWorkCenterOutput(getPrerequisteOperationList(res, "workCenter", "workCenter"))
            },
        )
    }, [])
    return (
        <Card className="my-4 w-full" key={index}>
            <div className="flex items-end gap-8">
                <h4 className="w-28">{item.workOrderId}</h4>
                <h4 className="w-28">{item.manufacturingOrder}</h4>
                <div className="w-20">{item.workOrderStatus}</div>
                <div className="grow">
                {item.workCenter}
                    {/* <SelectInput
                        label=""
                        list={workCenterOutput}
                        value={schedulingProducts[index]?.workCenter}
                        setValue={(value) => handleSetValue(index, { workCenter: value })}
                    /> */}
                </div>

                <div className="flex w-[250px] items-end">
                    <input
                        type="datetime-local"
                        className="text-16-m"
                        value={schedulingProducts[index].startTime ?? ""}
                        onChange={(e) => {
                            let tempStartTime = e.target.value
                            let tempEndTime = addTimeToDateTime(tempStartTime, item.duration)
                            if (compareTime(tempEndTime, item.dueDate) != 1) {
                                handleSetValue(index, { endTime: tempEndTime, startTime: tempStartTime })
                            } else {
                                toast.error("Ngày kết thúc phải trước ngày đến hạn")
                            }
                        }}
                    />
                </div>
                <div className="flex w-[250px] items-end">
                    <input
                        type="datetime-local"
                        className="text-16-m"
                        value={schedulingProducts[index].endTime ?? ""}
                        onChange={(e) => {
                            let tempEndTime = e.target.value
                            let tempStartTime = subTimeToDateTime(tempEndTime, item.duration)
                            if (
                                compareTime(tempEndTime, formatDateTime(schedulingProducts[index].startTime)) != -1 &&
                                compareTime(tempEndTime, item.dueDate) != 1
                            ) {
                                handleSetValue(index, { endTime: tempEndTime, startTime: tempStartTime })
                            } else {
                                toast.error("Ngày kết thúc phải sau ngày bắt đầu và trước ngày đến hạn")
                            }
                        }}
                    />
                </div>
                <div className="w-[200px]">{item.dueDate}</div>
            </div>
        </Card>
    )
}
