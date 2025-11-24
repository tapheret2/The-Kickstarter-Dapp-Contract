import React, { Component } from "react";
import { Card, Button, Grid, Segment, Icon, Statistic } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }
  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: `Campaign ${address.substring(0, 6)}...${address.substring(
          address.length - 4
        )}`,
        meta: "Smart Contract Address",
        description: (
          <div>
            <p style={{ marginBottom: 8 }}>
              A trustless crowdfunding pool secured by Ethereum smart contracts.
            </p>
            <Link route={`/campaigns/${address}`}>
              <a style={{ fontWeight: 700 }}>View campaign →</a>
            </Link>
          </div>
        ),
        extra: (
          <div className="pill">
            <Icon name="shield alternate" />
            <span>
              Contract: <strong>{address.slice(0, 10)}...</strong>
            </span>
          </div>
        ),
        fluid: true,
      };
    });
    return <Card.Group itemsPerRow={2} stackable items={items} />;
  }
  render() {
    const campaignCount = this.props.campaigns.length;

    return (
      <Layout>
        <div className="page-header">
          <div className="eyebrow">
            <Icon name="globe" />
            Decentralized crowdfunding
          </div>
          <h1>Build transparent campaigns with Ethereum</h1>
          <p className="section-subtitle">
            Spin up tamper-proof funding campaigns and empower your community to
            approve every request. No middlemen, just smart contracts.
          </p>

          <div className="header-actions">
            <Link route="/campaigns/new">
              <a>
                <Button primary size="large" icon labelPosition="right">
                  Launch a campaign
                  <Icon name="arrow right" />
                </Button>
              </a>
            </Link>
            <Link route="/">
              <a>
                <Button basic inverted color="blue" size="large">
                  Browse open campaigns
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <Segment className="glass-panel">
          <Grid columns={3} stackable>
            <Grid.Row>
              <Grid.Column>
                <Statistic inverted>
                  <Statistic.Value>{campaignCount || 0}</Statistic.Value>
                  <Statistic.Label style={{ color: "#cbd5e1" }}>
                    Live campaigns
                  </Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column>
                <Statistic inverted>
                  <Statistic.Value>
                    <Icon name="shield" /> Verified
                  </Statistic.Value>
                  <Statistic.Label style={{ color: "#cbd5e1" }}>
                    Managed by smart contracts
                  </Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column>
                <Statistic inverted>
                  <Statistic.Value>
                    <Icon name="users" /> Collective
                  </Statistic.Value>
                  <Statistic.Label style={{ color: "#cbd5e1" }}>
                    Approvers vote on spending
                  </Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <div className="card-section-header">
          <h3 style={{ marginBottom: 0 }}>Open Campaigns</h3>
          <span>Pick a pool to view details and contribute safely.</span>
        </div>

        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
