import React, { Component } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
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
        <div className="panel-header">
          <h3>Spending Requests</h3>
          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a>
              <Button primary icon labelPosition="left">
                <Icon name="add circle" />
                Add Request
              </Button>
            </a>
          </Link>
        </div>
        <div className="helper-text" style={{ marginBottom: 12 }}>
          Each request moves funds to a recipient after the majority of approvers consent.
        </div>
        <div className="table-wrapper">
          <Table inverted celled>
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
        </div>
        <div className="helper-text" style={{ marginTop: 10 }}>
          Found {this.props.requestCount} requests
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
