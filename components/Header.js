import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu secondary stackable className="nav-bar">
      <Link route="/">
        <a className="item brand">
          <span className="brand-mark">◎</span>
          Kickstarter Dapp
        </a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item nav-link">Explore Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item create-button">
            <Icon name="add" style={{ marginRight: 8 }} /> Start Campaign
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
