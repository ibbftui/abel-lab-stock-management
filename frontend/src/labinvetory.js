function LabInventory() {
  const items = [
    { name: "Mikroskop", stock: 5 },
    { name: "Tabung Reaksi", stock: 50 },
    { name: "Pipet", stock: 20 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Daftar Alat Lab
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Nama Alat</th>
              <th className="p-2">Stok</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
          Tambah Alat
        </button>
      </div>
    </div>
  );
}

export default LabInventory;
