import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import cl from "classnames"
import ApexChart from "react-apexcharts"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { BsBarChartSteps } from "react-icons/bs"

import Card from "@/components/Card"
import Table from "@/components/Table"
import Button from "@/components/Button"

import { singleRangBarChartConfig } from "@/config"
import { commonStoreActions } from "@/store"
import {
    PRODUCT_SEGMENTS_TABLE_COLUMNS,
    SEGMENT_WORKER_TABLE_COLUMNS,
    SEGMENT_EQUIPMENT_TABLE_COLUMNS,
    SEGMENT_MATERIAL_TABLE_COLUMNS,
    SEGMENT_PARAMS_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    PRODUCT_SEGMENTS_MOCK_DATA,
    SEGMENT_EQUIPMENT_MOCK_DATA,
    SEGMENT_WORKER_MOCK_DATA,
    SEGMENT_MATERIAL_MOCK_DATA,
    SEGMENT_PARAMS_MOCK_DATA,
    SEGMENT_RELATIONSHIP_MOCK_DATA,
} from "@/utils/mockData"
import { handleGanttChartData } from "@/utils/functions"

function Product() {
    const params = useParams()
    const dispatch = useDispatch()
    const [showGanttChart, setShowGanttChart] = useState(false)
    const data = handleGanttChartData(PRODUCT_SEGMENTS_MOCK_DATA, SEGMENT_RELATIONSHIP_MOCK_DATA)

    const handelRowClick = (row, index) => {}

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle(`Chi tiết sản phẩm ${params.productId}`))
    }, [dispatch, params.productId])

    return (
        <div data-component="Product" className="container h-full">
            <h2 className="mb-4 ml-2">Sản phẩm 1</h2>

            <div className="h-[calc(100%-52px)]">
                <div className="flex h-1/2 w-full pb-5">
                    <Card className="mr-5 h-full grow ">
                        <div className="mb-2 flex items-center">
                            <h3>Quy trình</h3>
                            <div className="ml-10 flex items-center">
                                <Button
                                    transparent={showGanttChart}
                                    onClick={() => setShowGanttChart(false)}
                                    className={cl({ "bg-primary-2 text-neutron-4": !showGanttChart })}
                                >
                                    <AiOutlineUnorderedList />
                                </Button>
                                <Button
                                    transparent={!showGanttChart}
                                    onClick={() => setShowGanttChart(true)}
                                    className={cl({ "bg-primary-2 text-neutron-4": showGanttChart })}
                                >
                                    <BsBarChartSteps />
                                </Button>
                            </div>
                        </div>
                        <div className="scroll-y  h-[calc(100%-46px)]">
                            {showGanttChart ? (
                                <ApexChart
                                    type="rangeBar"
                                    options={singleRangBarChartConfig}
                                    series={[{ data }]}
                                    height="100%"
                                />
                            ) : (
                                <Table
                                    headers={PRODUCT_SEGMENTS_TABLE_COLUMNS}
                                    body={PRODUCT_SEGMENTS_MOCK_DATA}
                                    onRowClick={handelRowClick}
                                    activable
                                    primary
                                    sticky
                                />
                            )}
                        </div>
                    </Card>
                </div>

                <Card className="h-1/2">
                    <h3>Công đoạn 1</h3>
                    <div className="mt-4 flex h-full w-full justify-between">
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Nhân viên</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_WORKER_TABLE_COLUMNS}
                                body={SEGMENT_WORKER_MOCK_DATA}
                            />
                        </div>
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Thiết bị</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_EQUIPMENT_TABLE_COLUMNS}
                                body={SEGMENT_EQUIPMENT_MOCK_DATA}
                            />
                        </div>
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Vật tư</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_MATERIAL_TABLE_COLUMNS}
                                body={SEGMENT_MATERIAL_MOCK_DATA}
                            />
                        </div>
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Yêu cầu công đoạn</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_PARAMS_TABLE_COLUMNS}
                                body={SEGMENT_PARAMS_MOCK_DATA}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Product
