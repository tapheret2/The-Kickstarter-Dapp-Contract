import React, { Component } from "react";
import { Button, Table, Icon, Segment } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    const serializedRequests = requests.map((request) => ({
      description: request.description,
      value: request.value.toString(),
      recipient: request.recipient,
      complete: request.complete,
      approvalCount: request.approvalCount.toString(),
    }));

    return {
      address,
      requests: serializedRequests,
      requestCount: requestCount.toString(),
      approversCount: approversCount.toString(),
    };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div className="page-header">
          <div className="eyebrow">
            <Icon name="clipboard check" /> Spending requests
          </div>
          <h1>Requests for this campaign</h1>
          <p className="section-subtitle">
            Every request must be approved by contributors. Review details
            carefully before approving or finalizing.
          </p>
        </div>

        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary icon labelPosition="right" floated="right" style={{ marginBottom: 16 }}>
              Add Request
              <Icon name="add" />
            </Button>
          </a>
        </Link>

        <Segment className="frosted-table">
          <Table inverted>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>{this.renderRows()}</Body>
          </Table>
        </Segment>
        <div style={{ color: "#cbd5e1", marginTop: 8 }}>
          Found {this.props.requestCount} request(s)
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
