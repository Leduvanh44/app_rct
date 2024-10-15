import { VALUE_TYPE, TIME_UNIT_LIST, SEGMENT_RELATION_OPTION_LIST } from "@/utils/constants"
import { PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"
import {
    validateRequiredField,
    validateNumberField,
    validateIdField,
    validateDescField,
} from "@/utils/functions/validate"
import { CREATE_PROPERTY_SUB_NAV } from "./common"

export const productMenuNav = {
    //Product info
    getInfo: () => ({
        id: "info",
        title: "Thông tin sản phẩm",
        type: "form",
        items: [
            {
                id: "productId",
                type: "text",
                label: "ID sản phẩm",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Tên sản phẩm",
                isError: validateDescField,
            },
        ],
    }),

    //Product properties
    getProperties: () => ({
        id: "properties",
        title: "Thuộc tính sản phẩm",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    }),

    //Product segments
    getSegments: (
        workerTypeList = [],
        equipmentTypeList = [],
        materialTypesList = [],
        workerList = [],
        equipmentList = [],
        materialList = [],
    ) => ({
        id: "productSegments",
        title: "Công đoạn sản phẩm",
        type: "table",
        headers: [
            {
                Header: "ID",
                accessor: "productSegmentId",
                disableSortBy: false,
            },
            {
                Header: "Tên công đoạn",
                accessor: "description",
                disableSortBy: false,
            },
            {
                Header: "Số loại nhân viên",
                accessor: "workerTypeCount",
                disableSortBy: false,
            },
            {
                Header: "Số loại thiết bị",
                accessor: "equipmentTypeCount",
                disableSortBy: false,
            },
            {
                Header: "Số vật tư",
                accessor: "materialCount",
                disableSortBy: false,
            },
            {
                Header: "Thời gian dự kiến",
                accessor: "duration",
                disableSortBy: false,
            },
            {
                Header: "Đơn vị",
                accessor: "durationUnitDisplay",
            },
        ],
        subNav: [
            {
                id: "info",
                title: "Thêm công đoạn mới",
                type: "form",
                items: [
                    {
                        id: "productSegmentId",
                        type: "text",
                        label: "ID",
                        isError: validateIdField,
                    },
                    {
                        id: "description",
                        type: "text",
                        label: "Tên công đoạn",
                        isError: validateDescField,
                    },
                    {
                        id: "duration",
                        type: "text",
                        label: "Thời gian dự kiến",
                        isError: validateNumberField,
                    },
                    {
                        id: "durationUnit",
                        type: "select",
                        label: "Đơn vị",
                        list: TIME_UNIT_LIST,
                        isError: validateRequiredField,
                    },
                ],
            },
            {
                id: "personnelSpecifications",
                title: "Danh sách loại nhân viên",
                type: "table",
                headers: [
                    {
                        Header: "ID loại nhân viên",
                        accessor: "personnelClasses",
                        disableSortBy: false,
                    },
                    {
                        Header: "Số lượng",
                        accessor: "quantity",
                        disableSortBy: false,
                    },
                    {
                        Header: "Đơn vị",
                        accessor: "quantityUnitOfMeasure",
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "info",
                        title: "Thêm loại nhân viên",
                        type: "form",
                        items: [
                            {
                                id: "personnelClasses",
                                type: "select",
                                label: "ID loại  nhân viên",
                                list: workerTypeList,
                                isError: validateRequiredField,
                            },
                            {
                                id: "quantityUnitOfMeasure",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "quantity",
                                type: "text",
                                label: "Số lượng",
                                isError: validateNumberField,
                            },
                        ],
                    },
                ],
            },
            {
                id: "equipmentSpecifications",
                title: "Danh sách loại thiết bị",
                type: "table",
                headers: [
                    {
                        Header: "ID loại thiết bị",
                        accessor: "equipmentClasses",
                        disableSortBy: false,
                    },
                    {
                        Header: "Số lượng",
                        accessor: "quantity",
                        disableSortBy: false,
                    },
                    {
                        Header: "Đơn vị",
                        accessor: "quantityUnitOfMeasure",
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "info",
                        title: "Thêm loại thiết bị",
                        type: "form",
                        items: [
                            {
                                id: "equipmentClasses",
                                type: "select",
                                label: "Loại thiết bị",
                                list: equipmentTypeList,
                                isError: validateRequiredField,
                            },
                            {
                                id: "quantityUnitOfMeasure",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "quantity",
                                type: "text",
                                label: "Số lượng",
                                isError: validateNumberField,
                            },
                        ],
                    },
                ],
            },
            {
                id: "materialSpecification",
                title: "Danh sách vật tư",
                type: "table",
                headers: [
                    {
                        Header: "ID loại vật tư",
                        accessor: "materialClasses",
                        disableSortBy: false,
                    },
                    {
                        Header: "Số lượng",
                        accessor: "quantity",
                        disableSortBy: false,
                    },
                    {
                        Header: "Đơn vị",
                        accessor: "quantityUnitOfMeasure",
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "info",
                        title: "Thêm vật tư",
                        type: "form",
                        items: [
                            {
                                id: "materialClasses",
                                type: "select",
                                label: "Chọn vật tư",
                                list: materialTypesList,
                                isError: validateRequiredField,
                            },
                            {
                                id: "quantityUnitOfMeasure",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "quantity",
                                type: "text",
                                label: "Số lượng",
                                isError: validateNumberField,
                            },
                        ],
                    },
                ],
            },
            {
                id: "properties",
                title: "Yêu cầu công đoạn",
                type: "table",
                headers: [
                    {
                        Header: "ID yêu cầu",
                        accessor: "propertyId",
                        disableSortBy: false,
                    },
                    {
                        Header: "Yêu cầu",
                        accessor: "description",
                        disableSortBy: false,
                    },
                    {
                        Header: "Giá trị",
                        accessor: "valueString",
                        disableSortBy: false,
                    },
                    {
                        Header: "Đơn vị",
                        accessor: "valueUnitOfMeasure",
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "property",
                        title: "Thêm yêu cầu mới",
                        type: "form",
                        items: [
                            {
                                id: "propertyId",
                                type: "text",
                                label: "ID yêu cầu",
                                isError: validateIdField,
                            },
                            {
                                id: "description",
                                type: "text",
                                label: "Mô tả",
                                isError: validateDescField,
                            },
                            {
                                id: "valueUnitOfMeasure",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "valueType",
                                type: "select",
                                label: "Kiểu dữ liệu",
                                list: [
                                    {
                                        key: "Đúng/Sai",
                                        value: VALUE_TYPE.boolean,
                                    },
                                    {
                                        key: "Số nguyên",
                                        value: VALUE_TYPE.interger,
                                    },
                                    {
                                        key: "Số thập phân",
                                        value: VALUE_TYPE.decimal,
                                    },
                                    {
                                        key: "Chuỗi ký tự",
                                        value: VALUE_TYPE.string,
                                    },
                                ],
                                isError: validateRequiredField,
                            },
                            {
                                id: "valueString",
                                type: "text",
                                label: "Giá trị",
                                isError: validateRequiredField,
                            },
                        ],
                    },
                ],
            },
        ],
    }),

    //Segment relationships
    getSegMentRelationship: (segments = []) => {
        const startList = [...segments]
        segments.shift()
        const endList = segments

        return {
            id: "segmentRelationships",
            title: "Ràng buộc giữa các công đoạn",
            type: "table",
            headers: [
                {
                    Header: "ID công đoạn A",
                    accessor: "segmentA",
                    disableSortBy: false,
                },
                {
                    Header: "Loại ràng buộc",
                    accessor: "relationDisplay",
                    disableSortBy: false,
                },
                {
                    Header: "ID công đoạn B",
                    accessor: "segmentB",
                    disableSortBy: false,
                },
                {
                    Header: "Thời gian",
                    accessor: "duration",
                    disableSortBy: false,
                },
            ],
            subNav: [
                {
                    id: "info",
                    title: "Thêm ràng buộc",
                    type: "form",
                    items: [
                        {
                            id: "segmentA",
                            type: "select",
                            label: "ID công đoạn A",
                            list: startList,
                            isError: validateRequiredField,
                        },
                        {
                            id: "relation",
                            type: "select",
                            label: "Ràng buộc",
                            list: SEGMENT_RELATION_OPTION_LIST,
                            isError: validateRequiredField,
                        },
                        {
                            id: "segmentB",
                            type: "select",
                            label: "ID công đoạn B",
                            list: endList,
                            isError: validateRequiredField,
                        },
                        {
                            id: "duration",
                            type: "text",
                            label: "Thời gian",
                            isError: validateNumberField,
                        },
                        {
                            id: "durationUnit",
                            type: "select",
                            label: "Đơn vị",
                            list: TIME_UNIT_LIST,
                            isError: validateRequiredField,
                        },
                    ],
                },
            ],
        }
    },
}
