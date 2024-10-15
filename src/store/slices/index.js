import common from "./common"
import scheduling from "./scheduling"
import setting from "./setting"
import auth from "./auth"

const rootReducer = {
    common,
    scheduling,
    setting,
    auth,
}

export default rootReducer
export * as commonStoreActions from "./common"
export * as schedulingActions from "./scheduling"
export * as settingActions from "./setting"
export * as authActions from "./auth"
