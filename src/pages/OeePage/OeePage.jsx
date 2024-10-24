import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import DateInput from "@/components/DateInput"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import Chart from "react-apexcharts"

import { useCallApi } from "@/hooks"
import { paths } from "@/config"
import { MACHINE_LIST, OEE_MODE_LIST } from "@/utils/constants"
import { handleMachinesListData, handleOeeData, handleOeeMode, handleOeePageHeader } from "@/utils/functions"
import { oeeApi, resourceApi } from "@/services/api"
import TextInput from "@/components/TextInput"

function OeePage() {
    const navigate = useNavigate()
    const callApi = useCallApi()

    const { oeeDuration } = useSelector((state) => state.setting)
    const [oeeModeIndex, setOeeModeIndex] = useState(0)
    const [dayStart, setDayStart] = useState(() => {
        const prevDate = new Date()
        prevDate.setDate(new Date().getDate() - oeeDuration)
        return prevDate.toISOString().slice(0, 10)
    })
    const [dayEnd, setDayEnd] = useState(() => {
        const today = new Date()
        return today.toISOString().slice(0, 10)
    })
    const [timeFrame, setTimeFrame] = useState(1800)

    const [selectedMachine, setSelectedMachine] = useState(["M17"])

    const [oeeData, setOeeData] = useState([])
    const [machineList, setMachineList] = useState([])
    const getMachineList = useCallback(() => {
        callApi(
            () => resourceApi.equipment.getEquipmentsList(),
            (data) => setMachineList(handleMachinesListData(data)),
        )
    }, [callApi])
    useEffect(() => {
        getMachineList()
    }, [getMachineList])
    
    const getOeeData = useCallback(() => {
        callApi(
            () => oeeApi.getOee(selectedMachine[0], dayStart, dayEnd, timeFrame),
            // (data) => setOeeData(handleOeeData(data.reverse())),
            (data) => setOeeData(handleOeeData(data)),
        )
    }, [callApi, dayEnd, dayStart, selectedMachine, timeFrame])
    useEffect(() => {
        getOeeData()
    }, [getOeeData])

    const handleClickRow = (row) => {
        console.log(row)
        const data = {
            deviceId: selectedMachine[0],
            startTime: dayStart,
            endTime: dayEnd,
            oee: row,
        }
        navigate(`${paths.oee}/${row.equipmentId}`, { state: { data } })
    }
    const xaxis = oeeData.map((e) => e.endTime)
    const yaxis = oeeData.map((e) => e[handleOeeMode(oeeModeIndex).toLowerCase()])
    const numericYaxis = yaxis.map(value => parseFloat(value));
    const sortedValues = numericYaxis.sort((a, b) => b - a);
    const total = sortedValues.reduce((sum, value) => sum + value, 0);
    let cumulativeSum = 0;
    const cumulativePercentages = sortedValues.map(value => {
        cumulativeSum += value;
        return (cumulativeSum / total) * 100;
    });
    
    const state = {
        options: {
            xaxis: {
                categories: xaxis,
            },
            yaxis:
                oeeModeIndex !== 5
                    ? ([{
                          min: 0,
                          max: 100,
                          tickAmount: 5,
                          decimalsInFloat: 1,
                      },
                      {
                        opposite: true,
                        title: {
                          text: 'Cumulative %'
                        },
                        min: 0,
                        max: 100,
                        decimalsInFloat: 1,
                      }])
                    : ([{ decimalsInFloat: 1 }, {
                        opposite: true,
                        title: {
                          text: 'Cumulative %'
                        },
                        min: 0,
                        max: 100,
                        decimalsInFloat: 1,
                      }]),
            noData: {
                text: "Loading...",
            },
            
        },
        series: [
            {
                name: `${handleOeeMode(oeeModeIndex)}`,
                data: yaxis,
                type: 'line',
            },
            {
                name: "Pareto " + `${handleOeeMode(oeeModeIndex)}`,
                data: cumulativePercentages,
                type: 'line',
            },
        ],
    }
    console.log("oeeModeIndex:", oeeModeIndex)
    console.log("MachineList:", machineList)
    return (
        <>
            <div className="flex h-screen flex-col">
                <Card className="container mb-5 ">
                    <div className=" mb-3 flex w-full justify-between">
                        <div className="p-1">
                            <DateInput
                                className=""
                                label="Chọn ngày bắt đầu"
                                value={dayStart}
                                setValue={setDayStart}
                                type="dayStart"
                                dayCompare={dayEnd}
                            />
                        </div>
                        <div className="p-1 ">
                            <DateInput
                                className=""
                                label="Chọn ngày kết thúc"
                                value={dayEnd}
                                setValue={setDayEnd}
                                type="dayEnd"
                                dayCompare={dayStart}
                            />
                        </div>
                        <div className="p-1 ">
                            <TextInput
                                className="h-[64px] w-60"
                                label="Khoảng thời gian(s)"
                                value={timeFrame}
                                setValue={setTimeFrame}
                            />
                        </div>
                        <div className="p-1">
                            <SelectInput
                                value={selectedMachine}
                                setValue={setSelectedMachine}
                                list={machineList}
                                label="Chọn máy"
                            />
                        </div>
                    </div>
                    <ToggleButtons active={oeeModeIndex} onClick={setOeeModeIndex} titles={OEE_MODE_LIST} />
                </Card>

                <Card className="flex-1">
                    {oeeModeIndex !== 0 && oeeModeIndex !== 5 && <h2>Giá trị {handleOeeMode(oeeModeIndex)}</h2>}
                    {oeeModeIndex !== 0 && oeeModeIndex !== 5 && (
                        <Chart options={state.options} series={state.series} type="line" width="100%" height={440} />
                    )}
                    {oeeModeIndex !== 5 && (
                        <Table headers={handleOeePageHeader(oeeModeIndex)} body={oeeData} onRowClick={handleClickRow} />)}
                    
                </Card>
            </div>
        </>
    )
}

export default OeePage
