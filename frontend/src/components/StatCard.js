import React from "react";

function StatCard({
  icon,
  title,
  value,
  status,
  statusColor,
  iconBg,
  borderColor,
}) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md border-l-4 ${borderColor} p-7 hover:shadow-xl transition duration-300`}
    >
      {/* Status */}
      <span className={`absolute top-6 right-6 font-semibold ${statusColor}`}>
        {status}
      </span>

      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${iconBg}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-gray-600 uppercase tracking-wide text-lg">
        {title}
      </h3>

      {/* Value */}
      <h1 className="text-5xl font-bold text-[#0D315F] mt-2">
        {value}
      </h1>
    </div>
  );
}

export default StatCard;