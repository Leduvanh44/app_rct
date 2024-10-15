import React from "react"

function ToggleButtons({ titles, onClick, active }) {
    return (
        <>
            <div className="toggle-buttons-container toggle-buttons-container flex flex-row items-center justify-center ">
                {titles.map((item, index) => {
                    return (
                        <button
                            type="button"
                            key={index}
                            className={`toggle-buttons-button ${
                                active === index ? "bg-primary-1 text-neutron-4" : "bg-neutron-4 text-primary-1"
                            }  text-2.4rem toggle-buttons-button ml-2 flex h-[40px] min-w-[100px] list-none flex-row items-center justify-center overflow-hidden rounded-xl border border-primary-1 px-4  text-xl  shadow-none transition-all duration-100 ease-in-out hover:bg-neutron-2 hover:text-primary-2 active:bg-primary-1`}
                            onClick={() => onClick(index)}
                        >
                            {item}
                        </button>
                    )
                })}
            </div>
        </>
    )
}

export default ToggleButtons
