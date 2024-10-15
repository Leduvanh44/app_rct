import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import Form from "@/components/Form"
import TextInput from "@/components/TextInput"

import { settingActions } from "@/store"
import { validateNumberField } from "@/utils/functions"
import { SHIFTS_SETTING_MENU_NAV } from "@/utils/menuNavigation"
import Button from "@/components/Button/Button"
import Confirm from "@/components/Confirm"

function Setting() {
    const dispatch = useDispatch()
    const { shifts, oeeDuration: storeOeeDuration } = useSelector((state) => state.setting)

    const [shiftsValue, setShiftsValue] = useState({
        shiftInfo: shifts.map((item) => ({ info: { ...item } })),
    })
    const [oeeDuration, setOeeDuration] = useState(storeOeeDuration)
    const [confirmData, setConfirmData] = useState({})

    const handleSaveSetting = () => {
        setConfirmData({
            actived: true,
            title: "Xác nhận lưu lại các thiết đặt",
            content:
                "Việc thay đổi các cài đặt có thể khiến ứng dụng chạy không theo mong muốn, xác nhận các giá trị thiết đặt là chính xác",
            onConfirm() {
                dispatch(settingActions.setShifts(shiftsValue.shiftInfo.map((item) => ({ ...item.info }))))
                dispatch(settingActions.setOeeDuration(oeeDuration))
                toast.success("Lưu thiết đặt thành công")
            },
        })
    }

    const handleDeleteShift = (row, index) => {
        setShiftsValue({
            shiftInfo: shiftsValue.shiftInfo.filter((_item, _index) => _index !== index),
        })
    }

    return (
        <div data-component="Setting">
            <div>
                <div className="mb-2 flex items-center gap-4">
                    <h3>Số ca làm trong một ngày</h3>
                    <span>{shifts.length} ca/ngày</span>
                </div>
                <Form
                    menuNavigaton={SHIFTS_SETTING_MENU_NAV}
                    value={shiftsValue}
                    setValue={setShiftsValue}
                    onDeleteRow={handleDeleteShift}
                />
            </div>
            <div className="mt-5">
                <div className="flex items-center gap-4">
                    <h3>Số ngày truy xuất OEE</h3>
                    <span>{storeOeeDuration} ngày trước</span>
                </div>
                <TextInput value={oeeDuration} setValue={setOeeDuration} isError={validateNumberField} />
            </div>

            <Button className="mt-5" onClick={handleSaveSetting}>
                Lưu
            </Button>

            {confirmData.actived && (
                <Confirm
                    title={confirmData.title}
                    content={confirmData.content}
                    onConfirm={confirmData.onConfirm}
                    onClose={() => setConfirmData({ actived: false })}
                />
            )}
        </div>
    )
}

export default Setting
