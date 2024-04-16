// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Citylist: React.FC = () => {
//   interface DataItem {
//     id: number;
//     ascii_name: string;
//     population: number;
//     cou_name_en: string;
//     country_code: string;
//     timezone: string;
//   }

//   const [data, setData] = useState<DataItem[]>([]);
//   const [filterdata, setFilterdata] = useState<DataItem[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<DataItem[]>([]);
//   const [sortBy, setSortBy] = useState<string>("");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [selectedTable, setSelectedTable] = useState<string>("");

//   const Data_api =
//     "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100";

//   useEffect(() => {
//     axios
//       .get(Data_api)
//       .then((res) => {
//         console.log("data received Sucessfully");
//         console.log(res.data.results);
//         setData(res.data.results);
//         setFilterdata(res.data.results);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     // Filter data based on search query
//     if (searchQuery.length > 0) {
//       const filteredData = data.filter((item) =>
//         item.ascii_name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       setData(filteredData);
//       setSuggestions(filteredData);
//     } else {
//       setData(filterdata);
//     }
//   }, [searchQuery, data, filterdata]);

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSort = (key: string) => {
//     if (key === sortBy) {
//       // Toggle sort order if sorting on the same column
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       // Set sort order to ascending if sorting on a new column
//       setSortOrder("asc");
//     }
//     setSortBy(key);
//   };

//   const tableheading = [
//     "City Name",
//     "Country",
//     "Country Code",
//     "Timezone",
//     "Country Population",
//   ];

//   return (
//     <div>
//       <div className="relative overflow-x-auto sm:rounded-lg">
//         <div className="flex">
//           <div className="w-1/4 m-2">
//             <label htmlFor="search">Search By City:</label>
//             <input
//               type="text"
//               id="search"
//               value={searchQuery}
//               className="w-full p-2 border border-blue-950 rounded-md mt-1"
//               onChange={handleInputChange}
//             />
//             {searchQuery && (
//               <ul className="absolute w-1/4 h-[50vh] overflow-y-auto">
//                 {suggestions.map((item) => (
//                   <li
//                     key={item.id}
//                     className="bg-red-100 p-2 m-1 rounded-md"
//                   >
//                     {item.ascii_name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//         <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               {tableheading.map((item) => (
//                 <th scope="col" className="px-6 py-3" key={item}>
//                   <div
//                     onClick={() => handleSort(item.toLowerCase())}
//                     className="flex items-center cursor-pointer"
//                   >
//                     {item}
//                     {selectedTable === item.toLowerCase() && (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 ml-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         {sortOrder === "asc" ? (
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 15l7-7 7 7"
//                           />
//                         ) : (
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         )}
//                       </svg>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((dataItem) => (
//               <tr
//                 key={dataItem.id}
//                 className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
//               >
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {dataItem.ascii_name}
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {dataItem.cou_name_en}
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {dataItem.country_code}
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {dataItem.timezone}
//                 </td>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {dataItem.population}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Citylist;
