import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"
import SelectInput from "@/components/SelectInput/SelectInput"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import WorkOderList from "./WorkOderList"

import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"
import { orderApi, resourceApi, InjectionMachineApi } from "@/services/api"
import { usePoperMenu, useCallApi } from "@/hooks"
import { paths } from "@/config"
import { MANUFACTURING_ORDER_TABLE_COLUMNS } from "@/utils/tableColumns"
import {
    getCreateManufacturingOrderMenuNav,
    getEditManufacturingOrderMenuNav,
    getCreateInjectionManufacturingOrderMenuNav,
} from "@/utils/menuNavigation"
import {
    getResourceOptionsList,
    injectionMachineManufacturingOrderMapper,
    manufacturingOrderMapper,
} from "@/utils/functions"
import { MANUFACTURING_ORDER_MODE_LIST, MANUFACTORING_ORDER_LIST } from "@/utils/constants"

function ManufacturingOrder() {
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const callApi = useCallApi()

    const [manufacturingOrder, setManufacturingOrder] = useState([])
    const [injectionManufacturingOrder, setInjectionManufacturingOrder] = useState([])
    const [materialDefinitionList, setMaterialDefinitionList] = useState([]) // lưu danh sách material definition để truyền vào poper menu tạo đơn sản xuất mới
    const [injectionEquipmentList, setInjectionEquipmentList] = useState([]) // lưu danh sách material definition để truyền vào poper menu tạo đơn sản xuất mới

    const [deleteConfirm, setDeleteConfirm] = useState({})
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [toggleButtonModeState, setToggleButtonModeSate] = useState(0) //state của toggle button
    const [activateWorkOrderListPageState, setActivateWorkOrderListPageSate] = useState(0) // state để lưu trạng thái có hiện trang WorkOrderList không
    const [manuOrderTypeSelect, setManuOrderTypeSelect] = useState("normal") // state để lưu trạng thái select
    const fetchData = useCallback(() => {
        callApi(
            [
                orderApi.manufacturingOrder.getManufacturingOrders(),
                InjectionMachineApi.plasticProduct.getPlasticProduct(),
                InjectionMachineApi.manufacturingOrder.getManufacturingOrder(),
                InjectionMachineApi.injectionMachine.getInjectionMachine(),
            ],
            (res) => {
                console.log(res)
                setManufacturingOrder(res[0].items)
                setMaterialDefinitionList(getResourceOptionsList(res[1].items, "plasticProductId"))
                setInjectionManufacturingOrder(res[2].items)
                setInjectionEquipmentList(getResourceOptionsList(res[3].items, "equipmentId"))
            },
        )
    }, [callApi])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    // console.log(materialDefinitionList)
    const handleSubmit = (value) => {
        console.log(value.info)
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            switch (toggleButtonModeState) {
                case 1:
                    data = injectionMachineManufacturingOrderMapper.clientToAPI(value) // Or any other specific data handling for "workUnit" mode
                    callApiFunction = InjectionMachineApi.manufacturingOrder.createManufacturingOrder(data)
                    successMessage = "Tạo đơn sản xuất máy ép thành công"
                    break
                default:
                    data = manufacturingOrderMapper.clientToAPI(value) // Or any other specific data handling for the last case
                    callApiFunction = orderApi.manufacturingOrder.createManufacturingOrders(data)
                    successMessage = "Tạo đơn sản xuất thành công"
                    break
            }
        } else {
            switch (toggleButtonModeState) {
                case 1:
                    console.log("edit injection")
                    break
                default:
                    console.log("edit normal")
                    break
            }
        }

        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e, row, index) => {
        setInitValue({
            info: {
                ...manufacturingOrder[index],
                materialDefinitionId: manufacturingOrder[index].materialDefinition.materialDefinitionId,
            },
            properties: [],
        })
        handleOpen(e)
    }
    const handleDeleteRow = (row) => {
        const manufacturingOrderId = row.manufacturingOrderId
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa đơn sản xuất " + manufacturingOrderId,
            content: `Đơn sản xuất ${manufacturingOrderId} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => orderApi.manufacturingOrder.deleteManufacturingOrders(manufacturingOrderId),
                    fetchData,
                    `Đơn sản xuất ${manufacturingOrderId} được xóa thành công`,
                )
            },
        })
    }
    const handleRowClick = (row, index) => {
        navigate("/work-order", { state: row.manufacturingOrderId })
    }
    return (
        <div className="flex h-full flex-col">
            {activateWorkOrderListPageState == 1 ? (
                <WorkOderList />
            ) : (
                <>
                    <div className="">
                        <ToggleButtons
                            active={toggleButtonModeState}
                            onClick={setToggleButtonModeSate}
                            titles={MANUFACTURING_ORDER_MODE_LIST}
                        />
                    </div>

                    <div data-component=" ProductionCommand" className="container mt-2 flex grow flex-col">
                        <Card className="mr-5 flex h-40 grow flex-col gap-5 overflow-scroll">
                            <div className="mb-5 flex items-center justify-between">
                                <h3>Danh sách đơn sản xuất</h3>
                                {/* <Button large className="mt-2" onClick={handleOpen}>
                                Đơn sản xuất mới
                            </Button> */}
                            </div>
                            <div className="scroll-y h-full">
                                <div className="text-16-m"></div>
                                {manufacturingOrder.length > 0 ? (
                                    <Table
                                        headers={MANUFACTURING_ORDER_TABLE_COLUMNS}
                                        body={
                                            toggleButtonModeState == 0
                                                ? manufacturingOrder
                                                : injectionManufacturingOrder
                                        }
                                        sticky
                                        onRowClick={handleRowClick}
                                        onDeleteRow={handleDeleteRow}
                                        // onEdit={handleEdit}
                                    />
                                ) : (
                                    <div className="text-16-m">
                                        Hiện tại không có đơn sản xuất nào, vui lòng tạo mới !!!
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </>
            )}

            <div className=" mt-2 flex items-end">
                {activateWorkOrderListPageState == 0 ? (
                    <>
                        {/* <SelectInput
                            label={`Chọn loại vật tư`}
                            list={MANUFACTORING_ORDER_LIST}
                            value={manuOrderTypeSelect}
                            setValue={setManuOrderTypeSelect}
                        /> */}
                        <Button onClick={handleOpen}>
                            {toggleButtonModeState == 0 ? "Thêm đơn thường" : "Thêm đơn máy ép"}
                        </Button>
                    </>
                ) : (
                    <></>
                )}

                <Button
                    className="ml-auto mr-5"
                    onClick={() => setActivateWorkOrderListPageSate(!activateWorkOrderListPageState)}
                >
                    Điều độ sản xuất
                </Button>
            </div>
            {active && (
                <PoperMenu
                    menuNavigaton={
                        initValue
                            ? getEditManufacturingOrderMenuNav(materialDefinitionList)
                            : toggleButtonModeState == 0
                            ? getCreateManufacturingOrderMenuNav(materialDefinitionList)
                            : getCreateInjectionManufacturingOrderMenuNav(
                                  materialDefinitionList,
                                  injectionEquipmentList,
                              )
                    }
                    position={position}
                    onClose={() => {
                        setInitValue(undefined)
                        handleClose()
                    }}
                    activateValidation={false}
                    onClick={handleSubmit}
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

export default ManufacturingOrder
