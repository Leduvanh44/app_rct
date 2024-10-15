import { useState } from "react"

const usePoperMenu = () => {
    const [active, setActive] = useState(false)
    const [position, setPosition] = useState({})

    const handleOpen = (e) => {
        const x = e.clientX
        const y = e.clientY
        let top = y,
            left = x,
            right = null,
            bottom = null
        if (x > window.innerWidth / 2) {
            right = window.innerWidth - x
            left = null 
        }
        if (y > window.innerHeight / 2) {
            bottom = window.innerHeight - y
            top = null
        }

        setPosition({
            top: top && top + "px",
            right: right && right + "px",
            bottom: bottom && bottom + "px",
            left: left && left + "px",
        })
        setActive(true)
    }

    const handleClose = () => {
        setActive(false)
    }

    return { active, position, handleOpen, handleClose }
}

export default usePoperMenu
