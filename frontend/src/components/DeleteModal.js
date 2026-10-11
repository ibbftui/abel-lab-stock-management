import { FiTrash2 } from "react-icons/fi";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[420px] p-8">

        <div className="flex flex-col items-center">

          <div className="bg-red-100 p-4 rounded-full mb-4">

            <FiTrash2 className="text-red-600 text-4xl" />

          </div>

          <h2 className="text-2xl font-bold text-[#0D315F]">
            Hapus Data Alat
          </h2>

          <p className="text-gray-500 text-center mt-3">
            Apakah yakin ingin menghapus data alat ini?
          </p>

        </div>

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Hapus
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteModal;