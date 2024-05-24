pragma solidity >=0.7.0 <0.9.0;

// import "@tw3/solidity/contracts/utils/String.sol";
import "./device_data.sol";

contract Device {

    // using String for string;

    address public owner;
    DeviceData private deviceData;

    constructor(
        DeviceData memory dd
    ) {
        owner = msg.sender;

        deviceData.deviceId = dd.deviceId;
        deviceData.cameraId = dd.cameraId;
        deviceData.batteryId = dd.batteryId;
    }

    function verifyIntegrity(DeviceData memory dd) public view returns(string memory) {
        string memory ans = "owner";

        if(compareStrings(deviceData.deviceId, dd.deviceId) == false) {
            ans = "not_owner";
        }
        else if(compareStrings(deviceData.cameraId, dd.cameraId) == false) {
            ans = "camera_sus";
        }
        else if(compareStrings(deviceData.batteryId, dd.batteryId) == false) {
            ans = "battery_sus";
        }


        return ans;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

}