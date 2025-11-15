import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance=new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x871cD65AFff4e3eAD40Be22ec848DeB64c72463B'
);

export default instance;