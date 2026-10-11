import React from "react";

function Header() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-24 flex items-center justify-between px-8">

      {/* Judul */}
      <div>
        <h1 className="text-3xl font-bold text-[#0D315F]">
          Laboratory Stock Management
        </h1>
      </div>

      {/* Kanan */}
      <div className="flex items-center gap-8">

        {/* User */}
        <div className="flex items-center gap-4">

          <div className="text-right">

            <h2 className="font-bold text-1xl text-[#0D315F]">
              {user?.role || "Laboran"}
            </h2>

            <p className="uppercase tracking-widest text-gray-500 text-sm">
              Institute for Biosystems and Bioengineering
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;