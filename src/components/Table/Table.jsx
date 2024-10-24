import { useState, useEffect } from "react"
import { HiPencil } from "react-icons/hi"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import { RiDeleteBin4Line } from "react-icons/ri"
import { MdExpandMore } from "react-icons/md"
import { MdAdd } from "react-icons/md"
import cl from "classnames"

function Table({
    activable,
    onRowClick,
    onEdit,
    headers = [],
    body = [],
    className,
    primary,
    sticky,
    unActive,
    onDeleteRow,
    onAdd,
    setMode,
    accordionTable = false, // = true thì bảng sẽ chuyển sang dạng accordion table
    accordionTableTitle = "",
}) {
    const [activeIndex, setActiveIndex] = useState(null)
    const [accordionTableOpenState, setAccordionTableOpenState] = useState(true) // lưu state open cho accodion table
    const handleRowClick = (row, index) => {
        if (!onRowClick) return

        setActiveIndex(index)
        onRowClick(row, index)
    }

    const handleEdit = (e, row, index) => {
        e.stopPropagation()
        // if (accordionTableTitle == "Đơn vị phụ") {
        //     setMode("workUnit")
        // } else if (accordionTableTitle == "Công đoạn") {
        //     setMode("operation")
        // } else setMode("normal")
        onEdit(e, row, index, accordionTableTitle)
    }

    const handleDeleteRow = (e, row, index) => {
        e.stopPropagation()
        onDeleteRow(row, index)
    }
    const handleAddButtonClick = (e, row, index) => {
        e.stopPropagation()
        if (accordionTableTitle == "Đơn vị phụ") {
            setMode("workUnit")
        } else if (accordionTableTitle == "Lỗi vật tư") {
            setMode("ErrorMaterial")
        } else  
            setMode("operation")
        onAdd(e)
    }

    useEffect(() => {
        if (unActive) {
            setActiveIndex(null)
        }
    }, [unActive])

    return (
        <>
            {accordionTable && (
                <div
                    className="mt-2 flex justify-between rounded-t-lg bg-primary-1  p-2 font-semibold text-neutron-4 hover:cursor-pointer"
                    onClick={() => setAccordionTableOpenState(!accordionTableOpenState)}
                >
                    <span className="flex">
                        {accordionTableTitle}
                        {onAdd && (
                            <div
                                onClick={(e) => handleAddButtonClick(e)}
                                className="round-[99px] ml-2 flex h-6 w-6 items-center justify-center rounded-xl transition-all hover:bg-accent-1"
                            >
                                <MdAdd />
                            </div>
                        )}
                    </span>
                    <MdExpandMore
                        className={`text-2xl ${!accordionTableOpenState && "rotate-180"} transition-transform`}
                    />
                </div>
            )}
            {(accordionTableOpenState || (!accordionTableOpenState && !accordionTable)) && (
                <div data-component="Table" className={cl(className)}>
                    <table
                        className={cl("w-full table-auto", {
                            " border-separate border-spacing-y-2": !activable,
                            "rounded-lg shadow-sub": activable,
                        })}
                    >
                        {activable ? (
                            <>
                                <thead
                                    className={cl({
                                        "sticky top-0 z-10": sticky,
                                        "bg-primary-1": primary,
                                        "bg-primary-2": !primary,
                                    })}
                                >
                                    <tr className={cl("text-16-b text-neutron-4")}>
                                        {headers.map((column) => (
                                            <th
                                                className={`${
                                                    !accordionTable && "first:rounded-tl-lg last:rounded-tr-lg"
                                                }`}
                                                key={column.accessor}
                                            >
                                                <div className="flex h-11 items-center rounded-tl-lg rounded-tr-lg p-2 text-left">
                                                    {column.Header}

                                                    <span className="heading-20-b">
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <BiSortDown />
                                                            ) : (
                                                                <BiSortUp />
                                                            )
                                                        ) : null}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {body.map((row, index) => {
                                        return (
                                            <tr
                                                className={cl("group relative", {
                                                    "even:bg-neutron-3": activeIndex !== index,
                                                    "cursor-pointer hover:bg-hoverBg":
                                                        onRowClick && activeIndex !== index,
                                                    "bg-primary-2 text-neutron-4": activeIndex === index,
                                                })}
                                                onClick={() => handleRowClick(row, index)}
                                                key={index}
                                            >
                                                {headers.map((column, i) => (
                                                    <td
                                                        className="min-h-11 p-2 group-last:first:rounded-bl-lg group-last:last:rounded-br-lg"
                                                        key={i}
                                                    >
                                                        {Array.isArray(row[column.accessor])
                                                            ? row[column.accessor].join(", ")
                                                            : row[column.accessor]}

                                                        {onEdit &&
                                                            i === headers.length - 1 &&
                                                            activeIndex === index && (
                                                                <i
                                                                    className={cl(
                                                                        "absolute right-3 top-[50%] h-[30px] w-[30px] translate-y-[-50%]",
                                                                        "flex items-center justify-center rounded-full bg-accent-1 text-neutron-4",
                                                                        "heading-20-b cursor-pointer",
                                                                    )}
                                                                    onClick={(e) => handleEdit(e, row, index)}
                                                                >
                                                                    <HiPencil />
                                                                </i>
                                                            )}

                                                        {onDeleteRow &&
                                                            i === headers.length - 1 &&
                                                            activeIndex === index && (
                                                                <i
                                                                    className={cl(
                                                                        "absolute right-10 top-[50%] h-[30px] w-[30px] translate-y-[-50%]",
                                                                        "flex items-center justify-center rounded-full text-warning-1",
                                                                        "heading-20-b invisible cursor-pointer hover:bg-warning-2 group-hover:visible",
                                                                    )}
                                                                    onClick={(e) => handleDeleteRow(e, row, index)}
                                                                >
                                                                    <RiDeleteBin4Line />
                                                                </i>
                                                            )}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </>
                        ) : (
                            <>
                                <thead className={cl({ "sticky top-0 z-10 bg-neutron-4": sticky })}>
                                    <tr className="text-16-b text-left ">
                                        {headers.map((column) => (
                                            <th key={column.accessor}>
                                                <div className="flex items-center p-2">
                                                    {column.Header}
                                                    <span className="heading-20-b">
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <BiSortDown />
                                                            ) : (
                                                                <BiSortUp />
                                                            )
                                                        ) : null}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {body.map((row, index) => {
                                        return (
                                            <tr
                                                className={cl(" group rounded-md bg-neutron-4", {
                                                    "cursor-pointer hover:bg-hoverBg": onRowClick,
                                                })}
                                                onClick={() => handleRowClick(row, index)}
                                                key={index}
                                            >
                                                {headers.map((column, i) => (
                                                    <td
                                                        className={cl(
                                                            "min-h-11 relative border-t-[1px] border-b-[1px] border-primary-2 p-2",
                                                            "first:rounded-bl-lg first:rounded-tl-lg first:border-l-[1px]",
                                                            "last:rounded-br-lg last:rounded-tr-lg last:border-r-[1px]",
                                                        )}
                                                        key={i}
                                                    >
                                                        {Array.isArray(row[column.accessor])
                                                            ? row[column.accessor].join(", ")
                                                            : row[column.accessor]}

                                                        {onEdit && i === headers.length - 1 && (
                                                            <i
                                                                className={cl(
                                                                    "absolute right-1 top-[50%] h-[30px] w-[30px] translate-y-[-50%]",
                                                                    "flex items-center justify-center rounded-full text-accent-1",
                                                                    "heading-20-b invisible cursor-pointer hover:bg-hoverBg group-hover:visible",
                                                                )}
                                                                onClick={(e) => handleEdit(e, row, index)}
                                                            >
                                                                <HiPencil />
                                                            </i>
                                                        )}

                                                        {onDeleteRow && i === headers.length - 1 && (
                                                            <i
                                                                className={cl(
                                                                    "absolute right-8 top-[50%] h-[30px] w-[30px] translate-y-[-50%]",
                                                                    "flex items-center justify-center rounded-full text-warning-1",
                                                                    "heading-20-b invisible cursor-pointer hover:bg-warning-2 group-hover:visible",
                                                                )}
                                                                onClick={(e) => handleDeleteRow(e, row, index)}
                                                            >
                                                                <RiDeleteBin4Line />
                                                            </i>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
            )}
        </>
    )
}

export default Table
