import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import ResourceItem from "@/components/ResourceItem"
import PoperMenu from "@/components/PoperMenu"
import TreeView from "@/components/TreeView/TreeView"
import { usePoperMenu, useCallApi } from "@/hooks"
import { resourceApi } from "@/services/api"
import { getCreateEquipmentMenuNav, getCreateMaterialMenuNav } from "@/utils/menuNavigation"
import { EQUIPMENT_TABLE_COLUMNS, MATERIAL_TABLE_COLUMNS } from "@/utils/tableColumns"
import { paths } from "@/config"

const handler = {
    labels: ["Thiết bị", "Vật tư"],
    headers: [EQUIPMENT_TABLE_COLUMNS, MATERIAL_TABLE_COLUMNS],
    getMenuNavs: [(list) => getCreateEquipmentMenuNav(list), (list) => getCreateMaterialMenuNav(list)],
    navigateLinks: [paths.resource + "/equipment", paths.resource + "/material"],
}

function Resource() {
    const navigate = useNavigate()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()

    const [menuNav, setMenuNav] = useState()
    const [resData, setResData] = useState([])
    console.log(resData)
    const handleBtnClick = (e, index) => {
        setMenuNav(handler.getMenuNavs[index]([]))
        handleOpen(e)
    }

    const handleLabelClick = (index) => navigate(handler.navigateLinks[index])

    useEffect(() => {
        callApi([resourceApi.equipment.getEquipmentClasses(), resourceApi.material.getMaterials()], (res) =>
            setResData(res),
        )
    }, [callApi])
    console.log(resData)
    return (
        <div data-component="Resource" className="container flex h-full flex-wrap">
            {/* <TreeView /> */}
            {resData &&
                resData.map(
                    (data, index) =>
                        data && (
                            <div
                                className="h-full w-1/2 pr-5 last:pr-0 xl:mb-4 xl:h-full xl:w-full xl:pr-0"
                                key={index}
                            >
                                <ResourceItem
                                    label={handler.labels[index]}
                                    headers={handler.headers[index]}
                                    body={data.items}
                                    onLabelClick={(e) => handleLabelClick(index)}
                                    onBtnClick={(e) => handleBtnClick(e, index)}
                                    quantiy={{ all: data.totalItems }}
                                />
                            </div>
                        ),
                )}

            {active && menuNav && <PoperMenu position={position} onClose={handleClose} menuNavigaton={menuNav} />}
        </div>
    )
}

export default Resource
