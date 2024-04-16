import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

interface TableData {
    ascii_name: string;
    population: number;
    cou_name_en: string;
    country_code: string;
    timezone: string;
}

const Table: React.FC = () => {


    const navigate = useNavigate();
    const [data, setData] = useState<TableData[]>([])
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedTable, setSelectedTable] = useState<string>("");
    
    const [page,setPage] = useState(10);
    
    useEffect(() => {
        axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${page}`).then((res) => {
            console.log('data received Sucessfully');
            console.log(res.data.results);
            setData(prev => [...prev, ...res.data.results]);
            
        }).catch((err) => {
            console.log(err);
        })
    }, [page])

    const handleScroll =()=>{
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
            setPage(prev => prev + 1)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);

        return () => window.removeEventListener("scroll",handleScroll);
    },[])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSort = (key: string) => {
        if (key === sortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortOrder("asc");
        }
        setSortBy(key);
    };

    const handleTableSelect = (tableName: string) => {
        setSelectedTable(tableName);
        setFilters({});
    };

    // Apply filters
    let filteredData = data.filter((item) => {
        return Object.keys(filters).every((key) =>
            item[key as keyof TableData]
                .toString()
                .toLowerCase()
                .includes(filters[key].toLowerCase())
        );
    });

    // Apply sorting
    if (sortBy) {
        filteredData.sort((a, b) => {
            const factor = sortOrder === "asc" ? 1 : -1;
            if (a[sortBy as keyof TableData] < b[sortBy as keyof TableData]) return -1 * factor;
            if (a[sortBy as keyof TableData] > b[sortBy as keyof TableData]) return 1 * factor;
            return 0;
        });
    }

    return (
        <div>
            {/* Dropdown for selecting table name for sorting */}
            <div className="lg:flex md:block">
                <div className="md:full lg:w-1/4 m-2">
                    <div >
                        <input
                            type="text"
                            name="ascii_name"
                            placeholder="Search here..."
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-blue-950 rounded-md mt-1"
                        />
                    </div>
                </div>
                <div className="lg:flex md:block">
                    <select onChange={(e) => handleTableSelect(e.target.value)} className="outline-none md:ms-2 md:mt-2">
                        <option value="">Select Table Name</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="ascii_name">City Name</option>
                        <option value="population">Population</option>
                        <option value="cou_name_en">Country Name</option>
                        <option value="country_code">Country Code</option>
                        <option value="timezone">Timezone</option>
                    </select>

                    {/* Filter inputs */}
                    {selectedTable && (
                        <div className="w-full m-2">
                            <input
                                type="text"
                                name={selectedTable}
                                placeholder={`Filter by ${selectedTable}`}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-blue-950 rounded-md mt-1"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="p-2">
                <table className="w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center py-2 " >
                            <th className="py-4 bg-black" onClick={() => handleSort("id")}>ID</th>
                            <th className="py-4 bg-black " onClick={() => handleSort("ascii_name")}>City Name <i  className="fa">&#xf0dc;</i></th>
                            <th className="py-4 bg-black" onClick={() => handleSort("cou_name_en")}>Country Name <i  className="fa">&#xf0dc;</i></th>
                            <th className="py-4 bg-black" onClick={() => handleSort("country_code")}>Country Code <i  className="fa">&#xf0dc;</i></th>
                            <th className="py-4 bg-black" onClick={() => handleSort("timezone")}>Timezone <i  className="fa">&#xf0dc;</i></th>
                            <th className="py-4 bg-black" onClick={() => handleSort("population")}>Population <i  className="fa">&#xf0dc;</i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr className="odd:bg-white text-center odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index}</td>
                                <td scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:text-yellow-500"><Link to={`/${[item.ascii_name]}`} onClick={()=>{navigate('/')}}>{item.ascii_name}</Link></td>
                                <td scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.cou_name_en}</td>
                                <td scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.country_code}</td>
                                <td scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.timezone}</td>
                                <td scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.population}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
