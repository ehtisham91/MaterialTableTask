import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import { getUsersReq, updateUserReq } from "../../mockApi";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import UsersTable from "../../components/home/UsersTable";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const getUsers = async () => {
    try {
      const req = await getUsersReq();
      setUsers(req.data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      const req = await updateUserReq(selectedUser);
      setUsers(req.data);
      enqueueSnackbar("Changes have been saved.", {
        variant: "success",
      });
      setSelectedUser({});
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error while updating the user data", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h6" component="h6">
          Manage Users
        </Typography>
      </Box>
      <Box mb={4}>
        <UsersTable
          classes={classes}
          users={users}
          updateUser={updateUser}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          loading={loading}
          key="users-table-component"
        />
      </Box>
    </Container>
  );
}

export default Home;
