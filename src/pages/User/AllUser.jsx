import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, IconButton,
  Typography
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const columns = [
  { id: 'sno', label: 'S.No', minWidth: 50 },
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 50 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

const createData = (sno, firstName, lastName, gender, email, image) => {
  return { sno, firstName, lastName, gender, email, image };
};

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Dummy data
    const dummyData = [
      createData(1, 'John', 'Doe', 'Male', 'john.doe@example.com', 'https://via.placeholder.com/50'),
      createData(2, 'Jane', 'Smith', 'Female', 'jane.smith@example.com', 'https://via.placeholder.com/50'),
      createData(3, 'Alice', 'Johnson', 'Female', 'alice.johnson@example.com', 'https://via.placeholder.com/50'),
      createData(4, 'Bob', 'Brown', 'Male', 'bob.brown@example.com', 'https://via.placeholder.com/50'),
      createData(5, 'Charlie', 'Davis', 'Male', 'charlie.davis@example.com', 'https://via.placeholder.com/50'),
      createData(6, 'Dana', 'Evans', 'Female', 'dana.evans@example.com', 'https://via.placeholder.com/50'),
      createData(7, 'Evan', 'Frank', 'Male', 'evan.frank@example.com', 'https://via.placeholder.com/50'),
      createData(8, 'Fiona', 'Garcia', 'Female', 'fiona.garcia@example.com', 'https://via.placeholder.com/50'),
      createData(9, 'George', 'Harris', 'Male', 'george.harris@example.com', 'https://via.placeholder.com/50'),
      createData(10, 'Hannah', 'Ivy', 'Female', 'hannah.ivy@example.com', 'https://via.placeholder.com/50'),
    ];

    setUsers(dummyData);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (id) => {
    console.log(`Viewing user ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing user ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting user ${id}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height:'auto'}}>
      <Typography variant='h5' sx={{p:2, fontWeight:'bold'}}>All Users</Typography>
      <TableContainer>
        <Table >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={{fontSize:'20px',fontWeight:'bold'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.sno}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.id === 'actions' ? (
                          <div>
                            <IconButton onClick={() => handleView(row.sno)}>
                              <Visibility />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row.sno)}>
                              <Edit sx={{color:'blue'}}/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.sno)}>
                              <Delete sx={{color:'red'}}/>
                            </IconButton>
                          </div>
                        ) : column.id === 'image' ? (
                          <img src={value} alt="user" width="50" />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AllUser;
