import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userObjectState as userDataAtom } from "../../atoms/atoms";
import { useHistory } from "react-router-dom";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function LogOut() {
  const userData = useRecoilValue(userDataAtom);
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: userData.token,
  };

  useEffect(() => {
    const logOut = async (e) => {
      setLoading(true);
      setError(false);
      try {
        const logedOut = await axios.post(
          "http://localhost:5000/api/users/logout",
          {},
          headers
        );
        setLoading(false);
        console.log(logedOut);
        // history.push("http://localhost:3000/admin/dashboard");
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    };
  }, [headers]);

  const classes = useStyles();
  return (
    <div>
      {loading && <h3>Loging Out</h3>}
      {error && <h3>Somthing went wrong...</h3>}
    </div>
  );
}
