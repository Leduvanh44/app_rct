import axiosClient from "./axiosClient"

const InjectionMachineApi = {
    injectionMachine: {
        getInjectionMachine: async () => await axiosClient.get("/PlasticInjectionMachines?PageIndex=1&PageSize=1000"),
        createInjectionMachine: async (data) => await axiosClient.post("/PlasticInjectionMachines", data),
        updateInjectionMachine: async (data, id) => await axiosClient.put(`/PlasticInjectionMachines/${id}`, data),
        deleteInjectionMachine: async (id) => await axiosClient.delete(`/PlasticInjectionMachines/${id}`),
    },
    mold: {
        getMold: async () => await axiosClient.get("Molds?PageIndex=1&PageSize=1000"),
        createMold: async (data) => await axiosClient.post("/Molds", data),
        updateMold: async (data, id) => await axiosClient.put(`/Molds/${id}`, data),
        deleteMold: async (id) => await axiosClient.delete(`/Molds/${id}`),
    },
    plasticProduct: {
        getPlasticProduct: async () => await axiosClient.get("PlasticProducts?PageIndex=1&PageSize=1000"),
        createPlasticProduct: async (data) => await axiosClient.post("/PlasticProducts", data),
        updatePlasticProduct: async (data, id) => await axiosClient.put(`/PlasticProducts/${id}`, data),
        deletePlasticProduct: async (id) => await axiosClient.delete(`/PlasticProducts/${id}`),
    },
    manufacturingOrder: {
        getManufacturingOrder: async () => await axiosClient.get("ManufacturingOrders?PageIndex=1&PageSize=1000"),
        createManufacturingOrder: async (data) => await axiosClient.post("/ManufacturingOrders", data),
        updateManufacturingOrder: async (data, id) => await axiosClient.put(`/ManufacturingOrders/${id}`, data),
        deleteManufacturingOrder: async (id) => await axiosClient.delete(`/ManufacturingOrders/${id}`),
    },
    plasticMaterial: {
        getPlasticMaterial: async () => await axiosClient.get("PlasticMaterials?PageIndex=1&PageSize=1000"),
        createPlasticMaterial: async (data) => await axiosClient.post("/PlasticMaterials", data),
        updatePlasticMaterial: async (data, id) => await axiosClient.put(`/PlasticMaterials/${id}`, data),
        deletePlasticMaterial: async (id) => await axiosClient.delete(`/PlasticMaterials/${id}`),
    },
    autoScheduling: {
        createAutoScheduling: async (data) => await axiosClient.post("/ManufacturingOrders/workorders/schedule", data),
    },
}
export default InjectionMachineApi
