import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

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
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Log in</h4>
                <p className={classes.cardCategoryWhite}>Come on in</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      required
                      labelText="Email address"
                      id="email-address"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      required
                      labelText="Password"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  log in
                </Button>
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
