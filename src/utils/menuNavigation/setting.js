import { validateDescField, validateTimeInput } from "@/utils/functions"

export const SHIFTS_SETTING_MENU_NAV = {
    id: "shiftInfo",
    type: "table",
    headers: [
        {
            Header: "Mô tả",
            accessor: "description",
        },
        {
            Header: "Thời gian bắt đầu ca",
            accessor: "startTime",
        },
        {
            Header: "Thời gian kết thúc ca",
            accessor: "endTime",
        },
    ],
    subNav: [
        {
            id: "info",
            title: "Thông tin ca làm",
            type: "form",
            items: [
                {
                    id: "description",
                    label: "Mô tả",
                    type: "text",
                    isError: validateDescField,
                },
                {
                    id: "startTime",
                    label: "Thời gian bắt đầu ca",
                    type: "text",
                    isError: validateTimeInput,
                },
                {
                    id: "endTime",
                    label: "Thời gian kết thúc ca",
                    type: "text",
                    isError: validateTimeInput,
                },
            ],
        },
    ],
}
