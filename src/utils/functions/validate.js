export const handleValidateTextInput = (isError, setError, value, setValidateRows, rowId) => {
    if (isError) {
        setError(isError(value))

        if (!setValidateRows) return
        if (isError(value)) {
            setValidateRows((prev) => ({ ...prev, valid: prev.valid.filter((v) => v !== rowId) }))
        } else {
            setValidateRows((prev) => ({
                ...prev,
                valid: prev.valid.includes(rowId) ? prev.valid : [...prev.valid, rowId],
            }))
        }
    }
}

export const handleValidateSelectInput = (length, isError, setError, setValidateRows, rowId) => {
    if (isError) {
        setError(isError(length))

        if (!setValidateRows) return
        if (!isError(length)) {
            setValidateRows((prev) => ({
                ...prev,
                valid: prev.valid.includes(rowId) ? prev.valid : [...prev.valid, rowId],
            }))
        } else {
            setValidateRows((prev) => ({ ...prev, valid: prev.valid.filter((v) => v !== rowId) }))
        }
    }
}

export const validateRequiredField = (value) => {
    if (value && value.length > 0) {
        return false
    } else {
        return "Vui lòng không để trống trường này"
    }
}

export const validateNumberField = (value) => {
    if (value && !isNaN(value)) {
        return false
    } else {
        return "Vui lòng nhập một số hợp lệ"
    }
}

export const validateDateInput = (value) => {
    const regex =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

    if (regex.test(value)) {
        return false
    } else {
        return "Vui lòng nhập đúng định dạng ngày/tháng/năm"
    }
}

export const validateTimeInput = (value) => {
    const regex = /^([0-1]?[0-9]|[2][0-3]):[0-5]?[0-9]:[0-5]?[0-9]$/
    if (regex.test(value)) {
        return false
    } else {
        return "Vui lòng nhập đúng định dạng giờ:phút:giây"
    }
}

export const validateIdField = (value) => {
    const regex = /[/+&]/
    const length = value ? value.length : 0
    if (length === 0) {
        return "Vui lòng không để trống trường này"
    }
    if (length > 50) {
        return "Độ dài tối đa là 50 kí tự"
    }
    if (regex.test(value)) {
        return "Vui lòng không nhập các ki tự / + &"
    }
    return false
}

export const validateDescField = (value) => {
    if (value && value.length > 500) {
        return "Độ dài tối đa là 500 kí tự"
    }
    return false
}

export const validateValueType = (value, type) => {
    const valueTypes = ["boolean", "interger", "decimal", "string"]
    if (!value) {
        return "Trường này không được để trống"
    }
    switch (valueTypes[type]) {
        case "boolean":
        case "string":
            return false
        case "interger":
            const intRegex = /^[+-]?[\d]+$/
            if (intRegex.test(value)) {
                return false
            } else {
                return "Vui lòng nhập một số nguyên"
            }

        case "decimal":
            const decRegex = /^[-+]?[0-9]+\.?[0-9]+$/
            if (decRegex.test(value)) {
                return false
            } else {
                return "Vui lòng nhập một số thực"
            }

        default:
            return "Kiểu dữ liệu không hợp lệ"
    }
}
