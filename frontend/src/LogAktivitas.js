import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";

import {
  FiSearch,
  FiCalendar,
} from "react-icons/fi";

function LogAktivitas() {

  const [logAktivitas, setLogAktivitas] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;


  useEffect(() => {

    getLogAktivitas();

  }, [search]);

  useEffect(() => {

  setCurrentPage(1);

}, [search]);

  const getLogAktivitas = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/log-aktivitas`
      );

      setLogAktivitas(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredData = useMemo(() => {

    return logAktivitas.filter((item) => {

      const keyword = search.toLowerCase();

      return (

        item.aktivitas.toLowerCase().includes(keyword) ||

        item.kategori.toLowerCase().includes(keyword) ||

        item.deskripsi.toLowerCase().includes(keyword) ||

        item.pengguna.toLowerCase().includes(keyword)

      );

    });

  }, [logAktivitas, search]);

  const currentData = filteredData.slice(firstIndex, lastIndex);

  const getBadge = (aktivitas) => {

    if (aktivitas.includes("Tambah")) {

      return "bg-green-100 text-green-700";

    }

    if (aktivitas.includes("Update")) {

      return "bg-blue-100 text-blue-700";

    }

    if (aktivitas.includes("Edit")) {

      return "bg-blue-100 text-blue-700";

    }

    if (aktivitas.includes("Hapus")) {

      return "bg-red-100 text-red-700";

    }

    return "bg-gray-100 text-gray-700";

  };

  const getAvatar = (nama) => {

    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  };

  return (

    <div className="flex min-h-screen bg-[#F5F7FB]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-8">

          <h1 className="text-4xl font-bold text-[#0D315F]">

            Log Aktivitas

          </h1>

          <p className="text-gray-500 mt-2">

            Pantau seluruh riwayat perubahan data sistem inventaris laboratorium.

          </p>

          <div className="flex justify-between items-center mt-8">

            <div className="flex items-center bg-white rounded-xl border px-4 py-3 w-96 shadow-sm">

              <FiSearch className="text-gray-400"/>

              <input
                  type="text"
                  placeholder="Cari aktivitas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ml-2 outline-none w-full"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">

            <table className="w-full">

              <thead className="bg-[#F7F9FC]">

                <tr className="text-left text-gray-500">

                  <th className="p-5">

                    Waktu

                  </th>

                  <th>

                    Pengguna

                  </th>

                  <th>

                    Aksi

                  </th>

                  <th>

                    Kategori

                  </th>

                  <th>

                    Deskripsi

                  </th>

                  <th>

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                  {currentData.map((item, index) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                  >

                    <td className="p-5">

                      <div className="font-semibold text-[#0D315F]">

                        {new Date(item.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </div>

                      <div className="text-sm text-gray-400 mt-1">

                        {new Date(item.created_at).toLocaleTimeString(
                          "id-ID",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}

                      </div>

                    </td>

                    <td>

                      <div className="flex items-center">

                        <div className="w-11 h-11 rounded-full bg-[#0D315F] text-white flex items-center justify-center font-bold">

                          {getAvatar(item.pengguna)}

                        </div>

                       <div className="ml-3">

                        <div className="font-semibold text-[#0D315F]">
                          {item.pengguna}
                        </div>

                        <div className="text-sm text-gray-400">
                          {item.pengguna}
                        </div>

                      </div>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getBadge(
                          item.aktivitas
                        )}`}
                      >

                        {item.aktivitas}

                      </span>

                    </td>

                    <td>

                      <span className="font-medium text-[#0D315F]">

                        {item.kategori}

                      </span>

                    </td>

                    <td className="text-gray-600">

                      {item.deskripsi}

                    </td>

                    <td>

                    <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    item.status === "Berhasil"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                    >

                    {item.status}

                    </span>

                    </td>

                  </tr>

                ))}

                {filteredData.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-14 text-gray-400"
                    >

                      Belum ada aktivitas.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

            <div className="flex justify-end items-center gap-2 p-4">

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

        </main>

      </div>

    </div>

  );

}

export default LogAktivitas;
              
