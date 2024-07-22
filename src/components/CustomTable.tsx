import React from 'react';

interface Column {
  Header: string;
  accessor: string;
  render?: (item: any) => React.ReactNode;
  width?: string;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  title: string;
  description: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  title,
  description,
}) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-gray-700">{description}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.accessor}
                        scope="col"
                        className={`px-4 py-3.5 text-left text-sm font-normal text-gray-700 ${
                          column.width ? `w-${column.width}` : ''
                        }`}
                      >
                        {column.Header}
                      </th>
                    ))}
                    <th scope="col" className="relative px-4 py-3.5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length + 1} className="px-4 py-4 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    data.map((item, idx) => (
                      <tr key={idx}>
                        {columns.map((column) => (
                          <td key={column.accessor} className="whitespace-nowrap px-4 py-4">
                            {column.render ? column.render(item) : item[column.accessor]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomTable;
