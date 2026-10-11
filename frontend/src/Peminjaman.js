import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";
import {
    FiPlus,
    FiSearch,
    FiTrash2,
    FiEdit,
    FiCheck
} from "react-icons/fi";

import {
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle
} from "react-icons/hi";

function Peminjaman() {

    const [peminjaman, setPeminjaman] = useState([]);

    useEffect(() => {

        getPeminjaman();

    }, []);

    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [formData, setFormData] = useState({
    nama_peminjam: "",
    nim: "",
    institusi: "",
    barang: "",
    spesifikasi: "",
    jumlah: "",
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: "Aktif",
    catatan: ""
    });

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
        alert("Data pengguna tidak ditemukan. Silakan login kembali.");
        return;
        }

        await axios.post(
            `${API_BASE_URL}/peminjaman`,
            {
                ...formData,
                user_id: user.id,
            }
        );

        alert("Data peminjaman berhasil ditambahkan");

        setShowModal(false);

        setFormData({
            nama_peminjam: "",
            nim: "",
            institusi: "",
            barang: "",
            spesifikasi: "",
            jumlah: "",
            tanggal_pinjam: "",
            tanggal_kembali: "",
            status: "Aktif",
            catatan: ""
        });

        getPeminjaman();

    } catch (error) {

        console.log("ERROR:", error);
        console.log("RESPONSE:", error.response);
        console.log("DATA:", error.response?.data);

        alert(
            error.response?.data?.message ||
            "Gagal menambahkan data peminjaman"
        );

    }
    };

   const handleSelesaikan = async (id) => {
    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
            alert("Data pengguna tidak ditemukan. Silakan login kembali.");
            return;
        }

        const data = peminjaman.find(
            (item) => item.id === id
        );

        if (!data) {
            alert("Data peminjaman tidak ditemukan.");
            return;
        }

        await axios.put(
            `${API_BASE_URL}/peminjaman/${id}`,
            {
                ...data,
                status: "Selesai",
                user_id: user.id,
            }
        );

        await getPeminjaman();

        alert("Peminjaman berhasil diselesaikan.");

    } catch (error) {

        console.log("ERROR SELESAIKAN:", error);
        console.log("RESPONSE:", error.response?.data);

        alert(
            JSON.stringify(
                error.response?.data || error.message,
                null,
                2
            )
        );
    }
};

    const handleHapus = async (id) => {

  const yakin = window.confirm(
    "Apakah Anda yakin ingin menghapus data peminjaman ini?"
  );

  if (!yakin) {
    return;
  }

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("USER LOGIN:", user);
    console.log("USER ID:", user?.id);
    console.log("PEMINJAMAN ID:", id);

    if (!user || !user.id) {
      alert("Data pengguna tidak ditemukan. Silakan login kembali.");
      return;
    }

    await axios.delete(
      `${API_BASE_URL}/peminjaman/${id}`,
      {
        data: {
          user_id: user.id
        }
      }
    );

    alert("Data peminjaman berhasil dihapus.");

    await getPeminjaman();

  } catch (error) {

    console.log("ERROR HAPUS:", error);
    console.log("RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Gagal menghapus data peminjaman."
    );

  }

};

    const getPeminjaman = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/peminjaman`
            );

            setPeminjaman(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const getStatusTampilan = (item) => {

    // Kalau sudah dikembalikan, tetap Selesai
    if (item.status === "Selesai") {
        return "Selesai";
    }

    // Ambil tanggal hari ini
    const today = new Date();
    const todayString =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    // Kalau tanggal kembali sudah lewat
    if (item.tanggal_kembali < todayString) {
        return "Terlambat";
    }

    // Kalau tanggal kembali tepat hari ini
    if (item.tanggal_kembali === todayString) {
        return "JatuhTempoHariIni";
    }

    // Kalau masih belum jatuh tempo
    return "Aktif";
    };
    
    const filteredData = peminjaman.filter((item) => {

    const keyword = search.toLowerCase();

    return (

        item.nama_peminjam.toLowerCase().includes(keyword) ||

        item.nim.toLowerCase().includes(keyword) ||

        item.institusi.toLowerCase().includes(keyword) ||

        item.barang.toLowerCase().includes(keyword)

    );

    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentData = filteredData.slice(
            indexOfFirstItem,
            indexOfLastItem
        );

    const totalPeminjaman = peminjaman.length;

    const aktif = peminjaman.filter(
        (item) => getStatusTampilan(item) === "Aktif"
    ).length;

    const terlambat = peminjaman.filter(
        (item) => getStatusTampilan(item) === "Terlambat"
    ).length;

    const selesai = peminjaman.filter(
        (item) => getStatusTampilan(item) === "Selesai"
    ).length;

    const handleEdit = (item) => {
        console.log("EDIT DIKLIK", item);

    setEditId(item.id);    

    setFormData({
        nama_peminjam: item.nama_peminjam || "",
        nim: item.nim || "",
        institusi: item.institusi || "",
        barang: item.barang || "",
        spesifikasi: item.spesifikasi || "",
        jumlah: item.jumlah || "",
        tanggal_pinjam: item.tanggal_pinjam || "",
        tanggal_kembali: item.tanggal_kembali || "",
        status: item.status || "Aktif",
        catatan: item.catatan || ""
    });

    setShowEditModal(true);
    };

    const handleUpdate = async () => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
            alert("Data pengguna tidak ditemukan. Silakan login kembali.");
            return;
        }

        await axios.put(
            `${API_BASE_URL}/peminjaman/${editId}`,
            {
                ...formData,
                user_id: user.id,
            }
        );

        alert("Data peminjaman berhasil diperbarui");

        setShowEditModal(false);
        setEditId(null);

        getPeminjaman();

    } catch (error) {

        console.log("ERROR UPDATE:", error);
        console.log("RESPONSE:", error.response?.data);

        alert(
            error.response?.data?.message ||
            "Gagal memperbarui data peminjaman"
        );

    }
};
    return (

        <div className="flex min-h-screen bg-[#F5F7FB]">

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">

                <Header />

                <main className="p-8 min-w-0 overflow-x-hidden">

                    <h1 className="text-4xl font-bold text-[#0D315F]">

                        Data Peminjaman

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Kelola seluruh data peminjaman laboratorium.

                    </p>
                <div className="flex justify-between items-center mt-8">

                <div className="grid grid-cols-4 gap-5 flex-1">

                    <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm">Total Peminjaman</p>
                        <h2 className="text-3xl font-bold text-[#0D315F] mt-2">
                            {totalPeminjaman}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm">Aktif</p>
                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                            {aktif}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-500">
                        <p className="text-gray-500 text-sm">Terlambat</p>
                        <h2 className="text-3xl font-bold text-red-600 mt-2">
                            {terlambat}
                        </h2>
                    </div>

                        <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                         <p className="text-gray-500 text-sm">
                         Selesai
                        </p>
                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                            {selesai}
                        </h2>

                    </div>

                </div>

            </div>

            {/* SEARCH + TABLE */}

<div className="bg-white rounded-2xl shadow mt-8 p-6">

    <div className="flex justify-between items-center">

        <div className="flex items-center border rounded-xl px-4 py-3 w-96">

            <FiSearch className="text-gray-400" />

            <input
                type="text"
                placeholder="Cari peminjam..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
                }}
                className="ml-2 outline-none w-full"
            />

        </div>

        <button
            onClick={() => setShowModal(true)}
            className="bg-[#0D315F] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >

            <FiPlus />

            Tambah Peminjaman

        </button>

    </div>
        <div className="overflow-x-auto mt-6">
    <table className="min-w-[1500px] w-full [&_th]:px-5 [&_th]:py-4 [&_th]:whitespace-nowrap [&_td]:px-5 [&_td]:py-4">

        <thead className="bg-[#F7F9FC]">
            <tr className="text-left text-gray-500">
                <th className="p-5">No</th>
                <th>Nama</th>
                <th>NIM</th>
                <th>Institusi</th>
                <th>Barang</th>
                <th>Spesifikasi</th>
                <th>Jumlah</th>
                <th>Tgl Pinjam</th>
                <th>Tgl Kembali</th>
                <th>Status</th>
                <th>Diinput Oleh</th>
                <th>Aksi</th>
                <th>Catatan</th>
            </tr>
        </thead>

        <tbody>

            {currentData.map((item, index) => (

                <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                >

                    <td className="p-5">
                        {indexOfFirstItem + index + 1}
                    </td>

                    <td>{item.nama_peminjam}</td>

                    <td>{item.nim}</td>

                    <td>{item.institusi}</td>

                    <td>{item.barang}</td>

                    <td>{item.spesifikasi}</td>

                    <td>{item.jumlah}</td>

                    <td>{item.tanggal_pinjam}</td>

                    <td>{item.tanggal_kembali}</td>
                    
                    <td>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                            getStatusTampilan(item) === "Selesai"
                                ? "bg-blue-100 text-blue-700"
                                : getStatusTampilan(item) === "Terlambat"
                                ? "bg-red-100 text-red-700"
                                : getStatusTampilan(item) === "JatuhTempoHariIni"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {getStatusTampilan(item) === "JatuhTempoHariIni"
                            ? "Aktif"
                            : getStatusTampilan(item)}
                    </span>

                    </td>
                        
                    <td>
                        <span className="font-medium text-[#0D315F]">
                            {item.user?.role || "-"}
                        </span>
                    </td>

                  

                    <td>
                        <div className="flex gap-2">

                                {item.status !== "Selesai" && (
                                    <>
                                        {/* Tombol Edit */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                console.log("EDIT DIKLIK", item);
                                                handleEdit(item);
                                            }}
                                            title="Edit Peminjaman"
                                            className="bg-yellow-500 text-white p-2.5 rounded-lg hover:bg-yellow-600"
                                        >
                                            <FiEdit size={17} />
                                        </button>

                                        {/* Tombol Selesaikan */}
                                        <button
                                            type="button"
                                            onClick={() => handleSelesaikan(item.id)}
                                            title="Selesaikan Peminjaman"
                                            className="bg-[#0D315F] text-white p-2.5 rounded-lg hover:bg-[#174780]"
                                        >
                                            <FiCheck size={17} />
                                        </button>
                                    </>
                                )}

                                {/* Tombol Delete */}
                                <button
                                    type="button"
                                    onClick={() => handleHapus(item.id)}
                                    title="Hapus Peminjaman"
                                    className="bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600"
                                >
                                    <FiTrash2 size={17} />
                                </button>

                            </div>
                        </td>

                          <td className="text-gray-600 max-w-[250px]">
                        <span
                            title={item.catatan || "-"}
                            className="block truncate"
                        >
                            {item.catatan || "-"}
                        </span>
                    </td>

                </tr>

            ))}

            {filteredData.length === 0 && (

                <tr>

                    <td
                        colSpan="13"
                        className="text-center py-10 text-gray-400"
                    >

                        Belum ada data peminjaman.

                    </td>

                </tr>

            )}

                    </tbody>

                </table>


            <div className="flex justify-between items-center mt-6">

    <p className="text-sm text-gray-500">
        Menampilkan{" "}
        {filteredData.length === 0 ? 0 : indexOfFirstItem + 1}
        {" - "}
        {Math.min(indexOfLastItem, filteredData.length)}
        {" dari "}
        {filteredData.length} data
    </p>

    <div className="flex items-center gap-2">

        <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
            Sebelumnya
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg text-sm ${
                    currentPage === index + 1
                        ? "bg-[#0D315F] text-white"
                        : "border text-gray-600 hover:bg-gray-100"
                }`}
            >
                {index + 1}
            </button>
        ))}

        <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
            Berikutnya
        </button>

    </div>

</div>

            </div>

                </div>
                {showModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white w-[600px] rounded-2xl shadow-xl p-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-[#0D315F]">
                    Tambah Peminjaman
                </h2>

                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>

            </div>

            <div className="grid grid-cols-2 gap-5">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Peminjam
                    </label>

                    <input
                        type="text"
                        name="nama_peminjam"
                        value={formData.nama_peminjam}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIM
                    </label>

                    <input
                        type="text"
                        name="nim"
                        value={formData.nim}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institusi
                    </label>

                    <input
                        type="text"
                        name="institusi"
                        value={formData.institusi}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Barang
                    </label>

                    <input
                        type="text"
                        name="barang"
                        value={formData.barang}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spesifikasi Barang
                    </label>

                    <input
                        type="text"
                        name="spesifikasi"
                        value={formData.spesifikasi}
                        onChange={handleChange}
                        placeholder="Contoh: 100 mL, Pyrex, dll."
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jumlah
                    </label>

                    <input
                        type="number"
                        name="jumlah"
                        value={formData.jumlah}
                        onChange={handleChange}
                        min="1"
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Pinjam
                    </label>

                    <input
                        type="date"
                        name="tanggal_pinjam"
                        value={formData.tanggal_pinjam}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Kembali
                    </label>

                    <input
                        type="date"
                        name="tanggal_kembali"
                        value={formData.tanggal_kembali}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Terlambat">Terlambat</option>
                        <option value="Selesai">Selesai</option>
                    </select>
                </div>

                <div className="col-span-2">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catatan
                    </label>

                    <textarea
                        name="catatan"
                        rows="3"
                        value={formData.catatan}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />

                </div>

            </div>

            <div className="flex justify-end gap-3 mt-8">

                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
                >
                    Batal
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#0D315F] text-white px-5 py-2 rounded-xl hover:bg-[#174780]"
                >
                    Simpan
                </button>

            </div>

        </div>

    </div>
)}
                {showEditModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white w-[600px] rounded-2xl shadow-xl p-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-[#0D315F]">
                    Edit Peminjaman
                </h2>

                <button
                    type="button"
                    onClick={() => {
                        setShowEditModal(false);
                        setEditId(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>

            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-5">

                {/* Nama */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Peminjam
                    </label>

                    <input
                        type="text"
                        name="nama_peminjam"
                        value={formData.nama_peminjam}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* NIM */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIM
                    </label>

                    <input
                        type="text"
                        name="nim"
                        value={formData.nim}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* Institusi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institusi
                    </label>

                    <input
                        type="text"
                        name="institusi"
                        value={formData.institusi}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* Barang */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Barang
                    </label>

                    <input
                        type="text"
                        name="barang"
                        value={formData.barang}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spesifikasi Barang
                    </label>

                    <input
                        type="text"
                        name="spesifikasi"
                        value={formData.spesifikasi}
                        onChange={handleChange}
                        placeholder="Contoh: 100 mL, Pyrex, dll."
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* Jumlah */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jumlah
                    </label>

                    <input
                        type="number"
                        name="jumlah"
                        value={formData.jumlah}
                        onChange={handleChange}
                        min="1"
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* Tanggal Pinjam */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Pinjam
                    </label>

                    <input
                        type="date"
                        name="tanggal_pinjam"
                        value={formData.tanggal_pinjam}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* Tanggal Kembali */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Kembali
                    </label>

                    <input
                        type="date"
                        name="tanggal_kembali"
                        value={formData.tanggal_kembali}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Terlambat">Terlambat</option>
                        <option value="Selesai">Selesai</option>
                    </select>
                </div>

                {/* Catatan */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catatan
                    </label>

                    <textarea
                        name="catatan"
                        rows="3"
                        value={formData.catatan}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0D315F]"
                    />
                </div>

            </div>

            {/* Button */}
            <div className="flex justify-end gap-3 mt-8">

                <button
                    type="button"
                    onClick={() => {
                        setShowEditModal(false);
                        setEditId(null);
                    }}
                    className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
                >
                    Batal
                </button>

                <button
                    type="button"
                    onClick={handleUpdate}
                    className="bg-[#0D315F] text-white px-5 py-2 rounded-xl hover:bg-[#174780]"
                >
                    Simpan Perubahan
                </button>

                        </div>

                    </div>

                </div>
            )}
                

            

                </main>

            </div>

        </div>

    );

}

export default Peminjaman;