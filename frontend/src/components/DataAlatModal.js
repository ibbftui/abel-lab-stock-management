import { useState, useEffect } from "react";

function DataAlatModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {

  const initialForm = {
    nama_alat: "",
    jumlah: "",
    satuan: "Unit",
    lokasi: "",
    kondisi: "Baik",
    status: "Tersedia",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {

    if (isOpen) {

      if (initialData) {

        setForm(initialData);

      } else {

        setForm(initialForm);

      }

    }

  }, [isOpen, initialData]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = () => {

    onSubmit(form);

  };

  const handleClose = () => {

    setForm(initialForm);

    onClose();

  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[700px] p-8">

        <h2 className="text-2xl font-bold text-[#0D315F] mb-6">

          {initialData ? "Edit Data Alat" : "Tambah Data Alat"}

        </h2>

        <div className="grid grid-cols-2 gap-5">

          <Input
            label="Nama Alat"
            name="nama_alat"
            value={form.nama_alat}
            onChange={handleChange}
          />

          <Input
            label="Jumlah"
            name="jumlah"
            type="number"
            value={form.jumlah}
            onChange={handleChange}
          />

          <Input
            label="Satuan"
            name="satuan"
            value={form.satuan}
            onChange={handleChange}
          />

          <Input
            label="Lokasi"
            name="lokasi"
            value={form.lokasi}
            onChange={handleChange}
          />

          <Select
            label="Kondisi"
            name="kondisi"
            value={form.kondisi}
            onChange={handleChange}
            options={[
              "Baik",
              "Rusak Ringan",
              "Rusak Berat",
            ]}
          />

          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              "Tersedia",
              "Dipinjam",
              "Maintenance",
            ]}
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={handleClose}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#0D315F] text-white px-6 py-2 rounded-lg hover:bg-[#124A86]"
          >
            Simpan
          </button>

        </div>

      </div>

    </div>

  );

}

function Input(props) {

  return (

    <div>

      <label className="text-sm text-gray-500 mb-1 block">

        {props.label}

      </label>

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0D315F]"
      />

    </div>

  );

}

function Select({ label, options, ...props }) {

  return (

    <div>

      <label className="text-sm text-gray-500 mb-1 block">

        {label}

      </label>

      <select
        {...props}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0D315F]"
      >

        {options.map((o) => (

          <option
            key={o}
            value={o}
          >
            {o}
          </option>

        ))}

      </select>

    </div>

  );

}

export default DataAlatModal;