class LoginView extends Component {
  state = {};
  render() {
    return (
      <>
        <form>
          <label>
            Username:
            <input type="text" />
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default LoginView;
