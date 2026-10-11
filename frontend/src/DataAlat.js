import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DataAlatModal from "./components/DataAlatModal";
import DeleteModal from "./components/DeleteModal";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";


import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function DataAlat() {
const [alat, setAlat] = useState([]);
const [openModal, setOpenModal] = useState(false);
const [editData, setEditData] = useState(null);
const [openDelete, setOpenDelete] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;
const currentData = alat.slice(firstIndex, lastIndex);


useEffect(() => {
    getAlat();
}, []);

const getAlat = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alat`);
        setAlat(response.data);
    } catch (error) {
        console.error(error);
    }
};

const tambahAlat = async (data) => {
    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await axios.post(
            `${API_BASE_URL}/alat`,
            {
                ...data,
                user_id: user?.id,
            }
        );

        getAlat();
        setOpenModal(false);

    } catch (error) {

        console.log(error);
        alert("Gagal menambahkan alat. Silakan coba lagi.");

    }
};

const updateAlat = async (data) => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await axios.put(
            `${API_BASE_URL}/alat/${editData.id}`,
            {
                ...data,
                user_id: user?.id,
            }
        );

        setAlat((prev) =>
            prev.map((item) =>
                item.id === editData.id
                    ? response.data.data
                    : item
            )
        );

        setEditData(null);
        setOpenModal(false);

    } catch (error) {

        console.log("ERROR UPDATE:", error.response?.data || error);

    }

};

const hapusAlat = async () => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await axios.delete(
            `${API_BASE_URL}/alat/${selectedId}`,
            {
                data: {
                    user_id: user?.id,
                }
            }
        );

        await getAlat();

        setOpenDelete(false);
        setSelectedId(null);

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
            Data Alat
          </h1>

          <p className="text-gray-500 mt-2">
            Manajemen inventaris peralatan laboratorium.
          </p>

          {/* Toolbar */}

          <div className="flex justify-between items-center mt-8">

            <div className="flex gap-3">

              <div className="flex items-center bg-white border rounded-lg px-4 py-2 w-80">

                <FiSearch className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Cari alat..."
                  className="ml-2 outline-none w-full"
                />

              </div>

            </div>

            <button 
            onClick={() => setOpenModal(true)}
            className="flex items-center bg-[#0D315F] text-white px-5 py-3 rounded-lg hover:bg-[#0a274c]"
            >

              <FiPlus />

              <span className="ml-2">
                Tambah Alat Baru
              </span>

            </button>

          </div>
          

          {/* Table */}

          <div className="bg-white rounded-xl shadow mt-6 overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr className="text-left">

                  <th className="p-4">No</th>
                  <th>Nama Alat</th>
                  <th>Keterangan</th>
                  <th>Qty</th>
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
                      {item.nama_alat}
                    </td>

                    <td className="text-gray-500">
                      {item.merk
                        ? `${item.kondisi} - ${item.lokasi}`
                        : `${item.kondisi} - ${item.lokasi}`}
                    </td>

                    <td>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {item.jumlah}
                      </span>
                    </td>

                    <td>{item.satuan}</td>

                    <td>

                      <div className="flex justify-center gap-5">

                        <button 
                          onClick={() => {
                            setEditData(item);
                            setOpenModal(true);
                          }}
                        className="text-blue-600 hover:text-blue-800">

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
                length: Math.ceil(alat.length / itemsPerPage),
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
                  currentPage === Math.ceil(alat.length / itemsPerPage)
                }
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>

            </div>   


          </div>
          {/* Modal Tambah Alat */}

          <DataAlatModal
              isOpen={openModal}
              initialData={editData}
              onClose={() => {

                  setOpenModal(false);

                  setEditData(null);

              }}
              onSubmit={editData ? updateAlat : tambahAlat}
               />

            <DeleteModal
                isOpen={openDelete}
                onClose={() => {

                  setOpenDelete(false);

                  setSelectedId(null);

              }}
              onConfirm={hapusAlat}
            /> 

        </main>

      </div>

    </div>
  );
}

export default DataAlat;