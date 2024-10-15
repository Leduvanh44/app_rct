import {
    validateRequiredField,
    validateNumberField,
    validateDateInput,
    validateIdField,
    validateDescField,
} from "@/utils/functions"
export const getCreateHierachyCompanyMenuNav = (id,title) => [
    {
        id: "info",
        title: title,
        type: "form",
        items: [
            {
                id: id,
                type: "text",
                label: "Id",
                isError: validateRequiredField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getEditHierachyCompanyMenuNav = (id,title) => [
    {
        id: "info",
        title: title,
        type: "form",
        items: [
            {
                id: id,
                type: "text",
                label: "Id",
                isError: validateRequiredField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateRequiredField,
            },
        ],
    },
]
