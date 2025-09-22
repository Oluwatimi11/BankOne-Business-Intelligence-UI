// // chartUtils.ts
//
// import {useEffect, useState} from "react";
//
export type BaseChartDateFilterOption = '7days' | '30days' | '12months' | 'custom';
//
// export const processChartData = (
//     graphData: any[],
//     filterOption: BaseChartDateFilterOption,
//     startDate: Date,
//     endDate: Date
// ) => {
//     // Implementation of data processing logic
//     // ...
// };
//
// export const useChartData = (
//     graphData: any[],
//     filterOption: BaseChartDateFilterOption,
//     customStartDate?: Date,
//     customEndDate?: Date
// ) => {
//     const [processedData, setProcessedData] = useState([]);
//
//     useEffect(() => {
//         const data = processChartData(graphData, filterOption, customStartDate, customEndDate);
//         setProcessedData(data);
//     }, [graphData, filterOption, customStartDate, customEndDate]);
//
//     return processedData;
// };
