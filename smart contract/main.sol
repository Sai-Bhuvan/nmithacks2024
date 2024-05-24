pragma solidity >=0.7.0 <0.9.0;

import "./device_data.sol";
import "./device.sol";

// import "@tw3/solidity/contracts/utils/String.sol";

struct PartOwner {
    string username;
    bool exists;
}

contract Main {
    // using String for  string;

    mapping (string => address) public contracts;

    // parts
    mapping (string => PartOwner) public device;
    mapping (string => PartOwner) public camera;
    mapping (string => PartOwner) public battery;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function registerDevice(DeviceData memory dd) public {
        device[dd.deviceId] = PartOwner("", true);
        camera[dd.deviceId] = PartOwner("", true);
        battery[dd.deviceId] = PartOwner("", true);
    }

    function registerDeviceContract(string memory username, DeviceData memory dd) public returns(string memory) {
        
        require(
            device[dd.deviceId].exists && 
            camera[dd.deviceId].exists && 
            battery[dd.deviceId].exists, 
        "Invalid device");
        
        // check if parts already present
        if(bytes(device[dd.deviceId].username).length > 0) {
            return "not_owner";
        }
        else if(bytes(camera[dd.deviceId].username).length > 0) {
            return "camera_sus";
        }
        else if(bytes(battery[dd.deviceId].username).length > 0) {
            return "battery_sus";
        }

        // check for integrity (not needed, until now mobile is in safe hands)
        // set username on all mappings
        device[dd.deviceId].username = username;
        camera[dd.deviceId].username = username;
        battery[dd.deviceId].username = username;
        
        address deviceAddr = address(new Device(dd));
        contracts[username] = deviceAddr;
        return toAsciiString(deviceAddr);
    }

    function getDeviceContract(string memory username) public view returns(address) {
        return contracts[username];
    }

    function deRegisterDeviceContract(string memory username, DeviceData memory dd) public {
        delete contracts[username];

        registerDevice(dd);
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

}