import React, { Component } from "react";
import { Card, Button, Grid, Icon, Label } from "semantic-ui-react";
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
        header: (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{address}</span>
            <Label basic color="purple" size="mini">
              Live
            </Label>
          </div>
        ),
        meta: "Campaign address",
        description: (
          <div>
            <p style={{ color: "#475569" }}>
              This campaign is currently raising contributions on Ethereum. Join the
              crowd and help it reach its goal.
            </p>
            <Link route={`/campaigns/${address}`}>
              <a style={{ color: "#2563eb", fontWeight: 600 }}>View details</a>
            </Link>
          </div>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} itemsPerRow={2} stackable doubling />;
  }
  render() {
    const liveCampaigns = this.props.campaigns.length;

    return (
      <Layout>
        <div className="page-content">
          <Grid stackable columns={2} className="hero">
            <Grid.Column width={10}>
              <p className="eyebrow">Ethereum-powered Kickstarter</p>
              <h1 style={{ fontSize: 32, marginTop: 4 }}>Kickstart bold ideas with CrowdCoin</h1>
              <p className="page-subtitle">
                Discover transparent, on-chain crowdfunding campaigns managed by the people who
                back them. Contribute in a few clicks and follow progress in real time.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
                <Link route="/campaigns/new">
                  <a>
                    <Button primary icon labelPosition="right">
                      Launch a campaign
                      <Icon name="arrow right" />
                    </Button>
                  </a>
                </Link>
                <a href="#open-campaigns">
                  <Button basic color="black" icon labelPosition="left">
                    <Icon name="grid layout" />
                    Browse campaigns
                  </Button>
                </a>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="stat-card">
                <div className="stat">
                  <div className="stat-label">Live campaigns</div>
                  <div className="stat-value">{liveCampaigns}</div>
                  <p className="stat-copy">Projects actively collecting contributions right now.</p>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <div className="stat-label">Trustless funding</div>
                  <p className="stat-copy">
                    Every wei is held by the smart contract until backers approve spending requests.
                  </p>
                </div>
              </div>
            </Grid.Column>
          </Grid>

          <div id="open-campaigns" className="section-header">
            <div>
              <h3 style={{ marginBottom: 0 }}>Open Campaigns</h3>
              <p className="page-subtitle">Explore active projects and see how funds will be used.</p>
            </div>
            <Link route="/campaigns/new">
              <a>
                <Button color="black" icon labelPosition="left" basic>
                  <Icon name="plus" />
                  Start new campaign
                </Button>
              </a>
            </Link>
          </div>
          {this.renderCampaigns()}
        </div>
        <style jsx>{`
          .hero {
            margin-bottom: 28px;
          }

          .eyebrow {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            font-size: 12px;
            color: #7c3aed;
            margin-bottom: 6px;
          }

          .stat-card {
            background: linear-gradient(145deg, #312e81, #1e1b4b);
            color: #e0e7ff;
            padding: 22px;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(49, 46, 129, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .stat {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .stat-label {
            font-size: 12px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #c7d2fe;
          }

          .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            margin-top: -6px;
          }

          .stat-copy {
            margin: 6px 0 0 0;
            color: #d1d5db;
          }

          .stat-divider {
            height: 1px;
            width: 100%;
            background: rgba(255, 255, 255, 0.15);
            margin: 14px 0;
          }

          .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            gap: 12px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default CampaignIndex;
