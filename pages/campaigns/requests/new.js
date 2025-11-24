import React, { Component } from "react";
import { Form, Button, Message, Input, Icon } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component{
    state={
        value:'',
        description:'',
        recipient:'',
        loading:false,
        errorMessage: ''
    };
    static async getInitialProps(props){
        const {address}=props.query

        return {address}
    }

    onSubmit=async event => {
        event.preventDefault();

        const campaign=Campaign(this.props.address);
        const {description,value,recipient}=this.state;

        this.setState({loading:true,errorMessage:''})

        try {
            const accounts=await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value,'ether'),
                recipient
            ).send({from:accounts[0]})

            Router.pushRoute(`/campaigns/${this.props.address}/requests`)

        } catch (err) {
            this.setState({errorMessage:err.message});
        }
        this.setState({loading:false})
    }

    render() {
        return (
          <Layout>
            <div className="panel-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a style={{ color: "#a5f3fc" }}>
                    <Icon name="arrow left" /> Back
                  </a>
                </Link>
                <h3 style={{ margin: 0 }}>Create a Request</h3>
              </div>
            </div>
            <div className="form-panel">
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Description</label>
                  <Input
                    value={this.state.description}
                    placeholder="Purchase materials for milestone #1"
                    onChange={(event) =>
                      this.setState({ description: event.target.value })
                    }
                    fluid
                  />
                </Form.Field>
                <Form.Field>
                  <label>Value in Ether</label>
                  <Input
                    value={this.state.value}
                    placeholder="0.5"
                    onChange={(event) => this.setState({ value: event.target.value })}
                    label="ETH"
                    labelPosition="right"
                    fluid
                  />
                </Form.Field>
                <Form.Field>
                  <label>Recipient</label>
                  <Input
                    value={this.state.recipient}
                    placeholder="0x..."
                    onChange={(event) =>
                      this.setState({ recipient: event.target.value })
                    }
                    fluid
                  />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button fluid primary loading={this.state.loading}>
                  Submit Request
                </Button>
              </Form>
            </div>
          </Layout>
        );
      }
}

export default RequestNew;