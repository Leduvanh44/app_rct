import axiosClient from "./axiosClient"
// import { handleDeviceID } from '@/ultils'
const handleDeviceID = (deviceId) => {
    let deviceDetails = {
        deviceId: deviceId.split("-")[0],
        mouldSlot: 1,
    }
    return deviceDetails
}
const OeeApi = {
    getOeeDetail: (machine, dayStart, dayEnd) =>
        axiosClient.get(
            `/ManufacturingRecords?StartTime=${dayStart}&EndTime=${dayEnd}&EquipmentId=${machine}&PageIndex=1&PageSize=1000`,
        ),
    getOee: (machine, dayStart, dayEnd, timeFrame) => {
        // const { deviceId, mouldSlot } = handleDeviceID(machine)
        const url = `Equipments/oees?EquipmentId=${machine}&StartTime=${dayStart}&EndTime=${dayEnd}&TimeFrameBySecond=${timeFrame}`
        return axiosClient.get(url)
    },
    getAverage: (dayStart, dayEnd) => axiosClient.get(`/ShiftReports/average?StartTime=${dayStart}&EndTime=${dayEnd}`),
}
export default OeeApi
