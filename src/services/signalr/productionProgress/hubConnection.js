import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr'
// import { authStorageService } from '@/services/browserStorage'

const connection = new HubConnectionBuilder() //Lớp tạo một kết nối tới một SignalR Hub
    .withUrl(import.meta.env.VITE_SERVER_ADDRESS+ '/notificationHub', {
        transport: HttpTransportType.WebSockets,
        skipNegotiation: true,
        // accessTokenFactory: authStorageService.accessToken.get,
    }) //Thiết lập URL của Hub để kết nối. Đồng thời các tham số đặc biệt được truyền vào như transport, skipNegotiation, accessTokenFactory.
    .withAutomaticReconnect() //Thiết lập kết nối tự động khởi động lại khi bị mất kết nối.
    .build() //Tạo một đối tượng kết nối tới Hub.

const hubConnection = {
    connection,
    start: async () => {
        try {
            if (connection.state === 'Disconnected') {
                await connection.start()
                if (connection.state === 'Connected') {
                    console.log('Connected to websocket server')
                }
            }

            connection.onclose((err) => {
                console.log('Connection close because: ' + err)
            })
            return connection
        } catch (error) {
            console.log('Fail to start connection: ' + error)
        }
    },
    stop: () => {
        if (connection.state === 'Connected') {
            connection.stop()
        }
    },
}

export default hubConnection
