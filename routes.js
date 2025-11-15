const routes = require("next-routes")();

routes
    .add('/campaigns/new','/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show', { name: 'campaignShow' });

module.exports = routes;
