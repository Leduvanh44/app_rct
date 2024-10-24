import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useCallApi } from "@/hooks"
import Form from "@/components/Form"
import Card from "@/components/Card"
import TextInput from "@/components/TextInput"
import TimeInput from "@/components/TimeInput"
import Checkbox from "@/components/Checkbox"
import Table from "@/components/Table"
import SelectInput from "@/components/SelectInput"
import { settingActions } from "@/store"
import { validateNumberField } from "@/utils/functions"
import { SHIFTS_SETTING_MENU_NAV} from "@/utils/menuNavigation"
import { SchedulesApi } from "@/services/api"
import Button from "@/components/Button/Button"
import Confirm from "@/components/Confirm"

function Setting() {
    const callApi = useCallApi()
    const dispatch = useDispatch()
    const { shifts, oeeDuration: storeOeeDuration } = useSelector((state) => state.setting)

    const [shiftsValue, setShiftsValue] = useState({
        shiftInfo: shifts.map((item) => ({ info: { ...item } })),
    })
    const [oeeDuration, setOeeDuration] = useState(storeOeeDuration)
    const [confirmData, setConfirmData] = useState({})
    const [shiftsPerDay, setShiftsPerDay] = useState()
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState("");
    const [timeStart, setTimeStart] = useState("08:00:00");
    const [timeEnd, setTimeEnd] = useState("17:00:00");
    const [shiftId, setShiftId] = useState("");
    const headers = [
        { Header: "Day", accessor: "day" },
        { Header: "Active", accessor: "active" },
      ];    
    const [weekdays, setWeekdays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });
    const [dayAvailability, setDayAvailability] = useState([]);

    const [validateRows, setValidateRows] = useState({
        valid: [],
    });
    let body = Object.keys(weekdays).map((day) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        active: weekdays[day] ? 'Có' : 'Không', 
    }));
    const getWeekdayStatus = (weekdaysStatus) => {
        return Object.keys(weekdaysStatus).map((day) => ({
            day: day.charAt(0).toUpperCase() + day.slice(1),
            active: weekdaysStatus[day] ? 'Có' : 'Không', 
        }));
    };
    const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
    const [scheNames, setscheNames] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [index, setIndex] = useState(-1);
    const [shiftTime, setShiftTime] = useState([]);
    const openForm = (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
    
        setFormPosition({ top: clickY, left: clickX });
    
        setIsFormVisible(true);
      };
    
      const toggleForm = (e) => {
        setIsFormVisible(false);
      };

      const handleSubmit = () => {
        if (textInputValue) {
          const convertTimeToMilliseconds = (time) => {
            const [hours, minutes, seconds] = time.split(":").map(Number);
            return (hours * 60 * 60 + minutes * 60 + (seconds || 0)) * 1000;
          };
          let scheduleData = {
            name: textInputValue, 
            shifts: shiftTime.map((shift) => ({
              shiftId: shift.shiftId,
              startTimeByMillisecond: convertTimeToMilliseconds(shift.startTime),
              endTimeByMillisecond: convertTimeToMilliseconds(shift.endTime),
            })),
            monday: weekdays.monday,
            tuesday: weekdays.tuesday,
            wednesday: weekdays.wednesday,
            thursday: weekdays.thursday,
            friday: weekdays.friday,
            saturday: weekdays.saturday,
            sunday: weekdays.sunday,
          };
      
          console.log("Schedule Data:", scheduleData);
          callApi(
            () => SchedulesApi.Schedules.createWorker(scheduleData),
            getShiftList,
            "Oke",
        )
        getShiftList()
        toggleForm();
        } else {
          alert("Vui lòng kiểm tra thông tin");
        }
      };
    
      const handleSetValue = (checked, id) => {
        setWeekdays((prev) => ({
          ...prev,
          [id]: checked === "true" || checked === true,
        }));
      };
      
      const addShift = () => {
        if (timeStart && timeEnd && shiftId) {
          setShiftTime((prevShifts) => [
            ...prevShifts,
            {
              shiftId,
              startTime: timeStart,
              endTime: timeEnd,
            },
          ]);
          setShiftId("");
        }
      };
      
    const convertShift = (shiftArray) => {
        return {
          shiftInfo: shiftArray.map((shift) => ({
            info: {
              description: shift.info.description,
              startTime: shift.info.startTime,
              endTime: shift.info.endTime
            }
          }))
        };
      };

    // const handleShiftListData = (data) => {
    //     return data.map(worker => {
    //       const daysOfWeek = {
    //         monday: worker.monday,
    //         tuesday: worker.tuesday,
    //         wednesday: worker.wednesday,
    //         thursday: worker.thursday,
    //         friday: worker.friday,
    //         saturday: worker.saturday,
    //         sunday: worker.sunday
    //       }
      
    //       const shifts = worker.shifts.map(shift => ({
    //         shiftName: shift.shiftName,
    //         startTime: shift.startTime,
    //         endTime: shift.endTime
    //       }))
      
    //       return {
    //         name: worker.name,
    //         shifts: shifts,
    //         daysOfWeek: daysOfWeek
    //       }
    //     })
    //   }

    const handleSheListData = (data) => {
        return data.map(item => ({
            key: item.name,  
            value: item.name
        }));
    };

    const handleShiftData = (data) => {
        return data.map(worker => {
            return worker.shifts.map(shift => ({
                info: {
                    description: shift.shiftName,  
                    startTime: shift.startTime,     
                    endTime: shift.endTime          
                }
            }));
        });
    };

    const handleWeekDaysData = (data) => {
        return data.map(schedule => ({
            name: schedule.name,
            availability: {
                monday: schedule.monday,
                tuesday: schedule.tuesday,
                wednesday: schedule.wednesday,
                thursday: schedule.thursday,
                friday: schedule.friday,
                saturday: schedule.saturday,
                sunday: schedule.sunday,
            }
        }));
    };
    const getShiftList = useCallback(() => {
        callApi(
            () => SchedulesApi.Schedules.getWorkers(),
            (data) => {
                // setShiftType(handleShiftListData(data))
                setscheNames(handleSheListData(data))
                setShiftList(handleShiftData(data))
                setDayAvailability(handleWeekDaysData(data))
                // console.log(data)
            },
        )
    }, [callApi])
    useEffect(() => {
        getShiftList()
    }, [getShiftList])
    useEffect(() => {
        if (shiftsPerDay && shiftsPerDay.length > 0 && scheNames && scheNames.length > 0) {
            const selectedValue = shiftsPerDay[0];
            const newIndex = scheNames.findIndex(scheme => scheme.value === selectedValue);
            if (newIndex !== -1) {
                setIndex(newIndex);
            } else {
                console.log("Giá trị shiftsPerDay không có trong scheNames");
            }
        }

    }, [shiftsPerDay, scheNames]);
    

    // if (shiftList.length > 0) {
    //     console.log(convertShift(shiftList[0]));
    // }
    console.log(index)
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
    if (shiftList) {
        console.log("shiftList;", shiftList)
        console.log("shiftsValue;", shiftsValue)
    }
    return (
    <div data-component="Setting" className="h-full container flex flex-col gap-10">
        <div className="flex gap-10 w-full px-[2%]">
            <div className="flex-[1_1_30%] mb-10 gap-10">
                <h3 className="mt-2.5">Lịch làm việc</h3>
                <SelectInput
                    value={shiftsPerDay}
                    setValue={setShiftsPerDay}
                    label="Chọn lịch"
                    list={scheNames}
                    canSearch={true}
                />
                <h3 className="mt-2.5">Số ngày làm việc trong tuần </h3>

                <Table
                activable
                headers={headers}
                body={(index !== -1)
                    ? getWeekdayStatus(dayAvailability[index].availability)
                    : getWeekdayStatus(weekdays)}
                accordionTable
                accordionTableTitle="Số ngày làm việc trong tuần"
                />
                <Button className="mt-5" onClick={openForm}>
                Thêm lịch sản xuất
                </Button>
            </div>


            <div className="mt-4 flex left-0">

            </div>
            {isFormVisible && (
                <div
                className="fixed z-10 bg-hoverBg"
                style={{
                    bottom: `${formPosition.top}px`,
                    left: `${formPosition.left}px`,
                    zIndex: 10,
                    position: "absolute",
                }}
                >
                <Card className="fixed">
                <h1 className="text-2xl mb-4">Connect</h1>

                <TextInput
                    id="scheduleName"
                    label="Tên lịch sản xuất"
                    value={textInputValue}
                    setValue={setTextInputValue}
                    isError={() => textInputValue.trim() === ""}
                    setValidateRows={setValidateRows}
                />

                <TextInput
                    id="shiftId"
                    label="Shift ID"
                    value={shiftId}
                    setValue={setShiftId}
                />

                <div className="flex items-center space-x-2">
                    <TimeInput
                    id="timeStart"
                    label="Thời gian bắt đầu"
                    value={timeStart}
                    setValue={setTimeStart}
                    type="timeStart"
                    timeCompare={timeEnd}
                    />

                    <TimeInput
                    id="timeEnd"
                    label="Thời gian kết thúc"
                    value={timeEnd}
                    setValue={setTimeEnd}
                    type="timeEnd"
                    timeCompare={timeStart}
                    />

                    <button
                    onClick={addShift}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                    >
                    Thêm
                    </button>
                </div>

                <div className="mt-4">
                    {Object.keys(weekdays).map((day) => (
                    <Checkbox
                        key={day}
                        id={day}
                        label={day.charAt(0).toUpperCase() + day.slice(1)}
                        value={weekdays[day]}
                        setValue={handleSetValue}
                        setValidateRows={setValidateRows}
                    />
                    ))}
                </div>

                {/* Display added shifts */}
                <div className="mt-4">
                    <h4>Các ca đã thêm:</h4>
                    <ul>
                    {shiftTime.map((shift, index) => (
                        <li key={index}>
                        <strong>ID:</strong> {shift.shiftId} |{" "}
                        <strong>Bắt đầu:</strong> {shift.startTime} |{" "}
                        <strong>Kết thúc:</strong> {shift.endTime}
                        </li>
                    ))}
                    </ul>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                    OK
                </button>
                <button
                    onClick={toggleForm}
                    className="self-end text-gray-600 mt-4"
                >
                    &#x2190; Đóng
                </button>
                </Card>
                </div>

            )}

            <div className="flex-[1_1_70%] mb-2">
                <h3>Số ca làm trong một ngày</h3>
                <Form
                    menuNavigaton={SHIFTS_SETTING_MENU_NAV}
                    value={index !== -1 && shiftList.length > 0 ? convertShift(shiftList[index]) : null}
                    setValue={setShiftList}
                    onDeleteRow={handleDeleteShift}
                />
            </div>
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
