import { useState, useRef, useEffect } from "react"
import cl from "classnames"
import { toast } from "react-toastify"

function DateTimeInput({ id, label, value, setValue, className, type, timeCompare }) {
    const containerRef = useRef()

    const [focus, setFocus] = useState(false)
    const [inputDateTime, setInputDateTime] = useState(value)

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
    }
    // múi h UTC
    // const formatISOTime = (datetime) => {
    //     const date = new Date(datetime)
    //     return date.toISOString().replace("Z", "")
    // }
    // múi h VietNam

    const formatToVietnamTime = (datetime) => {
        const date = new Date(datetime);
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        const vietnamTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
        const year = vietnamTime.getFullYear();
        const month = String(vietnamTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cộng 1
        const day = String(vietnamTime.getDate()).padStart(2, '0');
        const hours = String(vietnamTime.getHours()).padStart(2, '0');
        const minutes = String(vietnamTime.getMinutes()).padStart(2, '0');
        const seconds = String(vietnamTime.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    useEffect(() => {
        const timeToSeconds = (time) => {
            const [hours, minutes, seconds] = time.split(':').map(Number)
            return hours * 3600 + minutes * 60 + seconds
        }

        if (type === "timeStart") {
            if (timeToSeconds(inputDateTime.split("T")[1]) < timeToSeconds(timeCompare.split("T")[1])) {
                setValue(formatToVietnamTime(inputDateTime))
            } else {
                toast.error("Thời gian bắt đầu phải trước thời gian kết thúc")
            }
        } else {
            if (timeToSeconds(inputDateTime.split("T")[1]) > timeToSeconds(timeCompare.split("T")[1])) {
                setValue(formatToVietnamTime(inputDateTime))
            } else {
                toast.error("Thời gian kết thúc phải sau thời gian bắt đầu")
            }
        }
    }, [inputDateTime])

    return (
        <>
            <div
                ref={containerRef}
                data-component="DateTimeInput"
                className={cl(
                    "relative min-h-[64px] border-b-2 bg-neutron-4 pb-1",
                    {
                        "border-primary-3": !focus,
                        "border-primary-2": focus,
                    },
                    className
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
                        type="datetime-local"
                        step="1" // bước là 1 giây
                        className="text-14 m block h-5 grow pl-2 focus:outline-none"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setInputDateTime(e.target.value)}
                        value={inputDateTime}
                    />
                </div>
            </div>
        </>
    )
}

export default DateTimeInput
