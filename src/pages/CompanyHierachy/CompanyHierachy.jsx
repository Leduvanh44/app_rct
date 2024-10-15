import TreeView from "@/components/TreeView/TreeView"

import { hierarchyApi } from "@/services/api"
import { usePoperMenu, useCallApi } from "@/hooks"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"
import Card from "@/components/Card/Card"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import { OrgChartComponent } from "@/components/OrgChart/OrgChart"
import DetailProductivity from "@/pages/Productivity/DetailProductivity"
import { MdAddCircle, MdModeEdit, MdDelete } from "react-icons/md"

import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { COMPANY_HIERACHY_MODE_LIST } from "@/utils/constants"
import { getCreateHierachyCompanyMenuNav, getEditHierachyCompanyMenuNav } from "@/utils/menuNavigation"
// hàm chuyển dạng data từ api sang data dùng trong org chart
const convertApiDataToUseData = (data, parentId = "root") => {
    const useData = [
        {
            name: "Phân cấp nhà máy",
            id: "root",
            parentId: "",
        },
    ]

    const processItem = (item, parentPath) => {
        const { name, absolutePath } = item
        const id = absolutePath
        useData.push({ name, id, parentId: parentPath })

        if (item.sites) {
            item.sites.forEach((site) => {
                processItem(site, id)
            })
        }

        if (item.areas) {
            item.areas.forEach((area) => {
                processItem(area, id)
            })
        }

        if (item.workCenters) {
            item.workCenters.forEach((workCenter) => {
                processItem(workCenter, id)
            })
        }

        if (item.workUnits) {
            item.workUnits.forEach((workUnit) => {
                processItem(workUnit, id)
            })
        }
    }

    data.items.forEach((item) => {
        processItem(item, parentId)
    })

    return useData
}
function isPathValid(object) {
    // Kiểm tra xem object có tồn tại và có thuộc tính "path" không
    if (!object || !object.path) {
        if (object.path == "") return true
        return false
    }
    // Sử dụng biểu thức chính quy để đếm số dấu "/"
    const slashesCount = object.path.split("/").length - 1
    // Kiểm tra nếu số dấu "/" lớn hơn hoặc bằng 4 thì return false
    return slashesCount < 4
}
function CompanyHierachy() {
    const dispatch = useDispatch()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()

    const [companyHierachyData, setCompanyHierachyData] = useState([])

    const [selectingNode, setSelectingNode] = useState({
        name: "",
        id: "",
        path: "",
        idKey: "enterpriseId",
        idEditKey: "",
        title: "Thêm enterprise",
        editTitle: "Sửa enterprise",
    })
    const [modeState, setModeSate] = useState(0)
    const [orgChartData, setOrgChartData] = useState([])

    const [deleteConfirm, setDeleteConfirm] = useState({})
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const fetchCompanyHierachy = useCallback(() => {
        callApi(hierarchyApi.enterprise.getEnterprise, (res) => {
            setCompanyHierachyData(res.items)
            setOrgChartData(convertApiDataToUseData(res))
        })
    }, [callApi])
    useEffect(() => {
        fetchCompanyHierachy()
    }, [fetchCompanyHierachy])

    const handleEdit = (e, row, index) => {
        setInitValue({
            info: {
                name: selectingNode.name,
                [selectingNode.idEditKey]: selectingNode[selectingNode.idEditKey],
                // ...manufacturingOrder[index],
                // materialDefinitionId: manufacturingOrder[index].materialDefinition.materialDefinitionId,
            },
            properties: [],
        })
        handleOpen(e)
    }
    const handleDelete = () => {
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa " + selectingNode.name,
            content: `${selectingNode.name} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => hierarchyApi.enterprise.deleteEnterprise(selectingNode.path),
                    fetchCompanyHierachy,
                    `${selectingNode.name} được xóa thành công`,
                )
            },
        })
    }

    const handleSubmit = (value) => {
        if (!initValue) {
            if (selectingNode.name == "") {
                callApi(
                    () => hierarchyApi.enterprise.createEnterprise(value.info),
                    fetchCompanyHierachy,
                    `Tạo ${value.info.name} thành công`,
                )
            } else
                callApi(
                    () => hierarchyApi.enterprise.create(value.info, selectingNode.path),
                    fetchCompanyHierachy,
                    `Tạo ${value.info.name} thành công`,
                )
        } else {
            callApi(
                () => hierarchyApi.enterprise.updateEnterprise(value.info, selectingNode.path),
                fetchCompanyHierachy,
                `Cập nhật ${value.info.name} thành công`,
            )
        }
        setInitValue(undefined)
    }
    console.log(selectingNode)
    return (
        <div className=" flex h-full flex-col">
            <ToggleButtons active={modeState} onClick={setModeSate} titles={COMPANY_HIERACHY_MODE_LIST} />
            <div className="flex h-full">
                <Card className=" relative mt-2 flex h-full flex-1 overflow-hidden">
                    {modeState == 0 && (
                        <TreeView
                            companyHierachyData={companyHierachyData}
                            setSelectingNode={setSelectingNode}
                            selectingNode={selectingNode}
                        />
                    )}
                    {modeState == 1 && <OrgChartComponent onNodeClick={setSelectingNode} data={orgChartData} />}
                    {modeState == 0 && (
                        <div className=" absolute bottom-0 right-4 top-0 mt-4 flex  h-fit flex-col items-center justify-center">
                            {isPathValid(selectingNode) && (
                                <MdAddCircle
                                    onClick={handleOpen}
                                    className="mt-5 mr-5 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                                />
                            )}
                            {selectingNode.name != "" && (
                                <>
                                    <MdModeEdit
                                        onClick={handleEdit}
                                        className="mt-5 mr-5 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                                    />

                                    <MdDelete
                                        onClick={handleDelete}
                                        className="mt-5 mr-5 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                                    />
                                </>
                            )}
                        </div>
                    )}
                </Card>
                {selectingNode.idKey == "workUnitId" && selectingNode.idEditKey == "workCenterId" && modeState == 0 && (
                    <Card className="mt-2 ml-4 h-full flex-1">
                        <h1>Năng suất Work Center: {selectingNode.workCenterId}</h1>
                        <DetailProductivity />
                    </Card>
                )}
            </div>
            {active && (
                <PoperMenu
                    menuNavigaton={
                        initValue
                            ? getEditHierachyCompanyMenuNav(selectingNode.idEditKey, selectingNode.editTitle)
                            : getCreateHierachyCompanyMenuNav(selectingNode.idKey, selectingNode.title)
                    }
                    position={position}
                    onClose={() => {
                        setInitValue(undefined)
                        handleClose()
                    }}
                    onClick={handleSubmit}
                    initValue={initValue ? initValue : undefined}
                    activateValidation={false}
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

export default CompanyHierachy
