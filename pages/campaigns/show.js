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
        <div className="page-content">
          <div className="section-header">
            <div>
              <h3 style={{ marginBottom: 4 }}>Campaign overview</h3>
              <p className="page-subtitle">
                A transparent snapshot of this campaign&apos;s manager, balance, and contributors.
              </p>
            </div>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button color="black" icon labelPosition="right" basic>
                  Manage requests
                  <Icon name="arrow right" />
                </Button>
              </a>
            </Link>
          </div>

          <Grid stackable columns={2}>
            <Grid.Row>
              <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

              <Grid.Column width={6}>
                <div className="panel">
                  <div className="panel-header">Contribute</div>
                  <p className="panel-copy">Back this project and become an approver for future spending.</p>
                  <ContributeForm address={this.props.address} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <style jsx>{`
          .panel {
            background: #0f172a;
            color: #e2e8f0;
            padding: 18px;
            border-radius: 14px;
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.35);
          }

          .panel-header {
            font-weight: 700;
            margin-bottom: 6px;
            letter-spacing: -0.01em;
          }

          .panel-copy {
            margin-top: 0;
            margin-bottom: 14px;
            color: #cbd5e1;
          }
        `}</style>
      </Layout>
    );
  }
}

export default CampaignShow;
