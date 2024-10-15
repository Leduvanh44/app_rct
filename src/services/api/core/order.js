import axiosClient from "./axiosClient"

const orderApi = {
    manufacturingOrder: {
        getManufacturingOrders: async () => axiosClient.get("/ManufacturingOrders?PageIndex=1&PageSize=1000"),
        createManufacturingOrders: async (data) => await axiosClient.post("/ManufacturingOrders", data),
        updateManufacturingOrders: async (data, id) => await axiosClient.put(`/ManufacturingOrders/${id}`, data),
        deleteManufacturingOrders: async (id) => await axiosClient.delete(`/ManufacturingOrders/${id}`),
    },
    workOrder: {
        getWorkOrders: async (id) =>
            axiosClient.get(`/WorkOrders?ManufacturingOrderId=${id}&PageIndex=1&PageSize=1000`),
        createWorkOrders: async (data, manufacturingOrderId) =>
            await axiosClient.post(`/WorkOrders/${manufacturingOrderId}`, data),
        updateWorkOrders: async (data, manufacturingOrderId, workOrderId) =>
            await axiosClient.put(`/WorkOrders/${manufacturingOrderId}/${workOrderId}`, data),
        deleteWorkOrders: async (manufacturingOrderId, workOrderId) =>
            await axiosClient.delete(`/WorkOrders/${manufacturingOrderId}/${workOrderId}`),
    },
}
export default orderApi
