import { months } from "../helper/Util";

export const lineChartData = {
  labels: months({ count: 12 }), // Assuming 'months' is a function or array
  datasets: [
    {
      label: 'Transactions',
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: '#fc5c7d',
      tension: 0.1,
      hoverOffset: 4,
    },
  ],
};


export const doughnutChartData = {
  labels: ["Pink", "Purple", "Yellow"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#fc5c7d", " #6a82fb", "#FFFF00"],
      hoverOffset: 4,
    },
  ],
};
