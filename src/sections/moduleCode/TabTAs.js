'use client';

import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Button, Chip, Paper, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Stack } from '@mui/material';

// third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  flexRender,
  useReactTable,
  sortingFns
} from '@tanstack/react-table';
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';

// project import
import { Box } from '@mui/system';
import useGenerateProjects from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { DebouncedInput } from 'components/third-party/react-table';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { useParams } from 'next/navigation';
import { fetchTAInfoByTAId } from 'db/queries/TAId-name';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { EyeOutlined, MoreOutlined, ProfileOutlined } from '@ant-design/icons';

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // store the ranking info
  addMeta(itemRank);

  // return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId], rowB.columnFiltersMeta[columnId]);
  }

  // provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};


// Mock data fetching hook - replace with actual data fetching logic
const useGenerateTAs = () => {
  const [TAs, setTAs] = useState([]);
  // You would fetch the TA data here and set it using setTAs
  return TAs;
};

const TATable = () => {
  const { academicYear, moduleNo } = useParams();
  const TAs = useGenerateTAs(moduleNo, academicYear);

  const columns = useMemo(() => [
    {
      header: 'Index',
      accessorKey: '_id',
      cell: info => info.row.index + 1,
      meta: { className: 'cell-center' },
    },
    {
      header: 'Name',
      accessorFn: row => `${row.firstName} ${row.lastName}`,
      meta: { className: 'cell-center' },
    },
    {
      header: 'Expertise',
      accessorKey: 'expertise',
      meta: { className: 'cell-center' },
    },
    {
      header: 'Supervised Teams',
      accessorKey: 'supervisedTeams',
      meta: { className: 'cell-center' },
    },
    {
      header: 'Emails',
      accessorKey: 'email',
      meta: { className: 'cell-center' },
    },
  ], []);

  const [globalFilter, setGlobalFilter] = useState('');

  const tableInstance = useReactTable({
    data: TAs,
    columns,
    state: {
      globalFilter,
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <MainCard content={false}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search records...`}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="primary" sx={{ ml: 1 }}>
          + Add TA
        </Button>
      </Stack>

      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {tableInstance.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {tableInstance.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
};

TATable.propTypes = {
  // You may define propTypes for moduleNo and academicYear if they are used
};

export default TATable;

