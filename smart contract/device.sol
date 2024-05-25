pragma solidity >=0.7.0 <0.9.0;

// import "@tw3/solidity/contracts/utils/String.sol";
import "./device_data.sol";

contract Device {

    // using String for string;

    address public owner;
    DeviceData private deviceData;
    string private username;
    string private pass;

    string public location;

    event getLocation();
    event returnLocation(string location);

    constructor(
        string memory un,
        string memory p,
        DeviceData memory dd
    ) {
        owner = msg.sender;

        deviceData.deviceId = dd.deviceId;
        deviceData.cameraId = dd.cameraId;
        deviceData.batteryId = dd.batteryId;

        username = un;
        pass = p;
    }

    function verifyIntegrity(string memory un, string memory p, DeviceData memory dd) public view returns(string memory) {
        
        require(compareStrings(username, un) && compareStrings(pass, p), "Unauthorized Access!");

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

    function tryFetchLocation(string memory un, string memory p) public returns(string memory) {
        require(compareStrings(username, un) && compareStrings(pass, p), "Unauthorized Access!");

        // emit an event demanding location
        emit getLocation();

        return location;
    }

    function updateLocation(string memory lc) public  {
        location = lc;
        emit returnLocation(lc);
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

}