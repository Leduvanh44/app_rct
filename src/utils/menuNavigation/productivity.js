import { validateNumberField, validateRequiredField } from "../functions"

export const getCreateProductivityMenuNav = (materialList) => [
    {
        id: "info",
        title: "Thêm năng suất tiêu chuẩn",
        type: "form",
        items: [
            {
                id: "materialDifinitionId",
                type: "select",
                label: "ID vật tư",
                list: materialList,
                isError: validateRequiredField,
            },
            {
                id: "output",
                type: "text",
                label: "Năng suất tiêu chuẩn(sp/giờ)",
                isError: validateNumberField,
            },
        ],
    },
]

export const getEditProductivityMenuNav = () => [
    {
        id: "info",
        title: "Cập nhật năng suất tiêu chuẩn",
        type: "form",
        items: [
            {
                id: "output",
                type: "text",
                label: "Năng suất tiêu chuẩn(sp/giờ)",
                isError: validateNumberField,
            },
        ],
    },
]
