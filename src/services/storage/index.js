const STORAGE_KEYS = {
    schedulingOrders: "scheduling-orders",
    setting: "setting",
    isLogin: "is-login",
    username: "username",
    accessToken: "access-token",
    notifications: "notifications",
}

export const productSchedulingStorageService = {
    get() {
        const workOrders = localStorage.getItem(STORAGE_KEYS.schedulingOrders)
        return workOrders ? JSON.parse(workOrders) : []
    },
    set(data) {
        localStorage.setItem(STORAGE_KEYS.schedulingOrders, JSON.stringify(data))
    },
    remove() {
        localStorage.removeItem(STORAGE_KEYS.schedulingOrders)
    },
}

export const settingStorageService = {
    get(key) {
        const settingJson = localStorage.getItem(STORAGE_KEYS.setting) ?? "{}"
        const setting = JSON.parse(settingJson)
        return key ? setting[key] : setting
    },
    set(key, value) {
        const setting = this.get()
        setting[key] = value
        localStorage.setItem(STORAGE_KEYS.setting, JSON.stringify(setting))
    },
    remove() {
        localStorage.removeItem(STORAGE_KEYS.setting)
    },
}

export const authStorageService = {
    storage: settingStorageService.get("saveAccount") ? localStorage : sessionStorage,
    getLoginState() {
        const state = this.storage.getItem(STORAGE_KEYS.isLogin) ?? "false"
        return JSON.parse(state)
    },
    setLoginState(state) {
        this.storage.setItem(STORAGE_KEYS.isLogin, JSON.stringify(state ?? true))
    },
    getAccessToken() {
        const token = this.storage.getItem(STORAGE_KEYS.accessToken) ?? "null"
        return JSON.parse(token)
    },
    setAccessToken(token) {
        this.storage.setItem(STORAGE_KEYS.accessToken, token)
    },
    getUsername() {
        return this.storage.getItem(STORAGE_KEYS.username) ?? ""
    },
    setUsername(name) {
        this.storage.setItem(STORAGE_KEYS.username, name)
    },
}

export const notificationsStorageService = {
    get() {
        const notifications = localStorage.getItem(STORAGE_KEYS.notifications) ?? "[]"
        return JSON.parse(notifications)
    },
    set(data) {
        localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(data))
    },
}
