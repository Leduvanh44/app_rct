/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react"
import cl from "classnames"
import { toast } from "react-toastify"

function DateInput({ id, label, value, setValue, className, type, dayCompare }) {
    // type dùng để xác định input dayStart hay Dayend; dayCompare dùng để truyền ngày vào và so sánh-> kiểm tra hợp lệ
    const containerRef = useRef()

    const [focus, setFocus] = useState(false)
    const [inputDate, setInputDate] = useState(value)
    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
    }
    useEffect(() => {
        if (type == "dayStart") {
            if (inputDate < dayCompare) {
                setValue(inputDate)
            } else {
                toast.error("Ngày kết thúc phải sau ngày bắt đầu")
            }
        } else {
            if (inputDate > dayCompare) {
                setValue(inputDate)
            } else {
                toast.error("Ngày kết thúc phải sau ngày bắt đầu")
            }
        }
    }, [inputDate])
    return (
        <>
            <div
                ref={containerRef}
                data-component="SelectInput"
                className={cl(
                    "relative min-h-[64px] border-b-2  bg-neutron-4 pb-1",
                    {
                        "border-primary-3": !focus,
                        "border-primary-2": focus,
                    },
                    className,
                )}
            >
                <label
                    className={cl("absolute transition-all", {
                        "text-16-b top-0 left-0 text-primary-2": focus,
                        "text-14 bottom-1 left-2 text-neutron-2": !focus,
                        "text-16-b text-neutron-1": !focus,
                    })}
                >
                    {label}
                </label>
                <div className="flex min-h-[58px] items-end pt-6">
                    <div className="ml-2 flex w-fit min-w-[150px] max-w-[200px] flex-wrap"></div>
                    <input
                        type="date"
                        className="text-14 m block h-5 grow pl-2 focus:outline-none"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setInputDate(e.target.value)}
                        value={value}
                    />
                </div>
            </div>
        </>
    )
}

export default DateInput
