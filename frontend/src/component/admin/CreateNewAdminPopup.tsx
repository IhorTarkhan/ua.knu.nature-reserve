import * as React from "react";
import { ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { CreateAdminRequest } from "../../dto/request/admin/CreateAdminRequest";

interface Props {
  isPopup: boolean;
  close: (x?: CreateAdminRequest) => void;
}

export const CreateNewAdminPopup = (props: Props): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRejectPopup = () => {
    props.close();
  };

  const handleAcceptPopup = () => {
    props.close({ username, password });
  };

  return (
    <Dialog open={props.isPopup} onClose={handleRejectPopup}>
      <DialogTitle>Create</DialogTitle>
      <DialogContent>
        <TextField
          label={"Username"}
          style={{ width: "100%", marginTop: 10 }}
          value={username}
          onChange={(x) => setUsername(x.target.value)}
        />
        <TextField
          label={"New password"}
          type={"password"}
          style={{ width: "100%", marginTop: 10 }}
          value={password}
          onChange={(x) => setPassword(x.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRejectPopup}>Reject</Button>
        <Button onClick={handleAcceptPopup} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
