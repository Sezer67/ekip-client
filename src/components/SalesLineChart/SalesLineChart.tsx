import React, { useEffect, useState } from "react";
import {
  Chart,
  LineElement,
  BarElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { useAppSelector } from "../../redux/hooks";
import { ChartDataType } from "./chart.config";
Chart.register(
  LineElement,
  BarElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
Chart.defaults.font.size = 14;
const SalesLineChart = () => {
  const productState = useAppSelector((state) => state.product);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  const createChart = (
    ctx: CanvasRenderingContext2D,
    type: "line" | "bar",
    labels: string[],
    datas: any[]
  ): Chart<"bar" | "line", number[], string> => {
    const chart = new Chart(ctx, {
      type,
      data: {
        labels: labels,
        datasets: [
          {
            label: "Günlük Toplam Kazanç",
            data: datas,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (tickValue, index, ticks) => {
                return tickValue + " ₺";
              },
            },
          },
        },
        plugins: {
          tooltip: {
            padding: 10,
            callbacks: {
              title: (item) => {
                return "";
              },
            },
            external: (ctx) => {
              ctx.chart.ctx.font = "16px";
              return ctx;
            },
          },
          legend: {
            labels: {
              font: {
                size: 14,
                weight: "700",
                family: "sans",
              },
            },
          },
        },
        layout: {
          padding: {
            left: 20,
            top: 30,
            bottom: 30,
          },
        },
      },
    });
    return chart;
  };

  useEffect(() => {
    const ctx = (
      document.getElementById("chart") as HTMLCanvasElement
    ).getContext("2d");
    if (!ctx || chartData.length < 1) return;
    const labels: string[] = [];
    const datas: any[] = [];
    chartData.forEach((value) => {
      labels.push(value.label);
      datas.push(value.data);
    });
    const chartStatus = Chart.getChart("chart");
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    const chartType: "line" | "bar" = datas.length > 10 ? "line" : "bar";
    const chart = createChart(ctx, chartType, labels, datas);
  }, [chartData]);

  useEffect(() => {
    const data: ChartDataType[] = [];
    let kazanc = 0;
    let gun = "";
    productState.salesData.sales.forEach((sale, index) => {
      const answerAt = sale.answerAt.toString().split("-")[2].substring(0, 2);
      if (index === 0) {
        gun = answerAt;
        kazanc = sale.totalPrice;
      } else {
        if (gun === answerAt) {
          kazanc += sale.totalPrice;
        } else {
          data.push({ label: gun, data: kazanc });
          gun = answerAt;
          kazanc = sale.totalPrice;
        }
      }
      // son elemandaysa son günün dataya eklenmesi için
      if (index === productState.salesData.sales.length - 1) {
        data.push({ label: gun, data: kazanc });
      }
    });
    setChartData(data);
  }, [productState.salesData.sales]);

  return (
    <div className="w-full max-w-[900px] ">
      <canvas id="chart" />
    </div>
  );
};

export default SalesLineChart;
