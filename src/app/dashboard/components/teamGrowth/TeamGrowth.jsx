"use client";
import React, { useState, useEffect } from "react";

// Components
// import Card from "../../../../../components/advanced/card/Card";

// Libraries
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { Select } from "@hybris-software/ui-kit";

// Styles
import Style from "./TeamGrowth.module.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler
);

const FilterList = [
  {
    name: "Last Day",
    value: "last_day",
  },
  {
    name: "Last Week",
    value: "last_week",
  },
  {
    name: "Last Month",
    value: "last_month",
  },
  {
    name: "Last Year",
    value: "last_year",
  },
];

const TeamGrowth = () => {
  // States
  const [timeFilter, setTimeFilter] = useState(FilterList[0]);

  // Queries
  // const teamHistoryAPI = useQuery({
  //   url: endpoints.dashboard.TEAM_HISTORY + "?filter=" + timeFilter.value,
  //   method: "GET",
  //   executeImmediately: false,
  //   onSuccess: (response) => {},
  //   clientOptions: {
  //     timeout: 120000,
  //   },
  // });
  // Functions
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  };
  // Variables
  // const labels = teamHistoryAPI?.response?.data?.labels.slice(1);
  // const values = teamHistoryAPI?.response?.data?.values.slice(1);

  const data = {
    labels: ["jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    values: [65, 59, 80, 81, 56, 55, 40],
  };
  const dataA = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: "#4FC2AB",
        borderRadius: 5,
        borderWidth: 5,
        borderColor: "#4FC2AB",
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: "#282828",
        pointHoverBorderColor: "#4FC2AB",
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        hoverRadius: 4,
        lineTension: 0,
        pointRadius: 4,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  const myPlugin = {
    id: "customShadow",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();

      const originalLineDraw = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = "#4FC2AB";
        ctx.shadowBlur = 12;
        // Exclude the x-axis line by checking the type of the element
        originalLineDraw.apply(this, arguments);
        ctx.restore();
      };
    },
    beforeDatasetsDraw: (chart) => {
      if (chart.tooltip?._active?.length) {
        let x = chart.tooltip._active[0].element.x;
        let y = chart.tooltip._active[0].element.y;
        let xAxis = chart.scales.x;
        let yAxis = chart.scales.y;

        let ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([10, 10]);
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#04FF95";
        ctx.stroke();
        ctx.restore();

        // Draw horizontal dashed line
        ctx.beginPath();
        ctx.setLineDash([10, 10]);
        ctx.moveTo(xAxis.left, y);
        ctx.lineTo(xAxis.right, y);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#04FF95";
        ctx.stroke();

        ctx.restore();
      }
    },
  };
  const optionsLine = {
    bezierCurve: false,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        min: 0,
        border: { dash: [6, 4] },
        grid: {
          display: true,
          color: "#C9CBCD1A",
        },
        ticks: {
          callback: (value) => {
            return formatNumber(value);
          },
        },
      },
      x: {
        grid: {
          display: true,
          lineWidth: 50,
          offset: true,
          drawTicks: false,
          // drawOnChartArea: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: false,
      datalabels: {
        display: false,
      },

      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
    },
  };

  // Functions
  function externalTooltipHandler(context) {
    // Tooltip Element
    const { chart, tooltip } = context;
    const indexOfLabel = labels.indexOf(tooltip.title[0]);
    const prevValue =
      indexOfLabel !== 0
        ? values[indexOfLabel - 1]
        : teamHistoryAPI?.response?.data?.values[0];
    const currentValue = values[indexOfLabel];

    const percentageWithLastMonth = calculatePercentageChange(
      prevValue,
      currentValue
    );
    const tooltipEl = getOrCreateTooltip(chart);
    if (indexOfLabel <= 1) {
      tooltipEl.style.transform = "translate(-10%, 0)";
    } else if (indexOfLabel >= values.length - 2) {
      tooltipEl.style.transform = "translate(-100%, 0)";
    } else {
      tooltipEl.style.transform = "translate(-50%, 0)";
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const tr = document.createElement("tr");
        tr.style.display = "flex";
        tr.style.flexDirection = "column";
        tr.style.gap = "10px";

        tableBody.appendChild(tr);

        if (i === bodyLines.length - 1) {
          if (body) {
            const thisMonthDiv = document.createElement("div");
            thisMonthDiv.style.borderWidth = 0;
            thisMonthDiv.style.color = "#fff";
            thisMonthDiv.textContent = "New User(s): ";
            const thisMonthSpan = document.createElement("span");
            thisMonthSpan.textContent = body;
            thisMonthDiv.appendChild(thisMonthSpan);
            tr.appendChild(thisMonthDiv);
          }
          if (percentageWithLastMonth) {
            const upperArrow = document.createElement("img");
            upperArrow.src = percentageArrowUp;

            const downArrow = document.createElement("img");
            downArrow.src = percentageArrowDown;

            const lastMonthDiv = document.createElement("div");
            lastMonthDiv.style.borderWidth = 0;
            lastMonthDiv.style.display = "flex";
            lastMonthDiv.style.flexWrap = "wrap";
            lastMonthDiv.style.justifyContent = "flex-start";
            lastMonthDiv.style.gap = "5px";
            lastMonthDiv.style.color = "#fff";
            lastMonthDiv.textContent = "Change ";
            const lastMonthSpan = document.createElement("span");
            lastMonthSpan.textContent =
              Math.abs(percentageWithLastMonth).toFixed(2) + "% ";
            lastMonthSpan.style.color =
              percentageWithLastMonth >= 0 ? "#7bde6a" : "#de4141";
            lastMonthSpan.appendChild(
              percentageWithLastMonth >= 0 ? upperArrow : downArrow
            );
            lastMonthDiv.appendChild(lastMonthSpan);
            tr.appendChild(lastMonthDiv);
          }
        }
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");
      tableRoot.style.gap = "30px";

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
  }

  function getOrCreateTooltip(chart) {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.borderRadius = "30px";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";
      tooltipEl.style.background = "rgba(97, 92, 92, 0.8)";
      tooltipEl.style.minWidth = "200px";

      const table = document.createElement("table");
      chart.canvas.parentNode.style.position = "relative";
      table.style.margin = "0px";
      table.style.padding = "10px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  }

  // useEffect(() => {
    // teamHistoryAPI.executeQuery();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [timeFilter]);

  return (
    <>
      <div className={Style.heading}>
        <h5>Referral Analytics</h5>
        {/* <Select
          items={FilterList}
          value={timeFilter}
          labelKey={"name"}
          setValue={(value) => {
            setTimeFilter(value);
          }}
        /> */}
      </div>

      <div className={Style.teamGrowth}>
        <Line
          data={dataA}
          options={optionsLine}
          plugins={[myPlugin]}
          style={{
            maxWidth: "100%",
            maxHeight: "420px",
          }}
        />
      </div>
    </>
  );
};

export default TeamGrowth;
