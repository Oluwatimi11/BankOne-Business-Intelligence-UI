// export const dateRangeFilter = (params) => {
//     console.log("Filter params:", params); // Check params here
//     if (!params.filterModel || !params.colDef?.field) {
//         return true;
//     }
//
//     const filterModel = params.filterModel[params.colDef.field];
//     console.log("Filter model:", filterModel); // Check filterModel here
//
//     if (!filterModel) {
//         return true;
//     }
//
//     const {dateFrom, dateTo} = filterModel;
//     return (data) => {
//         const cellValue = data[params.colDef.field];
//         console.log("Cell value:", cellValue); // Check cellValue here
//         const transactionDate = new Date(cellValue);
//
//         // Ensure that transactionDate is valid
//         if (isNaN(transactionDate.getTime())) {
//             return false;
//         }
//
//         // Convert ISO strings to Date objects for comparison
//         const fromDate = dateFrom ? new Date(dateFrom) : null;
//         const toDate = dateTo ? new Date(dateTo) : null;
//
//         // Check if the transaction date is within the specified range
//         return (!fromDate || transactionDate >= fromDate) &&
//             (!toDate || transactionDate <= toDate);
//     };
// };
