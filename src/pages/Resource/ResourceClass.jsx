import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"

import { resourceApi } from "@/services/api"
import { usePoperMenu, useCallApi } from "@/hooks"
import { commonStoreActions } from "@/store"
import { resourceMapper } from "@/utils/functions"
import { getEquipmentClassMenuNav, getMaterialClassMenuNav, getWorkerClassMenuNav } from "@/utils/menuNavigation"
import {
    WORKER_CLASS_TABLE_COLUMNS,
    EQUIPMENT_CLASS_TABLE_COLUMNS,
    MATERIAL_CLASS_TABLE_COLUMNS,
    EQUIPMENT_CLASS_DOWNTIME_TABLE_COLUMNS,
    PROPERTIES_TABLE_COLUMNS,
} from "@/utils/tableColumns"

const handler = {
    displayText: {
        worker: "nhân viên",
        equipment: "thiết bị",
        material: "vật tư",
    },
    header: {
        worker: WORKER_CLASS_TABLE_COLUMNS,
        equipment: EQUIPMENT_CLASS_TABLE_COLUMNS,
        material: MATERIAL_CLASS_TABLE_COLUMNS,
        equipmentDownTime: EQUIPMENT_CLASS_DOWNTIME_TABLE_COLUMNS,

    },
    menuNav: {
        worker: getWorkerClassMenuNav(),
        equipment: getEquipmentClassMenuNav(),
        material: getMaterialClassMenuNav(),
    },
    fetchData: {
        worker: resourceApi.worker.getWorkerClasses,
        equipment: resourceApi.equipment.getEquipmentClasses,
        material: resourceApi.material.getMaterialClasses,
    },
    addClass: {
        worker: (data) => resourceApi.worker.createWorkerClass(data),
        equipment: (data) => resourceApi.equipment.createEquipmentClass(data),
        material: (data) => resourceApi.material.createMaterialClass(data),
    },
    editClass: {
        worker: (data, currentItem) => resourceApi.worker.updateWorkerClass(data, currentItem.personnelClassId),
        equipment: (data, currentItem) =>
            resourceApi.equipment.updateEquipmentClass(data, currentItem.equipmentClassId),
        material: (data, currentItem) => resourceApi.material.updateMaterialClass(data, currentItem.materialClassId),
    },
    delete: {
        // worker: (item) => resourceApi.worker.deleteWorker(item.personId),
        equipment: (item) => resourceApi.equipment.deleteEquipmentClass(item.equipmentClassId),
        // material: (item) => resourceApi.material.deleteMaterial(item.materialDefinitionId),
    },
}

function ResourceClass() {
    const params = useParams()
    const resourceType = params.type
    const dispatch = useDispatch()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()

    const [resData, setResData] = useState()
    const [dataError, setdataError] = useState(false)
    const [activedItem, setActivedItem] = useState(null)
    const [initValue, setInitValue] = useState()
    const [deleteConfirm, setDeleteConfirm] = useState({})

    const fetchData = useCallback(() => {
        return callApi(handler.fetchData[resourceType], (res) => {
            setResData(res.items)
            setActivedItem(null)
        })
    }, [resourceType, callApi])
    const handleTableRowClick = (row, index) => {
        const activedRow = resData[index]
        setActivedItem(activedRow)
        setdataError(true)
    }
    console.log(dataError)
    if (activedItem) { 
    console.log(activedItem.downtimeTypes) }
    const handleAddClass = (e) => {
        setInitValue(null)
        handleOpen(e)
    }

    const handleEditClass = (e) => {
        setInitValue(resourceMapper.resourceClass.apiToClient(activedItem))
        handleOpen(e)
    }

    const handleSubmit = (value) => {
        if (!initValue) {
            const data = resourceMapper.resourceClass.clientToApi(value)
            callApi(
                () => handler.addClass[resourceType](data),
                fetchData,
                `Tạo loại ${handler.displayText[resourceType]} mới thành công`,
            )
        } else {
            const data = resourceMapper.resourceClass.clientToApi(value)
            callApi(
                () => handler.editClass[resourceType](data, activedItem),
                fetchData,
                `Cập nhật loại ${handler.displayText[resourceType]} thành công`,
            )
        }
    }

    const handleDelete = (item) => {
        console.log(item)
        setDeleteConfirm({
            show: true,
            title: `Xác nhận xóa loại ${handler.displayText[resourceType]} ${item.name}`,
            content: "",
            onConfirm() {
                callApi(() => handler.delete[resourceType](item), fetchData, `Xóa ${item.name} thành công`)
            },
        })
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle("Quản lý loại " + handler.displayText[resourceType]))
    }, [dispatch, resourceType])
    if (resourceType) 
    console.log("resourceType", resourceType)
    return (
        <div data-component="ResourceClass" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <h3 className="ml-1 mb-1">Danh sách loại {handler.displayText[resourceType]}</h3>
                {resData && (
                    <div className="scroll-y h-[calc(100%-90px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            headers={handler.header[resourceType]}
                            body={resData}
                            sticky
                            onRowClick={handleTableRowClick}
                            onEdit={handleEditClass}
                            onDeleteRow={handleDelete}
                            unActive={!activedItem}
                        />
                        {dataError && (
                        <div>
                        <h3 className="ml-1 mb-1">Thời gian dừng thiết bị {activedItem.equipmentClassId}</h3>
                        <Table
                            activable
                            primary
                            headers={handler.header["equipmentDownTime"]}
                            body={activedItem.downtimeTypes}
                            sticky
                        />
                        </div>
                        )}
                    </div>
                )}
                <Button onClick={handleAddClass} className="mt-5">
                    {`Thêm loại ${handler.displayText[resourceType]}`}
                </Button>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={handler.menuNav[resourceType]}
                        onClick={handleSubmit}
                        initValue={initValue ? initValue : undefined}
                        activateValidation={false}
                    />
                )}
            </div>

            {/* {activedItem && (
                <div className="h-full  w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                    <h3 className="ml-1 mb-1">Thuộc tính loại {handler.displayText[resourceType]}</h3>
                    <div className="scroll-y h-[calc(100%-30px)] p-1 pt-0">
                        <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={activedItem.properties} />
                    </div>
                </div>
            )} */}

            {deleteConfirm.show && (
                <Confirm
                    title={deleteConfirm.title}
                    content={deleteConfirm.content}
                    onConfirm={deleteConfirm.onConfirm}
                    onClose={() => setDeleteConfirm({ show: false })}
                />
            )}
        </div>
    )
}

export default ResourceClass

/**
 * resData: lưu res từ api
 * activedItem: data của hàng đang được chọn
 * initValue: data truyền cho poper menu khi chỉnh sửa 1 hàng
 *
 * nhấn nút thêm class: set initValue thành null --> nhập dữ liệu --> submit
 * nhấn nút sửa: set initValue thành dữ liệu của hàng đang được chọn sau khi đã map qua client interface  --> sửa --> submit
 * initValue == null ? add : edit
 */
