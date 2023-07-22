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

    <table {...getTableProps()} class="table-auto" >
      <thead className='border border-orange-500' >
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className='border border-orange-500' >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ padding: '8px', border: '1px solid black' }} className='text-orange-500'>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className='border border-orange-500' >
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className='border border-orange-500 hover:bg-white hover:text-black' >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} style={{ padding: '8px', border: '1px solid black' }} className='text-orange-500' >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>

  );
};

export default TableComponent;
