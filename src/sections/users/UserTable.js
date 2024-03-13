'use client';

import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Chip, Grid, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Stack, Box, Divider, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from '@mui/material/IconButton';

// third-party
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

// project-import
import ScrollX from 'components/ScrollX';
// import MainCard from 'components/MainCard';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, TablePagination } from 'components/third-party/react-table';
import Dot from 'components/@extended/Dot';

import { userData } from 'sections/users/UserList'

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ data, columns, top }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <ScrollX>
    <Stack>
        {top && (
        <Box sx={{ p: 2 }}>
            <TablePagination
            {...{
                setPageSize: table.setPageSize,
                setPageIndex: table.setPageIndex,
                getState: table.getState,
                getPageCount: table.getPageCount
            }}
            />
        </Box>
        )}

        <TableContainer>
        <Table>
            <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableHead>
            <TableBody>
            {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        {!top && (
        <>
            <Divider />
            <Box sx={{ p: 2 }}>
            <TablePagination
                {...{
                setPageSize: table.setPageSize,
                setPageIndex: table.setPageIndex,
                getState: table.getState,
                getPageCount: table.getPageCount
                }}
            />
            </Box>
        </>
        )}
    </Stack>
    </ScrollX>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  top: PropTypes.bool
};

// ==============================|| UserTable ||============================== //

const UserTable = () => {
    
  const data = userData;

  const columns = useMemo(
    () => [
      {
        header: 'Index',
        accessorKey: 'userID'
      },
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Position',
        accessorKey: 'type',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Status',
        accessorKey: 'isActive',
        cell: (cell) => {
            let color;
            let title;

            switch (cell.getValue()) {
                case "Active":
                  color = 'success';
                  title = 'Active';
                  break;
                case "Inactive":
                  color = 'error';
                  title = 'Inactive';
                  break;
              };
              return (
                <>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Dot color={color} />
                    <Typography>{title}</Typography>
                </Stack>
                </>
              )
        }
      },
      {
        header: 'Actions',
        accessorKey: '',
        cell: (cell) => {
            return <>
            <Stack direction='row' alignItems='center' spacing={0}>
                <IconButton>
                    <BorderColorIcon sx={{ fontSize: '18px' }} color="secondary"/>
                </IconButton>
            </Stack>      
            </>
        }
      },
    ],
    []
  );

  return (
    <ReactTable {...{ data, columns }} />
  );
};

export default UserTable;
