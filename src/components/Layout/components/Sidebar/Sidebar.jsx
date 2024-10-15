import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import cl from "classnames"
// import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"

import { SIDEBAR_ITEMS } from "@/utils/menuNavigation"
import SidebarItem from "./SidebarItem"

function Sidebar() {
    const [isExpand, setIsExpand] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [currentPath, setCurrentPath] = useState(location.pathname)

    const handleClick = (route) => {
        navigate(route)
        setCurrentPath(route)
    }

    const handleCloseSidebar = () => {
        setTimeout(() => setIsExpand(false), 200)
    }

    return (
        <div
            data-component="Sidebar"
            className={cl(
                "transition-width relative h-full bg-primary-1 py-5 text-neutron-4 duration-200",
                "scroll-y h-full",
                {
                    "visible w-[340px] px-5 sm:w-screen": isExpand,
                    "w-[80px] px-2 sm:invisible sm:w-0": !isExpand,
                },
            )}
            onMouseEnter={() => setIsExpand(true)}
            onMouseLeave={handleCloseSidebar}
        >
            <div
                className="mx-auto aspect-square w-full cursor-pointer rounded-xl bg-neutron-4 sm:w-1/2"
                onClick={() => handleClick("/")}
            ></div>
            <div className={cl("sticky top-1/3 xxl:top-0")}>
                {SIDEBAR_ITEMS.map((item, index) => (
                    <SidebarItem
                        key={index}
                        Icon={item.icon}
                        label={item.label}
                        actived={currentPath.includes(item.route)}
                        isExpand={isExpand}
                        onClick={() => handleClick(item.route)}
                    />
                ))}
            </div>
            <i
                className={cl(
                    "absolute bottom-5 right-5 flex h-11 w-11 cursor-pointer",
                    "items-center justify-center rounded-full text-4xl hover:bg-hoverBg",
                    {
                        "sm:visible sm:fixed sm:left-0 sm:text-accent-1": !isExpand,
                        "xl:static xl:float-right": isExpand,
                    },
                )}
            >
                {/* {isExpand ? (
                    <BsArrowBarLeft onClick={() => setIsExpand(false)} />
                ) : (
                    <BsArrowBarRight onClick={() => setIsExpand(true)} />
                )} */}
            </i>
        </div>
    )
}

export default Sidebar
