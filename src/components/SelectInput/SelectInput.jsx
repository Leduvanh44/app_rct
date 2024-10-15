/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from "react"
import cl from "classnames"
import { MdOutlineKeyboardArrowDown, MdOutlineClose } from "react-icons/md"

import { useDebounce } from "@/hooks"
import { handleValidateSelectInput } from "@/utils/functions"

function SelectInput({
    id,
    label,
    value = [],
    setValue,
    list = [],
    mutilChoises,
    disabled,
    className,
    isError,
    setValidateRows,
    canSearch = true,
}) {
    const containerRef = useRef()

    const [focus, setFocus] = useState(false)
    const [optionList, setOptionList] = useState(list)

    const [searchInput, setSearchInput] = useState("")
    const [error, setError] = useState(false)
    const debounce = useDebounce(searchInput, 200)

    const optionListPosition = useMemo(() => {
        const y = containerRef.current?.getBoundingClientRect()?.top
        return y && y < window.innerHeight / 2 ? "bottom" : "top"
    }, [focus])

    const handleSelect = (v) => {
        if (mutilChoises) {
            setValue([...value, v], id)
        } else {
            setValue([v], id)
        }
        setSearchInput("")
        setFocus(false)
    }

    const handleRemoveItem = (v) => {
        const newValue = value.filter((item) => item !== v)
        setValue(newValue, id)
        handleValidateSelectInput(newValue, isError, setError, setValidateRows, id)
    }

    const handleFocus = () => {
        const newOpList = list.filter((item) => !value.includes(item.value))

        setOptionList(newOpList)
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
        handleValidateSelectInput(value, isError, setError, setValidateRows, id)
    }

    const handleContainerClick = (e) => {
        e.stopPropagation()
        setFocus(true)
    }

    useEffect(() => {
        let newOpList
        if (debounce.length === 0) {
            newOpList = list.filter((item) => !value.includes(item.value))
        } else {
            newOpList = optionList.filter((item) => item.key.toLowerCase().includes(debounce.toLowerCase()))
        }
        setOptionList(newOpList)
    }, [debounce])

    //pass validate in first render if value is valid
    useEffect(() => {
        if (typeof isError === "function" && !isError(value)) {
            handleValidateSelectInput(value, isError, setError, setValidateRows, id)
        }

        const handleBlur = () => setFocus(false)
        document.addEventListener("click", handleBlur)

        return () => document.removeEventListener("click", handleBlur)
    }, [])

    return (
        <>
            <div
                ref={containerRef}
                data-component="SelectInput"
                className={cl(
                    "relative min-h-[64px] cursor-pointer border-b-2 bg-neutron-4 pb-1",
                    {
                        "border-primary-3": !focus,
                        "border-primary-2": focus,
                        "cursor-not-allowed border-neutron-2": disabled,
                        "border-warning-1": error,
                    },
                    className,
                )}
                onClick={(e) => handleContainerClick(e)}
            >
                <label
                    className={cl("absolute transition-all", {
                        "text-16-b top-0 left-0 text-primary-2": focus,
                        "text-14 bottom-1 left-2 text-neutron-2": !focus & (value.length === 0),
                        "text-16-b text-neutron-1": !focus && value.length > 0,
                        "cursor-not-allowed": disabled,
                    })}
                >
                    {label}
                </label>
                <div className="flex min-h-[58px] items-end pt-6">
                    <div className="ml-2 flex w-fit min-w-[100px] max-w-[300px] flex-wrap">
                        {list
                            .filter((item) => value.includes(item.value))
                            .map((item) => (
                                <div
                                    key={item.value}
                                    className={cl(
                                        "text-16-m group relative mr-3 mt-1 flex",
                                        "cursor-pointer whitespace-nowrap rounded-lg shadow-sub transition-all hover:bg-accent-2",
                                    )}
                                    onClick={() => handleRemoveItem(item.value)}
                                >
                                    <span className="px-3 py-1">{item.key}</span>
                                    <span
                                        className={cl(
                                            "absolute hidden bg-accent-1 text-neutron-4",
                                            "top-[50%] right-[-10px] h-8 w-8 translate-y-[-50%] ",
                                            "items-center justify-center rounded-full group-hover:flex",
                                        )}
                                    >
                                        <MdOutlineClose className="text-2xl" />
                                    </span>
                                </div>
                            ))}
                    </div>
                    {canSearch && (
                        <input
                            type="text"
                            className="text-14 block h-5 grow pl-2 focus:outline-none"
                            placeholder="Nhập để tìm kiếm..."
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                    )}
                </div>
                <i className="absolute right-3 bottom-1">
                    <MdOutlineKeyboardArrowDown className={cl("text-2xl transition-all", { "rotate-180": focus })} />
                </i>
                <div
                    className={cl(
                        "absolute left-[60%] min-w-[100px] origin-top-left rounded-l",
                        "scroll-y  z-10 max-h-[300px] bg-neutron-4 py-4 shadow-sub",
                        {
                            block: focus,
                            hidden: !focus,
                            "bottom-[40px]": optionListPosition === "top",
                            "top-[110%]": optionListPosition === "bottom",
                        },
                    )}
                >
                    <ul>
                        {optionList.map((item) => (
                            <li
                                key={item.value}
                                className="text-16-b cursor-pointer whitespace-nowrap px-4 py-1 hover:bg-hoverBg"
                                onMouseDown={() => handleSelect(item.value)}
                            >
                                {item.key}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {error && <span className="text-14 text-warning-1">{error}</span>}
        </>
    )
}

export default SelectInput
