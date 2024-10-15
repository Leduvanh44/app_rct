export const SEGMENT_WORKER_MOCK_DATA = [
    {
        type: "Đứng máy",
        quantity: "1",
        unit: "người",
    },
    {
        type: "Lấy khuôn",
        quantity: "1",
        unit: "người",
    },
]

export const SEGMENT_EQUIPMENT_MOCK_DATA = [
    {
        type: "Máy ép nhựa",
        quantity: "3",
        unit: "máy",
    },
    {
        type: "Máy ép cao su",
        quantity: "4",
        unit: "máy",
    },
]

export const SEGMENT_MATERIAL_MOCK_DATA = [
    {
        id: "mate-1",
        description: "Vật tư 1",
        quantity: "12",
        unit: "Tấm",
    },
]

export const SEGMENT_PARAMS_MOCK_DATA = [
    {
        description: "Khối lượng tiêu chuẩn",
        value: "0.4",
        unit: "kg",
    },
    {
        description: "Khối lượng tối đa",
        value: "0.6",
        unit: "kg",
    },
    {
        description: "Khối lượng tối thiểu",
        value: "0.2",
        unit: "kg",
    },
]

export const PRODUCT_SEGMENTS_MOCK_DATA = [
    {
        segmentId: "3",
        description: "công đoạn 3",
        workerType: ["giao hàng", "kho"],
        equipmentType: ["Máy ép nhựa"],
        material: ["Nhựa PVC"],
        duration: 15,
    },
    {
        segmentId: "5",
        description: "công đoạn 5",
        workerType: ["đứng máy"],
        equipmentType: ["Máy ép cao su", "Máy ép lagging"],
        material: ["Cao su lưu hóa"],
        duration: 8,
    },
    {
        segmentId: "7",
        description: "công đoạn 7",
        workerType: ["giao hàng"],
        equipmentType: ["Máy ép lagging"],
        material: ["Cao su non"],
        duration: 10,
    },
]

export const SEGMENT_RELATIONSHIP_MOCK_DATA = [
    {
        segmentA: "start-segment",
        relation: 1,
        segmentB: "3",
    },
    {
        segmentA: "3",
        relation: 0,
        segmentB: "5",
        duration: 4,
    },
    {
        segmentA: "5",
        relation: 2,
        segmentB: "7",
    },
    {
        segmentA: "3",
        relation: 2,
        segmentB: "7",
    },
]
