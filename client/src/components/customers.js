import React, { Component } from "react";
import "./customers.css";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    const res = fetch("/api/hello");
    return res.json();
    // fetch("/api/customers")
    //   .then(res => res.json())
    //   .then(customers =>
    //     this.setState({ customers }, () =>
    //       console.log("Customers fetched...", customers)
    //     )
    //   )
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map(customer => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Customers;
