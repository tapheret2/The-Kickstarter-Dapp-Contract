import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance=new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xC8b4Ec97e1775299d70BE5b17aa06a01C5BAe39a'
);

export default instance;