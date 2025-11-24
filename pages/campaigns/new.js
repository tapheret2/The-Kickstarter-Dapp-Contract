import React, { Component } from "react";
import { Form, Button, Input, Message, Icon } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Link,Router} from "../../routes";

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
        <div className="panel-header">
          <h3>Launch a Campaign</h3>
          <Link route="/">
            <a style={{ color: "#a5f3fc" }}>
              <Icon name="arrow left" /> Back to campaigns
            </a>
          </Link>
        </div>
        <div className="form-panel">
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="wei"
                labelPosition="right"
                value={this.state.minimumContribution}
                placeholder="100"
                onChange={(event) =>
                  this.setState({ minimumContribution: event.target.value })
                }
                fluid
              />
              <div className="helper-text">
                Contributors must send at least this amount to gain voting rights.
              </div>
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button fluid loading={this.state.loading} primary>
              Create Campaign
            </Button>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default CampaignNew;
