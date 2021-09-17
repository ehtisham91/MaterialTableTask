import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import SvgIcon from "@material-ui/core/SvgIcon";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import SkeletonRows from "../../SkeletonRows";

function UsersTable({
  classes,
  users,
  loading,
  updateUser,
  selectedUser,
  setSelectedUser,
}) {
  const headings = ["Actions", "ID", "First Name", "Last Name", "Birthday"];

  const customField = (key) => {
    const value = selectedUser[key];
    return (
      <TextField
        required
        // key={key}
        id={key}
        value={value}
        onChange={(event) =>
          setSelectedUser({
            ...selectedUser,
            [key]: event.target.value,
          })
        }
        error={!value}
        helperText={!value ? "This field can't be empty" : ""}
      />
    );
  };

  return (
    <TableContainer component={Paper} key="users-table-container">
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.header}>
            {headings.map((heading, i) => (
              <TableCell
                key={`heading-cell-${i}`}
                className={classes.headerTitle}
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <SkeletonRows key="skeleton-rows" rowsLength={8} cellSize={5} />
          ) : (
            users.map((user, index) => {
              const isSelected = selectedUser?.id === user.id;
              return (
                <TableRow
                  key={`row-${index}`}
                  className={
                    selectedUser?.id && selectedUser.id !== user.id
                      ? classes.disabled
                      : ""
                  }
                >
                  <TableCell size="small" component="th" scope="row">
                    {isSelected ? (
                      <Box>
                        <IconButton
                          // key={`check-btn-${index}`}
                          onClick={updateUser}
                        >
                          <SvgIcon fontSize="small">
                            <CheckIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          // key={`cross-btn-${index}`}
                          onClick={() => setSelectedUser({})}
                        >
                          <SvgIcon fontSize="small">
                            <ClearIcon />
                          </SvgIcon>
                        </IconButton>
                      </Box>
                    ) : (
                      <Box>
                        <IconButton
                          // key={`edit-btn-${index}`}
                          onClick={() => setSelectedUser(user)}
                        >
                          <SvgIcon fontSize="small">
                            <EditIcon />
                          </SvgIcon>
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {index}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {isSelected ? customField("firstName") : user.firstName}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {isSelected ? customField("lastName") : user.lastName}
                  </TableCell>
                  <TableCell size="small" align="left">
                    {user.birthday}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;