import { Routes, Route } from "react-router-dom";

import Login from "./login";
import Dashboard from "./Dashboard";
import DataAlat from "./DataAlat";
import DataBahan from "./DataBahan";
import DataBarang from "./DataBarang";
import LogAktivitas from "./LogAktivitas";
import NotifikasiKadaluarsa from "./NotifikasiKadaluarsa";
import Peminjaman from "./Peminjaman";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/data-alat" element={<DataAlat />} />
      <Route path="/data-bahan" element={<DataBahan />}/>
      <Route path="/data-barang" element={<DataBarang />}/>
      <Route path="/log-aktivitas" element={<LogAktivitas />}/>
      <Route path="/notifikasi-kadaluarsa" element={<NotifikasiKadaluarsa />}/>
      <Route path="/peminjaman" element={<Peminjaman />}/>
    </Routes>
  );
}

export default App;