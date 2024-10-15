import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"

import { usePoperMenu, useCallApi } from "@/hooks"
import { schedulingActions } from "@/store"
import { orderApi, hierarchyApi } from "@/services/api"
import { PRODUCTION_COMMAND_TABLE_COLUMNS } from "@/utils/tableColumns"
import { getProductionCommandMenuNav } from "@/utils/menuNavigation"
import { paths } from "@/config"
import { getPrerequisteOperationList } from "@/utils/functions"

function ProductionCommand() {
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const location = useLocation()
    const manufacturingOrderId = location.state

    const [workOrders, setWorkOrders] = useState([])
    const [initValue, setInitValue] = useState()
    const [schedulingOrders, setSchedulingOrders] = useState([])
    const [fourSelectData, setFourSelectData] = useState([]) // dùng để tạo select cho work center
    const [deleteConfirm, setDeleteConfirm] = useState({})
    const [prerequisiteOperations, setPrerequistteOperations] = useState([])

    const fetchWorkOrders = useCallback(() => {
        callApi(
            [orderApi.workOrder.getWorkOrders(manufacturingOrderId), hierarchyApi.enterprise.getEnterprise()],
            ([workOrder, fourSelectData]) => {
                console.log(workOrder)
                setWorkOrders(
                    workOrder.items.map((item) => {
                        return {
                            ...item,
                            startTime: null,
                            endTime: null,
                        }
                    }),
                )
                setPrerequistteOperations(getPrerequisteOperationList(workOrder.items, "workOrderId", "workOrderId"))
                setFourSelectData(fourSelectData.items)
            },
        )
    }, [callApi])

    const handleSubmit = (value) => {
        if (!initValue) {
            let sendData = {
                ...value.info,
                prerequisiteOperations: [value.info.prerequisiteOperations],
                workOrderStatus: parseInt(value.info.workOrderStatus),
                ...value.fourSelect,
            }
            callApi(
                () => orderApi.workOrder.createWorkOrders(sendData, manufacturingOrderId),
                fetchWorkOrders,
                "Tạo đơn công đoạn thành công",
            )
        } else {
            let sendData = {
                ...value.info,
                prerequisiteOperations: [value.info.prerequisiteOperations],
                workOrderStatus: parseInt(value.info.workOrderStatus),
                ...value.fourSelect,
            }
            callApi(
                () => orderApi.workOrder.updateWorkOrders(sendData, manufacturingOrderId, initValue.info.workOrderId),
                fetchWorkOrders,
                "Sửa đơn công đoạn thành công",
            )
        }
    }
    const handleDeleteRow = (row) => {
        const workOrderId = row.workOrderId
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa đơn công đoạn " + workOrderId,
            content: `Đơn công đoạn ${workOrderId} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => orderApi.workOrder.deleteWorkOrders(workOrderId),
                    fetchWorkOrders,
                    `Đơn công đoạn ${workOrderId} được xóa thành công`,
                )
            },
        })
    }

    useEffect(() => {
        fetchWorkOrders()
    }, [fetchWorkOrders])
    const handleEdit = (e, row, index) => {
        setInitValue({
            info: {
                ...row,
            },
            fourSelect: {
                ...row,
            },
            properties: [],
        })
        handleOpen(e)
    }
    const handleSelectOrder = (row, index) => {
        setSchedulingOrders([...schedulingOrders, row])
        setWorkOrders((prevData) => prevData.filter((item, _index) => item.workOrderId !== row.workOrderId))
    }
    const handleScheduling = () => {
        dispatch(schedulingActions.setSchedulingProducts(schedulingOrders))
        navigate(paths.scheduling)
    }

    const handleRemoveItem = (id) => {
        const newValue = schedulingOrders.filter((item) => {
            if (item.workOrderId !== id) {
                return true
            } else {
                setWorkOrders([...workOrders, item])
                return false
            }
        })
        setSchedulingOrders(newValue)
    }
    return (
        <div data-component="ProductionCommand" className="container flex h-full">
            <div className="mr-5 flex h-full grow flex-col gap-5">
                <Card className="h-full">
                    <div className="mb-5 flex items-center justify-between">
                        <h3>Danh sách đơn công đoạn thuộc đơn sản xuất {manufacturingOrderId}</h3>
                        <Button large className="mt-2" onClick={handleOpen}>
                            Đơn công đoạn mới
                        </Button>
                    </div>
                    <div className="scroll-y h-[calc(100%-70px)]">
                        {workOrders.length > 0 ? (
                            <Table
                                headers={PRODUCTION_COMMAND_TABLE_COLUMNS}
                                body={workOrders}
                                sticky
                                // onRowClick={handleSelectOrder}
                                onDeleteRow={handleDeleteRow}
                                onEdit={handleEdit}
                            />
                        ) : (
                            <div className="text-16-m">Hiện tại không có đơn công đoạn nào, vui lòng tạo mới.</div>
                        )}
                    </div>
                </Card>
                {schedulingOrders.length > 0 && (
                    <Card className="scroll-y grow">
                        <h3>Danh sách lệnh sản xuất được điều độ</h3>
                        <div className="mb-4 flex flex-wrap">
                            {schedulingOrders.map((item, index) => (
                                <div
                                    key={item.workOrderId}
                                    className="text-16-m group relative mr-3 mt-1 flex
                                        cursor-pointer whitespace-nowrap rounded-lg shadow-sub transition-all hover:bg-accent-2"
                                    onClick={() => handleRemoveItem(item.workOrderId)}
                                >
                                    <span className="px-3 py-1">{item.workOrderId}</span>
                                    <span
                                        className="absolute top-[50%] right-[-10px] hidden
                                            h-8 w-8 translate-y-[-50%] items-center justify-center 
                                            rounded-full bg-accent-1 text-neutron-4 group-hover:flex"
                                    >
                                        <MdOutlineClose className="text-2xl" />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button large onClick={handleScheduling}>
                            Lên kế hoạch sx
                        </Button>
                    </Card>
                )}
            </div>

            {active && (
                <PoperMenu
                    menuNavigaton={getProductionCommandMenuNav(prerequisiteOperations, fourSelectData)}
                    position={position}
                    onClose={() => {
                        setInitValue(undefined)
                        handleClose()
                    }}
                    onClick={handleSubmit}
                    activateValidation={false}
                    initValue={initValue ? initValue : undefined}
                />
            )}

            {deleteConfirm.actived && (
                <Confirm
                    title={deleteConfirm.title}
                    content={deleteConfirm.content}
                    onClose={() => setDeleteConfirm({ actived: false })}
                    onConfirm={deleteConfirm.onConfirm}
                />
            )}
        </div>
    )
}

export default ProductionCommand
