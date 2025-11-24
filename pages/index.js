import React, { Component } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    if (!this.props.campaigns.length) {
      return (
        <div className="glass-card">
          <h4>No campaigns yet</h4>
          <p className="helper-text">
            Start the first one and inspire the community to back your idea.
          </p>
        </div>
      );
    }

    return (
      <div className="card-grid">
        {this.props.campaigns.map((address) => (
          <Card key={address} fluid>
            <Card.Content>
              <div className="address-pill">
                <Icon name="ethereum" color="teal" />
                {address}
              </div>
              <Card.Header style={{ marginTop: 14 }}>Community Campaign</Card.Header>
              <Card.Meta>Fuel bold ideas on CrowdCoin</Card.Meta>
              <Card.Description style={{ marginTop: 10 }}>
                Support this project by contributing and help it reach new milestones.
              </Card.Description>
            </Card.Content>
            <Card.Content extra style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#9ca3af" }}>Live on-chain</div>
              <Link route={`/campaigns/${address}`}>
                <a>
                  <Button animated='fade' primary size="small">
                    <Button.Content visible>View</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </a>
              </Link>
            </Card.Content>
          </Card>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Layout>
        <div className="hero">
          <div className="section-title">
            <span className="pill">Explore</span>
            <span>Open Campaigns</span>
          </div>
          <h1>Back projects powered by transparent smart contracts.</h1>
          <p>
            Discover campaigns built with CrowdCoin. Contribute securely, track requests,
            and help creators deliver with community approval.
          </p>
        </div>

        <div className="panel-header">
          <h3>Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button icon labelPosition="left" primary>
                <Icon name="add circle" />
                Create Campaign
              </Button>
            </a>
          </Link>
        </div>

        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
