import { useState } from "react"
import { MdExpandMore } from "react-icons/md"

function Item({ name, items, indentationLevel = 0, setSelectingNode, path, selectingNode, item }) {
    const [open, setOpen] = useState(true)
    const toggleOpen = () => {
        setOpen(!open)
    }
    const marginLeft = `${indentationLevel * 70}px`
    return (
        <>
            {name && (
                <div
                    className={`m-2 flex w-64 cursor-pointer whitespace-pre-wrap break-words rounded-md px-2 transition-all  hover:bg-primary-3 ${
                        selectingNode.path == path ? "bg-primary-2 text-neutron-4" : "text-primary-1"
                    }`}
                    style={{ marginLeft }}
                    onClick={() => {
                        if (selectingNode.path !== path) {
                            setSelectingNode({
                                ...item,
                                name: name,
                                path: path,
                                // id key cho lệnh add
                                idKey:
                                    indentationLevel == 0
                                        ? "siteId"
                                        : indentationLevel == 1
                                        ? "areaId"
                                        : indentationLevel == 2
                                        ? "workCenterId"
                                        : "workUnitId",
                                // id key cho lệnh edit
                                idEditKey:
                                    indentationLevel == 0
                                        ? "enterpriseId"
                                        : indentationLevel == 1
                                        ? "siteId"
                                        : indentationLevel == 2
                                        ? "areaId"
                                        : indentationLevel == 3
                                        ? "workCenterId"
                                        : "workUnitId",
                                title:
                                    indentationLevel == 0
                                        ? "Thêm site"
                                        : indentationLevel == 1
                                        ? "Thêm area"
                                        : indentationLevel == 2
                                        ? "Thêm work center"
                                        : "Thêm work unit",
                            })
                        } else {
                            setSelectingNode({
                                ...item,
                                name: "",
                                path: "",
                                idEditKey: "",
                                idKey: "enterpriseId",
                                title: "Thêm enterprise",
                            })
                        }
                    }}
                >
                    {indentationLevel != 4 && Array.isArray(items) && items.length !== 0 && (
                        <MdExpandMore
                            onClick={toggleOpen}
                            className={`text-3xl ${open ? "" : "-rotate-90"} transition-transform hover:cursor-pointer`}
                        />
                    )}

                    <h3 className={`${selectingNode.path == path ? " text-neutron-4" : "text-primary-1"}`}>{name}</h3>
                </div>
            )}

            {items &&
                open &&
                items.map((item) => {
                    return (
                        <Item
                            name={item.name}
                            path={item.absolutePath}
                            item={item}
                            items={
                                item[
                                    indentationLevel == 0
                                        ? "areas"
                                        : indentationLevel == 1
                                        ? "workCenters"
                                        : "workUnits"
                                ]
                            }
                            indentationLevel={indentationLevel + 1}
                            setSelectingNode={setSelectingNode}
                            selectingNode={selectingNode}
                        />
                    )
                })}
        </>
    )
}

function TreeView({ companyHierachyData, setSelectingNode, selectingNode }) {
    return (
        <div className="h-full w-full overflow-scroll">
            {companyHierachyData.map((item) => (
                <Item
                    name={item.name}
                    path={item.absolutePath}
                    item={item}
                    items={item.sites}
                    setSelectingNode={setSelectingNode}
                    selectingNode={selectingNode}
                />
            ))}
        </div>
    )
}

export default TreeView
