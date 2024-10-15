import { validateRequiredField, validateIdField, validateDescField } from "@/utils/functions/validate"
import {
    PROPERTIES_TABLE_COLUMNS,
    INJECTION_MACHINE_TABLE_COLUMNS,
    NORMAL_MACHINE_TABLE_COLUMNS,
    MATERIAL_PROP_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    CREATE_PROPERTY_SUB_NAV,
    EDIT_PROPERTY_SUB_NAV,
    CREATE_INJECTION_MACHINE_PROPERTIES_SUB_NAV,
    CREATE_NORMAL_MACHINE_PROPERTIES_SUB_NAV,
} from "./common"

//worker
export const getCreateWorkerMenuNav = (workerTypeList) => [
    {
        id: "info",
        title: "Thông tin nhân viên",
        type: "form",
        items: [
            {
                id: "personId",
                type: "text",
                label: "ID nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Tên nhân viên",
                isError: validateIdField,
            },
            {
                id: "personnelClasses",
                type: "selectMutils",
                label: "Loại nhân viên",
                list: workerTypeList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]

export const getEditWorkerMenuNav = (workerTypeList) => [
    {
        id: "info",
        title: "Thông tin nhân viên",
        type: "form",
        items: [
            {
                id: "personId",
                type: "text",
                label: "ID nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Tên nhân viên",
                isError: validateIdField,
            },
            {
                id: "personnelClasses",
                type: "selectMutils",
                label: "Loại nhân viên",
                list: workerTypeList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính nhân viên",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        canAddRecord: false,
        subNav: EDIT_PROPERTY_SUB_NAV,
    },
]

export const getWorkerClassMenuNav = () => [
    {
        id: "info",
        title: "Thông tin loại nhân viên",
        type: "form",
        items: [
            {
                id: "personnelClassId",
                type: "text",
                label: "ID loại nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính loại nhân viên",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    },
]

//equipment
export const getCreateEquipmentMenuNav = (equipmentTypeList, fiveSelectData) => [
    {
        id: "info",
        title: "Thông tin thiết bị",
        type: "form",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentTypeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "workUnit",
                type: "fiveSelect",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính thiết bị",
        type: "table",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
        ],
        headers: NORMAL_MACHINE_TABLE_COLUMNS,
        subNav: CREATE_NORMAL_MACHINE_PROPERTIES_SUB_NAV,
    },
]
export const getCreateInjectionMachineMenuNav = (moldList, fiveSelectData) => [
    {
        id: "info",
        title: "Thông tin máy ép",
        type: "form",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID máy ép",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên máy ép",
                isError: validateDescField,
            },
            {
                id: "molds",
                type: "selectMutils",
                label: "Khuôn",
                list: moldList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "valueString",
                type: "text",
                label: "Công suất tối đa",
                isError: validateRequiredField,
            },
            {
                id: "valueUnitOfMeasure",
                type: "select",
                label: "Đơn vị",
                list: [
                    {
                        key: "W",
                        value: "W",
                    },
                    {
                        key: "kW",
                        value: "kW",
                    },
                ],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "workUnit",
        title: "Thông tin máy ép",
        type: "form",
        items: [
            {
                id: "workUnit",
                type: "fiveSelect",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreateMoldMenuNav = (injectionMachineList, fiveSelectData) => [
    {
        id: "info",
        title: "Thông tin khuôn",
        type: "form",
        items: [
            {
                id: "moldId",
                type: "text",
                label: "ID khuôn",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên khuôn",
                isError: validateDescField,
            },
            {
                id: "cycleBySecond",
                type: "text",
                label: "Chu kì ép của khuôn(s)",
                isError: validateDescField,
            },
            {
                id: "plasticInjectionMachines",
                type: "selectMutils",
                label: "Máy ép",
                list: injectionMachineList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "workUnit",
        title: "Thông tin khuôn",
        type: "form",
        items: [
            {
                id: "workUnit",
                type: "fiveSelect",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getEditEquipmentMenuNav = (equipmentTypeList, equipmentWorkUnitList) => [
    {
        id: "info",
        title: "Thông tin thiết bị",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentTypeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "workUnit",
                type: "selectMutils",
                label: "Đơn vị sản xuất",
                list: equipmentWorkUnitList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính thiết bị",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     canAddRecord: false,
    //     subNav: EDIT_PROPERTY_SUB_NAV,
    // },
]

export const getEquipmentClassMenuNav = () => [
    {
        id: "info",
        title: "Thông tin loại thiết bị",
        type: "form",
        items: [
            {
                id: "equipmentClassId",
                type: "text",
                label: "ID loại thiết bị",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính loại thiết bị",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     subNav: CREATE_PROPERTY_SUB_NAV,
    // },
]

//material
export const getCreateMaterialMenuNav = () => [
    {
        id: "info",
        title: "Thông tin vật tư",
        type: "form",
        items: [
            {
                id: "materialDefinitionId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            // {
            //     id: "moduleType",
            //     type: "text",
            //     label: "Loại module",
            //     isError: validateDescField,
            // },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính vật tư",
        type: "table",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
        ],
        headers: MATERIAL_PROP_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    },
    // {
    //     id: "info",
    //     title: "Thông tin vật tư",
    //     type: "form",
    //     items: [
    //         {
    //             id: "materialDefinitionId",
    //             type: "text",
    //             label: "ID vật tư",
    //             isError: validateIdField,
    //         },
    //         {
    //             id: "name",
    //             type: "text",
    //             label: "Tên vật tư",
    //             isError: validateDescField,
    //         },
    //         {
    //             id: "primaryUnit",
    //             type: "text",
    //             label: "Đơn vị chính",
    //             isError: validateDescField,
    //         },
    //         {
    //             id: "moduleType",
    //             type: "text",
    //             label: "Loại module",
    //             isError: validateDescField,
    //         },
    //     ],
    // },
    // {
    //     id: "properties",
    //     title: "Thuộc tính vật tư",
    //     type: "table",

    // },
]
export const getCreatePlasticProductsMenuNav = (moldList, plasticMaterialsList) => [
    {
        id: "info",
        title: "Thông tin vật tư máy ép",
        type: "form",
        items: [
            {
                id: "plasticProductId",
                type: "text",
                label: "ID vật tư máy ép",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư máy ép",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            {
                id: "molds",
                type: "selectMutils",
                label: "Khuôn",
                list: moldList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "plasticMaterials",
                type: "selectMutils",
                label: "Nguyên liệu nhựa",
                list: plasticMaterialsList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreatePlasticMaterialMenuNav = () => [
    {
        id: "info",
        title: "Thông tin nguyên liệu nhựa",
        type: "form",
        items: [
            {
                id: "plasticMaterialId",
                type: "text",
                label: "ID nguyên liệu nhựa",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên nguyên liệu nhựa",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            
        ],
    },
]
export const getCreateWorkUnitMenuNav = () => [
    {
        id: "info",
        title: "Đơn vị phụ",
        type: "form",
        items: [
            {
                id: "unitId",
                type: "text",
                label: "Id",
                isError: validateIdField,
            },
            {
                id: "unitName",
                type: "text",
                label: "Tên đơn vị phụ",
                isError: validateDescField,
            },
            {
                id: "conversionValueToPrimaryUnit",
                type: "text",
                label: "Quy đổi sang đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
]
export const getCreateOperationMenuNav = (previousOperation) => [
    {
        id: "info",
        title: "Công đoạn",
        type: "form",
        items: [
            {
                id: "operationId",
                type: "text",
                label: "Id",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateDescField,
            },
            // {
            //     id: "duration",
            //     type: "text",
            //     label: "Thời gian ",
            //     isError: validateDescField,
            // },
            {
                id: "prerequisiteOperation",
                type: "selectMutils",
                label: "Công đoạn trước",
                list: previousOperation ?? [],
            },
        ],
    },
]
export const getMaterialClassMenuNav = () => [
    {
        id: "info",
        title: "Thông tin loại vật tư",
        type: "form",
        items: [
            {
                id: "materialClassId",
                type: "text",
                label: "ID loại vật tư",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính loại vật tư",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    },
]

export const getEditMaterialMenuNav = (materialClasses) => [
    {
        id: "info",
        title: "Thông tin vật tư",
        type: "form",
        items: [
            {
                id: "materialDefinitionId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính vật tư",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     canAddRecord: false,
    //     subNav: EDIT_PROPERTY_SUB_NAV,
    // },
]
export const getEditWorkUnitMenuNav = (materialClasses) => [
    {
        id: "info",
        title: "Đơn vị phụ",
        type: "form",
        items: [
            {
                id: "unitName",
                type: "text",
                label: "Tên đơn vị phụ",
                isError: validateDescField,
            },
            {
                id: "conversionValueToPrimaryUnit",
                type: "text",
                label: "Quy đổi sang đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
]
export const getEditOperationMenuNav = (previousOperation) => [
    {
        id: "info",
        title: "Công đoạn",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateDescField,
            },
            {
                id: "duration",
                type: "text",
                label: "Thời gian ",
                isError: validateDescField,
            },
            {
                id: "prerequisiteOperation",
                type: "selectMutils",
                label: "Công đoạn trước",
                list: previousOperation ?? [],
            },
        ],
    },
]
