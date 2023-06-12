# daemon-scan-network
 
sudo cp scan-known-devices.service /lib/systemd/system

sudo systemctl daemon-reload
sudo systemctl enable scan-known-devices

sudo systemctl start scan-known-devices
sudo systemctl status scan-known-devices
