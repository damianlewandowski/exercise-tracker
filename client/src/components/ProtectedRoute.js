import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    state = {
      loading: true,
      redirect: false
    };

    componentDidMount() {
      axios
        .get("/api/checkToken")
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            throw new Error(res.error);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }

      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect />
        </React.Fragment>
      );
    }
  };
}
