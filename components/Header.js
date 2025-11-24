import React from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu secondary stackable className="app-menu">
      <Link route="/">
        <a className="item" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="rocket" size="large" color="violet" />
          <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>CrowdCoin</span>
        </a>
      </Link>

      <Menu.Menu position="right" style={{ gap: 12, alignItems: "center" }}>
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">
            <Button primary icon labelPosition="right" size="small">
              Launch Campaign
              <Icon name="arrow right" />
            </Button>
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
