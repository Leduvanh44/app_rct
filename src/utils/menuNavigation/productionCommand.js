import {
    validateRequiredField,
    validateNumberField,
    validateDateInput,
    validateIdField,
    validateDescField,
} from "@/utils/functions"

export const getProductionCommandMenuNav = (prerequisiteOperations, fourSelectData) => [
    {
        id: "info",
        title: "Đơn công đoạn mới",
        type: "form",
        items: [
            {
                id: "workOrderId",
                type: "text",
                label: "ID đơn công đoạn",
                isError: validateIdField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                isError: validateRequiredField,
            },
            {
                id: "startTime",
                type: "datetime-local",
                label: "Ngày bắt đầu",
                isError: validateRequiredField,
            },
            {
                id: "endTime",
                type: "datetime-local",
                label: "Ngày kết thúc",
                isError: validateRequiredField,
            },
            {
                id: "workOrderStatus",
                type: "text",
                label: "workOrderStatus",
                isError: validateDescField,
            },
            {
                id: "prerequisiteOperations",
                type: "select",
                label: "Công đoạn trước",
                list: prerequisiteOperations ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "fourSelect",
        title: "Đơn công đoạn mới",
        type: "form",
        items: [
            {
                id: "workCenter",
                type: "fourSelect",
                label: "work center",
                isError: validateIdField,
                list: fourSelectData ?? [],
            },
        ],
    },
]

export const getCreateManufacturingOrderMenuNav = (materialDefinitionList) => [
    {
        id: "info",
        title: "Đơn sản xuất mới",
        type: "form",
        items: [
            {
                id: "manufacturingOrderId",
                type: "text",
                label: "ID đơn sản xuất",
                isError: validateIdField,
            },
            {
                id: "materialDefinitionId",
                type: "select",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                // isError: validateDateInput,
            },
            {
                id: "availableDate",
                type: "datetime-local",
                label: "Ngày có thể thực hiện",
                // isError: validateDateInput,
            },
            {
                id: "priority",
                type: "text",
                label: "Mức độ ưu tiên",
                isError: validateNumberField,
            },
        ],
    },
]

export const getCreateInjectionManufacturingOrderMenuNav = (materialDefinitionList, equipmentList) => [
    {
        id: "info",
        title: "Đơn sản xuất máy ép mới",
        type: "form",
        items: [
            {
                id: "manufacturingOrderId",
                type: "text",
                label: "ID đơn sản xuất máy ép",
                isError: validateIdField,
            },
            {
                id: "materialDefinitionId",
                type: "select",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                // isError: validateDateInput,
            },
            {
                id: "availableDate",
                type: "datetime-local",
                label: "Ngày có thể thực hiện",
                // isError: validateDateInput,
            },
            {
                id: "priority",
                type: "text",
                label: "Mức độ ưu tiên",
                isError: validateNumberField,
            },
            {
                id: "equipments",
                type: "select",
                label: "Danh sách máy ép",
                list: equipmentList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getEditManufacturingOrderMenuNav = (materialDefinitionList) => [
    {
        id: "info",
        title: "Đơn sản xuất mới",
        type: "form",
        items: [
            {
                id: "materialDefinitionId",
                type: "select",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                // isError: validateDateInput,
            },
            // {
            //     id: "workOrderIds",
            //     type: "select",
            //     label: "ID đơn công đoạn",
            //     list: materialDefinitionList ?? [],
            //     isError: validateRequiredField,
            // },
        ],
    },
]

export const getCreateScheduleMenuNav = (materialDefinitionList) => [
    {
        id: "she",
        title: "Lịch làm việc mới",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên lịch làm việc mới",
                isError: validateRequiredField,
            },
            {
                id: "materialDefinitionId",
                type: "checkbox",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                // isError: validateDateInput,
            },
            {
                id: "availableDate",
                type: "datetime-local",
                label: "Ngày có thể thực hiện",
                // isError: validateDateInput,
            },
            {
                id: "priority",
                type: "text",
                label: "Mức độ ưu tiên",
                isError: validateNumberField,
            },
        ],
    },
]
