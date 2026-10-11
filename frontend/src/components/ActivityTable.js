import { useNavigate } from "react-router-dom";

function ActivityTable({
    logs,
    showHeader = true,
    showButton = false,
}) {

    const navigate = useNavigate();

  const badgeColor = (status) => {

    if (status === "Berhasil") {

      return "bg-green-100 text-green-700";

    }

    return "bg-red-100 text-red-700";

  };

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-10 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-[#0D315F]">
            Log Aktivitas Terakhir
          </h2>

          <p className="text-gray-500 mt-1">
            Aktivitas terbaru pada sistem inventaris laboratorium
          </p>
        </div>

          {showButton && (

          <button
              onClick={() => navigate("/log-aktivitas")}
              className="text-[#0D315F] font-semibold hover:underline"
          >

              Lihat Semua →

          </button>

          )}

      </div>

      {/* Table */}

      <table className="w-full">

        <thead className="bg-[#F7F9FC]">

          <tr className="text-left text-gray-500">

            <th className="p-5">Waktu</th>
            <th>Pengguna</th>
            <th>Aksi</th>
            <th>Kategori</th>
            <th>Deskripsi</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {logs.length === 0 && (

          <tr>

          <td
          colSpan="5"
          className="text-center py-10 text-gray-400"
          >

          Belum ada aktivitas.

          </td>

          </tr>

          )}
          
        {logs.map((item) => (

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

                {item.pengguna
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}

            </div>

            <div className="ml-3">

                <div className="font-semibold text-[#0D315F]">

                    {item.pengguna}

                </div>

                <div className="text-sm text-gray-400">

                    Administrator

                </div>

            </div>

        </div>

    </td>

    <td>

        <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                item.aktivitas.includes("Tambah")
                    ? "bg-green-100 text-green-700"
                    : item.aktivitas.includes("Update")
                    ? "bg-blue-100 text-blue-700"
                    : item.aktivitas.includes("Hapus")
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                        }`}
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

        </tbody>

      </table>

    </div>
  );
}

export default ActivityTable;