export const VALUE_TYPE = {
    boolean: 0,
    interger: 1,
    decimal: 2,
    string: 3,
}

export const SEGMENT_RELATION = {
    afterWithDuration: 0,
    afterJustDone: 1,
    after: 2,
}

export const TIME_UNIT_LIST = [
    { value: 0, key: "Mili giây" },
    { value: 1, key: "Giây" },
    { value: 2, key: "Phút" },
    { value: 3, key: "Giờ" },
    { value: 4, key: "Ngày" },
]

export const SEGMENT_RELATION_OPTION_LIST = [
    { value: SEGMENT_RELATION.afterWithDuration, key: "Thực hiện sau một khoảng thời gian" },
    { value: SEGMENT_RELATION.afterJustDone, key: "Thực hiện ngay sau" },
    { value: SEGMENT_RELATION.after, key: "Thực hiện sau" },
]

export const PRODUCT_SCHEDULE_STATUS_LIST = [
    {
        value: "0",
        key: "Tất cả trạng thái",
    },
    {
        value: "1",
        key: "Chưa sản xuất",
    },
    {
        value: "2",
        key: "Đang sản xuất",
    },
    {
        value: "3",
        key: "Đã hoàn thành",
    },
]

export const MACHINE_LIST = [
    { value: "P001-left-U", key: "Máy ép P001-left-U" },
    { value: "P001-left-D", key: "Máy ép P001-left-D" },
    { value: "P001-right-U", key: "Máy ép P001-right-U" },
    { value: "P001-right-D", key: "Máy ép P001-right-D" },
    { value: "P002-left-U", key: "Máy ép P002-left-U" },
    { value: "P002-left-D", key: "Máy ép P002-left-D" },
    { value: "P002-right-U", key: "Máy ép P002-right-U" },
    { value: "P002-right-D", key: "Máy ép P002-right-D" },
    { value: "P003-left-U", key: "Máy ép P003-left-U" },
    { value: "P003-left-D", key: "Máy ép P003-left-D" },
    { value: "P003-right-U", key: "Máy ép P003-right-U" },
    { value: "P003-right-D", key: "Máy ép P003-right-D" },
    { value: "P004-left-U", key: "Máy ép P004-left-U" },
    { value: "P004-left-D", key: "Máy ép P004-left-D" },
    { value: "P004-right-U", key: "Máy ép P004-right-U" },
    { value: "P004-right-D", key: "Máy ép P004-right-D" },
    { value: "P005-left-U", key: "Máy ép P005-left-U" },
    { value: "P005-left-D", key: "Máy ép P005-left-D" },
    { value: "P005-right-U", key: "Máy ép P005-right-U" },
    { value: "P005-right-D", key: "Máy ép P005-right-D" },
    { value: "P007-left-U", key: "Máy ép P007-left-U" },
    { value: "P007-left-D", key: "Máy ép P007-left-D" },
    { value: "P007-right-U", key: "Máy ép P007-right-U" },
    { value: "P007-right-D", key: "Máy ép P007-right-D" },
    { value: "P009-left-U", key: "Máy ép P009-left-U" },
    { value: "P009-left-D", key: "Máy ép P009-left-D" },
    { value: "P009-right-U", key: "Máy ép P009-right-U" },
    { value: "P009-right-D", key: "Máy ép P009-right-D" },
    { value: "P010-left-U", key: "Máy ép P010-left-U" },
    { value: "P010-left-D", key: "Máy ép P010-left-D" },
    { value: "P010-right-U", key: "Máy ép P010-right-U" },
    { value: "P010-right-D", key: "Máy ép P010-right-D" },
    { value: "P011-left-U", key: "Máy ép P011-left-U" },
    { value: "P011-left-D", key: "Máy ép P011-left-D" },
    { value: "P011-right-U", key: "Máy ép P011-right-U" },
    { value: "P011-right-D", key: "Máy ép P011-right-D" },
    { value: "P101-left-U", key: "Máy ép P101-left-U" },
    { value: "P101-left-D", key: "Máy ép P101-left-D" },
    { value: "P101-right-U", key: "Máy ép P101-right-U" },
    { value: "P101-right-D", key: "Máy ép P101-right-D" },
    { value: "P102-left-U", key: "Máy ép P102-left-U" },
    { value: "P102-left-D", key: "Máy ép P102-left-D" },
    { value: "P102-right-U", key: "Máy ép P102-right-U" },
    { value: "P102-right-D", key: "Máy ép P102-right-D" },
    { value: "P103-left-U", key: "Máy ép P103-left-U" },
    { value: "P103-left-D", key: "Máy ép P103-left-D" },
    { value: "P103-right-U", key: "Máy ép P103-right-U" },
    { value: "P103-right-D", key: "Máy ép P103-right-D" },
    { value: "I1-1", key: "Máy ép nhựa I101" },
    { value: "I2-1", key: "Máy ép nhựa I102" },
    { value: "L1-1", key: "Máy ép lagging L1-1" },
    { value: "L1-2", key: "Máy ép lagging L1-2" },
    { value: "L1-3", key: "Máy ép lagging L1-3" },
    { value: "L1-4", key: "Máy ép lagging L1-4" },
]

export const OEE_MODE_LIST = ["All", "OEE", "A", "P", "Q"]
export const COMPANY_HIERACHY_MODE_LIST = ["TreeView", "OrgChart"]
export const RESOURCE_PAGE_EQUIPMENT_LIST = ["Máy thường", "Máy ép", "Khuôn"]
export const RESOURCE_PAGE_MATERIAL_LIST = ["Vật tư", "Sản phẩm ép", "Nguyên liệu nhựa"]
export const MANUFACTURING_ORDER_MODE_LIST = ["Đơn thường", "Đơn máy ép"]
export const MACHINE_TYPE_LIST = [
    { value: "0", key: "Máy thường" },
    { value: "1", key: "Máy ép" },
    { value: "2", key: "Khuôn" },
]
export const MATERIAL_TYPE_LIST = [
    { value: "0", key: "Vật tư" },
    { value: "1", key: "Sản phẩm ép" },
]
export const MANUFACTORING_ORDER_LIST = [
    { value: "normal", key: "Đơn thường" },
    { value: "injection", key: "Đơn máy ép" },
]
