import React, { Component } from "react";
import { Form, Button, Message, Input, Icon } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div className="page-content">
          <div className="section-header">
            <div>
              <h3 style={{ marginBottom: 4 }}>Create a new spending request</h3>
              <p className="page-subtitle">
                Describe how much ether is needed and who will receive it when approved.
              </p>
            </div>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button basic color="black" icon labelPosition="left">
                  <Icon name="arrow left" />
                  Back to requests
                </Button>
              </a>
            </Link>
          </div>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Description</label>
              <Input
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
                placeholder="Purchase raw materials"
              />
            </Form.Field>
            <Form.Field>
              <label>Value in Ether</label>
              <Input
                value={this.state.value}
                onChange={(event) => this.setState({ value: event.target.value })}
                placeholder="2"
                icon="ethereum"
                iconPosition="left"
              />
            </Form.Field>
            <Form.Field>
              <label>Recipient</label>
              <Input
                value={this.state.recipient}
                onChange={(event) => this.setState({ recipient: event.target.value })}
                placeholder="0x..."
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Submit request
            </Button>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default RequestNew;
