import React, { useState, useEffect } from "react";
import { Col, Container, Form, Button } from "react-bootstrap";

export const ProfileView = ({ user, token, setUser, setMovies }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
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
      body: JSON.stringify(user),
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
      alert("Your account has been deleted successfully 😿")
    setUser(null);
    localStorage.clear();
  };

  return (
    <Container>
      <h1>Hi {user.Username} </h1>
      <p>Email: {user.Email}</p>
      <p>Birthday: {user.Birthday}</p>
      <h6>Your Favorite Movies:</h6>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie._id}>{movie.Title}</li>
        ))}
      </ul>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={user.Username}
            onChange={(e) => setUser({ ...user, Username: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.Email}
            onChange={(e) => setUser({ ...user, Email: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter birthday"
            value={user.Birthday}
            onChange={(e) => setUser({ ...user, Birthday: e.target.value })}
            dateFormat="yyyy-MM-dd"
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
