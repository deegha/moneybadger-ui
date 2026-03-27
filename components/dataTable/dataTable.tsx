import React from "react";
import { LucideIcon } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title?: string;
  actionText?: string;
  onActionClick?: () => void;
  columns: Column<T>[];
  data: T[];
}

export function DataTable<T extends { id: string | number }>({
  title,
  actionText,
  onActionClick,
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-neutral-100 w-full overflow-hidden">
      {/* Header Section */}
      {(title || actionText) && (
        <div className="flex justify-between items-center mb-6">
          {title && (
            <h2 className="text-xl font-bold text-neutral-800 tracking-tight">
              {title}
            </h2>
          )}
          {actionText && (
            <button
              onClick={onActionClick}
              className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest hover:text-neutral-600 transition-colors"
            >
              {actionText}
            </button>
          )}
        </div>
      )}

      {/* Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-50">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`pb-4 text-[10px] font-bold text-neutral-300 uppercase tracking-[0.2em] ${col.className || ""
                    }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {data.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-neutral-50/50 transition-colors"
              >
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={`py-5 text-sm font-medium text-neutral-700 ${col.className || ""
                      }`}
                  >
                    {col.render
                      ? col.render(item)
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
