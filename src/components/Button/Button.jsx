import cl from "classnames"

function Button({ children, small, large, className, transparent, onClick, disabled, bg, color, ...props }) {
    const childrenType = typeof children === "string" ? "string" : "icon"

    return (
        <button
            data-component="Button"
            style={{ backgroundColor: bg, color }}
            className={cl(
                "flex items-center justify-center border-none",
                {
                    "rounded-lg px-4": childrenType === "string",
                    "aspect-square rounded-full": childrenType === "icon",
                    "bg-transparent text-neutron-1": transparent,
                    "bg-accent-1 text-neutron-4": !transparent,
                    "text-16-b h-[30px] bg-primary-2": small,
                    "heading-20-b h-[50px]": large,
                    "heading-20-b h-10": !(small || large),
                    "hover hover:cursor-not-allowed": disabled,
                    "hover:hover": !disabled,
                },
                className,
            )}
            onClick={!disabled ? onClick : null}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
