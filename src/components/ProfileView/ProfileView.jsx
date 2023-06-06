import MovieCard from "../MovieCard/MovieCard";
import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Form,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import bcryptjs from "bcryptjs";
export const ProfileView = ({
  user,
  token,
  setUser,
  removeMovieFromFavorites,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [updatedUser, setUpdatedUser] = useState(user);
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);
  useEffect(() => {
    if (!user || !token) {
      return;
    }
    fetch("https://evening-inlet-09970.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const favoriteMovies = data.filter((movie) =>
          user.FavoriteMovies.includes(movie._id)
        );
        setFavoriteMovies(favoriteMovies);
      });
  }, [user, token]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(updatedUser.Password, salt);

    fetch(`https://evening-inlet-09970.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: updatedUser.Username,
        Password: hashedPassword,
        Email: updatedUser.Email,
        Birthday: updatedUser.Birthday,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeregister = (e) => {
    e.preventDefault();
    fetch(`https://evening-inlet-09970.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        deleteUser();
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Your account has been deleted successfully 😿");
    setUser(null);
    localStorage.clear();
  };
  return (
    <Container>
      <h1>Hi {user.Username} </h1>
      <p>Email: {user.Email}</p>
      <p>Birthday: {user.Birthday}</p>
      <Card className="mb-4">
        <Card.Header>
          <h6>Your Favorite Movies:</h6>
        </Card.Header>
        <Card.Body>
          <Row>
            {favoriteMovies.map((movie) => {
              const { _id, Title, Director, imagePath, Description, Genre } =
                movie;
              return (
                <Col key={_id} xs={12} sm={6} md={4} lg={3} style={{display: "flex", flexDirection:"column", justifyContent:"center", }}>
                  <MovieCard
                    movie={{
                      id: _id,
                      title: Title,
                      director: Director.Name,
                      image: imagePath,
                      description: Description,
                      genre: Genre.Name,
                    }}
                    favoriteMovies={favoriteMovies}
                  />
                    <Button
                      className="mt-2"
                      variant="danger"
                      onClick={() => removeMovieFromFavorites(_id)}
                    >
                      Remove from Favorites
                    </Button>
                  <br />
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h6>Update Your Information:</h6>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new username"
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, Username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, Password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={updatedUser.Email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, Email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter birthday"
                value={
                  updatedUser.Birthday
                    ? new Date(updatedUser.Birthday).toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, Birthday: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Button className="mr-2" variant="danger" type="submit">
              Update
            </Button>
            <hr />
            <br />
            <br />
            <div>
              <h3>Delete Account:</h3>
              <code>
                Attention: Deleting your account is a permanent action with no
                way to recover any deleted information. Please consider the
                consequences before proceeding. Make sure to back up any
                important data or information you want to keep. Once you
                initiate the deletion process, all associated content will be
                permanently removed, and you will lose access to all associated
                services and records.
              </code>
              <br />
              <Button variant="danger" onClick={handleDeregister}>
                Delete Account
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
