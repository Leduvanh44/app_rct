import { VscSettings } from "react-icons/vsc"
import { OeeIcon, CommandIcon, QuantityIcon, ResourceIcon, ScheduleIcon, ProductivityIcon } from "@/components/Icons"
import { MdOutlineAccountTree } from "react-icons/md"
import { paths } from "@/config"

const SIDEBAR_ITEMS = [
    {
        label: "Báo cáo",
        icon: OeeIcon,
        route: paths.oee,
    },
    // {
    //     label: "Năng suất máy",
    //     icon: ProductivityIcon,
    //     route: paths.productivity,
    // },
    {
        label: "Đơn sản xuất",
        icon: CommandIcon,
        route: paths.manufacturingOder,
    },
    {
        label: "Kế hoạch sản xuất",
        icon: ScheduleIcon,
        route: paths.schedule,
    },
    {
        label: "Tiến độ sản xuất",
        icon: QuantityIcon,
        route: paths.progress,
    },
    {
        label: "Nguồn lực",
        icon: ResourceIcon,
        route: paths.resource,
    },
    {
        label: "Phân cấp nhà máy",
        icon: MdOutlineAccountTree,
        route: paths.hierachyFactory,
    },
    {
        label: "Thiết lập",
        icon: VscSettings,
        route: paths.setting,
    },
]

export { SIDEBAR_ITEMS }
