import { months } from "../helper/Util";

export const lineChartData = {
  labels: months({ count: 12 }), // Assuming 'months' is a function or array
  datasets: [
    {
      label: 'Transactions',
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: '#2eb872',
      tension: 0.1,
      hoverOffset: 4,
    },
  ],
};


export const doughnutChartData = {
  labels: ["Vivid cyan", "blue", "Medium Sea Green"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#04dead", " #3b50b2", "#2eb872"],
      hoverOffset: 4,
    },
  ],
};
