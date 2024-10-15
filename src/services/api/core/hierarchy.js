import axiosClient from "./axiosClient"

const hierarchyApi = {
    enterprise: {
        getEnterprise: async () => await axiosClient.get("/Enterprises?PageIndex=1&PageSize=1000"),
        createEnterprise: async (data) => await axiosClient.post(`/Enterprises`, data),
        create: async (data, absolutePath) => await axiosClient.post(`/Enterprises/${absolutePath}`, data), //absolutePath của node trên 1 cấp
        updateEnterprise: async (data, absolutePath) => await axiosClient.put(`/Enterprises/${absolutePath}`, data),
        deleteEnterprise: async (absolutePath) => await axiosClient.delete(`/Enterprises/${absolutePath}`),
    },
    workunit: {
        getWorkUnit: async () =>
            await axiosClient.get("/Enterprises/Sites/Areas/WorkCenters/WorkUnit?PageIndex=1&PageSize=1000"),
    },
    WorkCenterOutput: {
        getWorkCenterOutput: async (manufacturingOrderId) =>
            await axiosClient.get(`/WorkCenterOutputs/${manufacturingOrderId}`),
    },
}

export default hierarchyApi
