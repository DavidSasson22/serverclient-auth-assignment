import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { userObjectState as userDataAtom } from "../../atoms/atoms";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import Loader from "components/Loader/Loader.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

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

export default function UserProfile() {
  let history = useHistory();

  const userData = useRecoilValue(userDataAtom);
  const [email, setEmail] = useState(userData.email);
  const [userName, setUserName] = useState(userData.userName);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [city, setCity] = useState(userData.city);
  const [country, setCountry] = useState(userData.country);
  const [postalCode, setPostal] = useState(userData.postalCode);
  const [about, setAbout] = useState(userData.about);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [, setUserData] = useRecoilState(userDataAtom);

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
      const data = await axios.patch(
        "http://localhost:5000/api/users/me",
        {
          userName,
          firstName,
          lastName,
          city,
          country,
          postalCode,
          email,
          about,
        },
        config
      );
      setLoading(false);
      console.log("data:");
      console.log(data.data);
      setUserData({
        userName: data.data.userName,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        city: data.data.city,
        country: data.data.country,
        postalCode: data.data.postalCode,
        email: data.data.email,
        about: data.data.about,
        token: userData.token,
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
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
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
                      labelText="Email address"
                      id="email-address"
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
                      labelText="Postal Code"
                      id="postal-code"
                      defaultValue={userData.postalCode}
                      value={postalCode}
                      onChange={(e) => setPostal(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      id="about-me"
                      defaultValue={userData.about}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <div style={{ display: "flex" }}>
                  <Button color="primary" type="submit">
                    Update Profile
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
                      <p style={{ color: "white" }}>Somthing went wrong... </p>
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
