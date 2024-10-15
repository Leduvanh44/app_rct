import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import Card from "@/components/Card"
import Table from "@/components/Table"
import Radialbar from "@/components/Radialbar"
import Progressbar from "@/components/Progressbar"

import { oeeApi } from "@/services/api"
import { useCallApi } from "@/hooks"
import { convertDateFormat, formatData, formatTableData } from "@/utils/functions"
import { OEE_DETAIL_TABLE_COLUMNS } from "@/utils/tableColumns"
import { commonStoreActions } from "@/store"

const defaultData = []

function OeeDetailPage() {
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const { id } = useParams()
    const location = useLocation()
    const { data } = location.state
    const [oeeDetailPageDataa, settOeeDetailPageDataa] = useState(defaultData)
    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle(`Chi tiết OEE máy ${data.deviceId} ngày ${data.endTime}`))
    }, [])
    useEffect(() => {
        callApi(
            () => oeeApi.getOeeDetail(data.deviceId, data.startTime, data.endTime),
            (data) => {
                console.log(data)
                let tempData = data.items.map((item) => {
                    return {
                        ...item,
                        endTime: convertDateFormat(item.endTime),
                        startTime: convertDateFormat(item.startTime),
                    }
                })
                settOeeDetailPageDataa(tempData)
            },
        )
    }, [id, callApi, dispatch])
    console.log(oeeDetailPageDataa)
    return (
        <div className="container flex h-full gap-5">
            <Card className="scroll-y h-full grow pt-0">
                <Table headers={OEE_DETAIL_TABLE_COLUMNS} body={oeeDetailPageDataa} sticky />
            </Card>
            <div className="flex w-[480px] flex-col justify-between">
                <Card className="flex flex-col">
                    <div className="flex flex-col items-center">
                        <Radialbar value={data.oee.oee} width={300} fontSize={24} />
                        <h4 className="mt-[-30px]">Chỉ số OEE</h4>
                    </div>
                    <div className="mx-auto mt-8 text-xl font-semibold text-neutron-4">
                        <div className=" mb-3 flex gap-6">
                            <div className="border-1 flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-primary-1">
                                <div className="">A {data.oee.a} %</div>
                            </div>
                            <div className="border-1 flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-primary-2">
                                <div>P {data.oee.p} %</div>
                            </div>
                            <div className="border-1 flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-neutron-2">
                                <div>Q {data.oee.q} %</div>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* <Card className="mt-5">
                    <div className="mb-5">
                        <div className="text-16-b mb-2">Thời gian ép trung bình</div>
                        <Progressbar
                            value={oeeDetailPageData.averageInjectionTime?.toFixed(2)}
                            max={1200}
                            height={36}
                            unit="s"
                            textLimit={20}
                        />
                    </div>
                    <div className="mb-5">
                        <div className="text-16-b mb-2">Chu kì ép trung bình</div>
                        <Progressbar
                            value={oeeDetailPageData.averageInjectionCycle?.toFixed(2)}
                            max={1200}
                            height={36}
                            unit="s"
                            textLimit={20}
                        />
                    </div>
                </Card> */}
            </div>
        </div>
    )
}

export default OeeDetailPage
