export const singleRangBarChartConfig = {
    chart: {
        type: "rangeBar",
        events: {
            click(_, __, config) {
                const dataIndex = config.dataPointIndex
                const seriesIndex = config.seriesIndex
                console.log(seriesIndex, dataIndex)
            },
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: false,
            dataLabels: {
                hideOverflowingLabels: false,
            },
            barHeight: "50%",
        },
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return val[1] - val[0] + " h"
        },
        style: {
            colors: ["#f3f4f5", "#fff"],
        },
    },
    xaxis: {
        type: "numberic",
    },
    yaxis: {
        show: true,
        style: {
            fontSize: "16px",
            fontWeight: 600,
        },
    },
    grid: {
        row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 0.7,
        },
    },
}

export const mutilSeriesRangeBarChartConfig = {
    chart: {
        type: "rangeBar",
        zoom: {
            enabled: true,
            type: "xy",
            resetIcon: {
                offsetX: -10,
                offsetY: 0,
                fillColor: "#fff",
                strokeColor: "#37474F",
            },
            selection: {
                background: "#90CAF9",
                border: "#0D47A1",
            },
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "100%",
            rangeBarGroupRows: false,
        },
    },
    xaxis: {
        type: "datetime",
    },
    stroke: {
        width: 1,
    },
    fill: {
        type: "solid",
        opacity: 0.6,
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return opts.w.globals.seriesNames[opts.seriesIndex]
        },
        style: {
            colors: ["#f3f4f5", "#fff"],
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "left",
    },
}

export const outputsBarChartConfig = {
    chart: {
        type: "bar",
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "48%",
            endingShape: "rounded",
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
    },
    xaxis: {
        categories: [],
    },
    yaxis: {
        title: {
            text: "Năng suất(sp / giờ)",
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " sp/giờ"
            },
        },
    },
}
