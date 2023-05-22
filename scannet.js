// source of 'local-devices' library
// https://www.npmjs.com/package/local-devices?activeTab=readme

// Using a transpiler
import find from 'local-devices'
import { promises as fs } from 'fs'

var devicesList
var devicesMap = new Map();
// Find all local network devices.
find().then(devices => {
    devicesList = devices
    devices.forEach(device => {
        devicesMap.set(device.mac, { name: device.name, ip: device.ip, mac: device.mac, expired: true }) // set expired to true before checking
    });
    writeInLog("Devices already connected to this network")
    devicesMap.forEach((value) => {
        writeInLog("MAC Address: " + value.mac + " IP: " + value.ip + " Device Name: " + value.name)
    });
})

while(true) {
    await sleep(4000)
    find().then(devices => {
        determineChanges(devicesMap, devices)
        var newDevicesMap = new Map();
        devices.forEach(device => {
            newDevicesMap.set(device.mac, { name: device.name, ip: device.ip, mac: device.mac, expired: true })
        });
        devicesMap = newDevicesMap
    })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function writeInLog(message) {
    const date = new Date().toISOString();
    const log = `${date}: ${message}\n`;
    fs.appendFile('/var/log/net.log', log, (error) => {
      if (error) {
        console.error('Error writing to log file:', error);
      }
    });
  }

function determineChanges(currentDevicesMap, newDevicesList) {
    // Check for new devices connected to the network
    newDevicesList.forEach(device => {
        const currentDeviceMatch = currentDevicesMap.get(device.mac)
        if (typeof currentDeviceMatch === 'undefined') {
            writeInLog("New device connected => MAC Address: " + device.mac + " IP: " + device.ip + " Device Name: " + device.name)
        } else { // If it remains connected then set expired to false 
            currentDeviceMatch.expired = false
        }
    });
    // Log out all devices that are no longer in the network
    currentDevicesMap.forEach((value) => {
        if (value.expired) {
            writeInLog("Device disconnected => MAC Address: " + value.mac + " IP: " + value.ip + " Device Name: " + value.name)
        }
    });
}