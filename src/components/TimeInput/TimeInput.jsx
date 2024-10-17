import { useState, useRef, useEffect } from "react"
import cl from "classnames"
import { toast } from "react-toastify"

function TimeInput({ id, label, value, setValue, className, type, timeCompare }) {
    const containerRef = useRef()

    const [focus, setFocus] = useState(false)
    const [inputTime, setInputTime] = useState(value)
    
    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
    }

    useEffect(() => {
        const timeToSeconds = (time) => {
            const [hours, minutes, seconds] = time.split(':').map(Number)
            return hours * 3600 + minutes * 60 + seconds
        }

        if (type === "timeStart") {
            if (timeToSeconds(inputTime) < timeToSeconds(timeCompare)) {
                setValue(inputTime)
            } else {
                toast.error("Thời gian bắt đầu phải trước thời gian kết thúc")
            }
        } else {
            if (timeToSeconds(inputTime) > timeToSeconds(timeCompare)) {
                setValue(inputTime)
            } else {
                toast.error("Thời gian kết thúc phải sau thời gian bắt đầu")
            }
        }
    }, [inputTime])

    return (
        <>
            <div
                ref={containerRef}
                data-component="TimeInput"
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
                        type="time"
                        step="1" // bước là 1 giây (00:00:00 đến 23:59:59)
                        className="text-14 m block h-5 grow pl-2 focus:outline-none"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setInputTime(e.target.value)}
                        value={value}
                    />
                </div>
            </div>
        </>
    )
}

export default TimeInput
