import React, { useEffect } from "react";
import { SalesYearlyType } from "../../types/product-service.type";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { Months } from "../SalesLineChart/chart.config";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

type PropsType = {
  chartDatas: SalesYearlyType[];
};

const SalesYearlyChart: React.FC<PropsType> = ({ chartDatas }) => {
  const createChart = (
    ctx: CanvasRenderingContext2D,
    chartType: "radar" | "doughnut",
    labels: string[],
    datas: any[]
  ): Chart<"radar" | "pie" | "doughnut", number[], string> => {
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Aylık Toplam Kazanç",
            data: datas,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "#EEF1FF",
              "#E80F88",
              "#FAF4B7",
              "#97D2EC",
              "#EBC7E8",
              "#D6CDA4",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {},
        },
      },
    });
    return chart;
  };

  useEffect(() => {
    const ctx = (
      document.getElementById("yearly-chart") as HTMLCanvasElement
    ).getContext("2d");
    if (!ctx || chartDatas.length < 1) return;
    const labels: string[] = Months;
    const datas: any[] = [];

    Months.forEach((value, index) => {
      // chartdatas da aylar zaten index olarak geliyor
      const chartData = chartDatas.find(
        (d) => Number(d.month.toString().split("-")[1]) === index
      );
      if (chartData) {
        datas.push(chartData.taking);
      } else {
        datas.push(0);
      }
    });
    const charStatus = Chart.getChart("yearly-chart");
    if (charStatus !== undefined) {
      charStatus.destroy();
    }
    const chartType: "radar" | "doughnut" =
      datas.length > 6 ? "radar" : "doughnut";
    createChart(ctx, chartType, labels, datas);
  }, [chartDatas]);

  return (
    <div className="w-full pl-5 max-w-[500px]">
      <h3 className="text-primary font-bold text-center">
        Aylık Toplam Kazanç {new Date().getFullYear()}
      </h3>
      <canvas id="yearly-chart" />
    </div>
  );
};

export default SalesYearlyChart;
