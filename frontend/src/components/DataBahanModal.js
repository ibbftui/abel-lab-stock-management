import { useState, useEffect } from "react";

function DataBahanModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {

  const initialForm = {
      nama_bahan: "",
      merk: "",
      tanggal_kadaluarsa: "",
      spesifikasi: "",
      keterangan: "",
      jumlah: "",
      satuan: "Pcs",
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

          {initialData ? "Edit Data Bahan" : "Tambah Data Bahan"}

        </h2>

        <div className="grid grid-cols-2 gap-5">

          <Input
            label="Nama bahan"
            name="nama_bahan"
            value={form.nama_bahan}
            onChange={handleChange}
          />

          <Input
          label="Merk"
          name="merk"
          value={form.merk}
          onChange={handleChange}
          />

          <Input
            label="Jumlah"
            name="jumlah"
            type="number"
            value={form.jumlah}
            onChange={handleChange}
          />

          <Select
          label="Satuan"
          name="satuan"
          value={form.satuan}
          onChange={handleChange}
          options={[
            "mL",
            "L",
            "µL",
            "mg",
            "g",
            "kg",
            "Pcs",
            "Botol",
            "Vial",
            "Tube",
            "Ampul",
            "Pack",
            "Box",
          ]}
        />

          <Input
                label="Tanggal Kadaluarsa"
                name="tanggal_kadaluarsa"
                type="date"
                value={form.tanggal_kadaluarsa}
                onChange={handleChange}
            />

          <Input
            label="Keterangan"
            name="keterangan"
            value={form.keterangan}
            onChange={handleChange}
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

export default DataBahanModal;