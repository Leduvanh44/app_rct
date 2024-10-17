import axiosClient from "./axiosClient"

const resourceApi = {
    worker: {
        getWorkerClasses: async () => await axiosClient.get("/personnelClasses"),
        createWorkerClass: async (data) => await axiosClient.post("/personnelClasses", data),
        updateWorkerClass: async (data, classId) => await axiosClient.put(`/personnelClasses/${classId}`, data),
        deleteWorkerClass: async (id) => await axiosClient.delete(`/personnelClasses/${id}`),

        getWorkers: async () => await axiosClient.get("/persons"),
        createWorker: async (data) => await axiosClient.post("/persons", data),
        updateWorker: async (data, workerId) => await axiosClient.put(`/persons/${workerId}`, data),
        deleteWorker: async (workerId) => await axiosClient.delete(`/persons/${workerId}`),
    },
    equipment: {
        getEquipmentClasses: async () =>
            await axiosClient.get("/EquipmentClasses?IdStartedWith=&PageIndex=1&PageSize=1000"),
        createEquipmentClass: async (data) => await axiosClient.post("/EquipmentClasses", data),
        updateEquipmentClass: async (data, classId) => await axiosClient.put(`/EquipmentClasses/${classId}`, data),
        deleteEquipmentClass: async (classId) => await axiosClient.delete(`/EquipmentClasses/${classId}`),

        getEquipments: async () => await axiosClient.get("/Equipments?PageIndex=1&PageSize=1000"),
        createEquipment: async (data) => await axiosClient.post("/Equipments", data),
        updateEquipment: async (data, equipmentId) => await axiosClient.put(`/Equipments/${equipmentId}`, data),
        deleteEquipment: async (equipmentId) => await axiosClient.delete(`/Equipments/${equipmentId}`),

        getAllEquipmentOutputs: async () => await axiosClient.get("/equipments/outputs"),
        createEquipmentOuput: async (id, data) => axiosClient.post(`/equipments/${id}/outputs`, data),
        getEquipmentOutputs: async (id) => axiosClient.get(`/equipments/${id}/outputs`),
        updateEquipmentOutput: async (equipmentId, materialId, data) =>
            axiosClient.put(`/equipments/${equipmentId}/outputs/${materialId}`, data),
        deleteEquipmentOutput: async (equipmentId, materialId) =>
            axiosClient.delete(`/equipments/${equipmentId}/outputs/${materialId}`),

        getEquipmentsList: async () => await axiosClient.get("/equipments/ids"), // dùng trong trang oee
    },
    material: {
        getMaterialClasses: async () => await axiosClient.get("/materialClasses"),
        createMaterialClass: async (data) => await axiosClient.post("/materialClasses", data),
        updateMaterialClass: async (data, classId) => await axiosClient.put(`/materialClasses/${classId}`, data),
        deleteMaterialClass: async (classId) => await axiosClient.delete(`/materialClasses/${classId}`),

        getMaterials: async () => await axiosClient.get("/MaterialDefinitions"),
        createMaterial: async (data) => await axiosClient.post("/MaterialDefinitions", data),
        updateMaterial: async (data, id) => await axiosClient.put(`/MaterialDefinitions/${id}`, data),
        deleteMaterial: async (id) => await axiosClient.delete(`/MaterialDefinitions/${id}`),

        createMaterialUnit: async (data, id) =>
            await axiosClient.post(`/MaterialDefinitions/${id}/materialUnits`, data),
        updateMaterialUnit: async (data, materialDefinitionsId, materialUnitsId) =>
            await axiosClient.put(
                `/MaterialDefinitions/${materialDefinitionsId}/materialUnits/${materialUnitsId}`,
                data,
            ),
        deleteMaterialUnit: async (materialDefinitionsId, materialUnitsId) =>
            await axiosClient.delete(`/MaterialDefinitions/${materialDefinitionsId}/materialUnits/${materialUnitsId}`),

        createOperation: async (data, id) => await axiosClient.post(`/MaterialDefinitions/${id}/operations`, data),
        updateOperation: async (data, materialDefinitionsId, operationsId) =>
            await axiosClient.put(`/MaterialDefinitions/${materialDefinitionsId}/operations/${operationsId}`, data),
        deleteOperation: async (materialDefinitionsId, operationsId) =>
            await axiosClient.delete(`/MaterialDefinitions/${materialDefinitionsId}/operations/${operationsId}`),

        getMaterialLot: async (materialDefinitionId) =>
            await axiosClient.get(
                `/MaterialLots?MaterialDefinitionId=${materialDefinitionId}&PageIndex=1&PageSize=1000`,
            ),

        getPreviousOperation: async (id) =>
            await axiosClient.get(`/MaterialDefinitions?IdStartedWith=${id}&PageIndex=1&PageSize=1000`),
    },
}

export default resourceApi
