import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";

import { FiSearch } from "react-icons/fi";

function NotifikasiKadaluarsa() {

    const [notifikasi, setNotifikasi] = useState({

        kadaluarsa: 0,
        mendekati: 0,
        aman: 0,
        data: [],

    });

    useEffect(() => {

        getNotifikasi();

    }, []);

    const [search,setSearch]=useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const getNotifikasi = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/notifikasi`
            );

            setNotifikasi(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredData = notifikasi.data.filter((item)=>

    item.nama_bahan.toLowerCase().includes(search.toLowerCase()) ||

    item.merk.toLowerCase().includes(search.toLowerCase())

    );

    const lastIndex = currentPage * itemsPerPage;

    const firstIndex = lastIndex - itemsPerPage;

    const currentData = filteredData.slice(firstIndex, lastIndex);
    useEffect(() => {

    setCurrentPage(1);

    }, [search]);

    return (

        <div className="flex min-h-screen bg-[#F5F7FB]">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Header />

                <main className="p-8">

                    <h1 className="text-4xl font-bold text-[#0D315F]">
                        Notifikasi Kadaluarsa
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Pantau seluruh bahan kimia berdasarkan status masa kadaluarsa.
                    </p>

                    {/* CARD */}
                    <div className="grid grid-cols-3 gap-6 mt-8">

                        {/* Kadaluarsa */}
                        <div className="bg-white rounded-xl shadow border-l-4 border-red-500 p-6">

                            <p className="text-gray-500 text-sm">
                                Telah Kadaluarsa
                            </p>

                            <h2 className="text-3xl font-bold text-red-600 mt-2">
                                {notifikasi.kadaluarsa}
                            </h2>

                            <p className="text-sm text-gray-400">
                                Item
                            </p>

                        </div>

                        {/* Mendekati */}
                        <div className="bg-white rounded-xl shadow border-l-4 border-yellow-400 p-6">

                            <p className="text-gray-500 text-sm">
                                Mendekati Kadaluarsa
                            </p>

                            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                                {notifikasi.mendekati}
                            </h2>

                            <p className="text-sm text-gray-400">
                                Item
                            </p>

                        </div>

                        {/* Aman */}
                        <div className="bg-white rounded-xl shadow border-l-4 border-blue-500 p-6">

                            <p className="text-gray-500 text-sm">
                                Status Aman
                            </p>

                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                {notifikasi.aman}
                            </h2>

                            <p className="text-sm text-gray-400">
                                Item
                            </p>

                        </div>

                    </div>

                    {/* SEARCH + TABLE */}
                    <div className="bg-white rounded-2xl shadow mt-8 p-6">

                        <div className="flex items-center border rounded-xl px-4 py-3 w-96">

                            <FiSearch className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Cari nama bahan atau merk..."
                                className="ml-2 outline-none w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>
                    
                    <div className="overflow-x-auto mt-6">

                    <table className="w-full">

                    <thead className="bg-gray-100">

                    <tr className="text-left">

                    <th className="p-4">No</th>
                    <th>Nama Bahan</th>
                    <th>Merk</th>
                    <th>Tanggal Kadaluarsa</th>
                    <th>Qty</th>
                    <th>Satuan</th>
                    <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {currentData.map((item, index) => (

                    <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                    >

                    <td className="p-4">

                    {firstIndex + index + 1}

                    </td>

                    <td className="font-semibold text-[#0D315F]">

                    {item.nama_bahan}

                    </td>

                    <td>

                    {item.merk}

                    </td>

                    <td>

                    {new Date(item.tanggal_kadaluarsa).toLocaleDateString(
                    "id-ID",
                    {
                    day:"2-digit",
                    month:"long",
                    year:"numeric"
                    }
                    )}

                    </td>

                    <td>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {item.jumlah}

                    </span>

                    </td>

                    <td>

                    {item.satuan}

                    </td>

                    <td>

                    <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold

                    ${item.status==="Kadaluarsa"
                    ?"bg-red-100 text-red-700"
                    :item.status==="Mendekati"
                    ?"bg-yellow-100 text-yellow-700"
                    :"bg-green-100 text-green-700"
                    }

                    `}
                    >

                    {item.status}

                    </span>

                    </td>

                    </tr>

                    ))}

                    </tbody>

                    </table>

                    <div className="flex justify-end items-center gap-2 mt-6">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({
                        length: Math.ceil(filteredData.length / itemsPerPage),
                    }).map((_, index) => (

                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === index + 1
                                    ? "bg-[#0D315F] text-white"
                                    : "border"
                            }`}
                        >
                            {index + 1}
                        </button>

                    ))}

                    <button
                        disabled={
                            currentPage === Math.ceil(filteredData.length / itemsPerPage)
                        }
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>

                    </div>

                    </div>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default NotifikasiKadaluarsa;