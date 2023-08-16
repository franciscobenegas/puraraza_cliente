import { Button } from "@mui/material";
import React from "react";

const CorreoPage = () => {
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          const resp = await fetch("/api/send", {
            method: "POST",
          });
          const data = await resp.json();
          console.log(data);
        }}
      >
        Enviar Email
      </Button>
    </div>
  );
};

export default CorreoPage;
