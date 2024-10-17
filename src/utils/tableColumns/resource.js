//overview

export const WORKER_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "personId",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Loại nhân viên",
        accessor: "personnelClasses",
        disableSortBy: true,
    },
]

export const EQUIPMENT_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "equipmentClassId",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
]

export const MATERIAL_TABLE_COLUMNS = [
    {
        Header: "ID vật tư",
        accessor: "materialDefinitionId",
        disableSortBy: false,
    },
    {
        Header: "Tên vật tư",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: true,
    },
]

//worker
export const WORKER_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "personId",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Loại nhân viên",
        accessor: "personnelClasses",
        disableSortBy: true,
    },
]

export const WORKER_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại nhân viên",
        accessor: "personnelClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
]

//equipment
export const EQUIPMENT_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "equipmentId",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại thiết bị",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị sản xuất",
        accessor: "workUnit",
        disableSortBy: false,
    },
]
export const PLASTICMATERIAL_INFO_TABLE_COLUMNS = [
    {
        Header: "ID nguyên liệu nhựa",
        accessor: "plasticMaterialId",
        disableSortBy: false,
    },
    {
        Header: "Tên nguyên liệu nhựa",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: false,
    },
]
export const PLASTICPRODUCT_INFO_TABLE_COLUMNS = [
    {
        Header: "ID sản phẩm ép",
        accessor: "plasticProductId",
        disableSortBy: false,
    },
    {
        Header: "Tên sản phẩm ép",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: false,
    },
]
//equipment
export const MOLD_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "moldId",
        disableSortBy: false,
    },
    {
        Header: "Tên khuôn",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại khuôn",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị sản xuất",
        accessor: "workUnit",
        disableSortBy: false,
    },
]
export const EQUIPMENT_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại thiết bị",
        accessor: "equipmentClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "name",
        disableSortBy: false,
    },
]

//material
export const MATERIAL_INFO_TABLE_COLUMNS = [
    {
        Header: "ID vật tư",
        accessor: "materialDefinitionId",
        disableSortBy: false,
    },
    {
        Header: "Tên vật tư",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: false,
    },
]

export const MATERIAL_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại vật tư",
        accessor: "materialClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
]

export const SUB_SLOT_TABLE_COLUMNS = [
    {
        Header: "Phân lô",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Vị trí",
        accessor: "location",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "value",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: true,
    },
]
export const RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER = [
    {
        AccordionTableTitle: "Đơn vị phụ",
        tableHeader: [
            {
                Header: "Id",
                accessor: "unitId",
            },
            {
                Header: "Tên",
                accessor: "unitName",
            },
            {
                Header: "Quy đổi sang đơn vị chính",
                accessor: "conversionValueToPrimaryUnit",
            },
        ],
    },

    {
        AccordionTableTitle: "Công đoạn",
        tableHeader: [
            {
                Header: "Id",
                accessor: "operationId",
            },
            {
                Header: "Tên",
                accessor: "name",
            },
            {
                Header: "Thời gian",
                accessor: "duration",
            },
            {
                Header: "Công đoạn trước",
                accessor: "prerequisiteOperation",
            },
        ],
    },
    {
        AccordionTableTitle: "Lỗi vật tư",
        tableHeader: [
            {
                Header: "Id",
                accessor: "unitId",
            },
            {
                Header: "Tên lỗi",
                accessor: "unitName",
            },
            {
                Header: "Mô tả",
                accessor: "conversionValueToPrimaryUnit",
            },
        ],
    },

]
export const RESOURCE_EQUIPMENT_ACCORDION_TABLE_HEADER = [
    {
        AccordionTableRow: "Loại thiết bị",
        tableHeader: [
            {
                Header: "Id",
                accessor: "equipmentId",
            },
            {
                Header: "Tên",
                accessor: "name",
            },
        ],
    },
    {
        AccordionTableRow: "Danh sách thiết bị",
        tableHeader: [
            {
                Header: "Id",
                accessor: "id",
            },
            {
                Header: "Tên",
                accessor: "Name",
            },
            {
                Header: "Loại",
                accessor: "Type",
            },
            {
                Header: "Vị trí",
                accessor: "Location",
            },
        ],
    },
]
//material lot

export const MATERIAL_LOT_TABLE_COLUMNS = [
    {
        Header: "ID vật tư",
        accessor: "materialDefinition",
        disableSortBy: false,
    },
    {
        Header: "Id lot",
        accessor: "materialLotId",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "quantity",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị vật liệu",
        accessor: "unit",
        disableSortBy: false,
    },
]
export const EQUIPMENT_NORMALMACHINE_PROPERTIES_TABLE_COLUMNS = [
    {
        Header: "propertyId",
        accessor: "propertyId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Giá trị",
        accessor: "valueString",
        disableSortBy: false,
    },
    {
        Header: "Kiểu dữ liệu",
        accessor: "valueType",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "valueUnitOfMeasure",
        disableSortBy: false,
    },
]

export const EQUIPMENT_ERROR_PROPERTIES_TABLE_COLUMNS = [
    {
        Header: "Mã lỗi",
        accessor: "valueString",
        disableSortBy: false,
    },
    {
        Header: "Loại lỗi",
        accessor: "valueString",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "valueString",
        disableSortBy: false,
    },
]
