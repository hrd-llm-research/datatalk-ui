"use server";
let mockSelectedCharts = [];

export const getSelectedCharts = async () => {
    // console.log("mockSelectedCharts")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSelectedCharts);
    }, 500);
  });
 
};

export const addSelectedChart = async (chart) => {
    // console.log(chart)
  return new Promise((resolve) => {
    setTimeout(() => {
      mockSelectedCharts.push(chart);
      resolve({ message: "Chart added successfully", chart });
    }, 500);
  });
};

