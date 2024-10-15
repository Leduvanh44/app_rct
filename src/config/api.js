const coreAxiosClientConfig = {
    baseURL: import.meta.env.VITE_SERVER_ADDRESS + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status < 400,
}

const oeeAxiosClientConfig = {
    baseURL: import.meta.env.VITE_OEE_SERVER_ADDRESS + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status < 400,
}
const injectionMachineAxiosClientConfig = {
    baseURL: import.meta.env.VITE_INJECTION_MACHINE_SERVER_ADDRESS + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status < 400,
}
export { coreAxiosClientConfig, oeeAxiosClientConfig, injectionMachineAxiosClientConfig }
