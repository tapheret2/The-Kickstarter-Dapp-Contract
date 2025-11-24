import React, { Component } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
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
        <div className="page-content">
          <div className="section-header">
            <div>
              <h3 style={{ marginBottom: 4 }}>Spending requests</h3>
              <p className="page-subtitle">
                Review how campaign funds are being allocated and approve requests that look good to you.
              </p>
            </div>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
              <a>
                <Button color="black" icon labelPosition="right" basic>
                  Add request
                  <Icon name="plus" />
                </Button>
              </a>
            </Link>
          </div>

          <Table>
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
          <div>Found {this.props.requestCount} requests</div>
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
