import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Chart from "react-apexcharts"

import Table from "@/components/Table"
import Button from "@/components/Button"
import Confirm from "@/components/Confirm"

import PoperMenu from "@/components/PoperMenu"
import { usePoperMenu, useCallApi } from "@/hooks"
import { outputsBarChartConfig } from "@/config"
import { commonStoreActions } from "@/store"
import { resourceApi, workOrderApi } from "@/services/api"
import { DETAIL_PRODUCTIVITY_TABLE_COLUMNS } from "@/utils/tableColumns"
import { getCreateProductivityMenuNav, getEditProductivityMenuNav } from "@/utils/menuNavigation"
import { getWorkHoursPerDay, getEquipmentOutputs, getChartSeriesFromOutputs } from "@/utils/functions"


    // Mock data for outputs
    const mockOutputs = [
        { materialId: "Material1", setting: 10 },
        { materialId: "Material2", setting: 15 },
        { materialId: "Material3", setting: 8 },
    ];

    // Mock data for materialList
    const mockMaterialList = [
        { key: "Material1", value: "MaterialId1" },
        { key: "Material2", value: "MaterialId2" },
        { key: "Material3", value: "MaterialId3" },
    ];
function DetailProductivity() {
    const dispatch = useDispatch()
    const { devideId } = useParams()
    const callApi = useCallApi()
    const { shifts } = useSelector((state) => state.setting)
    const { active, position, handleClose, handleOpen } = usePoperMenu()

    const [outputs, setOutputs] = useState([])
    const [materialList, setMaterialList] = useState([])
    const [menuData, setmenuData] = useState()
    const [deleteConfirm, setDeleteConfirm] = useState({})
    const workOrders = useRef([])
    const hoursPerDay = useRef(1)

    const fetchData = () => {
        callApi(
            () => resourceApi.equipment.getEquipmentOutputs(devideId),
            (res) => {
                const result = getEquipmentOutputs(res, workOrders.current, hoursPerDay.current)
                setOutputs(result)
            },
        )
    }

    const handleCreateStandardOutput = (e) => {
        setmenuData({
            nav: getCreateProductivityMenuNav(materialList),
            handleClick(value) {
                const {
                    materialDifinitionId: [materialId],
                    output,
                } = value.info
                const data = { materialDefinitionId: materialId, output, outputUnitOfMeasurement: "sp", timeUnit: 3 }
                callApi(
                    () => resourceApi.equipment.createEquipmentOuput(devideId, data),
                    fetchData,
                    "Định nghĩa năng suất tiêu chuẩn thành công",
                )
            },
            initValue: undefined,
        })
        handleOpen(e)
    }

    const editOuput = (e, row) => {
        setmenuData({
            nav: getEditProductivityMenuNav(materialList),
            handleClick(value) {
                const data = {
                    ...value.info,
                    materialDefinitionId: row.materialId,
                    outputUnitOfMeasurement: "sp",
                    timeUnit: 3,
                }
                callApi(
                    () => resourceApi.equipment.updateEquipmentOutput(devideId, row.materialId, data),
                    fetchData,
                    "Cập nhật năng suất tiêu chuẩn thành công",
                )
            },
            initValue: {
                info: {
                    output: row.setting,
                },
            },
        })
        handleOpen(e)
    }

    const handleDelete = (item) => {
        const materialId = item.materialId
        setDeleteConfirm({
            show: true,
            title: `Xác nhận xóa`,
            content: `Năng suất tiêu chuẩn của thiết bị ${devideId} cho sản phẩm ${materialId} sẽ bị xóa`,
            onConfirm() {
                callApi(
                    () => resourceApi.equipment.deleteEquipmentOutput(devideId, materialId),
                    fetchData,
                    `Xóa thành công`,
                )
            },
        })
    }

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle(`Báo cáo năng suất thiết bị ${devideId}`))
        hoursPerDay.current = getWorkHoursPerDay(shifts)

        callApi(
            [
                resourceApi.equipment.getEquipmentOutputs(devideId),
                workOrderApi.getWorkOrders(),
                resourceApi.material.getMaterials(),
            ],
            (res) => {
                const result = getEquipmentOutputs(res[0], res[1].items, hoursPerDay.current)
                setOutputs(result)
                setMaterialList(
                    res[2].items.map((item) => ({ key: item.description, value: item.materialDefinitionId })),
                )
                workOrders.current = res[1].items
            },
        )
    }, [callApi, devideId, shifts, dispatch])

    return (
        <div data-component="DetailProductivity" className="container h-full">
            {mockOutputs.length > 0 && (
                <>
                    <Chart
                        type="bar"
                        options={{
                            ...outputsBarChartConfig,
                            xaxis: { categories: outputs.map((item) => item.materialId) },
                        }}
                        series={getChartSeriesFromOutputs(mockOutputs)}
                        height="50%"
                    />
                    <Table
                        className="scroll-y max-h-1/2 mt-4"
                        sticky
                        body={mockOutputs}
                        headers={DETAIL_PRODUCTIVITY_TABLE_COLUMNS}
                        onEdit={editOuput}
                        onDeleteRow={handleDelete}
                    />
                    <Button onClick={handleCreateStandardOutput}>Thêm mới</Button>
                </>
            )}
            {active && menuData && (
                <PoperMenu
                    position={position}
                    menuNavigaton={menuData.nav}
                    onClick={menuData.handleClick}
                    onClose={handleClose}
                    initValue={menuData.initValue}
                />
            )}
            {!mockOutputs.length && <div>Không có dữ liệu để hiển thị do thiết bị chưa thiết đặt năng suất tiêu chuẩn</div>}
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

export default DetailProductivity
