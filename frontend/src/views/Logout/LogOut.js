import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userObjectState } from "../../atoms/atoms.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Loader from "components/Loader/Loader.js";

import avatar from "assets/img/faces/marc.jpg";

//icons

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

export default function Login() {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useRecoilState(userObjectState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    try {
      const logedOut = await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        config
      );

      setLoading(false);
      console.log(logedOut);

      setUserData({
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

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Log out</h4>
                <p className={classes.cardCategoryWhite}>
                  Are you sure you want to leave?
                </p>
              </CardHeader>

              <CardFooter>
                <div style={{ display: "flex" }}>
                  <Button color="primary" type="submit">
                    log me out
                  </Button>
                  {loading && (
                    <div
                      style={{
                        marginLeft: "32px",
                      }}
                    >
                      <Loader />
                    </div>
                  )}
                  {error && (
                    <div
                      style={{
                        backgroundColor: "red",
                        marginLeft: "32px",
                        padding: "16px",
                      }}
                    >
                      <p style={{ color: "white" }}>Somthing went wrong...</p>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
