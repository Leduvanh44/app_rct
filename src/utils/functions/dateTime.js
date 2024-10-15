export const isoToTimestamp = (isoString) => {
    const date = new Date(isoString)
    return date.getTime()
}
// hàm cộng "2023-08-16T04:05:58" với "02:00:00"
export const addTimeToDateTime = (thoiGian1, thoiGian2) => {
    // Chuyển đổi thời gian 1 sang đối tượng Date
    const date1 = new Date(thoiGian1)

    // Tách giờ, phút và giây từ thời gian 2
    const [gio2, phut2, giay2] = thoiGian2.split(":").map(Number)

    // Thêm giờ, phút và giây từ thời gian 2 vào thời gian 1
    date1.setHours(date1.getHours() + gio2)
    date1.setMinutes(date1.getMinutes() + phut2)
    date1.setSeconds(date1.getSeconds() + giay2)

    // Định dạng lại thời gian kết quả
    const gio = date1.getHours().toString().padStart(2, "0")
    const phut = date1.getMinutes().toString().padStart(2, "0")
    const giay = date1.getSeconds().toString().padStart(2, "0")

    // Trả về thời gian kết quả dưới dạng chuỗi
    return `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, "0")}-${date1
        .getDate()
        .toString()
        .padStart(2, "0")}T${gio}:${phut}:${giay}`
}
export const subTimeToDateTime = (thoiGian1, thoiGian2) => {
    // Chuyển đổi thời gian 1 sang đối tượng Date
    const date1 = new Date(thoiGian1)

    // Tách giờ, phút và giây từ thời gian 2
    const [gio2, phut2, giay2] = thoiGian2.split(":").map(Number)

    // Trừ giờ, phút và giây từ thời gian 2 vào thời gian 1
    date1.setHours(date1.getHours() - gio2)
    date1.setMinutes(date1.getMinutes() - phut2)
    date1.setSeconds(date1.getSeconds() - giay2)

    // Định dạng lại thời gian kết quả
    const gio = date1.getHours().toString().padStart(2, "0")
    const phut = date1.getMinutes().toString().padStart(2, "0")
    const giay = date1.getSeconds().toString().padStart(2, "0")

    // Trả về thời gian kết quả dưới dạng chuỗi
    return `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, "0")}-${date1
        .getDate()
        .toString()
        .padStart(2, "0")}T${gio}:${phut}:${giay}`
}
export const compareTime = (dateTimeString1, dateTimeString2) => {
    const dateTime1 = new Date(dateTimeString1)
    const dateTime2 = new Date(dateTimeString2)

    if (dateTime1 < dateTime2) {
        return -1 // dateTimeString1 < dateTimeString2
    } else if (dateTime1 > dateTime2) {
        return 1 // dateTimeString1 > dateTimeString2
    } else {
        return 0 // dateTimeString1 == dateTimeString2
    }
}
export const getCurrentDateTime = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")

    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    return currentDateTime
}
export const formatDateTime = (time) => {
    return time.split(".")[0]
}

export const convertDataProductionSchedule = (inputData) => {
    const result = []

    inputData.forEach((item) => {
        if (item.workOrderStatus == 2) {
            const name = `${item.workOrderId}[${item.manufacturingOrder}]`
            const machine = item.manufacturingOrder // Thay đổi tên máy ở đây nếu cần

            const startTime = isoToTimestamp(item.startTime)
            const endTime = isoToTimestamp(item.endTime)

            const newData = { x: machine, y: [startTime, endTime] }
            result.push({ name, data: [newData] })
        }
    })

    return result
}
//chuyền từ "2024-01-03T07:29:25.387" sang "03-01-2024"
export function convertDateFormat(inputDate) {
    // Tách ngày và thời gian từ chuỗi đầu vào
    const [datePart, timePart] = inputDate.split('T');
    
    // Tách ngày thành các phần
    const [year, month, day] = datePart.split('-');
    
    // Tách thời gian thành các phần
    const [hour, minute, second] = timePart.split(/[.+\:]/).slice(0, 3);
    
    // Tạo chuỗi kết quả
    const formattedDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    
    return formattedDate;
  }