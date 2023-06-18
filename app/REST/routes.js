import deviceEndpoint from './Controllers/device.endpoint';
import userEndpoint from './Controllers/user.endpoint';


const routes = function (router)
{
 userEndpoint(router);
 deviceEndpoint(router);
};

export default routes;