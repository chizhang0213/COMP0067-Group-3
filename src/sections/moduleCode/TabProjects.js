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

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, projects }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [TANames, setTANames] = useState({});

  const table = useReactTable({
    projects,
    columns,
    state: {
      columnFilters,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter
  });

  useEffect(() => {
    const fetchData = async () => {
      const tempTANames = {};
      for (const project of projects) {
        if (!tempTANames[project.TAId]) {
          const TAInfo = await fetchTAInfoByTAId(project.TAId);
          tempTANames[project.TAId] = `${TAInfo.firstName} ${TAInfo.lastName}`;
        }
      }
      setTANames(tempTANames);
    };
    fetchData();
  }, [projects]);

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
          + Add Project
        </Button>
        <Button variant="contained" color="warning" sx={{ ml: 1 }}>
          Export Grade
        </Button>
      </Stack>

      <ScrollX>
        <TableContainer component={Paper}>
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
              {projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell align="center" width={150}>{project.teamNo}
                  </TableCell>
                  <TableCell>{project.projectTitle}</TableCell>
                  <TableCell align="center">{project.teamMember.length}</TableCell>
                  <TableCell align="center">{TANames[project.TAId]}</TableCell>
                  <TableCell align="center">Not Marked</TableCell>
                  <TableCell width={120} align="center">
                    <Stack direction="row" alignItems="center" justify-items="center" spacing={0}>
                      <Link href={`/home`} passHref legacyBehavior>
                        <IconButton>
                          <EyeOutlined />
                        </IconButton>
                      </Link>
                      <Link href={`/home`} passHref legacyBehavior>
                        <IconButton>
                          <ProfileOutlined />
                        </IconButton>
                      </Link>
                      <Link href={`/home`} passHref legacyBehavior>
                        <IconButton>
                          <MoreOutlined />
                        </IconButton>
                      </Link>
                    </Stack>
                  </TableCell>
                  {/* {columns.map((column) => (
                    <TableCell key={column.accessorKey} {...column.meta}>
                      {column.accessorKey === 'teamMember'
                        ? project[column.accessorKey].length
                        : column.accessorKey === 'TAId'
                        ? TANames[project.TAId]
                        : project[column.accessorKey]}
                    </TableCell>
                  ))} */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  projects: PropTypes.array
};

// ==============================|| REACT TABLE - FILTERING ||============================== //

const FilteringTable = () => {
  const { academicYear, moduleNo } = useParams();
  const academicYearInt = parseInt(academicYear);
  const projects = useGenerateProjects({ moduleNo, academicYearInt });

  const columns = useMemo(
    () => [
      {
        header: 'Team Number',
        accessorKey: 'teamNo',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Project Title',
        accessorKey: 'projectTitle',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Team Size',
        accessorKey: 'teamMember',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'TA Name',
        accessorKey: 'TAId',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Status',
        getValue: () => 'Not Marked', // 固定为 "Not Marked"
        cell: (props) => <Chip color="error" label={props.getValue()} size="small" variant="light" />,
        // cell: (props) => {
        //   switch (props.getValue()) {
        //     case 'Processing':
        //       return <Chip color="warning" label="Processing" size="small" variant="light" />;
        //     case 'Marked':
        //       return <Chip color="success" label="Marked" size="small" variant="light" />;
        //     case 'Not Marked':
        //     default:
        //       return <Chip color="error" label="Not Marked" size="small" variant="light" />;
        //   }
        // },
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Actions',
        accessorKey: 'progress',
        cell: (props) => <LinearWithLabel value={props.getValue()} sx={{ minWidth: 75 }} />,
        meta: {
          className: 'cell-center'
        },
        getCanFilter: () => false
      }
    ],
    []
  );

  return <ReactTable projects={projects} columns={columns} />;
};

FilteringTable.propTypes = {
  getValue: PropTypes.func
};

export default FilteringTable;
