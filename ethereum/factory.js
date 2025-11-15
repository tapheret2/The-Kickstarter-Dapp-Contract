import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance=new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x21a4644f0B7DEA1D41bb504410a440CAAa2473eA'
);

export default instance;