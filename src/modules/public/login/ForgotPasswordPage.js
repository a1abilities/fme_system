import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';

// API
import { APP_TOKEN } from '../../../api/Constants';

// API CALL
import AuthenticationAPI from '../../../api/AuthenticationAPI';
// Components
import ForgotPasswordForm from './components/ForgotPasswordForm';
import WelcomeMessage from './components/WelcomeMessage';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d0e1e8;
`;

class ForgotPasswordPage extends Component {
  isTokenSource = axios.CancelToken.source();

  state = {
    form: {
      username: '',
    },
    isLoading: false,
    isSnackbarOpen: false,
    snackbarMessage: '',
  };

  componentWillUnmount() {
    this.isTokenSource.cancel('API Cancel');
  }

  onHandleChangeForm = event => {
    const { form } = this.state;
    form[event.target.name] = event.target.value;
    this.setState({ form });
  };

  onHandleSubmitForm = async event => {
    event.preventDefault();

    const { history } = this.props;
    const { form } = this.state;

    const isFormEmpty = Object.values(form).every(item => item === '');
    if (isFormEmpty) {
      return;
    }
    try {
      this.setState({ isLoading: true });

      const result = await AuthenticationAPI.onForgotPassword({
        cancelToken: this.isTokenSource.token,
        username: form.username,
      });

      this.setState({ isLoading: false });
      this.onToggleSnackbar({ message: "Email with password sent successfully!" });

      // history.push('/login');
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        const { message, errorCode } = error.response.data;
        if (errorCode === 401 || errorCode === 500) {
          this.onToggleSnackbar({ message });
        }
        this.setState({ isLoading: false });
      }
    }
  };

  onToggleSnackbar = ({ message = 'Error' }) => {
    this.setState(state => ({
      isSnackbarOpen: !state.isSnackbarOpen,
      snackbarMessage: message,
    }));
  };

  render() {
    const { form, isLoading, isSnackbarOpen, snackbarMessage } = this.state;
    return (
      <Container>
        <WelcomeMessage />
        <ForgotPasswordForm
          value={form}
          isLoading={isLoading}
          onChange={this.onHandleChangeForm}
          onSubmit={this.onHandleSubmitForm}
        />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.onToggleSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </Container>
    );
  }
}

ForgotPasswordPage.propTypes = {
  history: PropTypes.object, // React Router Injected
};

export default ForgotPasswordPage;
