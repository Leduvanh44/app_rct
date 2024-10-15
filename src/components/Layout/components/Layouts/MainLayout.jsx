import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import { BsBell, BsCheck2All } from "react-icons/bs"
import { RiDeleteBin4Line } from "react-icons/ri"
import cl from "classnames"

import Loading from "../Loading"
import Card from "@/components/Card"
import { commonStoreActions } from "@/store"
import "react-toastify/dist/ReactToastify.css"

import Sidebar from "../Sidebar"
function MainLayout({ children, title }) {
    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const { pageTitle, loading, notifications, unRead } = useSelector((state) => state.common)
    const [showNotifications, setShowNotifications] = useState(false)
    const [deviceTypeState, setDeviceTypeState] = useState("0")

    const handleShowNotifications = (e) => {
        e.stopPropagation()
        setShowNotifications(!showNotifications)
    }

    const handleClickNotification = (item) => {
        dispatch(commonStoreActions.readNotification(item.id))
        item.to && naviagte(item.to)
    }

    const handleDeleteNotification = (e, id) => {
        e.stopPropagation()
        dispatch(commonStoreActions.deleteNotification(id))
    }

    useEffect(() => {
        const documentTitle = (title ?? pageTitle) + " | Ứng dụng quản lý và giám sát năng suất máy"
        document.title = documentTitle
        document.addEventListener("click", () => {
            setShowNotifications(false)
        })
    }, [title, pageTitle])
    return (
        <div data-component="MainLayout" className="container flex h-screen overflow-hidden">
            <aside className="h-full">
                <Sidebar />
            </aside>
            <div className="grow pt-5">
                <div className="flex items-center px-5">
                    <h1 className="">{title ? title : pageTitle}</h1>
                    <div className="relative ml-auto flex">
                        {/* {title == "Quản lý nguồn lực" && (
                            <SelectInput
                                label="Chọn loại máy"
                                list={MACHINE_TYPE_LIST}
                                value={deviceTypeState}
                                setValue={setDeviceTypeState}
                            />
                        )}
                        {title == "Đơn sản xuất" && (
                            <SelectInput
                                label="Chọn loại máy"
                                list={MACHINE_TYPE_LIST}
                                value={deviceTypeState}
                                setValue={setDeviceTypeState}
                            />
                        )} */}
                        <i
                            className={cl(
                                "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-hoverBg",
                                { "bg-hoverBg": showNotifications },
                            )}
                            onClick={handleShowNotifications}
                        >
                            <BsBell className="text-3xl" />
                            {unRead && (
                                <div className="absolute top-2 right-[10px] h-3 w-3 rounded-full bg-warning-1"></div>
                            )}
                        </i>
                        {showNotifications && (
                            <Card className="scroll-y absolute right-[100%] top-8 z-10 max-h-[500px] min-w-[400px] !p-0">
                                <div className="flex items-center rounded-t-xl bg-primary-4 py-3 px-5">
                                    <h3>Thông báo</h3>
                                    <BsCheck2All
                                        className={cl("ml-auto cursor-pointer text-3xl hover:text-primary-2", {
                                            "text-accent-1": unRead,
                                            "text-primary-2": !unRead,
                                        })}
                                        onClick={() => dispatch(commonStoreActions.readAllNotifications())}
                                    />
                                </div>
                                {[...notifications].reverse().map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleClickNotification(item)}
                                        className={cl(
                                            "group relative cursor-pointer items-center border-t-2 border-neutron-3 px-5 py-2 last:rounded-b-xl hover:opacity-80",
                                            {
                                                "bg-primary-4": !item.read,
                                            },
                                        )}
                                    >
                                        <p className="grow">{item.content}</p>
                                        <i
                                            onClick={(e) => handleDeleteNotification(e, item.id)}
                                            className={cl(
                                                "hidden h-10 w-10 items-center justify-center rounded-full text-2xl text-warning-1 hover:bg-hoverBg group-hover:flex",
                                                "absolute top-0 right-0",
                                            )}
                                        >
                                            <RiDeleteBin4Line />
                                        </i>
                                        <span className="flex w-full justify-end text-[12px] text-neutron-2">
                                            {item.displayDate}
                                        </span>
                                    </div>
                                ))}
                                {notifications.length === 0 && (
                                    <div className="rounded-b-xl bg-primary-4 p-3">Không có thông báo mới</div>
                                )}
                            </Card>
                        )}
                    </div>
                </div>
                <main className="scroll-y h-[calc(100vh-68px)] p-5">{children}</main>
            </div>
            {loading && <Loading />}
            <ToastContainer pauseOnFocusLoss={false} autoClose={5000} />
        </div>
    )
}

export default MainLayout
