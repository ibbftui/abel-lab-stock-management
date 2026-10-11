import { useNavigate, NavLink } from "react-router-dom";

import {
  FiGrid,
  FiBox,
  FiPackage,
  FiClock,
  FiBell,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";

import { BsBeaker } from "react-icons/bs";

function Sidebar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    };  
  return (
    <aside className="w-72 bg-[#0D315F] text-white flex flex-col justify-between min-h-screen">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="p-6 flex items-center">

          <div className="bg-white rounded-xl p-2">
            <img
              src="/IBB-Logo.png"
              alt="Logo"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div className="ml-4">

            <h1 className="text-xl font-bold leading-tight">
              ABEL
            </h1>

            <p className="text-gray-300 text-sm">
              Advanced Bioindustrial Engineering Laboratory
            </p>

          </div>

        </div>

        <p className="text-gray-400 text-sm px-6 mb-5">
          V1.0
        </p>

        {/* Menu */}

        <nav>

          <Menu
            icon={<FiGrid />}
            text="Dashboard"
            to="/dashboard"
          />

          <Menu
            icon={<BsBeaker />}
            text="Data Peralatan / Glassware"
            to="/data-alat"
          />

          <Menu
            icon={<FiPackage />}
            text="Data Bahan Habis Pakai"
            to="/data-bahan"
          />

          <Menu
            icon={<FiBox />}
            text="Barang Pelengkap"
            to="/data-barang"
          />

          <Menu
            icon={<FiClock />}
            text="Log Aktivitas"
            to="/log-aktivitas"
          />

          <Menu
            icon={<FiBell />}
            text="Notifikasi Kadaluarsa"
            dot
            to="/notifikasi-kadaluarsa"
          />

          <Menu
            icon={<FiCalendar />}
            text="Peminjaman"
            to="/peminjaman"
          />

        </nav>

      </div>

      {/* Bottom */}

      <div className="border-t border-blue-800">

        <button
        onClick={handleLogout}
        className="w-full flex items-center px-6 py-5 hover:bg-blue-800 transition"
>

          <FiLogOut className="text-2xl" />

          <span className="ml-3">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

function Menu({ icon, text, active, dot, to = "#" }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative w-full flex items-center px-6 py-4 text-lg transition ${
          isActive
            ? "bg-[#124A86] border-l-4 border-yellow-400"
            : "hover:bg-[#124A86]"
        }`
      }
    >
      <span className="text-2xl">{icon}</span>

      <span className="ml-4">{text}</span>

      {dot && (
        <span className="absolute right-6 w-3 h-3 rounded-full bg-yellow-400"></span>
      )}
    </NavLink>
  );
}

export default Sidebar;