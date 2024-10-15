export const resourceMapper = {
    resourceClass: {
        clientToApi: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            return {
                ...value.info,
                properties,
            }
        },
        apiToClient: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    property: {
                        ...item,
                        valueType: [item.valueType],
                    },
                })) ?? []

            return {
                info: {
                    ...value,
                    properties: undefined,
                },
                properties,
            }
        },
    },
    resource: {
        clientToApi: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            return {
                ...value.info,
                properties,
            }
        },
        apiToClient: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    property: {
                        ...item,
                        valueType: [item.valueType],
                    },
                })) ?? []

            return {
                info: {
                    ...value,
                    properties: undefined,
                },
                properties,
            }
        },
    },
}

export const productMapper = {
    clientToAPi(data) {
        const productInfo = data.info
        const segments = data.segments.map((segment) => {
            const personnelSpecifications =
                segment.personnelSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    persons: [],
                    description: "",
                })) ?? []
            const equipmentSpecifications =
                segment.equipmentSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    equipments: [],
                    description: "",
                })) ?? []
            const materialSpecifications =
                segment.materialSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    materialDefinitions: [],
                    description: "",
                })) ?? []
            const properties =
                segment.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            const segmentInfo = segment.info
            return {
                productSegmentId: segmentInfo.productSegmentId,
                description: segmentInfo.description,
                duration: segmentInfo.duration,
                durationUnitOfMeasure: segmentInfo.durationUnit[0],
                personnelSpecifications,
                equipmentSpecifications,
                materialSpecifications,
                properties,
            }
        })

        segments.push({
            productSegmentId: "start-segment",
            description: "Start",
            duration: 0,
            durationUnitOfMeasure: 1,
            personnelSpecifications: [],
            equipmentSpecifications: [],
            materialSpecifications: [],
            properties: [],
        })

        const segmentRelationships =
            data.segmentRelationships?.map((item) => {
                const segmentRelationship = item.info
                return {
                    aSegmentId: segmentRelationship.segmentA[0],
                    bSegmentId: segmentRelationship.segmentB[0],
                    timeWindowUnitOfMeasure: segmentRelationship.durationUnit[0],
                    dependencyType: segmentRelationship.relation[0],
                    timeWindow: segmentRelationship.duration,
                    description: "",
                }
            }) ?? []

        return {
            ...productInfo,
            version: 0,
            productSegments: segments,
            productSegmentDependencies: segmentRelationships,
        }
    },
}
export const normalMachineMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here

        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
            workUnit: data.info.workUnit[0],
            properties: data.properties
                ? data.properties.map((item) => {
                      let returnData = {
                          ...item.property,
                          valueType: item.property.valueType[0],
                      }
                      return returnData
                  })
                : [],
        }
        return res
    },
}
export const injectionMachineMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        let res = {
            ...data.info,
            workUnit: data.workUnit.workUnit[0],
            properties: [
                {
                    propertyId: "MaxPow",
                    valueString: data.info.valueString,
                    valueUnitOfMeasure: data.info.valueUnitOfMeasure[0],
                },
            ],
        }
        return res
    },
}
export const moldMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        let res = {
            ...data.info,
            workUnit: data.workUnit.workUnit[0],
            cycleBySecond: parseInt(data.info.cycleBySecond),
            properties: [],
        }
        return res
    },
}
export const normalMaterialMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        console.log(data)
        let temp_prop = data.properties.map((item) => item.property)
        let temp_prop1 = temp_prop.map((item) => {
            return {
                ...item,
                valueType: item.valueType[0],
            }
        })
        let res = {
            ...data.info,
            moduleType: "OriginalMachine",
            properties: temp_prop1,
        }
        return res
    },
}
export const plasticProductsMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        let res = {
            ...data.info,
            moduleType: "InjectionMachine-PlasticProduct",
            properties: [],
        }
        return res
    },
}
export const plasticMaterialMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        let res = {
            ...data.info,
            moduleType: "InjectionMachine-PlasticMaterial",
            properties: [],
        }
        return res
    },
}
export const manufacturingOrderMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        let res = {
            ...data.info,
            materialDefinitionId: data.info.materialDefinitionId[0],
        }
        return res
    },
}
export const injectionMachineManufacturingOrderMapper = {
    clientToAPI: (data) => {
        // Your mapping logic here
        let res = {
            ...data.info,
            materialDefinitionId: data.info.materialDefinitionId[0],
            equipments: [],
        }
        return res
    },
}
