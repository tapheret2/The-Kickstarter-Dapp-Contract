import React, { Component } from "react";
import { Form, Button, Message, Input, Icon, Segment } from "semantic-ui-react";
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
        <div className="page-header">
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a style={{ color: "#93c5fd", fontWeight: 600 }}>
              <Icon name="arrow left" /> Back to requests
            </a>
          </Link>
          <h1 style={{ marginTop: 12 }}>Create a new spending request</h1>
          <p className="section-subtitle">
            Provide the details for how campaign funds should be used. A clear
            description helps contributors approve quickly.
          </p>
        </div>
        <Segment className="glass-panel">
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Description</label>
              <Input
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
                placeholder="e.g. Purchase materials for prototype"
              />
            </Form.Field>
            <Form.Field>
              <label>Value in Ether</label>
              <Input
                value={this.state.value}
                onChange={(event) => this.setState({ value: event.target.value })}
                label="ETH"
                labelPosition="right"
                placeholder="0.5"
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
            <Button primary loading={this.state.loading} icon labelPosition="right">
              Create Request
              <Icon name="paper plane" />
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default RequestNew;
