/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

import Form from "@/components/Form"
import Button from "@/components/Button"

import { useCallApi } from "@/hooks"
import { resourceApi } from "@/services/api"
import { TIME_UNIT_LIST, SEGMENT_RELATION_OPTION_LIST } from "@/utils/constants"
import { getSegmentOptionList, productMapper, getResourceOptionsList } from "@/utils/functions"
import { productMenuNav } from "@/utils/menuNavigation"

function NewProduct() {
    const [info, setInfo] = useState({})
    const [segments, setSegments] = useState({})
    const [segmentRelationships, setSegmentRelationships] = useState({})
    const [optionList, setOptionList] = useState({
        workerClass: [],
        equipmentClass: [],
        materialClass: [],
        worker: [],
        equipment: [],
        material: [],
    })
    const callAPi = useCallApi()

    const [invalid, setInvalid] = useState(true)

    const handleSubmit = () => {
        const data = {
            info: info.info,
            segments: segments.productSegments,
            segmentRelationships: segmentRelationships.segmentRelationships,
        }
        console.log(productMapper.clientToAPi(data))
    }

    useEffect(() => {
        const _segments = segments.productSegments?.map((item) => ({
            ...item,
            info: {
                ...item.info,
                workerTypeCount: item.personnelSpecifications?.length ?? 0,
                equipmentTypeCount: item.equipmentSpecifications?.length ?? 0,
                materialCount: item.materialSpecifications?.length ?? 0,
                durationUnitDisplay: TIME_UNIT_LIST.find((time) => time.value === item.info.durationUnit[0])?.key,
            },
        }))
        setSegments((prev) => ({
            productSegments: _segments,
        }))
    }, [segments.productSegments?.length])

    useEffect(() => {
        const _segmnetRelationships = segmentRelationships.segmentRelationships?.map((item) => ({
            ...item,
            info: {
                ...item.info,
                relationDisplay: SEGMENT_RELATION_OPTION_LIST.find((s) => s.value === item.info.relation[0])?.key,
            },
        }))
        setSegmentRelationships({ segmentRelationships: _segmnetRelationships })
    }, [segmentRelationships?.segmentRelationships?.length])

    useEffect(() => {
        if (
            info.productInfo?.id?.length > 0 &&
            info.productInfo?.name?.length > 0 &&
            segments.productSegments?.length > 0
        ) {
            setInvalid(false)
        } else {
            setInvalid(true)
        }
    }, [info.productInfo?.id.length, info.productInfo?.name.length, segments.productSegments?.length])

    useEffect(() => {
        callAPi(
            [
                resourceApi.worker.getWorkerClasses(),
                resourceApi.equipment.getEquipmentClasses(),
                resourceApi.material.getMaterialClasses(),
                resourceApi.worker.getWorkers(),
                resourceApi.equipment.getEquipments(),
                resourceApi.material.getMaterials(),
            ],
            (res) => {
                const workerClasses = res[0].items
                const equipmentClasses = res[1].items
                const materialClasses = res[2].items
                setOptionList({
                    workerClass: getResourceOptionsList(workerClasses, "personnelClassId"),
                    equipmentClass: getResourceOptionsList(equipmentClasses, "equipmentClassId"),
                    materialClass: getResourceOptionsList(materialClasses, "materialClassId"),
                })
            },
        )
    }, [callAPi])

    return (
        <div data-component="NewProduct" className="container flex h-full">
            <div className="mr-6 h-full w-2/5">
                <div className="max-h-[50%] w-full">
                    <Form className="h-full" menuNavigaton={productMenuNav.getInfo()} value={info} setValue={setInfo} />
                </div>

                <Button className="mt-5" onClick={handleSubmit} disabled={!invalid}>
                    Xác nhận
                </Button>
            </div>
            <div className="h-full w-3/5">
                <div className="max-h-[50%] w-full">
                    <Form
                        className="h-full"
                        menuNavigaton={productMenuNav.getSegments(
                            optionList.workerClass,
                            optionList.equipmentClass,
                            optionList.materialClass,
                            optionList.worker,
                            optionList.equipment,
                            optionList.material,
                        )}
                        value={segments}
                        setValue={setSegments}
                    />
                </div>
                <div className="mt-6 max-h-[50%] w-full">
                    <Form
                        className="h-full"
                        menuNavigaton={productMenuNav.getSegMentRelationship(getSegmentOptionList(segments), [])}
                        value={segmentRelationships}
                        setValue={setSegmentRelationships}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewProduct
