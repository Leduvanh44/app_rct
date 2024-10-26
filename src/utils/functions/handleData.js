import { toast } from "react-toastify"
import { VALUE_TYPE, SEGMENT_RELATION } from "@/utils/constants"
import { validateValueType } from "./validate"
import { convertDateFormat } from "./dateTime"

export const getMenuItemValue = (value, path = [], id) => {
    let crrValue = value
    for (let i = 0; i < path.length; i++) {
        crrValue = value?.[path[i]]
    }
    return id ? crrValue?.[id] : crrValue
}

export const getUpdatedMenuValue = (value, itemValue, path = [], id) => {
    let updateValue = value
    if (id) {
        for (let i = 0; i < path.length; i++) {
            if (!updateValue[path[i]]) {
                updateValue[path[i]] = {}
            }
            updateValue = updateValue[path[i]]
        }
        updateValue[id] = itemValue
    } else {
        for (let i = 0; i < path.length - 1; i++) {
            if (!updateValue[path[i]]) {
                updateValue[path[i]] = {}
            }
            updateValue = updateValue[path[i]]
        }
        updateValue[path[path.length - 1]] = itemValue
    }

    return { ...value }
}

export const getMenuTableData = (value, id) => {
    return value?.map((v) => v[id])
}

export const getSegmentOptionList = (segments) => {
    const segmenList = segments.productSegments?.map((item) => ({
        key: item.info.description,
        value: item.info.productSegmentId,
    }))
    if (Array.isArray(segmenList)) {
        segmenList.unshift({ key: "Start", value: "start-segment" })
    }
    return segmenList
}

export const getResourceOptionsList = (items, key) => {
    return items.map((item) => {
        const result = { value: item[key], key: item.name }
        console.log(result);
        return result;
    });
}
export const getPrerequisteOperationList = (items, valueKey, keyKey) => {
    return items.map((item) => ({ value: item[valueKey], key: item[keyKey] }))
}
export const formatNumberValue = (value, format) => {
    if (isNaN(value)) {
        return 0
    } else {
        value = Number(value)
    }

    switch (typeof format) {
        case "boolean":
            return Math.round(value)
        case "number":
            return value.toFixed(format)
        case "function":
            return format(value)
        default:
            return value
    }
}

export function cloneDeep(obj) {
    let newObj = {}

    if (Array.isArray(obj)) {
        newObj = []
    }

    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            newObj[key] = cloneDeep(obj[key])
        } else {
            newObj[key] = obj[key]
        }
    }

    return newObj
}

export const updateValidateRuleForSubnav = (valueType, subNav = []) => {
    if (valueType !== undefined) {
        const newNav = cloneDeep(subNav)
        newNav.forEach((nav) => {
            if (nav.type === "form") {
                nav.items.forEach((item) => {
                    if (item.id === "valueString") {
                        if (valueType === VALUE_TYPE.boolean) {
                            item.type = "checkbox"
                        } else {
                            item.isError = (value) => validateValueType(value, valueType)
                        }
                    }
                })
            }
        })

        return newNav
    }
    return subNav
}

export const updateValidateRuleForFormMenuItems = (valueType, items = []) => {
    if (valueType !== undefined) {
        const newItems = cloneDeep(items)
        newItems.forEach((item) => {
            if (item.id === "valueString") {
                if (valueType === VALUE_TYPE.boolean) {
                    item.type = "checkbox"
                } else {
                    item.type = "text"
                    item.isError = (value) => validateValueType(value, valueType)
                }
            }
        })
        return newItems
    }
    return items
}

export const handleGanttChartData = (segments, segmentRelationships) => {
    const result = segments.map((item) => {
        return {
            id: item.segmentId,
            description: item.description,
            begin: 0,
            end: 0,
            duration: item.duration,
        }
    })

    segmentRelationships.forEach((item) => {
        let time, begin, end, prevEnd
        const segA = result.find((s) => s.id === item.segmentA)
        const segB = result.find((s) => s.id === item.segmentB)

        switch (item.relation) {
            case SEGMENT_RELATION.afterJustDone:
            case SEGMENT_RELATION.after:
                prevEnd = item.segmentA === "start-segment" ? 0 : segA.end
                begin = segB.begin > prevEnd ? segB.begin : prevEnd
                time = segB.duration
                end = begin + time
                break

            case SEGMENT_RELATION.afterWithDuration:
                prevEnd = item.segmentA === "start-segment" ? 0 : segA.end
                begin = segB.begin > prevEnd ? segB.begin : prevEnd
                begin += item.duration
                time = segB.duration
                end = begin + time
                break
            default:
        }

        result.forEach((r) => {
            if (r.id === segB.id) {
                r.begin = begin
                r.end = end
            }
        })
    })
    return result.map((item) => ({
        x: item.id,
        y: [item.begin, item.end],
        name: item.description,
    }))
}

export const handleScheduleDataByMachine = (data) => {
    const result = []
    data.forEach((item) => {
        const index = result.findIndex((_item) => _item.name === item.materialDefinition)
        if (index >= 0) {
            result[index].name = `${item.workOrderId} [${item.materialDefinition}]`
            result[index].data.push({
                x: item.equipment,
                y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
            })
        } else {
            result.push({
                name: `${item.workOrderId} [${item.materialDefinition}]`,
                data: [
                    {
                        x: item.equipment,
                        y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
                    },
                ],
            })
        }
    })

    return result
}

export const handleSchedulingDataByMachine = (data) => {
    const result = []
    data.forEach((item) => {
        const index = result.findIndex((_item) => _item.name === item.materialDefinition)
        if (index >= 0) {
            result[index].name = `${item.workOrderId} [${item.materialDefinition}]`
            result[index].data.push({
                x: item.equipment,
                y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
            })
        } else {
            result.push({
                name: `${item.workOrderId} [${item.materialDefinition}]`,
                data: [
                    {
                        x: item.equipment,
                        y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
                    },
                ],
            })
        }
    })

    return result
}

export const handleScheduleDataByProduct = (data) => {
    const result = []
    data.forEach((item) => {
        const index = result.findIndex((_item) => _item.name === item.equipment)
        if (index >= 0) {
            result[index].name = `${item.workOrderId} [${item.equipment}]`
            result[index].data.push({
                x: item.materialDefinition,
                y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
            })
        } else {
            result.push({
                name: `${item.workOrderId} [${item.equipment}]`,
                data: [
                    {
                        x: item.materialDefinition,
                        y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
                    },
                ],
            })
        }
    })

    return result
}

export const handleScheduledData = (schedulingProducts, shifts, warning = true) => {
    const data = []
    const dataByEquipment = {}
    let dataValid = true
    console.log(schedulingProducts)
    schedulingProducts.forEach((item) => {
        let rowValid = true
        const workOrderId = item.workOrderId
        const equipmentId = item.equipmentId

        const [day, month, year] = item.dueDate.split("/")
        const dueDate = new Date(year, month - 1, day, 23, 59, 59)

        if (!item.startTime) {
            warning && toast.error(`Ngày bắt đầu của đơn hàng ${workOrderId} không được bỏ trống`)
            rowValid = false
            return
        }
        if (!item.endTime) {
            warning && toast.error(`Ngày kết thúc của đơn hàng ${workOrderId} không được bỏ trống`)
            rowValid = false
            return
        }

        const startDate = new Date(item.startTime)
        const endDate = new Date(item.endTime)

        if (!item.startShift?.length) {
            warning && toast.error(`Ca bắt đầu của đơn hàng ${workOrderId} không được bỏ trống`)
            rowValid = false
            return
        }
        if (!item.endShift?.length) {
            warning && toast.error(`Ca kết thúc của đơn hàng ${workOrderId} không được bỏ trống`)
            rowValid = false
            return
        }

        const startTime = shifts[item.startShift[0]]?.startTime
        const endTime = shifts[item.endShift[0]]?.endTime
        startDate.setHours(...startTime.split(":"))
        endDate.setHours(...endTime.split(":"))

        if (dueDate < endDate) {
            warning && toast.error(`Ngày hoàn thành của đơn hàng ${workOrderId} không được sau ngày đến hạn`)
            rowValid = false
            return
        }

        if (startDate > endDate) {
            warning && toast.error(`Ngày bắt đầu của đơn hàng ${workOrderId} không được sau ngày hoàn thành`)
            rowValid = false
            return
        }

        if (startDate < new Date()) {
            warning && toast.error(`Ngày bắt đầu của đơn hàng ${workOrderId} không được trước ngày hôm nay`)
            rowValid = false
            return
        }

        if (dataByEquipment[equipmentId]?.length) {
            dataByEquipment[equipmentId].push({ startDate, endDate })
        } else {
            dataByEquipment[equipmentId] = [{ startDate, endDate }]
        }

        if (rowValid) {
            data.push({
                scheduledStartDate: startDate.toISOString(),
                scheduledEndDate: endDate.toISOString(),
                equipment: item.equipmentId[0],
                workOrderId: item.workOrderId,
                materialDefinition: item.materialDefinition,
            })
        }
    })

    for (let key in dataByEquipment) {
        const item = dataByEquipment[key]
        item.sort((a, b) => a.startDate - b.startDate)
        for (let i = 0; i < item.length - 1; i++) {
            const prevEndDate = new Date(item[i].endDate)
            const nextStartDate = new Date(item[i + 1].startDate)
            if (prevEndDate > nextStartDate) {
                warning && toast.error(`Các ngày hoạt động của máy ${key} không được chồng lấn lên nhau`)
                dataValid = false
            }
        }
    }

    return {
        data,
        valid: dataValid && data.length === schedulingProducts.length,
    }
}

export const convertISOToLocaleDate = (date) => {
    if (date == "0001-01-01T00:00:00") {
        return ""
    }
    return new Date(date)
        .toLocaleString("vi")
        .replace(/^([\d]?[\d])/, (val) => (Number(val) <= 16 ? Number(val) + 7 : Number(val) + 7 - 24))
}

export const formatData = (data, fixNumber) => {
    const fomartedData = data.toFixed(fixNumber)
    return fomartedData
}

export const fomartDate = (inputDate) => {
    const dateParts = inputDate.split("T")
    const date = dateParts[0].split("-").reverse().join("-")
    const time = dateParts[1]

    const outputDate = `${date} ${time}`
    return outputDate
}

export const formatTableData = (data) => {
    let formatedData
    formatedData = data.map((item) => {
        let formatedItem
        formatedItem = {
            injectionCycle: formatData(item.injectionCycle, 2),
            injectionTime: formatData(item.injectionTime, 2),
            timeStamp: fomartDate(item.timeStamp.split(".")[0]),
        }
        return formatedItem
    })
    return formatedData
}

export const handleOeeData = (data) => {
    // const roundedData = data
    const roundedData = data.map((item) => {
        return {
            ...item,
            endTime: convertDateFormat(item.endTime),
            a: (item.a * 100).toFixed(2),
            p: (item.p * 100).toFixed(2),
            q: (item.q * 100).toFixed(2),
            oee: (item.oee * 100).toFixed(2),
            // a: (Number(item.a) * 100).toFixed(2),
            // p: (Number(item.p) * 100).toFixed(2),
            // q: (Number(item.q) * 100).toFixed(2),
            // l: Number(item.l.toFixed(2)),
            // oee: (Number(item.oee) * 100).toFixed(2),
        }
    })
    return roundedData
}
export const handleMachinesListData = (data) => {
    // const roundedData = data
    const roundedData = data.map((item) => {
        return {
            value: item.id,
            key: item.name,
        }
    })
    return roundedData
}
export const handleOeeMode = (mode) => {
    switch (mode) {
        case 0:
            return "ALL"
        case 1:
            return "OEE"
        case 2:
            return "A"
        case 3:
            return "P"
        case 4:
            return "Q"
        case 5:
            return "L"
        default:
    }
}

export const handleOeePageHeader = (mode) => {
    const header = [
        {
            Header: "Ngày",
            accessor: "endTime",
            disableSortBy: false,
        },
        {
            Header: "OEE(%)",
            accessor: "oee",
            disableSortBy: false,
        },
        {
            Header: "Độ hữu dụng A(%)",
            accessor: "a",
            disableSortBy: false,
        },
        {
            Header: "Hiệu suất P(%)",
            accessor: "p",
            disableSortBy: false,
        },
        {
            Header: "Chất lượng Q(%)",
            accessor: "q",
            disableSortBy: false,
        },
        // {
        //     Header: "Thời gian chết L(s)",
        //     accessor: "l",
        //     disableSortBy: false,
        // },
    ]
    switch (mode) {
        case 0:
            return header
        case 1:
            return header.filter((item) => item.accessor === "endTime" || item.accessor === "oee")
        case 2:
            return header.filter((item) => item.accessor === "endTime" || item.accessor === "a")
        case 3:
            return header.filter((item) => item.accessor === "endTime" || item.accessor === "p")
        case 4:
            return header.filter((item) => item.accessor === "endTime" || item.accessor === "q")
        case 5:
            return header.filter((item) => item.accessor === "endTime" || item.accessor === "l")
        default:
            return []
    }
}

export const DownTimePageHeader = [
    {
        Header: "Tên máy",
        accessor: "equipmentId",
        disableSortBy: false,
    },
    {
        Header: "Đổi màu",
        accessor: "đổi màu",
        disableSortBy: false,
    },
    {
        Header: "Khuôn hư",
        accessor: "khuôn hư",
        disableSortBy: false,
    },
    {
        Header: "Thay khuôn",
        accessor: "thay khuôn",
        disableSortBy: false,
    },
    {
        Header: "Chỉnh máy",
        accessor: "canh chỉnh máy",
        disableSortBy: false,
    },
    {
        Header: "Đợi nhiệt",
        accessor: "đợi nhiệt",
        disableSortBy: false,
    },
    {
        Header: "Máy hư",
        accessor: "máy hư",
        disableSortBy: false,
    },
    {
        Header: "Nghẹt nước",
        accessor: "nghẹt nước",
        disableSortBy: false,
    },
    {
        Header: "Thiếu người",
        accessor: "thiếu người",
        disableSortBy: false,
    },
    {
        Header: "Thiếu NVL/BTP",
        accessor: "thiếu NVL/BTP",
        disableSortBy: false,
    },
    {
        Header: "Ăn cơm",
        accessor: "ăn cơm",
        disableSortBy: false,
    },
    {
        Header: "Không có KHSY",
        accessor: "không có KHSY",
        disableSortBy: false,
    },
    {
        Header: "Bảo trì dự phòng",
        accessor: "bảo trì dự phòng",
        disableSortBy: false,
    },
    {
        Header: "Test mẫu",
        accessor: "test mẫu",
        disableSortBy: false,
    },
    {
        Header: "Cúp điện",
        accessor: "cúp điện",
        disableSortBy: false,
    },
    {
        Header: "Tổng",
        accessor: "Total",
        disableSortBy: false,
    },
]

export const getWorkHoursPerDay = (shifts) => {
    const hoursPerDay = shifts.reduce((acc, crr) => {
        const [sH, sM, sS] = crr.startTime.split(":")
        const [eH, eM, eS] = crr.endTime.split(":")
        const duration = eH - sH + (eM - sM) / 60 + (eS - sS) / 3600
        return acc + duration
    }, 0)

    return hoursPerDay
}

export const getEquipmentOutputs = (settingOutputs, workOrders, hoursPerDay) => {
    const result = []

    settingOutputs.forEach((item) => {
        const materialId = item.materialDefinitionId
        const _outputs = []
        workOrders.forEach((w) => {
            if (w.isClosed && w.materialDefinition === materialId) {
                const start = new Date(w.actualStartDate)
                const end = new Date(w.actualEndDate)
                _outputs.push((end - start) / (3600 * 1000 * hoursPerDay))
            }
        })
        const output = _outputs.reduce((acc, crr) => acc + crr, 0) / _outputs.length
        result.push({
            materialId,
            setting: item.output,
            actual: output ? output.toFixed(2) : "-",
        })
    })

    return result
}

export const getChartSeriesFromOutputs = (outputs) => {
    return [
        {
            name: "Tiêu chuẩn",
            data: outputs.map((item) => item.setting),
        },
        {
            name: "Thực tế",
            data: outputs.map((item) => item.actual),
        },
    ]
}

export const getEquipmentListOfMaterial = (equipmentList = [], outputList = [], materialId) => {
    const result = []
    const equipmentIds = outputList
        .filter((item) => item.materialDefinitionId === materialId)
        .map((item) => item.equipmentId)
    equipmentList.forEach((item) => {
        if (equipmentIds.includes(item.equipmentId)) {
            result.push({
                key: item.description,
                value: item.equipmentId,
            })
        }
    })
    return result
}
