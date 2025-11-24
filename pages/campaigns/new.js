import React, { Component } from "react";
import { Form, Button, Input, Message, Icon, Segment } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div className="page-header">
          <Link route="/">
            <a style={{ color: "#93c5fd", fontWeight: 600 }}>
              <Icon name="arrow left" /> Back to campaigns
            </a>
          </Link>
          <h1 style={{ marginTop: 12 }}>Launch a new campaign</h1>
          <p className="section-subtitle">
            Define the minimum contribution for your funding pool and let the
            community join as trusted approvers.
          </p>
        </div>
        <Segment className="glass-panel">
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="wei"
                labelPosition="right"
                value={this.state.minimumContribution}
                onChange={(event) =>
                  this.setState({ minimumContribution: event.target.value })
                }
                placeholder="1000"
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary icon labelPosition="right">
              Create Campaign
              <Icon name="rocket" />
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default CampaignNew;
