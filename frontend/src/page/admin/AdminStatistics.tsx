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
import {
  toLongFormatDateWithoutTime,
  toShortFormatDate,
} from "../../util/DateUtil";
import { AxiosResponse } from "axios";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

const pages = [
  { label: "Admins", location: nav.admin.admins },
  { label: "Managers", location: nav.admin.managers },
  { label: "Operators", location: nav.admin.operators },
  { label: "Statistics", location: nav.admin.statistics },
];

const Row = ({ data }: { data: AdminStatisticsResponse }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant={"h4"}>
        {toLongFormatDateWithoutTime(data.day)}
      </Typography>
      <Box display={"flex"}>
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{ mt: 0, mb: "auto" }}
        >
          {open ? (
            <KeyboardArrowUpIcon fontSize={"large"} />
          ) : (
            <KeyboardArrowDownIcon fontSize={"large"} />
          )}
        </IconButton>
        <Box sx={{ width: "50%" }}>
          <Typography variant={"h5"} mt={1}>
            Income:{" "}
            {data.excursions
              .map((e) => e.price * e.visitors)
              .reduce((a, b) => a + b, 0)}
            $
          </Typography>
          <Collapse
            in={
              open && data.excursions.filter((e) => e.visitors > 0).length > 0
            }
            unmountOnExit
          >
            <Typography variant={"h6"} mt={1}>
              <b>Excursions:</b>
            </Typography>
            {data.excursions
              .filter((e) => e.visitors > 0)
              .map((e) => (
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ background: "white", paddingRight: "3px" }}>
                    {e.title} ({e.time.slice(0, -3)})
                  </span>
                  <span
                    style={{
                      background: "white",
                      paddingLeft: "3px",
                      paddingRight: "50px",
                    }}
                  >
                    {e.visitors} x {e.price}$
                  </span>
                  <span style={{ position: "absolute", zIndex: -1 }}>
                    {".".repeat(120)}
                  </span>
                </Box>
              ))}
          </Collapse>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant={"h5"} mt={1}>
            Outcome:{" "}
            {data.animals
              .map(
                (a) =>
                  a.keeping +
                  Object.values(a.illnessKeeping).reduce((a, b) => a + b, 0)
              )
              .reduce((a, b) => a + b, 0)}
            $
          </Typography>
          <Collapse in={open} unmountOnExit>
            <Typography variant={"h6"} mt={1}>
              <b>Animals keeping:</b>
            </Typography>
            {data.animals.map((a) => (
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ background: "white", paddingRight: "3px" }}>
                  {a.nickname}
                </span>
                <span
                  style={{
                    background: "white",
                    paddingLeft: "3px",
                    paddingRight: "50px",
                  }}
                >
                  {a.keeping}$
                </span>
                <span style={{ position: "absolute", zIndex: -1 }}>
                  {".".repeat(100)}
                </span>
              </Box>
            ))}
            {data.animals.flatMap((a) => Object.keys(a.illnessKeeping)).length >
              0 && (
              <>
                <Typography variant={"h6"} mt={1}>
                  <b>Animals keeping:</b>
                </Typography>
                {data.animals
                  .filter((a) => Object.entries(a.illnessKeeping).length > 0)
                  .map((a) => (
                    <Box>
                      <b>{a.nickname}</b>
                      {Object.entries(a.illnessKeeping).map(
                        ([iName, iPrice]) => (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                background: "white",
                                paddingRight: "3px",
                              }}
                            >
                              {iName}
                            </span>
                            <span
                              style={{
                                background: "white",
                                paddingLeft: "3px",
                                paddingRight: "50px",
                              }}
                            >
                              {iPrice}$
                            </span>
                            <span style={{ position: "absolute", zIndex: -1 }}>
                              {".".repeat(100)}
                            </span>
                          </Box>
                        )
                      )}
                    </Box>
                  ))}
              </>
            )}
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

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
        <Box>
          <Box display={"flex"} mt={2} mb={5}>
            <Typography variant={"h5"} width={"50%"}>
              <b>
                Total Income:{" "}
                {statistics
                  .map((data) =>
                    data.excursions
                      .map((e) => e.price * e.visitors)
                      .reduce((a, b) => a + b, 0)
                  )
                  .reduce((a, b) => a + b, 0)}
                $
              </b>
            </Typography>
            <Typography variant={"h5"}>
              <b>
                Total Outcome:{" "}
                {statistics
                  .map((data) =>
                    data.animals
                      .map(
                        (a) =>
                          a.keeping +
                          Object.values(a.illnessKeeping).reduce(
                            (a, b) => a + b,
                            0
                          )
                      )
                      .reduce((a, b) => a + b, 0)
                  )
                  .reduce((a, b) => a + b, 0)}
                $
              </b>
            </Typography>
          </Box>
          {statistics.map((s) => (
            <Row data={s} key={s.day} />
          ))}
        </Box>
      </Container>
    </>
  );
};
