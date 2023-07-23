import React from 'react';
import { useTable } from 'react-table';

const TableComponent = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
<div className="flex flex-col bg-white">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200" >
            <thead className="bg-gray-50" >
            {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()} >
               {headerGroup.headers.map((column) => (
                 <th {...column.getHeaderProps()} style={{ padding: '8px', border: '1px solid black' }} >
                   {column.render('Header')}
                 </th>
               ))}
             </tr>
            ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200" >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className='border border-orange-500 hover:bg-white hover:text-black' >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} style={{ padding: '8px', border: '1px solid black' }} className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

                </table>
            </div>
        </div>
    </div>
    </div>

  );
};

export default TableComponent;
