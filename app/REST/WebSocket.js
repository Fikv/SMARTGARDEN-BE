const WebSocket = require('ws');
const mongoose = require('mongoose');
const { Device } = require('./Entities/DeviceSchema');

mongoose
  .connect('mongodb+srv://jakubfik21:WvVF3jHTal3V1iz9@cluster0.y1phogb.mongodb.net/Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    startWebSocketServer();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8084 });

  const humidityValues = {};

  function generateRandomHumidity() {
    return Math.floor(Math.random() * 1000);
  }

  function broadcastHumidity() {
    Device.find({ type: 'sensor' }, (err, devices) => {
      if (err) {
        console.error('Error retrieving devices:', err);
        return;
      }

      devices.forEach((device) => {
        if (device.status === 'off') {
          return; // Skip generating and broadcasting for devices with status 'off'
        }

        const humidity = generateRandomHumidity();
        humidityValues[device._id] = humidity;

        console.log(`Device ID: ${device._id}, Humidity: ${humidity}`);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ deviceId: device._id, humidity }));
          }
        });
      });
    });
  }

  wss.on('connection', (ws) => {
    console.log('New client connected');

    Device.find({ type: 'sensor', status: 'on' }, (err, devices) => {
      if (err) {
        console.error('Error retrieving devices:', err);
        return;
      }

      devices.forEach((device) => {
        const initialHumidity = generateRandomHumidity();
        humidityValues[device._id] = initialHumidity;
        ws.send(JSON.stringify({ deviceId: device._id, humidity: initialHumidity }));
      });
    });

    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        broadcastHumidity();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });
  });

  console.log('WebSocket server started on port 8084');
}
