import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import DateTimeInput from "@/components/DateTimeInput"
import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import DateInput from "@/components/DateInput"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import Chart from "react-apexcharts"
import { useCallApi } from "@/hooks"
import { paths } from "@/config"
import { MACHINE_LIST, OEE_MODE_LIST, OEE_PAGE_LIST} from "@/utils/constants"
import { handleMachinesListData, handleOeeData, handleOeeMode, handleOeePageHeader, DownTimePageHeader } from "@/utils/functions"
import { oeeApi, resourceApi, downTimeApi} from "@/services/api"
import TextInput from "@/components/TextInput"

function OeePage() {
    const navigate = useNavigate()
    const callApi = useCallApi()
    const { oeeDuration } = useSelector((state) => state.setting)
    const [oeeModeIndex, setOeeModeIndex] = useState(0)
    const [oeePageIndex, setOeePageIndex] = useState(0)
    const [oeeChartIndex, setOeeChartIndex] = useState(0)
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
    const [result, setResult] = useState([]);
    const downtimeTypeStandard = [
        "đổi màu", "khuôn hư", "thay khuôn", "canh chỉnh máy", "đợi nhiệt", "máy hư", 
        "nghẹt nước", "thiếu người", "thiếu NVL/BTP", "ăn cơm", "không có KHSY", "bảo trì dự phòng", 
        "test mẫu", "cúp điện"
      ];
    const [timeStart, setTimeStart] = useState("2024-10-20T04:31:56.283")
    const [timeEnd, setTimeEnd] = useState("2024-10-29T05:31:56.283")
    const [selectedMachine, setSelectedMachine] = useState(["M17"])
    const [dowmTime, setDowmTime] = useState([])
    const [oeeData, setOeeData] = useState([])
    const [machineList, setMachineList] = useState([])
    const [eClassList, setEClassList] = useState([])
    const [dowmTimeType, setDowmTimeType] = useState([])
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

    const getDownTimeData = useCallback(() => {
        if (machineList.length < 2) {
            console.error("Machine list does not have enough items.");
            callApi(
            () => downTimeApi.getDownTime('', timeStart, timeEnd),
                (data) => setDowmTime(data),
            )
        }
        else {
        callApi(
            () => downTimeApi.getDownTime(selectedMachine, timeStart, timeEnd),
            (data) => setDowmTime(data),
        )}

    }, [callApi, timeStart, timeEnd, selectedMachine])

    const getEquipmentClass = useCallback(() => {
        callApi(
            () => resourceApi.equipment.getEquipments(),
            (data) => {
                const equipmentClasses = data.items.map(item => item.equipmentClass);
                setEClassList(equipmentClasses)
            }
        )
    }, [callApi])
    const getDownTimeHeadList = useCallback(() => {
        const index = selectedMachine.map(item => {
            return machineList.findIndex(dataItem => dataItem.value === item);
        });

        callApi(
            () => downTimeApi.getDownTimeHeadList(""),
            (data) => {
                const DownTimeHeadList = data.items[0].downtimeTypes.map(items => items.name);
                setDowmTimeType(DownTimeHeadList)
            }
        )
        

    }, [callApi])
    useEffect(() => {
        getDownTimeData();
        getDownTimeHeadList();
        getEquipmentClass();
    }, [getDownTimeData, getDownTimeHeadList, getEquipmentClass]);
    // useEffect(() => {
    //     getDownTimeData()
    // }, [getDownTimeData])
    // useEffect(() => {
    //     getDownTimeHeadList()
    // }, [getDownTimeHeadList])
    // useEffect(() => {
    //     getEquipmentClass()
    // }, [getEquipmentClass])
    
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

    function calculateTimeDiff(fromTime, toTime) {
        const from = new Date(fromTime);
        const to = new Date(toTime);
        return parseFloat(((to - from) / (1000*3600)).toFixed(2));
    }

    function calculatePareto(data) {
        const numericData = data.map(value => parseFloat(value));
        const sortedValues = numericData.sort((a, b) => b - a);
        const total = sortedValues.reduce((sum, value) => sum + value, 0);
        let cumulativeSum = 0;
        const cumulativePercentages = sortedValues.map(value => {
            cumulativeSum += value;
            return (cumulativeSum / total) * 100;
        });
        return {
            cumulativePercentages
        };

    }

    const handleCalculateDowntime = useCallback((downtimeTypes, data) => {
        if (!data || !Array.isArray(data)) {
          console.warn('Data is undefined or not an array. Skipping calculation.');
          setResult([]);
          return;
        }
    
        const result = {};
    
        data.forEach(entry => {
          const equipmentId = entry.equipmentId;
          const _downtimeType = entry.downtimeType;
          if (!downtimeTypes.includes(_downtimeType)) {
            return;
          }
    
          if (!result[equipmentId]) {
            result[equipmentId] = {};
            downtimeTypes.forEach(type => {
              result[equipmentId][type] = 0;
            });
            result[equipmentId]["Total"] = 0;
          }
          const downtimeDuration = calculateTimeDiff(entry.from, entry.to);
          result[equipmentId][_downtimeType] += downtimeDuration;
          result[equipmentId]["Total"] += downtimeDuration;
        });
        const finalResult = Object.keys(result).map(equipmentId => ({
          equipmentId,
          ...result[equipmentId]
        }));
    
        setResult(finalResult);
      }, []);
      useEffect(() => {
        handleCalculateDowntime(downtimeTypeStandard, dowmTime);
      }, [dowmTime]);

    const xaxis = oeeData.map((e) => e.endTime)
    const yaxis = oeeData.map((e) => e[handleOeeMode(oeeModeIndex).toLowerCase()])

    let downTimeState = {};
    let downTimeTypeState = []

    if (result.length !== 0) {
        const sumFactors = result.reduce((acc, curr) => {
            Object.keys(curr).forEach((key) => {
                if (key !== "equipmentId" && key !== "Total") {
                    acc[key] = (acc[key] || 0) + curr[key];
                }
            });
            return acc;
        }, {});    
        const categories = Object.keys(sumFactors);
        const seriesSumDownTimeType = Object.values(sumFactors);
        const { cumulativePercentages } = calculatePareto(seriesSumDownTimeType);
        downTimeState = { 
            options: {
                chart: {
                    type: "bar",
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "45%",
                        endingShape: 'rounded',
                    }
                },
                stroke: {
                    width: [0, 4], // Độ dày đường cho từng series
                    curve: 'smooth', // Độ cong của đường
                },
                title: {
                    text: 'Thời gian dừng theo từng nhóm',
                },
                xaxis: {
                    categories: categories,
                },
                yaxis: [{
                    title: {
                        text: "Thời gian (giờ)"
                    }
                    },
                    {
                        opposite: true,
                        title: {
                            text: 'Cumulative Percentage',
                        },
                    },
                ],
                tooltip: {
                    y: {
                        formatter: val => `${val} giờ`
                    }
                },
                legend: {
                    position: "top"
                }
            },
            series: [
                {
                    name: 'Thời gian dừng',
                    type: 'bar',
                    data: seriesSumDownTimeType,
                },
                {
                    name: 'Pareto Chart',
                    type: 'line',
                    data: cumulativePercentages,
                },
            ],
        };
    
        downTimeTypeState = Object.keys(result[0]).filter(
            key => key !== "equipmentId" && result.some(d => d[key] !== 0)
        );
    }

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
                data: calculatePareto(yaxis),
                type: 'line',
            },
        ],
    }


    console.log("oeeChartIndex:", oeeChartIndex)
    console.log("dowmTime:", dowmTime)
    console.log("oeePageIndex:", result)

    return (
        <>
            <div className="flex h-screen flex-col">
                <div className="p-5">
                <ToggleButtons active={oeePageIndex} onClick={setOeePageIndex} titles={OEE_PAGE_LIST} />
                </div>
                <Card className="container mb-5 ">
                    {oeeModeIndex !== 5 && oeePageIndex == 0 && (<div className=" mb-3 flex w-full justify-between">
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
                    </div>)}
                    {oeePageIndex == 1 && (<div className=" mb-3 flex w-full justify-between">
                        <DateTimeInput
                            label="Thời gian bắt đầu"
                            value={timeStart}
                            setValue={setTimeStart}
                            timeCompare={timeEnd}
                            type="timeStart"
                            className="mb-4"
                        />
                        <DateTimeInput
                            label="Thời gian kết thúc"
                            value={timeEnd}
                            setValue={setTimeEnd}
                            timeCompare={timeStart}
                            type="timeEnd"
                            className="mb-4"
                        />
                        <div className="p-1">
                            <SelectInput
                                value={selectedMachine}
                                setValue={setSelectedMachine}
                                list={machineList}
                                label="Chọn máy"
                            />
                        </div>
                    </div>)}

                    {oeePageIndex == 0 && <ToggleButtons active={oeeModeIndex} onClick={setOeeModeIndex} titles={OEE_MODE_LIST} />}
                </Card>

                <Card className="flex-1">
                    {oeeModeIndex !== 0 && oeePageIndex == 0 && <h2>Giá trị {handleOeeMode(oeeModeIndex)}</h2>}
                    {oeeModeIndex !== 0 && oeePageIndex == 0 && (
                        <Chart options={state.options} series={state.series} type="line" width="100%" height={440} />
                    )}

                    {oeePageIndex == 1 && (
                        <Card className="flex-1 mb-5" onClick={() => setOeeChartIndex(prevIndex => (prevIndex === 1 ? 0 : 1))}>
                            <Chart options={downTimeState.options} series={downTimeState.series}  type="line" width="100%" height={440} />
                            {oeeChartIndex === 1 && (
                            downTimeTypeState.map(key => {
                                const seriesData = result.map(d => d[key]);
                                const options = {
                                    chart: {
                                        type: "bar",
                                        height: 350,
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: "45%",
                                            endingShape: 'rounded',
                                        }
                                    },
                                    xaxis: {
                                        categories: result.map(d => d.equipmentId),
                                        title: {
                                            text: "Equipment ID"
                                        }
                                    },
                                    yaxis: {
                                        title: {
                                            text: "Số giờ"
                                        }
                                    },
                                    title: {
                                        text: `Thời gian cho ${key}`,
                                        align: "center"
                                    }
                                };

                                return (
                                    <div key={key}>
                                        <Chart options={options} series={[{ name: key, data: seriesData }]} type="bar" height={350} />
                                    </div>
                                );
                            })
                        )}
                        </Card>)
                    }

                    {oeePageIndex == 0 && (
                        <Table headers={handleOeePageHeader(oeeModeIndex)} body={oeeData} onRowClick={handleClickRow} />)}
                    {oeePageIndex == 1 && (
                        <Table 
                        headers={DownTimePageHeader}
                        body={result}                                 
                        activable
                        primary
                        />)}
                </Card>
            </div>
        </>
    )
}

export default OeePage
