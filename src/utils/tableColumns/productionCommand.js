export const PRODUCTION_COMMAND_TABLE_COLUMNS = [
    {
        Header: "ID work order",
        accessor: "workOrderId",
        disableSortBy: false,
    },
    {
        Header: "ID manufacturing order",
        accessor: "manufacturingOrder",
        disableSortBy: false,
    },
    {
        Header: "workCenter",
        accessor: "workCenter",
        disableSortBy: false,
    },
    {
        Header: "workOrderStatus",
        accessor: "workOrderStatus",
        disableSortBy: false,
    },
    {
        Header: "Ngày bắt đầu",
        accessor: "startTime",
        disableSortBy: false,
    },
    {
        Header: "endTime",
        accessor: "endTime",
        disableSortBy: false,
    },
    {
        Header: "dueDate",
        accessor: "dueDate",
        disableSortBy: false,
    },
]
export const MANUFACTURING_ORDER_TABLE_COLUMNS = [
    {
        Header: "ID đơn sản xuất",
        accessor: "manufacturingOrderId",
        disableSortBy: false,
    },
    // {
    //     Header: "Mô tả",
    //     accessor: "description",
    //     disableSortBy: false,
    // },
    {
        Header: "Số lượng",
        accessor: "quantity",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: false,
    },
    {
        Header: "Ngày đến hạn",
        accessor: "dueDate",
        disableSortBy: false,
    },
]
export const PRODUCT_LIST_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên sản phẩm",
        accessor: "product",
        disableSortBy: false,
    },
]
