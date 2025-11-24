import React, { Component } from "react";
import { Card, Grid, Button, Icon, Segment } from "semantic-ui-react";
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
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div className="page-header">
          <div className="eyebrow">
            <Icon name="flag" /> Active campaign
          </div>
          <h1>Campaign overview</h1>
          <p className="section-subtitle">
            Review the funding details, learn who manages the pool, and back the
            campaign with a secure contribution.
          </p>
        </div>

        <Grid stackable columns={2} relaxed="very">
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment className="glass-panel">{this.renderCards()}</Segment>
            </Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Segment basic style={{ padding: 0 }}>
                <div className="card-section-header">
                  <h3 style={{ marginBottom: 0 }}>Manage spending requests</h3>
                  <span>Track how funds are allocated and vote on approvals.</span>
                </div>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary icon labelPosition="right">
                      View Requests
                      <Icon name="arrow right" />
                    </Button>
                  </a>
                </Link>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
