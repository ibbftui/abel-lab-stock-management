import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DeleteModal from "./components/DeleteModal";
import DataBahanModal from "./components/DataBahanModal";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";


import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function DataBahan() {
const [bahan, setBahan] = useState([]);
const [openModal, setOpenModal] = useState(false);
const [editData, setEditData] = useState(null);
const [openDelete, setOpenDelete] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

const [filterExp, setFilterExp] = useState("semua");
const [openFilter, setOpenFilter] = useState(false);

const itemsPerPage = 10;

const getFilteredBahan = () => {

    if (filterExp === "semua") {
        return bahan;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bahan.filter((item) => {

        const tanggalExp = new Date(item.tanggal_kadaluarsa);
        tanggalExp.setHours(0, 0, 0, 0);

        const selisihHari = Math.ceil(
            (tanggalExp - today) / (1000 * 60 * 60 * 24)
        );

                // Sudah melewati tanggal kadaluarsa
                    // Sudah melewati tanggal kadaluarsa
            if (filterExp === "habis") {
                return selisihHari < 0;
            }

            // Kadaluarsa H-60
            if (filterExp === "60hari") {
                return selisihHari >= 0 && selisihHari <= 60;
            }

            // Kadaluarsa H-90
            if (filterExp === "90hari") {
                return selisihHari >= 0 && selisihHari <= 90;
            }

        return true;
    });
};

const filteredBahan = getFilteredBahan();

const lastIndex = currentPage * itemsPerPage;

const firstIndex = lastIndex - itemsPerPage;

const currentData = filteredBahan.slice(firstIndex, lastIndex);

useEffect(() => {
    getBahan();
}, []);

const getBahan = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bahan`);
        setBahan(response.data);
    } catch (error) {
        console.error(error);
    }
};

const tambahBahan = async (data) => {

    console.log("DATA YANG DIKIRIM:", data);

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await axios.post(
            `${API_BASE_URL}/bahan`,
            {
                ...data,
                user_id: user?.id,
            }
        );

        getBahan();
        setOpenModal(false);

    } catch (error) {
        console.log(error.response?.data);
    }
};;

const updateBahan = async (data) => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await axios.put(
            `${API_BASE_URL}/bahan/${editData.id}`,
            {
                ...data,
                user_id: user?.id,
            }
        );

        await getBahan();

        setEditData(null);
        setOpenModal(false);

    } catch (error) {

        console.log(error);

    }

};

const hapusBahan = async (id) => {

    if (!window.confirm("Yakin ingin menghapus data bahan ini?")) return;

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await axios.delete(
            `${API_BASE_URL}/bahan/${id}`,
            {
                data: {
                    user_id: user?.id,
                }
            }
        );

        await getBahan();

    } catch (error) {

        console.log(error);

    }

};

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-8">

          {/* Judul */}

          <h1 className="text-4xl font-bold text-[#0D315F]">
            Data Bahan
          </h1>

          <p className="text-gray-500 mt-2">
            Manajemen inventaris bahan laboratorium.
          </p>

          {/* Toolbar */}

          {/* Toolbar */}

<div className="flex justify-between items-center mt-8">

    {/* Search + Filter */}
    <div className="flex items-center gap-3">

        {/* Search */}
        <div className="flex items-center bg-white border rounded-lg px-4 py-2 w-80">

            <FiSearch className="text-gray-400" />

            <input
                type="text"
                placeholder="Cari bahan..."
                className="ml-2 outline-none w-full"
            />

        </div>


        {/* Filter */}
        <div className="relative">

            <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex items-center border rounded-lg px-5 py-2 bg-white hover:bg-gray-50"
            >

                <FiFilter />

                <span className="ml-2">
                    Filter
                </span>

            </button>


            {openFilter && (

                <div className="absolute top-12 left-0 bg-white border rounded-xl shadow-lg w-56 z-20 p-2">

                    <button
                        onClick={() => {
                            setFilterExp("semua");
                            setCurrentPage(1);
                            setOpenFilter(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                    >
                        Semua Bahan
                    </button>


                   <button
                    onClick={() => {
                        setFilterExp("90hari");
                        setCurrentPage(1);
                        setOpenFilter(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                    Kadaluarsa 30–90 Hari
                    </button>

                <button
                onClick={() => {
                    setFilterExp("30hari");
                    setCurrentPage(1);
                    setOpenFilter(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
            >
                Kadaluarsa &lt; 30 Hari
                </button>


                    <button
                        onClick={() => {
                            setFilterExp("habis");
                            setCurrentPage(1);
                            setOpenFilter(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                    >
                        Sudah Kadaluarsa
                    </button>

                </div>

            )}

        </div>

    </div>


    {/* Tambah Bahan */}
    <button
        onClick={() => setOpenModal(true)}
        className="flex items-center bg-[#0D315F] text-white px-5 py-3 rounded-lg hover:bg-[#0a274c]"
    >

        <FiPlus />

        <span className="ml-2">
            Tambah Bahan Baru
        </span>

    </button>

</div>
          

          {/* Table */}

          <div className="bg-white rounded-xl shadow mt-6 overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr className="text-left">

                  <th className="p-4">No</th>
                  <th>Nama Bahan</th>
                  <th>Spesifikasi</th>
                  <th>Keterangan</th>
                  <th>Jumlah</th>
                  <th>Satuan</th>
                  <th className="text-center">Aksi</th>

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

                        {/* Spesifikasi */}
                        <td className="text-gray-500">
                            {item.merk || "-"}
                            <br />
                            <span className="text-xs text-gray-400">
                                Exp: {item.tanggal_kadaluarsa || "-"}
                            </span>
                        </td>

                        {/* Keterangan */}
                        <td className="text-gray-500">
                            {item.keterangan || "-"}
                        </td>

                        {/* Jumlah */}
                        <td>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {item.jumlah}
                            </span>
                        </td>

                        {/* Satuan */}
                        <td>
                            {item.satuan}
                        </td>

                        {/* Aksi */}
                        <td>
                            <div className="flex justify-center gap-5">

                                <button 
                                    onClick={() => {
                                        setEditData(item);
                                        setOpenModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FiEdit2 />
                                </button>

                                <button 
                                    onClick={() => {
                                        setSelectedId(item.id);
                                        setOpenDelete(true);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FiTrash2 />
                                </button>

                            </div>
                        </td>

                  </tr>

                ))}

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
                length: Math.ceil(filteredBahan.length / itemsPerPage),
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
                  currentPage === Math.ceil(filteredBahan.length / itemsPerPage)
                }
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>

            </div>

          </div>
          {/* Modal Tambah Bahan */}

          <DataBahanModal
              isOpen={openModal}
              initialData={editData}
              onClose={() => {

                  setOpenModal(false);

                  setEditData(null);

              }}
              onSubmit={editData ? updateBahan : tambahBahan}
               />

          <DeleteModal
              isOpen={openDelete}
              onClose={() => {

                  setOpenDelete(false);

                  setSelectedId(null);

              }}
              onConfirm={() => {

                  hapusBahan(selectedId);

                  setOpenDelete(false);

                  setSelectedId(null);

              }}
              />

        
        </main>


      </div>

    </div>
  );
}

export default DataBahan;