import { useState, useEffect } from "react"
import cl from "classnames"

import { formatNumberValue } from "@/utils/functions"

function Progressbar({
    width,
    height = 40,
    color = "#4D7EB3",
    fontSize = 20,
    textLimit = 40,
    value,
    min = 0,
    max = 100,
    format,
    unit,
    fixed = 2,
    rounded,
    className,
    children,
}) {
    const [firstRender, setFirstRender] = useState(true)
    let percent = firstRender ? 0 : formatNumberValue((value * 100) / (max - min), format ?? rounded ?? fixed)

    useEffect(() => {
        setTimeout(() => setFirstRender(false))
    }, [])

    return (
        <div
            data-component="Progressbar"
            className={cl("flex w-full rounded-full bg-neutron-3", className)}
            style={{ width, height, fontSize }}
        >
            <div
                style={{ width: percent + "%", backgroundColor: color }}
                className={cl(
                    "flex h-full items-center justify-center rounded-tl-full rounded-bl-full",
                    " transition-all duration-300",
                    { "rounded-tr-full rounded-br-full": percent > 94 },
                )}
            >
                {percent >= textLimit && (
                    <div className="flex items-center text-neutron-4 ">
                        {children ? (
                            children
                        ) : (
                            <>
                                <span className="flex font-bold">{unit === "%" ? percent : value}</span>
                                <span className="flex font-semibold">{unit}</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            {percent < textLimit && (
                <div className="ml-2 flex items-center justify-center text-neutron-1">
                    {children ? (
                        children
                    ) : (
                        <>
                            <span className="flex font-bold">{unit === "%" ? percent : value}</span>
                            <span className="flex font-semibold">{unit}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Progressbar
