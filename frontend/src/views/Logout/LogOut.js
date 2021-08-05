import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { userObjectState as userDataAtom } from "../../atoms/atoms";
import { useHistory } from "react-router-dom";
import axios from "axios";
// @material-ui/core components

export default function LogOut() {
  const userData = useRecoilValue(userDataAtom);
  const [, setUserData] = useRecoilState(userDataAtom);

  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };

  useEffect(() => {
    const logMeOut = async (e) => {
      setLoading(true);
      setError(false);
      try {
        const logedOut = await axios.post(
          "http://localhost:5000/api/users/logout",
          {},
          config
        );
        setLoading(false);
        console.log(logedOut);
        await setUserData({
          userName: "",
          firstName: "",
          lastName: "",
          city: "",
          country: "",
          postalCode: "",
          email: "",
          about: "",
          token: "",
        });
        history.push("http://localhost:3000/admin/dashboard");
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    };
    logMeOut();
  }, []);

  return (
    <div>
      {loading && <h3>Loging Out</h3>}
      {error && <h3>Somthing went wrong...</h3>}
    </div>
  );
}
