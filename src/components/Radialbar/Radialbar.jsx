import Chart from "react-apexcharts"

import { formatNumberValue } from "@/utils/functions"

function Radialbar({ width = 300, value, color = "#4D7EB3", fontSize = 20, format, rounded, fixed = 2 }) {
    const options = {
        chart: {
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "60%",
                },
                dataLabels: {
                    enabled: true,
                    name: {
                        show: false,
                    },
                    value: {
                        color: "#111",
                        fontSize,
                        fontWeight: "bold",
                        show: true,
                    },
                },
            },
        },
        stroke: {
            lineCap: "round",
        },
        colors: [color],
    }

    const series = [formatNumberValue(value, format ?? rounded ?? fixed)]

    return (
        <div data-component="Radialbar">
            <Chart width={width} options={options} series={series} type="radialBar" />
        </div>
    )
}

export default Radialbar
