import React, { useLayoutEffect, useRef, useEffect } from "react"
import { OrgChart } from "d3-org-chart"
import { MdFitScreen, MdExpandLess, MdExpandMore, MdRotateRight } from "react-icons/md"

export const OrgChartComponent = ({ data, onNodeClick }) => {
    const d3Container = useRef(null)
    let chart = null

    useLayoutEffect(() => {
        if (data && d3Container.current) {
            if (!chart) {
                chart = new OrgChart()
            }
            chart
                .container(d3Container.current)
                .data(data)
                .nodeWidth((d) => 260)
                .nodeHeight((d) => 120)

                // .onNodeClick((d, i, arr) => {
                //     console.log(d.data)
                //     onNodeClick(d)
                // })
                .nodeContent(function (d, i, arr, state) {
                    return `<div style="color:red;border:black 1px solid;height:120px;width:260px; text-align:center;padding:10px;border-radius:10px;}">
                    <h1>${d.data.name}<h1/>
                    <div/>`
                })
                // .buttonContent(({ node, state }) => '<div style="font-size:40px; width:100%;">+</div>')
                .render()
        }
    }, [data, d3Container.current])
    const expandAll = () => {
        chart.expandAll()
    }
    const collapseAll = () => {
        chart.collapseAll()
    }
    const fullScreen = () => {
        chart.fit()
    }
    let index = 0
    const rotate = () => {
        chart
            .layout(["right", "bottom", "left", "top"][index++ % 4])
            .render()
            .fit()
    }
    return (
        <div className="relative h-[880px] w-full overflow-hidden">
            <div className="absolute bottom-80 right-2">
                <MdExpandMore
                    onClick={expandAll}
                    className="mt-4 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                />
                <MdExpandLess
                    onClick={collapseAll}
                    className="mt-4 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                />
                <MdFitScreen
                    onClick={fullScreen}
                    className="mt-4 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                />
                <MdRotateRight
                    onClick={rotate}
                    className="mt-4 cursor-pointer rounded-[999px] p-1 text-4xl text-primary-1 transition-all hover:bg-primary-2 hover:text-neutron-4"
                />
            </div>

            <div ref={d3Container} />
        </div>
    )
}
