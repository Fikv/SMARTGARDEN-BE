import { Device } from "../Entities/DeviceSchema";

const deviceEndpoint = (router) => {


    router.post('/api/device', async (request, response, next) => {
        try {
          const newDevice = new Device({
            name: request.body.name,
            status: request.body.status,
            type: request.body.type,
            connectionType: request.body.connectionType,
            address: request.body.address
          });
      
       
          const savedDevice = await newDevice.save();
      
          response.status(200).json(savedDevice);
        } catch (error) {
          console.log('Error:', error);
          response.status(500).send('Internal Server Error');
        }
      });


    router.get('/api/devices', async (request, response, next) => {
        try {
          const devices = await Device.find(); 
          response.status(200).json(devices);
        } catch (error) {
          console.log('Error:', error);
          response.status(500).send('Internal Server Error');
        }
      });


      router.delete('/api/device/remove/:id', async (request, response, next) => {
        try {
          const deviceId = request.params.id;
      

          const deletedDevice = await Device.findByIdAndDelete(deviceId);
      
          if (!deletedDevice) {
            return response.status(404).send('Device not found');
          }
      
          response.status(200).send('Device deleted successfully');
        } catch (error) {
          console.log('Error:', error);
          response.status(500).send('Internal Server Error');
        }
      });

      router.put('/api/device/:id', async (request, response, next) => {
        try {
          const deviceId = request.params.id;
      
          const device = await Device.findById(deviceId);
          if (!device) {
            return response.status(404).send('Device not found');
          }
      
          
          device.status = device.status === 'On' ? 'Off' : 'On';
      
          await device.save();
      
        
          const deviceName = device.deviceName;
          const statusMessage = device.status === 'On' ? 'turned on' : 'turned off';
          const responseMessage = `${deviceName} ${statusMessage}`;
      
          response.status(200).send(responseMessage);
        } catch (error) {
          console.log('Error:', error);
          response.status(500).send('Internal Server Error');
        }
    });


};

export default deviceEndpoint;
