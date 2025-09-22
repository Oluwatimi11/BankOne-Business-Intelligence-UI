// import React, {useEffect, useState} from 'react';
// import {IDateFilterParams} from 'ag-grid-community';
// import {dateRangeFilter} from "@/components/ui/table/BaseTable";
//
// const CustomDateFilter = (props: IDateFilterParams) => {
//     const [dateFrom, setDateFrom] = useState<Date | null>(null);
//     const [dateTo, setDateTo] = useState<Date | null>(null);
//
//     useEffect(() => {
//         props?.filterChangedCallback();
//     }, [dateFrom, dateTo]);
//
//     const onDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setDateFrom(event.target.value ? new Date(event.target.value) : null);
//     };
//
//     const onDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setDateTo(event.target.value ? new Date(event.target.value) : null);
//     };
//
//     const doesFilterPass = (params: any) => {
//         return dateRangeFilter({
//             data: params.data,
//             dateFrom,
//             dateTo
//         });
//     };
//
//     return (
//         <div>
//             <input type="date" onChange={onDateFromChange}/>
//             <input type="date" onChange={onDateToChange}/>
//         </div>
//     );
// };
//
// export default CustomDateFilter;
