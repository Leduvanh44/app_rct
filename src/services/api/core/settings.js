import axiosClient from "./axiosClient"

const SchedulesApi = {
    Schedules: {
        getWorkers: async () => await axiosClient.get("/Schedules"),
        createWorker: async (data) => await axiosClient.post("/Schedules", data),
    },
}
export default SchedulesApi