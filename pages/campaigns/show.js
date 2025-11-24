import React, { Component } from "react";
import { Card, Grid, Button, Icon } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0].toString(),
      balance: summary[1].toString(),
      requestsCount: summary[2].toString(),
      approversCount: summary[3].toString(),
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${web3.utils.fromWei(minimumContribution, "ether")} ETH`,
        meta: "Minimum Contribution",
        description:
          "You must contribute at least this much to become an approver",
      },
      {
        header: requestsCount,
        meta: "Requests",
        description:
          "Each request withdraws funds after majority approval",
      },
      {
        header: approversCount,
        meta: "Approvers",
        description:
          "People who have already backed this campaign",
      },
      {
        header: `${web3.utils.fromWei(balance, "ether")} ETH`,
        meta: "Campaign Balance",
        description:
          "Funds available for spending by approved requests",
      },
    ];

    return <Card.Group items={items} itemsPerRow={2} stackable />;
  }

  render() {
    return (
      <Layout>
        <div className="panel-header">
          <h3>Campaign Overview</h3>
          <div className="address-pill">
            <Icon name="ethereum" />
            {this.props.address}
          </div>
        </div>

        <Grid stackable columns={2} divided>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>

            <Grid.Column width={6}>
              <div className="form-panel">
                <div className="section-title" style={{ margin: 0 }}>
                  <span className="pill">Support</span>
                  <span>Contribute</span>
                </div>
                <p className="helper-text">
                  Become an approver by contributing above the minimum. You will be
                  able to vote on spending requests.
                </p>
                <ContributeForm address={this.props.address} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className="panel-header" style={{ marginTop: 28 }}>
          <h3>Requests</h3>
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>
              <Button primary icon labelPosition="left">
                <Icon name="arrow right" />
                View Requests
              </Button>
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default CampaignShow;
