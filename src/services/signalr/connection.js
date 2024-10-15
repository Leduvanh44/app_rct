import { HubConnectionBuilder } from "@microsoft/signalr"
import signalrConfig from "@/config/signalr"

const hubConnection = new HubConnectionBuilder()
    .withUrl(...signalrConfig)
    .withAutomaticReconnect()
    .build()

const connection = {
    hubConnection,
    start: async () => {
        try {
            if (hubConnection.state === "Disconnected") {
                await hubConnection.start()
                if (hubConnection.state === "Connected") {
                    console.log("Connected to websocket server")
                }
            }

            hubConnection.onclose((err) => {
                console.log("Connection close because: " + err)
            })
            return hubConnection
        } catch (error) {
            console.log("Fail to start connection: " + error)
        }
    },
    stop: () => {
        if (hubConnection.state === "Connected") {
            hubConnection.stop()
        }
    },
}

export default connection
