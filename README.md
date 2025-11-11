# Kickstarter DApp  
**Decentralized Crowdfunding on Ethereum**

![Kickstarter](https://img.shields.io/badge/Kickstarter-DApp-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white&style=flat)
![Web3.js](https://img.shields.io/badge/Web3.js-1.8.0-orange?logo=ethereum&logoColor=white&style=flat)
![Solidity](https://img.shields.io/badge/Solidity-0.4.17-363636?logo=solidity&logoColor=white&style=flat)
![Sepolia](https://img.shields.io/badge/Testnet-Sepolia-00C4B8?style=flat)

---

## Overview

A **decentralized crowdfunding platform** built with **Solidity**, powered by a **React frontend**. Campaign managers create fundraising campaigns, contributors donate **ETH** and become **voters**. All spending requires **>50% approval** from contributors.

---

## Features

- **Factory Pattern** - Deploy unlimited campaigns
- **Democratic Voting** - Contributors approve spending requests
- **Minimum Contribution** - Set entry requirements
- **Transparent Fund Management** - All transactions on-chain
- **Manager Controls** - Create requests, finalize approved spending
- **Real-time Stats** - View balance, approvers, and requests

---


## Tech Stack

| Technology     | Purpose |
|---------------|--------|
| **Solidity**  | Smart contracts (`CampaignFactory.sol`, `Campaign.sol`) |
| **Hardhat**   | Compile, test, deploy |
| **Web3.js**   | Connect frontend to blockchain |
| **React**     | User interface |
| **MetaMask**  | Ethereum wallet (Sepolia) |
| **Sepolia**   | Ethereum testnet |


---

## Setup & Run Locally

### Requirements
- [Node.js](https://nodejs.org/) (v16+)
- [MetaMask](https://metamask.io/)
- [Sepolia ETH](https://sepoliafaucet.com)

### Steps

```bash
# 1. Clone the project
git clone https://github.com/tapheret2/kickstarter-dapp.git
cd kickstarter-dapp

# 2. Install dependencies
npm install

# 3. Compile & deploy contracts (Hardhat)
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

# 4. Update contract addresses in frontend config
# Edit src/factory.js with deployed CampaignFactory address

# 5. Start React app
cd client
npm install
npm start
```
