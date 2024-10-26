import axiosClient from "./axiosClient"
// import { handleDeviceID } from '@/ultils'
const handleDeviceID = (deviceId) => {
    let deviceDetails = {
        deviceId: deviceId.split("-")[0],
        mouldSlot: 1,
    }
    return deviceDetails
}
const downTimeApi = {
    getDownTime: (machine, dayStart, dayEnd) => {
        // const { deviceId, mouldSlot } = handleDeviceID(machine)
        const url = `Downtimes?EquipmentId=${machine}&From=${dayStart}&To=${dayEnd}`
        return axiosClient.get(url)
    },
    getDownTimeHeadList: (machine) => {
        const url = `EquipmentClasses?IdStartedWith=${machine}`
        return axiosClient.get(url)
    }
}

export default downTimeApi
