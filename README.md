# daemon-scan-network

Commands to run the daemon:
sudo cp scan-known-devices.service /lib/systemd/system

sudo systemctl daemon-reload
sudo systemctl enable scan-known-devices

sudo systemctl start scan-known-devices
sudo systemctl status scan-known-devices

Disclaimer:
To run this daemon succesfully you will need to replace the following line with the path to scannet.js in your system, in the scan-known-devices.service file:

[Service]
ExecStart=/usr/bin/node /home/marcos/Documentos/daemon-scan-network/scannet.js

Replace /home/marcos/Documentos/daemon-scan-network/scannet.js for /[yourpath]/scannet.js
