import { HttpTransportType } from "@microsoft/signalr"

const serverUrl = import.meta.env.VITE_SERVER_ADDRESS + "/workOrderHub"

const signalrConfig = [
    serverUrl,
    {
        withCredentials: false,
        transport: HttpTransportType.WebSockets,
    },
]

export default signalrConfig
