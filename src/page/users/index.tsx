import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "../../components/alert";
import { InitialAlertProps } from "../../components/alert/interfaces";
import { Loader } from "../../components/loader";
import { Toolbar } from "../../components/toolbar";
import { useAuth } from "../../contexts/hooks/useAuth";
import {
  findManyUsers
} from "../../services/users";
import { COLORS } from "../../themes/colors";
import type { IFormUpdateUsers } from "./interfaces";
import {
  initialStateData,
  initialUsersUpdate
} from "./interfaces";
import { CreateModal } from "./modal/createModal";
import { DeleteModal } from "./modal/deleteModal";
import { UpdateModal } from "./modal/updateModal";
import { columns } from "./table/columns";

export function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(initialStateData);
  const [open, setOpen] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(false);
  const [alert, setAlert] = useState(InitialAlertProps);
  const [user, setUser] = useState<IFormUpdateUsers>(initialUsersUpdate);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  // const [searchValue, setSearchValue] = useState("");
  // const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
    const { hasRole, roles } = useAuth();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpen = () => setOpen(!open);

  const handleUpdate = (item: IFormUpdateUsers) => {
    setUser(item);
    setOpenUpdate(!openUpdate);
    // setSelectedRow(item.id);
  };


    const handleOpenDelete = (item: IFormUpdateUsers) => {
    setUser(item);
    setOpenDelete(!openDelete);
    // setSelectedRow(item.id);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = useCallback(
    async () => {
      setLoading(true);
      try {
        const response = await findManyUsers(page + 1, rowsPerPage);
        const { result, pagination } = response.data;

        setData({
          users: result,
          total: pagination.total,
          currentPage: pagination.currentPage,
          totlaPages: pagination.totalPages,
        });

        setDataRefresh(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [page]
  );


  useEffect(() => {
    fetchData();
    // if (searchValue === "") {
    //   fetchData();
    // }
    // setSelectedRow(null);
  }, [page, dataRefresh, roles]);

  return (
    <>
      <Alert
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
        type={alert.type}
      />

      {open && (
        <CreateModal
          open={open}
          setOpen={setOpen}
          setPage={setPage}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
          setAlert={setAlert}
        />
      )}

      {openUpdate && (
        <UpdateModal
          user={user}
          open={openUpdate}
          setOpen={setOpenUpdate}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )}

      {openDelete && (
        <DeleteModal
          user={user}
          open={openDelete}
          setOpen={setOpenDelete}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )}

      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <Toolbar
            titleModule="Usuários"
            handleSave={handleOpen}
          />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        background: COLORS.PRIMARY_100,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.map((user) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.id}
                       sx={{
                        opacity: user.isActive ? 1 : 0.4,
                        backgroundColor: !user.isActive ? COLORS.NEUTRAL_50 : "inherit",
                      }}
                    >
                      {columns.map((column) => {
                         const value = user[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            size="small"
                          >
                            {column.renderCell
                              ? column.renderCell({ row: user })
                              : value}
                            {column.id === "actions" && (
                              <Grid
                                container
                                spacing={1}
                                justifyContent="center"
                              >
                                <Grid>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleUpdate(user)}
                                     disabled={!hasRole("ADMIN") && !user.isActive}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Grid>
                                <Grid>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleOpenDelete(user)}
                                     disabled={!hasRole("ADMIN")}
                                  >
                                    <DeleteOutlineIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
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
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={data.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
}
