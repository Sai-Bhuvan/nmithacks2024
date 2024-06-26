export const deviceContractAddress = "0xAa4ee1230EC1ef5F2bb2e071F035600de58025F7";

export const deviceContractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "un",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "deviceId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cameraId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "batteryId",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DeviceData",
				"name": "dd",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "getLocation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "returnLocation",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "location",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "un",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			}
		],
		"name": "tryFetchLocation",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "lc",
				"type": "string"
			}
		],
		"name": "updateLocation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "un",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "deviceId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cameraId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "batteryId",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DeviceData",
				"name": "dd",
				"type": "tuple"
			}
		],
		"name": "verifyIntegrity",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];