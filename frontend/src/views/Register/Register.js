import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

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

export default function Register() {
  let history = useHistory();

  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostal] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const passwordMatch = () => {
    return password === passwordVerify;
  };

  const thumbDisplayer = () => {
    if (passwordVerify.length > 0) {
      return passwordMatch() ? (
        <ThumbUpIcon style={{ fontSize: 45 }} />
      ) : (
        <ThumbDownAltIcon style={{ fontSize: 45 }} />
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const token = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          userName,
          firstName,
          lastName,
          city,
          country,
          postalCode,
          email,
          password,
          about,
        }
      );
      setLoading(false);
      console.log(token);
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
                <h4 className={classes.cardTitleWhite}>Register</h4>
                <p className={classes.cardCategoryWhite}>
                  Lets create your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Company (disabled)"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      required
                      labelText="Username"
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      required
                      labelText="Email address"
                      id="email-address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      required
                      labelText="First Name"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      required
                      labelText="Last Name"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                      labelText="City"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      required
                      labelText="Country"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      required
                      labelText="Postal Code"
                      id="postal-code"
                      value={postalCode}
                      onChange={(e) => setPostal(e.target.value)}
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
                      minlength="7"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      required
                      labelText="Verify Password"
                      id="verifyPassword"
                      type="password"
                      minlength="7"
                      value={passwordVerify}
                      onChange={(e) => setPasswordVerify(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      id="thumbWraper"
                      style={{
                        height: "100&",
                        marginBottom: "5px",
                      }}
                    >
                      {thumbDisplayer()}
                    </div>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      id="about-me"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  register
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
