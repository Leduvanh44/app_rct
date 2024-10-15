import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { RiDeleteBin4Line } from "react-icons/ri"
import cl from "classnames"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Radialbar from "@/components/Radialbar"
import TextInput from "@/components/TextInput"
import Confirm from "@/components/Confirm"

import { useCallApi } from "@/hooks"
import { workOrderApi, orderApi } from "@/services/api"
import { handleGetWorkOrderProgress, handleWorkOrderCompleted } from "@/services/signalr"
import { paths } from "@/config"
import { PRODUCT_SCHEDULE_STATUS_LIST } from "@/utils/constants"
import { commonStoreActions } from "@/store"
import { addTimeToDateTime, convertISOToLocaleDate, getCurrentDateTime } from "@/utils/functions"
import { handleWorkOrderProgressUpdated } from "@/services/signalr"
import hubConnection from "@/services/signalr/productionProgress/hubConnection"

function mergeArrays(array1, array2) {
    if (Array.isArray(array1) && Array.isArray(array2)) {
        return array1.map((item1) => {
            const matchingItem = array2.find((item2) => item1.manufacturingOrder === item2.ManufacturingOrderId)
            if (matchingItem) {
                return { ...item1, actualQuantity: matchingItem.ActualQuantity, progress: matchingItem.Progress }
            } else {
                return item1
            }
        })
    }
    return array1
}

function ProductionProgress() {
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const notifications = useSelector((state) => state.common.notifications)
    const [workOrders, setWorkOrders] = useState([])

    const [status, setStatus] = useState(["0"])
    const [searchInput, setSearchInput] = useState("")
    const [resData, setResData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [progressData, setProgressData] = useState({})
    const [confirmData, setConfirmData] = useState({})
    const [connection, setConnection] = useState()
    const [signalrData, setSignalrData] = useState([{
        ManufacturingOrderId: "",
        WorkOrderId: "",
        ActualQuantity: "",
        Progress: "",
    }])
    useEffect(() => {
        hubConnection.start().then((connection) => {
            setConnection(connection)
        })
    }, [])
    useEffect(() => {
        if (connection) {
            connection.on("WorkOrderProgressUpdated", (a, b, c, d) => {
                console.log(a + b + " " + c + " " + d)
                setSignalrData([{
                    ManufacturingOrderId: a,
                    WorkOrderId: b,
                    ActualQuantity: c,
                    Progress: d,
                }])
            })
        }
    }, [connection])
    console.log(signalrData)
    useEffect(() => {
        let newTagList = mergeArrays(filterData, signalrData)
        console.log("newdata")
        setFilterData(newTagList)
    }, [signalrData])
    const fetchData = useCallback(() => {
        return callApi(workOrderApi.getWorkOrders, (res) => {
            // setResData(res.items.filter((item) => item.isScheduled).reverse())
            const _progressData = {}
            res.items.forEach((item) => {
                _progressData[item.workOrderId] = {
                    actualQuantity: item.actualQuantity,
                    progressPercentage: item.progressPercentage,
                }
            })
            setProgressData(_progressData)
        })
    }, [callApi])
    const fetchWorkOrders = useCallback(() => {
        callApi([orderApi.workOrder.getWorkOrders("")], ([workOrder]) => {
            setWorkOrders(workOrder.items)
        })
    }, [callApi])
    useEffect(() => {
        fetchWorkOrders()
    }, [fetchWorkOrders])

    const handleStart = (item) => {
        setConfirmData({
            title: "Xác nhận bắt đầu lệnh sản xuất",
            content: "Bắt đầu lệnh sản xuất theo kế hoạch",
            actived: true,
            onConfirm() {
                let sendData = {
                    ...item,
                    actuallyStartTime: addTimeToDateTime(getCurrentDateTime(), "07:00:00"),
                    workOrderStatus: 3,
                }
                console.log(sendData)
                callApi(
                    () => orderApi.workOrder.updateWorkOrders(sendData, item.manufacturingOrder, item.workOrderId),
                    fetchWorkOrders,
                    "Bắt đầu lệnh sản xuất thành công",
                )
            },
        })
    }

    const handleClose = (item) => {
        setConfirmData({
            title: "Xác nhận hoàn thành lệnh sản xuất",
            content: "Hoàn thành lệnh sản xuất",
            actived: true,
            onConfirm() {
                let sendData = {
                    ...item,
                    actuallyStartTime: item.actuallyStartTime,
                    actuallyEndTime: addTimeToDateTime(getCurrentDateTime(), "07:00:00"),
                    workOrderStatus: 4,
                }
                callApi(
                    () => orderApi.workOrder.updateWorkOrders(sendData, item.manufacturingOrder, item.workOrderId),
                    fetchWorkOrders,
                    "Hoàn thành lệnh sản xuất",
                )
            },
        })
    }

    const handleDeleteWorkOrder = (item) => {
        setConfirmData({
            title: "Xác nhận xóa lệnh sản xuất " + item.workOrderId,
            content: "Lệnh sản xuất sẽ bị xóa vĩnh viễn và không được hiển thị trên trang này nữa",
            actived: true,
            onConfirm() {
                callApi(
                    () => orderApi.workOrder.deleteWorkOrders(item.manufacturingOrder, item.workOrderId),
                    fetchWorkOrders,
                    "Xóa lệnh sản xuất thành công",
                )
            },
        })
    }
    useEffect(() => {
        let result
        switch (status[0]) {
            case "0":
                result = workOrders
                break
            case "1":
                result = workOrders.filter((item) => item.workOrderStatus == 2)
                break
            case "2":
                result = workOrders.filter((item) => item.workOrderStatus == 3)
                break
            case "3":
                result = workOrders.filter((item) => item.workOrderStatus == 4)
                break
            default:
                result = workOrders
                break
        }
        setFilterData(
            result.filter(
                (item) => item.workOrderId.includes(searchInput) || item.manufacturingOrder.includes(searchInput),
            ),
        )
    }, [status, resData, searchInput, workOrders])

    // thông báo trễ lịch sản xuất
    useEffect(() => {
        fetchData().then(({ items }) => {
            const notOnTimeWorkOrders = []
            const today = new Date()
            items.forEach((item) => {
                const startDate = new Date(item.scheduledStartDate)
                if (item.isScheduled && !item.isStarted && startDate < today) {
                    notOnTimeWorkOrders.push(item.workOrderId)
                }
            })
            notOnTimeWorkOrders.length &&
                toast.warning(`Lệnh sản xuất ${notOnTimeWorkOrders.join(", ")} trễ kế hoạch sản xuất`)

            notOnTimeWorkOrders.forEach((woId) => {
                const pushedNoti = [...notifications].reverse().find((noti) => noti.dataId === woId)
                if (
                    !pushedNoti ||
                    today.toLocaleDateString("vi") !== new Date(pushedNoti.dateTime).toLocaleDateString("vi")
                ) {
                    dispatch(
                        commonStoreActions.pushNotification({
                            content: `Lệnh sản xuất ${woId} trễ kế hoạch sản xuất`,
                            dataId: woId,
                            to: paths.progress,
                        }),
                    )
                }
            })
        })
        handleGetWorkOrderProgress(
            (workOrderId, actualQuantity, progressPercentage) => {
                setProgressData((prevData) => ({
                    ...prevData,
                    [workOrderId]: { actualQuantity, progressPercentage },
                }))
            },
            (err) => console.log(err),
        )

        handleWorkOrderCompleted(
            (workOrderId) => {
                fetchData()
                const content = `Lệnh sản xuất ${workOrderId} đã được hoàn thành`
                toast.info(content)
                dispatch(commonStoreActions.pushNotification({ content, to: paths.progress }))
            },
            (err) => console.log(err),
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, dispatch])
    console.log(filterData[0]?.actualQuantity)
    console.log(filterData[1]?.actualQuantity)
    return (
        <div data-component="ProductionProgress" className="container pb-2">
            <Card className="flex w-full items-center gap-10">
                <SelectInput
                    label="Trạng thái"
                    value={status}
                    setValue={setStatus}
                    list={PRODUCT_SCHEDULE_STATUS_LIST}
                />
                <TextInput
                    className="h-[66px] w-80"
                    label="Tìm kiếm..."
                    value={searchInput}
                    setValue={setSearchInput}
                />
            </Card>
            {filterData.map((item) => (
                <ProductionProgressItem
                    item={item}
                    handleClose={handleClose}
                    handleStart={handleStart}
                    handleDeleteWorkOrder={handleDeleteWorkOrder}
                />
            ))}

            {filterData.length === 0 && <div className="mt-5">Không có kết quả nào, vui lòng thử lại</div>}

            {confirmData.actived && (
                <Confirm
                    title={confirmData.title}
                    content={confirmData.content}
                    onConfirm={confirmData.onConfirm}
                    onClose={() => setConfirmData({ actived: false })}
                />
            )}
        </div>
    )
}

export default ProductionProgress

function ProductionProgressItem({ item, handleClose, handleStart, handleDeleteWorkOrder }) {
    return (
        <div className="mt-5 flex gap-5" key={item.workOrderId}>
            <Card className="group/container relative w-full">
                <div className="flex items-center justify-between">
                    <div>
                        <h3>{item.workOrderId}</h3>
                        <h4>{item.manufacturingOrder}</h4>
                    </div>
                    <div
                        className={cl("text-16-b  rounded-3xl px-5 py-2 text-neutron-4", {
                            "bg-primary-2": item.workOrderStatus == 3,
                            "bg-primary-1": item.workOrderStatus == 4,
                            "bg-accent-1": item.workOrderStatus == 2,
                        })}
                    >
                        {item.workOrderStatus == 4
                            ? "Đã hoàn thành"
                            : item.workOrderStatus == 3
                            ? "Đang sản xuất"
                            : "Chưa sản xuất"}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="">
                        <div className="mb-1">
                            <span className="text-16-b inline-block w-72">ID sản phẩm</span>
                            <span>{item.materialDefinition}</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-16-b inline-block w-72">Ngày bắt đầu theo kế hoạch</span>
                            <span>{convertISOToLocaleDate(item.startTime)}</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-16-b inline-block w-72">Ngày hoàn thành theo kế hoạch</span>
                            <span>{convertISOToLocaleDate(item.endTime)}</span>
                        </div>
                        {item.actuallyStartTime && (
                            <div className="mb-1">
                                <span className="text-16-b inline-block w-72">Ngày bắt đầu thực tế</span>
                                <span>{convertISOToLocaleDate(item.actuallyStartTime)}</span>
                            </div>
                        )}
                        {item.actuallyEndTime && (
                            <div className="mb-1">
                                <span className="text-16-b inline-block w-72">Ngày hoàn thành thực tế</span>
                                <span>{convertISOToLocaleDate(item.actuallyEndTime)}</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="mb-1">
                            <span className="text-16-b inline-block w-40">Tổng số</span>
                            <span>{item.productionTarget}</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-16-b inline-block w-40">Đã hoàn thành</span>
                            <span>{item.actualQuantity}</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-16-b inline-block w-40">Tiến độ sản xuất</span>
                            <span>{(item.progress * 100).toFixed(2)} %</span>
                        </div>
                    </div>
                    <Radialbar value={item.progress * 100} width={280} fontSize={24} />
                </div>

                <div className="flex gap-5">
                    {item.workOrderStatus == 2 && (
                        <Button onClick={() => handleStart(item)} small>
                            Bắt đầu sản xuất
                        </Button>
                    )}
                    {item.workOrderStatus == 3 && (
                        <Button onClick={() => handleClose(item)}>Hoàn thành lệnh sản xuất</Button>
                    )}
                </div>
                {item.workOrderStatus == 4 && (
                    <RiDeleteBin4Line
                        className={cl(
                            "absolute bottom-5 right-5 h-10 w-10 rounded-full bg-warning-2",
                            "invisible cursor-pointer p-2 text-xl text-warning-1 transition-all",
                            "group-hover/container:visible",
                        )}
                        onClick={() => handleDeleteWorkOrder(item)}
                    />
                )}
            </Card>
        </div>
    )
}
