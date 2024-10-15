import { createPortal } from "react-dom"

import Card from "@/components/Card"
import Button from "@/components/Button"

function Confirm({ title, content, onConfirm, onClose }) {
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 w-fit max-w-[40%] translate-x-[-50%] translate-y-[-50%]">
                <div className="heading-20-b">{title}</div>
                <p>{content}</p>
                <div className="mt-5 flex gap-5">
                    <Button className="ml-auto" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                    <Button transparent onClick={onClose}>
                        Hủy
                    </Button>
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default Confirm
