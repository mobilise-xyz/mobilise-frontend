// import React from 'react';
// import { Form, Button } from 'react-bootstrap';

// export default class LoginForm extends React.Component {
//   constructor(props) {
//     super(props);

//     // reset login status
//     // this.props.dispatch(userActions.logout());

//     this.state = {
//       email: '',
//       password: ''
//     };
//   }

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { email, password } = this.state;
//     const { dispatch } = this.props;
//     if (email && password) {
//       dispatch(userActions.login(email, password));
//     }
//   };

//   render() {
//     const { email, password } = this.state;

//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Form.Group>
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             required
//             id="email"
//             value={email}
//             type="email"
//             placeholder="e.g. willburr98@example.com"
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             required
//             id="password"
//             value={password}
//             type="password"
//             onChange={this.handleChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { loggingIn } = state.authentication;
//   return {
//     loggingIn
//   };
// }

// const connectedLoginPage = connect(mapStateToProps)(LoginPage);
// export { connectedLoginPage as LoginPage };
