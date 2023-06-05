import MovieCard from "../MovieCard/MovieCard";
import React, { useState, useEffect } from "react";
import { Col, Container, Form, Button, Row } from "react-bootstrap";

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

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://evening-inlet-09970.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: updatedUser.Username,
        Password: updatedUser.Password,
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
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
      <h6>Your Favorite Movies:</h6>
      <Row>
        {favoriteMovies.map((movie) => {
          const { _id, Title, Director, imagePath, Description, Genre } = movie;
          return (
            <Col key={_id} xs={12} sm={6} md={4} lg={3}>
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
                variant="danger"
                onClick={() => removeMovieFromFavorites(_id)}
              >
                Remove from Favorites
              </Button>
            </Col>
          );
        })}
      </Row>

      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, Username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setUser({ ...updatedUser, Password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={updatedUser.Email}
            onChange={(e) => setUser({ ...updatedUser, Email: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter birthday"
            value={updatedUser.Birthday}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, Birthday: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Information
        </Button>
      </Form>
      <br />
      <Button variant="danger" onClick={handleDeregister}>
        Delete Account
      </Button>
    </Container>
  );
};
