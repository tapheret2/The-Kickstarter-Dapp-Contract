import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu secondary pointing inverted>
      <Link route="/">
        <a className="item" style={{ fontWeight: 800, letterSpacing: "0.02em" }}>
          <Icon name="rocket" color="teal" />
          CrowdCoin
        </a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Discover</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item" style={{ color: "#a5f3fc" }}>
            <Icon name="add circle" />
            New Campaign
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
