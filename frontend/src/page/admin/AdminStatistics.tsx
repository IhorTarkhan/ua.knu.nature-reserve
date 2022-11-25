import * as React from "react";
import { useEffect, useState } from "react";
import { nav } from "../../constant/nav";
import { Header } from "../../component/Header";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdminStatisticsResponse } from "../../dto/response/admin/AdminStatisticsResponse";
import { axios } from "../../util/AxiosInterceptor";
import { api } from "../../constant/api";
import { toShortFormatDate } from "../../util/DateUtil";
import { AxiosResponse } from "axios";

const pages = [
  { label: "Admins", location: nav.admin.admins },
  { label: "Managers", location: nav.admin.managers },
  { label: "Operators", location: nav.admin.operators },
  { label: "Statistics", location: nav.admin.statistics },
];
export const AdminStatistics = () => {
  const [start, setStart] = useState<Dayjs>(dayjs(new Date()));
  const [end, setEnd] = useState<Dayjs>(dayjs(new Date()));
  const [statistics, setStatistics] = useState<AdminStatisticsResponse[]>([]);

  useEffect(() => {
    console.log(statistics);
  }, [statistics]);

  const fetchData = () => {
    axios
      .get(
        api.admin.statistics +
          `${toShortFormatDate(start)}/${toShortFormatDate(end)}`
      )
      .then((r: AxiosResponse<AdminStatisticsResponse[]>) =>
        setStatistics(r.data)
      )
      .catch(alert);
  };

  return (
    <>
      <Header pages={pages} home={nav.admin.admins} logout={nav.staff} />
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box style={{ display: "flex", marginTop: 25 }}>
            <DatePicker
              renderInput={(props) => (
                <TextField {...props} style={{ flexGrow: 1, margin: 10 }} />
              )}
              label={"Start date"}
              value={start}
              onChange={(newValue) => setStart(newValue!)}
            />
            <DatePicker
              renderInput={(props) => (
                <TextField {...props} style={{ flexGrow: 1, margin: 10 }} />
              )}
              label={"End date"}
              value={end}
              onChange={(newValue) => setEnd(newValue!)}
            />
            <Button
              variant={"contained"}
              sx={{ my: "auto" }}
              onClick={fetchData}
            >
              Fetch Statistic
            </Button>
          </Box>
        </LocalizationProvider>
      </Container>
    </>
  );
};
