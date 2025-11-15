# 🚀 Kickstarter DApp - Decentralized Crowdfunding Platform

[![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-blue?logo=ethereum&logoColor=white&style=flat)](https://ethereum.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.4.17-363636?logo=solidity&logoColor=white&style=flat)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-12.3.7-black?logo=next.js&logoColor=white&style=flat)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-17.0.2-61DAFB?logo=react&logoColor=white&style=flat)](https://reactjs.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-4.9.0-orange?logo=web3.js&logoColor=white&style=flat)](https://web3js.org/)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat)](LICENSE)

> A decentralized crowdfunding platform built on Ethereum blockchain. Campaign managers create fundraising initiatives, contributors donate ETH and participate in democratic voting for all spending decisions.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Smart Contracts](#smart-contracts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Kickstarter DApp is a blockchain-based crowdfunding platform that eliminates intermediaries and ensures transparent fund management. Built on Ethereum, it leverages smart contracts to enforce democratic decision-making, where all spending requests require majority approval from contributors.

### Problem Statement

Traditional crowdfunding platforms suffer from:
- Centralized control over funds
- Lack of transparency in fund allocation
- High platform fees
- Limited contributor oversight

### Our Solution

A fully decentralized platform where:
- Smart contracts hold and manage all funds
- Contributors become stakeholders with voting rights
- All transactions are transparent and immutable
- Zero platform fees (only gas costs)

---

## Key Features

### Core Functionality

- **Factory Pattern Deployment**: Deploy unlimited campaigns with a single factory contract
- **Democratic Governance**: Contributors vote on spending requests (requires >50% approval)
- **Minimum Contribution Threshold**: Managers set entry requirements for participation
- **Transparent Fund Management**: All transactions recorded on-chain with full auditability
- **Granular Manager Controls**: Create spending requests and finalize approved transactions
- **Real-time Analytics**: View campaign balance, contributor count, and request status

### Security Features

- ✅ No single point of failure
- ✅ Funds cannot be withdrawn without community consensus
- ✅ Thoroughly tested smart contracts
- ✅ Transparent and publicly auditable on blockchain
- ✅ Manager permissions restricted to specific functions

---

## Technology Stack

### Blockchain Layer

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Solidity** | 0.4.17 | Smart contract development (CampaignFactory, Campaign) |
| **Web3.js** | 4.9.0 | Blockchain interaction and wallet integration |
| **Ganache** | 7.9.2 | Local blockchain for development and testing |
| **Mocha** | 10.4.0 | Smart contract testing framework |
| **@truffle/hdwallet-provider** | 2.1.15 | HD Wallet-enabled Web3 provider for testnet deployment |

### Application Layer

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 12.3.7 | React framework with server-side rendering |
| **React** | 17.0.2 | Component-based UI framework |
| **Semantic UI React** | 2.0.3 | Pre-built component library |
| **next-routes** | 1.4.2 | Dynamic routing with clean URLs |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│               (Next.js + React + Semantic UI)               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    INTEGRATION LAYER                        │
│                  (Web3.js + MetaMask)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BLOCKCHAIN LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            CampaignFactory Contract                  │   │
│  │  • Deploy new campaigns                              │   │
│  │  • Maintain campaign registry                        │   │
│  └────────────────┬─────────────────────────────────────┘   │
│                   │                                         │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Campaign Contract (multiple instances)     │   │
│  │  • Accept contributions                              │   │
│  │  • Manage spending requests                          │   │
│  │  • Implement voting mechanism                        │   │
│  │  • Execute approved payments                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Transaction Flow

```
1. Campaign Creation      → CampaignFactory.createCampaign()
2. Contribution          → Campaign.contribute() [payable]
3. Request Creation      → Campaign.createRequest() [manager only]
4. Request Approval      → Campaign.approveRequest() [contributors only]
5. Request Finalization  → Campaign.finalizeRequest() [manager only]
```

---

## Getting Started

### Prerequisites

- **Node.js** v16.0.0 or higher ([Download](https://nodejs.org/))
- **npm** v7.0.0 or higher
- **MetaMask** browser extension ([Install](https://metamask.io/))
- **Sepolia Test ETH** ([Faucet](https://sepoliafaucet.com/))

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/tapheret2/The-Kickstarter-Dapp-Contract.git
cd The-Kickstarter-Dapp-Contract
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Compile Smart Contracts

```bash
node ethereum/compile.js
```

#### 4. Run Tests (Optional)

```bash
npm test
```

#### 5. Deploy Contracts

**For Local Development (Ganache):**

```bash
# Terminal 1: Start Ganache
ganache-cli

# Terminal 2: Deploy contracts
node ethereum/deploy.js
```

**For Sepolia Testnet:**

1. Create `.env` file in root directory:
```bash
MNEMONIC="your twelve word mnemonic phrase here"
INFURA_API_KEY="your-infura-project-id"
```

2. Deploy to testnet:
```bash
node ethereum/deploy.js
```

3. Update contract address in `ethereum/factory.js`:
```javascript
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  'YOUR_DEPLOYED_FACTORY_ADDRESS'
);
```

#### 6. Start Development Server

```bash
npm run dev
```

Navigate to **http://localhost:3000** in your browser.

---

## Usage Guide

### Creating a Campaign

1. Click **"Create Campaign"** button on homepage
2. Enter **Minimum Contribution** amount in wei
3. Confirm transaction in MetaMask
4. Wait for transaction confirmation
5. Your campaign will appear in the campaign list

### Contributing to a Campaign

1. Navigate to campaign details page
2. Enter contribution amount (must meet minimum requirement)
3. Click **"Contribute!"** button
4. Approve transaction in MetaMask
5. Upon confirmation, you become an approver with voting rights

### Creating a Spending Request (Manager Only)

1. Navigate to campaign's **"Requests"** tab
2. Click **"Add Request"** button
3. Fill in request details:
   - **Description**: Purpose of the spending
   - **Value**: Amount in wei to withdraw
   - **Recipient**: Ethereum address to receive funds
4. Submit and confirm transaction

### Approving Requests (Contributors Only)

1. View list of pending requests
2. Review request details carefully
3. Click **"Approve"** for requests you support
4. Confirm transaction in MetaMask
5. Your vote is recorded on-chain

### Finalizing Requests (Manager Only)

Requirements:
- Request must have >50% approval from contributors
- Request must not be already completed

Process:
1. Navigate to approved request
2. Click **"Finalize"** button
3. Confirm transaction
4. Funds are transferred to recipient address

---

## Smart Contracts

### CampaignFactory.sol

Factory contract for deploying new campaign instances.

**Functions:**

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `createCampaign` | `uint minimum` | `address` | Deploys new Campaign contract |
| `getDeployedCampaigns` | None | `address[]` | Returns array of all campaign addresses |

### Campaign.sol

Core campaign contract managing contributions and spending.

**Data Structures:**

```solidity
struct Request {
    string description;      // Purpose of spending
    uint value;             // Amount in wei
    address recipient;      // Recipient address
    bool complete;          // Completion status
    uint approvalCount;     // Number of approvals
    mapping(address => bool) approvals;  // Approval tracking
}
```

**State Variables:**

| Variable | Type | Description |
|----------|------|-------------|
| `manager` | `address` | Campaign creator address |
| `minimumContribution` | `uint` | Minimum contribution in wei |
| `approvers` | `mapping(address => bool)` | Contributor registry |
| `requests` | `Request[]` | Array of spending requests |
| `approversCount` | `uint` | Total number of contributors |

**Key Functions:**

| Function | Access | Payable | Description |
|----------|--------|---------|-------------|
| `contribute()` | Public | Yes | Contribute ETH to campaign |
| `createRequest(string, uint, address)` | Manager | No | Create new spending request |
| `approveRequest(uint)` | Contributors | No | Vote for spending request |
| `finalizeRequest(uint)` | Manager | No | Execute approved request |
| `getSummary()` | Public | No | Get campaign statistics |
| `getRequestsCount()` | Public | No | Get total number of requests |

**Modifiers:**

```solidity
modifier restricted() {
    require(msg.sender == manager);
    _;
}
```

---

## Project Structure

```
The-Kickstarter-Dapp-Contract/
├── ethereum/
│   ├── contracts/
│   │   ├── Campaign.sol              # Main campaign contract
│   │   └── CampaignFactory.sol       # Factory contract
│   ├── build/                         # Compiled contract artifacts
│   ├── compile.js                     # Compilation script
│   ├── deploy.js                      # Deployment script
│   ├── factory.js                     # Factory contract instance
│   ├── campaign.js                    # Campaign instance helper
│   └── web3.js                        # Web3 provider configuration
├── pages/
│   ├── index.js                       # Homepage - Campaign list
│   ├── campaigns/
│   │   ├── new.js                     # Create campaign form
│   │   ├── show.js                    # Campaign detail page
│   │   └── requests/
│   │       ├── index.js               # Requests list
│   │       └── new.js                 # Create request form
├── components/
│   ├── Layout.js                      # Main layout wrapper
│   ├── Header.js                      # Navigation header
│   ├── ContributeForm.js              # Contribution form component
│   └── RequestRow.js                  # Request table row component
├── test/
│   └── Campaign.test.js               # Smart contract test suite
├── .gitignore                         # Git ignore rules
├── routes.js                          # Dynamic route configuration
├── server.js                          # Custom Next.js server
├── package.json                       # Project dependencies
└── README.md                          # Project documentation
```

---

## Testing

### Run Test Suite

```bash
npm test
```

### Test Coverage

The test suite covers:
- ✅ CampaignFactory deployment
- ✅ Campaign creation and initialization
- ✅ Contribution mechanism
- ✅ Request creation by manager
- ✅ Approval voting by contributors
- ✅ Request finalization with sufficient votes
- ✅ Request rejection with insufficient votes
- ✅ Access control and permission validation
- ✅ Edge cases and error conditions

### Sample Test Output

```
  Campaign
    ✓ deploys a factory and a campaign
    ✓ marks caller as the campaign manager
    ✓ allows people to contribute and marks them as approvers
    ✓ requires a minimum contribution
    ✓ allows manager to create payment requests
    ✓ processes requests
    ✓ requires >50% approval to finalize request

  7 passing (2s)
```

---

## Deployment

### Local Deployment (Ganache)

1. Start Ganache CLI:
```bash
ganache-cli
```

2. Deploy contracts:
```bash
node ethereum/deploy.js
```

3. Note the factory address and update frontend configuration

### Testnet Deployment (Sepolia)

**Prerequisites:**
- Infura account ([Sign up](https://infura.io/))
- MetaMask wallet with Sepolia ETH

**Steps:**

1. Create `.env` file:
```bash
MNEMONIC="your twelve word seed phrase from MetaMask"
INFURA_API_KEY="your-infura-project-id"
```

2. Deploy contracts:
```bash
node ethereum/deploy.js
```

3. Verify deployment on [Sepolia Etherscan](https://sepolia.etherscan.io/)

4. Update `ethereum/factory.js` with deployed address:
```javascript
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  'YOUR_DEPLOYED_FACTORY_ADDRESS'
);
```

### Frontend Deployment (Vercel)

1. Push code to GitHub repository
2. Import project in [Vercel](https://vercel.com/)
3. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Deploy application

---

## Roadmap

### Phase 1: Foundation (Completed ✅)

- [x] Smart contract architecture
- [x] Factory pattern implementation
- [x] Core campaign functionality
- [x] Voting mechanism
- [x] Frontend development
- [x] MetaMask integration
- [x] Testnet deployment

### Phase 2: Enhancement (In Progress 🚧)

- [ ] UI/UX improvements
- [ ] Responsive design optimization
- [ ] Campaign categorization
- [ ] Search and filter functionality
- [ ] IPFS integration for images
- [ ] Campaign updates feature

### Phase 3: Advanced Features (Planned 📅)

- [ ] Multi-signature wallet integration
- [ ] Milestone-based funding
- [ ] Refund mechanism for failed campaigns
- [ ] ERC-20 token rewards for contributors
- [ ] Campaign analytics dashboard
- [ ] Email notification system
- [ ] Social media integration

### Phase 4: Scaling (Future 🔮)

- [ ] Mainnet deployment
- [ ] Layer 2 scaling solution
- [ ] Mobile application (React Native)
- [ ] API for third-party integrations
- [ ] Governance token
- [ ] DAO structure for platform governance

---

## Contributing

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Submit** a Pull Request

### Development Guidelines

- Write clean, maintainable code
- Follow existing code style and conventions
- Add comprehensive tests for new features
- Update documentation as needed
- Write meaningful commit messages

### Code Review Process

- All PRs require at least one approval
- All tests must pass
- Code must follow project standards
- Documentation must be updated

---

## Known Issues

| Issue | Status | Solution |
|-------|--------|----------|
| 404 error on page refresh for dynamic routes | ✅ Fixed | Configured custom `server.js` with next-routes |
| Template literal parsing in Link component | ✅ Fixed | Use backticks instead of quotes |
| Web3.js version compatibility | ✅ Fixed | Updated to v4.9.0 |
| Missing web3 import in components | ✅ Fixed | Added proper imports |

For current issues, visit the [Issues](https://github.com/tapheret2/The-Kickstarter-Dapp-Contract/issues) page.

---

## Security Considerations

- Smart contracts have not been professionally audited
- Use at your own risk on mainnet
- Always test thoroughly on testnet first
- Be cautious with large amounts of ETH
- Review all transactions before confirming

**Recommendation**: Conduct professional security audit before mainnet deployment.

---

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Ethereum Foundation](https://ethereum.org/) - Blockchain platform
- [Solidity Documentation](https://docs.soliditylang.org/) - Smart contract language
- [Next.js Team](https://nextjs.org/) - React framework
- [Web3.js Contributors](https://web3js.readthedocs.io/) - Ethereum JavaScript API
- [Semantic UI React](https://react.semantic-ui.com/) - UI component library

---

## Contact & Support

**Project Maintainer**: [Tapheret2](https://github.com/tapheret2)

**Repository**: [The-Kickstarter-Dapp-Contract](https://github.com/tapheret2/The-Kickstarter-Dapp-Contract)

For questions or issues:
- Open an [Issue](https://github.com/tapheret2/The-Kickstarter-Dapp-Contract/issues)
- Submit a [Pull Request](https://github.com/tapheret2/The-Kickstarter-Dapp-Contract/pulls)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

**Built with ❤️ on Ethereum**

</div>
