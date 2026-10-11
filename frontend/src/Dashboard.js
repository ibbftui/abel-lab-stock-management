import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import ActivityTable from "./components/ActivityTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/api";
import { FiTool, FiClipboard } from "react-icons/fi";
import { BsBeaker } from "react-icons/bs";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
  total_alat: 0,
  total_bahan: 0,
  stok_rendah: 0,
  mendekati_kadaluarsa: 0,
  aktivitas_terbaru: [],
    });

  useEffect(() => {
  getDashboard();
  }, []);

  const getDashboard = async () => {

  try {

    const response = await axios.get(
      `${API_BASE_URL}/dashboard`
    );

    console.log("DATA DASHBOARD:",response.data);

    setDashboard(response.data);

  } catch (error) {

    console.log(error);

  }

  };
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Isi dashboard */}
        <main className="p-8">

          <h1 className="text-3xl font-bold text-[#0D315F]">
            Dashboard
          </h1>

          <p className="mt-2 text-xs text-gray-600">
            Selamat datang kembali. Berikut adalah ringkasan status inventaris laboratorium Anda untuk hari ini.
          </p>

          <div className="grid grid-cols-4 gap-8 mt-5">

            <StatCard
              icon={<FiTool className="text-[#0D315F]" />}
              title="PERALATAN / GLASSWARE"
              value={dashboard.total_alat}
              iconBg="bg-blue-50"
              borderColor="border-blue-500"
            />

            <StatCard
              icon={<BsBeaker className="text-yellow-600" />}
              title="BAHAN HABIS PAKAI"
              value={dashboard.total_bahan}
              statusColor="text-green-600"
              iconBg="bg-yellow-50"
              borderColor="border-yellow-400"
            />

            <StatCard
              icon={<HiOutlineExclamationTriangle className="text-red-600" />}
              title="MENDEKATI KADALUARSA"
              value={dashboard.mendekati_kadaluarsa}
              statusColor="text-red-600"
              iconBg="bg-red-50"
              borderColor="border-red-500"
            />

            <StatCard
              icon={<FiClipboard className="text-yellow-700" />}
              title="STOK RENDAH"
              value={dashboard.stok_rendah}
              statusColor="text-yellow-700"
              iconBg="bg-yellow-50"
              borderColor="border-yellow-500"
            />

          </div>

          {/* Activity Table */}
          <ActivityTable
            logs={dashboard.aktivitas_terbaru}
            showButton={true}
          />
        </main>

      </div>

    </div>
  );
}

export default Dashboard;