import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"
import SelectInput from "@/components/SelectInput/SelectInput"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"

import { usePoperMenu, useCallApi } from "@/hooks"
import { resourceApi, hierarchyApi, InjectionMachineApi } from "@/services/api"
import { commonStoreActions } from "@/store"
import { paths } from "@/config"
import {
    MACHINE_TYPE_LIST,
    MATERIAL_TYPE_LIST,
    RESOURCE_PAGE_EQUIPMENT_LIST,
    RESOURCE_PAGE_MATERIAL_LIST,
} from "@/utils/constants"
import {
    resourceMapper,
    getResourceOptionsList,
    normalMachineMapper,
    injectionMachineMapper,
    moldMapper,
    plasticProductsMapper,
    normalMaterialMapper,
    plasticMaterialMapper,
} from "@/utils/functions"
import {
    WORKER_INFO_TABLE_COLUMNS,
    PROPERTIES_TABLE_COLUMNS,
    EQUIPMENT_INFO_TABLE_COLUMNS,
    PLASTICMATERIAL_INFO_TABLE_COLUMNS,
    MATERIAL_INFO_TABLE_COLUMNS,
    RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER,
    RESOURCE_EQUIPMENT_ACCORDION_TABLE_HEADER,
    MATERIAL_LOT_TABLE_COLUMNS,
    EQUIPMENT_NORMALMACHINE_PROPERTIES_TABLE_COLUMNS,
    EQUIPMENT_ERROR_PROPERTIES_TABLE_COLUMNS,
    MOLD_INFO_TABLE_COLUMNS,
    PLASTICPRODUCT_INFO_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    getCreateWorkerMenuNav,
    getCreateEquipmentMenuNav,
    getCreateMaterialMenuNav,
    getCreatePlasticProductsMenuNav,
    getCreateWorkUnitMenuNav,
    getCreateOperationMenuNav,
    getCreateInjectionMachineMenuNav,
    getCreateMoldMenuNav,
    getEditWorkerMenuNav,
    getEditEquipmentMenuNav,
    getEditMaterialMenuNav,
    getEditWorkUnitMenuNav,
    getEditOperationMenuNav,
    getCreatePlasticMaterialMenuNav,
} from "@/utils/menuNavigation"

const handler = {
    label: {
        worker: "nhân viên",
        equipment: "thiết bị",
        material: "vật tư",
    },
    createMenuNav: {
        worker: (list) => getCreateWorkerMenuNav(list),
        equipment: (equipmentTypeList, equipmentWorkUnitList) =>
            getCreateEquipmentMenuNav(equipmentTypeList, equipmentWorkUnitList),
        injectionMachine: (moldList, equipmentWorkUnitList) =>
            getCreateInjectionMachineMenuNav(moldList, equipmentWorkUnitList),
        mold: (injectionMachineList, equipmentWorkUnitList) =>
            getCreateMoldMenuNav(injectionMachineList, equipmentWorkUnitList),
        material: () => getCreateMaterialMenuNav(),
        workUnit: () => getCreateWorkUnitMenuNav(),
        operation: (list) => getCreateOperationMenuNav(list),
        normalMaterial: () => getCreateMaterialMenuNav(),
        PlasticProducts: (moldList, plasticMaterialsList) =>
            getCreatePlasticProductsMenuNav(moldList, plasticMaterialsList),
        PlasticMaterial: () => getCreatePlasticMaterialMenuNav(),
    },
    // thông tin bảng phụ
    editMenuNav: {
        worker: (list) => getEditWorkerMenuNav(list),
        equipment: (equipmentTypeList, equipmentWorkUnitList) =>
            getEditEquipmentMenuNav(equipmentTypeList, equipmentWorkUnitList),
        material: (list) => getEditMaterialMenuNav(list),
        workUnit: () => getEditWorkUnitMenuNav(),
        operation: (list) => getEditOperationMenuNav(list),
    },
    headers: {
        worker: WORKER_INFO_TABLE_COLUMNS,
        equipment: EQUIPMENT_INFO_TABLE_COLUMNS,
        material: MATERIAL_INFO_TABLE_COLUMNS,
        mold: MOLD_INFO_TABLE_COLUMNS,
        plasticMaterial: PLASTICMATERIAL_INFO_TABLE_COLUMNS,
        plasticProduct: PLASTICPRODUCT_INFO_TABLE_COLUMNS,
    },
    fetchData: {
        worker: resourceApi.worker.getWorkers,
        equipment: resourceApi.equipment.getEquipments,
        material: resourceApi.material.getMaterials,
        materialLot: resourceApi.material.getMaterialLot,
        getPreviousOperation: (id) => resourceApi.material.getPreviousOperation(id),
        injectionMachine: InjectionMachineApi.injectionMachine.getInjectionMachine,
        mold: InjectionMachineApi.mold.getMold,
        plasticProduct: InjectionMachineApi.plasticProduct.getPlasticProduct,
        PlasticMaterial: InjectionMachineApi.plasticMaterial.getPlasticMaterial,
    },
    fetchClasses: {
        worker: resourceApi.worker.getWorkerClasses,
        equipment: resourceApi.equipment.getEquipmentClasses,
        material: resourceApi.material.getMaterialClasses,
    },
    classesList: {
        worker: (items) => getResourceOptionsList(items, "personnelClassId"),
        equipment: (items) => getResourceOptionsList(items, "equipmentClassId"),
        material: (items) => getResourceOptionsList(items, "materialClassId"),
        injectionMachine: (items) => getResourceOptionsList(items, "equipmentId"),
        mold: (items) => getResourceOptionsList(items, "moldId"),
        plasticMaterial: (items) => getResourceOptionsList(items, "plasticMaterialId"),
    },
    create: {
        worker: (data) => resourceApi.worker.createWorker(data),
        equipment: (data) => resourceApi.equipment.createEquipment(data),
        material: (data) => resourceApi.material.createMaterial(data),
        materialUnit: (data, id) => resourceApi.material.createMaterialUnit(data, id),
        operation: (data, id) => resourceApi.material.createOperation(data, id),
        injectionMachine: (data) => InjectionMachineApi.injectionMachine.createInjectionMachine(data),
        mold: (data) => InjectionMachineApi.mold.createMold(data),
        plasticProduct: (data) => InjectionMachineApi.plasticProduct.createPlasticProduct(data),
        plasticMaterial: (data) => InjectionMachineApi.plasticMaterial.createPlasticMaterial(data),
    },
    edit: {
        worker: (data, item) => resourceApi.worker.updateWorker(data, item.personId),
        equipment: (data, item) => resourceApi.equipment.updateEquipment(data, item.equipmentId),
        material: (data, item) => resourceApi.material.updateMaterial(data, item.materialDefinitionId),
        materialUnit: (data, materialDefinitionsId, materialUnitsId) =>
            resourceApi.material.updateMaterialUnit(data, materialDefinitionsId, materialUnitsId),
        operation: (data, materialDefinitionsId, OperationId) =>
            resourceApi.material.updateOperation(data, materialDefinitionsId, OperationId),
    },
    delete: {
        worker: (item) => resourceApi.worker.deleteWorker(item.personId),
        equipment: (item) => resourceApi.equipment.deleteEquipment(item.equipmentId),
        material: (item) => resourceApi.material.deleteMaterial(item.materialDefinitionId),
        materialUnit: (materialDefinitionsId, materialUnitsId) =>
            resourceApi.material.deleteMaterialUnit(materialDefinitionsId, materialUnitsId),
        operation: (materialDefinitionsId, OperationId) =>
            resourceApi.material.deleteOperation(materialDefinitionsId, OperationId),
        mold: (item) => resourceApi.worker.deleteWorker(item.personId),
    },
    workunit: {
        getWorkUnit: () => hierarchyApi.workunit.getWorkUnit(),
        handleWorkUnitList: (items) => getResourceOptionsList(items, "absolutePath"),
    },
    enterprise: {
        getEnterprise: () => hierarchyApi.enterprise.getEnterprise(),
    },
    previousOperation: {
        handlePreviousOperation: (items) => getResourceOptionsList(items, "operationId"),
    },
}
function ResourceType() {
    const dispatch = useDispatch()
    const params = useParams()
    const resourceType = params.type
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()

    const [resData, setResData] = useState([]) // chứa data mảng danh sách vật tư
    const [injectionMachineData, setInjectionMachineData] = useState([]) // chứa data máy ép
    const [moldData, setMoldData] = useState([]) // chứa data khuôn
    const [plasticMaterialData, setPlasticMaterialData] = useState([]) // chứa data máy ép
    const [plasticProductData, setPlasticProductData] = useState([]) // chứa data sản phẩm máy ép
    const [materialLotData, setMaterialLotData] = useState([])
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [classes, setClasses] = useState([]) // lưu danh sách  loại vật tư để truyền vào propermenu để tạo đối tượng mới
    const [moldProperList, setMoldProperList] = useState([]) // lưu danh sách khuôn để truyền vào propermenu để tạo đối tượng mới
    const [injectionMachineProperList, setInjectionMachineProperList] = useState([]) // lưu danh sách máy ép để truyền vào propermenu để tạo đối tượng mới
    const [plasticMaterialProperList, setPlasticMaterialProperList] = useState([]) // lưu danh sách máy ép để truyền vào propermenu để tạo đối tượng mới
    const [previousOperation, setPreviousOperation] = useState([]) // dùng trong bảng thêm công đoạn

    const [workUnit, setWorkUnit] = useState([]) // dùng trong trang thêm equitment
    const [fiveSelectData, setFiveSelectData] = useState([]) // dùng lưu dữ liệu danh sách các options cho 5 select trong trang equipment

    const [activedItem, setActivedItem] = useState() // State này lưu trữ thông tin vật tư đang được chọn hoặc được chọn gần đây nhất. Khi người dùng nhấp vào một hàng trong bảng danh sách vật tư, activedItem sẽ được cập nhật với thông tin của hàng đó.
    const [materialUnitActivedItem, setMaterialUnitActivedItem] = useState()
    const [operationActivedItem, setOperationActivedItem] = useState()

    const [equipmmentActivedItem, setEquipmentActivedItem] = useState({}) // lưu dữ liệu hàng đang được chọn trong trang equipment; đặt key là số giống với toggle button để dễ handle giao diện

    const [injectionActivedItem, setInjectionActivedItem] = useState()
    const [moldActivedItem, setMoldActivedItem] = useState()

    const [mode, setMode] = useState() //lưu mode dùng để xác định đang add bảng nào trong poperMenu
    const [resourceTypePageModeState, setResourceTypePageModeState] = useState(0) // mode cho toggle button
    const [machineTypeSelect, setMachineTypeSelect] = useState("0")
    //////////////////////////////////////////////////////
    const [modeHandler, setModeHandler] = useState({
        // dùng use ref
        submitSuccessLabel: handler.label[resourceType],
        handleSumbitCreateFunc: (data) => handler.create[resourceType](data),
    })

    ///////////////////////////////////////////////////////////////
    const fetchData = useCallback(() => {
        callApi(handler.fetchData[resourceType], (res) => {
            setResData(res.items)
            setActivedItem(null)
        })
    }, [resourceType, callApi])

    const fetchAllData = useCallback(() => {
        callApi(
            [
                handler.fetchData[resourceType](),
                handler.fetchData.mold(),
                handler.fetchData.plasticProduct(),
                handler.fetchData.PlasticMaterial(),
            ],
            (res) => {
                setResData(res[0].items)
                setMoldData(res[1].items)
                setPlasticProductData(res[2].items)
                setPlasticMaterialData(res[3].items)
                setActivedItem(null)
            },
        )
    }, [resourceType, callApi])
    //lấy data cho bảng material lot
    useEffect(() => {
        if (activedItem && params == "material") {
            handler.fetchData.materialLot(activedItem.materialDefinitionId).then((res) => setMaterialLotData(res.items))
        }
    }, [activedItem])

    const handleClick = {
        handleEquipmentClick: (row, index) => {
            const activedRow = resData[index]
            setEquipmentActivedItem({
                0: activedRow,
            })
        },
        handleInjectionMachineClick: (row, index) => {
            const activedRow = injectionMachineData[index]
            setEquipmentActivedItem({
                1: activedRow,
            })
        },
        handleMoldClick: (row, index) => {
            const activedRow = moldData[index]
            setEquipmentActivedItem({
                2: activedRow,
            })
        },
        handleMaterialDefinitionsClick: (row, index) => {
            const activedRow = resData[index]
            setActivedItem(activedRow)
        },
        handleMaterialUnitClick: (row, index) => {
            const activedRow = activedItem.secondaryUnits[index]
            setMaterialUnitActivedItem(activedRow)
        },
        handleOperationClick: (row, index) => {
            const activedRow = activedItem.operations[index]
            setOperationActivedItem(activedRow)
        },
    }

    const handleAddWorker = (e) => {
        setInitValue(null)
        handleOpen(e)
    }

    const handleEditWorker = (e, row, index, accordionTableTitle) => {
        let modee
        if (accordionTableTitle == "Đơn vị phụ") {
            setMode("workUnit")
            setModeHandler({
                submitSuccessLabel: "đơn vị phụ",
                handleSumbitCreateFunc: (data) => handler.create.materialUnit(data, activedItem.materialDefinitionId),
            })
            modee = "workUnit"
        } else if (accordionTableTitle == "Công đoạn") {
            setMode("operation")
            setModeHandler({
                submitSuccessLabel: "công đoạn",
                handleSumbitCreateFunc: (data) => handler.create.operation(data, activedItem.materialDefinitionId),
            })
            modee = "operation"
        } else {
            setMode("normal")
            modee = "normal"
        }
        const formData =
            modee == "normal" ? activedItem : modee == "workUnit" ? materialUnitActivedItem : operationActivedItem
        setInitValue(resourceMapper.resource.apiToClient(formData))
        handleOpen(e)
    }

    const handleDelete = {
        handleMaterialDefinitionsDelete: (item) => {
            setDeleteConfirm({
                show: true,
                title: `Xác nhận xóa ${handler.label[resourceType]} ${item.name}`,
                content: "",
                onConfirm() {
                    callApi(() => handler.delete[resourceType](item), fetchData, `Xóa ${item.name} thành công`)
                },
            })
        },
        handleMoldDelete: (item) => {
            setDeleteConfirm({
                show: true,
                title: `Xác nhận xóa khuôn ${item.name}`,
                content: "",
                onConfirm() {
                    callApi(
                        () => InjectionMachineApi.mold.deleteMold(item.moldId),
                        fetchMoldData,
                        `Xóa ${item.name} thành công`,
                    )
                },
            })
        },
        handlePlasticProductDelete: (item) => {
            setDeleteConfirm({
                show: true,
                title: `Xác nhận xóa sản phẩm ép ${item.name}`,
                content: "",
                onConfirm() {
                    callApi(
                        () => InjectionMachineApi.plasticProduct.deletePlasticProduct(item.plasticProductId),
                        fetchPlasticProductData,
                        `Xóa ${item.name} thành công`,
                    )
                },
            })
        },
        handlePlasticMaterialDelete: (item) => {
            setDeleteConfirm({
                show: true,
                title: `Xác nhận xóa nguyên liệu nhựa ${item.name}`,
                content: "",
                onConfirm() {
                    callApi(
                        () => InjectionMachineApi.plasticMaterial.deletePlasticMaterial(item.plasticMaterialId),
                        fetchPlasticMaterialData,
                        `Xóa ${item.name} thành công`,
                    )
                },
            })
        },
        handleMaterialUnitDelete: (item) => {
            setDeleteConfirm({
                show: true,
                title: `Xác nhận xóa đơn vị phụ ${item.unitName}`,
                content: "",
                onConfirm() {
                    callApi(
                        () =>
                            handler.delete.materialUnit(
                                activedItem.materialDefinitionId,
                                materialUnitActivedItem.unitId,
                            ),
                        fetchData,
                        `Xóa ${item.unitName} thành công`,
                    )
                },
            })
        },
        handleOperationDelete: (item) => {
            setDeleteConfirm({
                show: true,
                title: `Xác nhận xóa công đoạn ${item.name}`,
                content: "",
                onConfirm() {
                    callApi(
                        () =>
                            handler.delete.operation(
                                activedItem.materialDefinitionId,
                                operationActivedItem.operationId,
                            ),
                        fetchData,
                        `Xóa ${item.unitName} thành công`,
                    )
                },
            })
        },
    }
    // hàm tạo mới + edit khi nhấn xác nhận trong proper menu
    const handleSubmit = (value) => {
        console.log(value)
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            switch (mode) {
                case "normal":
                    switch (resourceType) {
                        case "equipment":
                            data = normalMachineMapper.clientToAPI(value)
                            callApiFunction = handler.create.equipment(data)
                            successMessage = `Tạo equipment mới thành công`
                            break
                        case "injectionMachine":
                            data = injectionMachineMapper.clientToAPI(value)
                            callApiFunction = handler.create.injectionMachine(data)
                            successMessage = `Tạo injection machine mới thành công`
                            break

                        default:
                            data = value.info
                            callApiFunction = handler.create.operation(data, activedItem.materialDefinitionId)
                            successMessage = `Tạo operation mới thành công`
                            break
                    }
                    break
                case "workUnit":
                    data = value.info // Or any other specific data handling for "workUnit" mode
                    callApiFunction = handler.create.materialUnit(data, activedItem.materialDefinitionId)
                    successMessage = `Tạo đơn vị phụ mới thành công`
                    break
                case "injectionMachine":
                    data = injectionMachineMapper.clientToAPI(value)
                    callApiFunction = handler.create.injectionMachine(data)
                    successMessage = `Tạo injection machine mới thành công`
                    break
                case "mold":
                    data = moldMapper.clientToAPI(value)
                    callApiFunction = handler.create.mold(data)
                    successMessage = `Tạo khuôn mới thành công`
                    break
                case "normalMaterial":
                    data = normalMaterialMapper.clientToAPI(value)
                    callApiFunction = handler.create.material(data)
                    successMessage = `Tạo vật tư mới thành công`
                    break
                case "PlasticProducts":
                    data = plasticProductsMapper.clientToAPI(value)
                    callApiFunction = handler.create.plasticProduct(data)
                    successMessage = `Tạo vật tư máy ép mới thành công`
                    break
                case "PlasticMaterial":
                    data = plasticMaterialMapper.clientToAPI(value)
                    callApiFunction = handler.create.plasticMaterial(data)
                    successMessage = `Tạo nguyên liệu nhựa mới thành công`
                    break
                default:
                    data = value.info // Or any other specific data handling for the last case
                    callApiFunction = handler.create.operation(data, activedItem.materialDefinitionId)
                    successMessage = `Tạo operation mới thành công`
                    break
            }
        } else {
            switch (mode) {
                case "normal":
                    data = resourceMapper.resource.clientToApi(value)
                    callApiFunction = handler.edit[resourceType](data, activedItem)
                    successMessage = `Cập nhật ${handler.label[resourceType]} thành công`
                    break
                case "workUnit":
                    data = resourceMapper.resource.clientToApi(value) // Or any other specific data handling for "workUnit" mode
                    callApiFunction = handler.edit.materialUnit(
                        data,
                        activedItem.materialDefinitionId,
                        materialUnitActivedItem.unitId,
                    )
                    successMessage = `Cập nhật đơn vị phụ thành công`
                    break
                default:
                    data = resourceMapper.resource.clientToApi(value) // Or any other specific data handling for the last case
                    callApiFunction = handler.edit.operation(
                        data,
                        activedItem.materialDefinitionId,
                        operationActivedItem.operationId,
                    )
                    successMessage = `Cập nhật công đoạn thành công`
                    break
            }
        }

        callApi(() => callApiFunction, fetchAllData, successMessage)
    }

    useEffect(() => {
        // callApi(handler.fetchClasses[resourceType], (res) => setClasses(handler.classesList[resourceType](res.items)))
        callApi(handler.fetchClasses.equipment, (res) => setClasses(handler.classesList.material(res.items)))
        callApi(handler.enterprise.getEnterprise, (res) => setFiveSelectData(res.items))
    }, [resourceType, callApi])
    //???????????????????????????????????????????????????????????????????????????????
    useEffect(() => {
        if (activedItem) {
            handler.fetchData.getPreviousOperation(activedItem.materialDefinitionId).then((res) => {
                setPreviousOperation(handler.previousOperation.handlePreviousOperation(res.items[0].operations))
            })
        }
    }, [activedItem])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const fetchInjectionMachineData = useCallback(() => {
        callApi(handler.fetchData.injectionMachine, (res) => {
            setInjectionMachineData(res.items)
        })
    }, [callApi])

    useEffect(() => {
        fetchInjectionMachineData()
    }, [fetchInjectionMachineData])

    const fetchMoldData = useCallback(() => {
        callApi(handler.fetchData.mold, (res) => {
            setMoldData(res.items)
        })
    }, [callApi])

    useEffect(() => {
        fetchMoldData()
    }, [fetchMoldData])
    const fetchPlasticMaterialData = useCallback(() => {
        callApi(handler.fetchData.PlasticMaterial, (res) => {
            setPlasticMaterialData(res.items)
        })
    }, [callApi])

    useEffect(() => {
        fetchPlasticMaterialData()
    }, [fetchPlasticMaterialData])
    const fetchPlasticProductData = useCallback(() => {
        callApi(handler.fetchData.plasticProduct, (res) => {
            setPlasticProductData(res.items)
        })
    }, [callApi])

    useEffect(() => {
        fetchPlasticProductData()
    }, [fetchPlasticProductData])
    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle("Quản lý " + handler.label[resourceType]))
    }, [dispatch, resourceType])

    useEffect(() => {
        setMoldProperList(handler.classesList.mold(moldData))
    }, [moldData])
    useEffect(() => {
        setInjectionMachineProperList(handler.classesList.injectionMachine(injectionMachineData))
    }, [injectionMachineData])
    useEffect(() => {
        setPlasticMaterialProperList(handler.classesList.plasticMaterial(plasticMaterialData))
    }, [plasticMaterialData])
    console.log(plasticMaterialData)
    console.log(activedItem)
    return (
        <div data-component="ResourceType" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <ToggleButtons
                    active={resourceTypePageModeState}
                    onClick={setResourceTypePageModeState}
                    titles={resourceType == "equipment" ? RESOURCE_PAGE_EQUIPMENT_LIST : RESOURCE_PAGE_MATERIAL_LIST}
                />

                <div className="scroll-y mt-2 h-[calc(100%-110px)] p-1 pt-0">
                    {resourceTypePageModeState == 0 && (
                        <>
                            <Table
                                activable
                                primary
                                headers={handler.headers[resourceType]}
                                body={resData}
                                onRowClick={
                                    resourceType == "equipment"
                                        ? handleClick.handleEquipmentClick
                                        : handleClick.handleMaterialDefinitionsClick
                                }
                                // onEdit={handleEditWorker}
                                onDeleteRow={handleDelete.handleMaterialDefinitionsDelete}
                                sticky
                                unActive={!activedItem}
                                setMode={setMode}
                            />
                            {/* {materialLotData && (
                                <>
                                    <h3 className="ml-1 mb-1 mt-2">Lô vật tư</h3>
                                    <Table
                                        activable
                                        primary
                                        headers={MATERIAL_LOT_TABLE_COLUMNS}
                                        body={materialLotData}
                                        sticky
                                        unActive={!activedItem}
                                        setMode={setMode}
                                    />
                                </>
                            )} */}
                        </>
                    )}
                    {/* injection machine table */}
                    {resourceTypePageModeState == 1 && (
                        <>
                            <Table
                                activable
                                primary
                                headers={
                                    resourceType == "equipment"
                                        ? handler.headers.equipment
                                        : handler.headers.plasticProduct
                                }
                                body={resourceType == "equipment" ? injectionMachineData : plasticProductData}
                                onRowClick={
                                    resourceType == "equipment"
                                        ? handleClick.handleInjectionMachineClick
                                        : handleClick.handleMaterialDefinitionsClick
                                }
                                // onEdit={handleEditWorker}
                                onDeleteRow={
                                    resourceType == "equipment"
                                        ? handleDelete.handleMaterialDefinitionsDelete
                                        : handleDelete.handlePlasticProductDelete
                                }
                                sticky
                                unActive={!activedItem}
                                setMode={setMode}
                            />
                        </>
                    )}
                    {/* mold table */}
                    {resourceTypePageModeState == 2 && (
                        <>
                            <Table
                                activable
                                primary
                                headers={
                                    resourceType == "equipment" ? handler.headers.mold : handler.headers.plasticMaterial
                                }
                                body={resourceType == "equipment" ? moldData : plasticMaterialData}
                                onRowClick={handleClick.handleMoldClick}
                                // onEdit={handleEditWorker}
                                onDeleteRow={
                                    resourceType == "equipment"
                                        ? handleDelete.handleMoldDelete
                                        : handleDelete.handlePlasticMaterialDelete
                                }
                                sticky
                                unActive={!activedItem}
                                setMode={setMode}
                            />
                        </>
                    )}
                </div>
                <div className="flex items-end">
                    {/* <SelectInput
                        label={`Chọn loại ${handler.label[resourceType]}`}
                        list={resourceType == "equipment" ? MACHINE_TYPE_LIST : MATERIAL_TYPE_LIST}
                        value={machineTypeSelect}
                        setValue={setMachineTypeSelect}
                    /> */}
                    <Button
                        onClick={(e) => {
                            setMode(
                                resourceType == "equipment"
                                    ? resourceTypePageModeState == 0
                                        ? "normal"
                                        : resourceTypePageModeState == 1
                                        ? "injectionMachine"
                                        : "mold"
                                    : resourceTypePageModeState == 0
                                    ? "normalMaterial"
                                    : resourceTypePageModeState == 1
                                    ? "PlasticProducts"
                                    : "PlasticMaterial",
                            )
                            handleAddWorker(e)
                        }}
                        className="mt-4 mr-5 w-60"
                    >
                        {resourceTypePageModeState == 0 && resourceType == "equipment" && "Thêm máy"}
                        {resourceTypePageModeState == 1 && resourceType == "equipment" && "Thêm máy ép"}
                        {resourceTypePageModeState == 2 && resourceType == "equipment" && "Thêm khuôn"}
                        {resourceTypePageModeState == 0 && resourceType == "material" && "Thêm vật tư"}
                        {resourceTypePageModeState == 1 && resourceType == "material" && "Thêm sản phẩm ép"}
                        {resourceTypePageModeState == 2 && resourceType == "material" && "Thêm nguyên liệu nhựa"}
                    </Button>
                    {resourceType == "equipment" && (
                        <Link to={`${paths.resource}/${resourceType}/class`}>
                            <h4 className="underline hover:text-primary-1">
                                Quản lý loại {handler.label[resourceType]}
                            </h4>
                        </Link>
                    )}
                </div>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        activateValidation={false}
                        menuNavigaton={
                            initValue
                                ? (function () {
                                      switch (mode) {
                                          case "normal":
                                              return handler.editMenuNav[resourceType](classes, workUnit)
                                          case "workUnit":
                                              return handler.editMenuNav.workUnit()
                                          case "injectionMachine":
                                              return handler.editMenuNav.injectionMachine()
                                          //   case "mold":
                                          //   return handler.editMenuNav.injectionMachine()
                                          default:
                                              return handler.editMenuNav.operation(previousOperation)
                                      }
                                  })()
                                : (function () {
                                      switch (mode) {
                                          case "normal":
                                              return handler.createMenuNav[resourceType](classes, fiveSelectData)
                                          case "workUnit":
                                              return handler.createMenuNav.workUnit()
                                          case "injectionMachine":
                                              return handler.createMenuNav.injectionMachine(
                                                  moldProperList,
                                                  fiveSelectData,
                                              )
                                          case "mold":
                                              return handler.createMenuNav.mold(
                                                  injectionMachineProperList,
                                                  fiveSelectData,
                                              )
                                          case "normalMaterial":
                                              return handler.createMenuNav.normalMaterial()
                                          case "PlasticProducts":
                                              return handler.createMenuNav.PlasticProducts(
                                                  moldProperList,
                                                  plasticMaterialProperList,
                                              )
                                          case "PlasticMaterial":
                                              return handler.createMenuNav.PlasticMaterial()
                                          default:
                                              return handler.createMenuNav.operation(previousOperation)
                                      }
                                  })()
                        }
                        onClick={handleSubmit}
                        initValue={
                            initValue
                                ? initValue
                                : initValue === null && mode !== "normal" && mode !== "workUnit"
                                ? {
                                      info: {
                                          operationId: "",
                                          name: "",
                                          duration: "",
                                          prerequisiteOperation: [],
                                      },
                                  }
                                : undefined
                        }
                    />
                )}

                {deleteConfirm.show && (
                    <Confirm
                        title={deleteConfirm.title}
                        content={deleteConfirm.content}
                        onConfirm={deleteConfirm.onConfirm}
                        onClose={() => setDeleteConfirm({ show: false })}
                    />
                )}
            </div>

            {activedItem && resourceType == "material" && (
                <div className="h-full w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                    <div className="">
                        <h3 className="ml-1 mb-1">
                            Thuộc tính {handler.label[resourceType]} {activedItem.name}
                        </h3>
                        <div className="h-[calc(100%-30px] scroll-y p-1 pt-0">
                            {resourceType == "material" ? (
                                <>
                                    <div className="-mt-2"></div>
                                    <Table
                                        activable
                                        headers={RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER[0].tableHeader}
                                        body={activedItem.secondaryUnits}
                                        onRowClick={handleClick.handleMaterialUnitClick}
                                        onEdit={handleEditWorker}
                                        onDeleteRow={handleDelete.handleMaterialUnitDelete}
                                        onAdd={handleAddWorker}
                                        setMode={setMode}
                                        unActive={!materialUnitActivedItem}
                                        accordionTable
                                        accordionTableTitle={
                                            RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER[0].AccordionTableTitle
                                        }
                                    />
                                    <Table
                                        activable
                                        headers={RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER[1].tableHeader}
                                        body={activedItem.operations}
                                        onRowClick={handleClick.handleOperationClick}
                                        onEdit={handleEditWorker}
                                        onDeleteRow={handleDelete.handleOperationDelete}
                                        onAdd={handleAddWorker}
                                        setMode={setMode}
                                        unActive={!operationActivedItem}
                                        accordionTable
                                        accordionTableTitle={
                                            RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER[1].AccordionTableTitle
                                        }
                                    />
                                    <Table
                                        activable
                                        headers={RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER[2].tableHeader}
                                        body={activedItem.secondaryUnits}
                                        onRowClick={handleClick.handleMaterialUnitClick}
                                        onEdit={handleEditWorker}
                                        onDeleteRow={handleDelete.handleMaterialUnitDelete}
                                        onAdd={handleAddWorker}
                                        setMode={setMode}
                                        unActive={!materialUnitActivedItem}
                                        accordionTable
                                        accordionTableTitle={
                                            RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER[2].AccordionTableTitle
                                        }
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {equipmmentActivedItem[resourceTypePageModeState] && resourceType == "equipment" && (
                <div className="h-full w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                    <div className="">
                        <h3 className="ml-1 mb-1">Thuộc tính</h3>
                        <div className="h-[calc(100%-30px] scroll-y p-1 pt-0">
                            {resourceType == "equipment" && (
                                <>
                                    {/* <div className="-mt-2"></div> */}
                                    <Table
                                        activable
                                        primary
                                        headers={EQUIPMENT_NORMALMACHINE_PROPERTIES_TABLE_COLUMNS}
                                        body={equipmmentActivedItem[resourceTypePageModeState]?.properties}
                                        // onEdit={handleEditWorker}
                                        // onDeleteRow={handleDelete.handleMaterialDefinitionsDelete}
                                        sticky
                                        unActive={!activedItem}
                                        // setMode={setMode}
                                    />
                                </>
                            )}
                        </div>
                        <h3 className="ml-1 mb-1">Lỗi thiết bị</h3>
                        <div className="h-[calc(100%-30px] scroll-y p-1 pt-0">
                            {resourceType == "equipment" && (
                                <>
                                    {/* <div className="-mt-2"></div> */}
                                    <Table
                                        activable
                                        primary
                                        headers={EQUIPMENT_ERROR_PROPERTIES_TABLE_COLUMNS}
                                        body={equipmmentActivedItem[resourceTypePageModeState]?.properties}
                                        // onEdit={handleEditWorker}
                                        // onDeleteRow={handleDelete.handleMaterialDefinitionsDelete}
                                        sticky
                                        unActive={!activedItem}
                                        // setMode={setMode}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResourceType
