import React, { useState} from 'react';
import Web3 from 'web3';
import MintCard from './MintCard';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [ensName, setEnsName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const contractAddress = "0x54471E6953CdB18AE15BEb900218C24548C4817a";
  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC1155InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idsLength",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valuesLength",
          "type": "uint256"
        }
      ],
      "name": "ERC1155InvalidArrayLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC1155MissingApprovalForAll",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "mintTokenFive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintTokenFour",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintTokenOne",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintTokenSix",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintTokenThree",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintTokenTwo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintTokenZero",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintCooldown",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "uri",
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
  ]; // Replace with your contract ABI

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request account access if needed
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);

        // Fetch ENS name if available
        const ensName = await web3Instance.eth.ens.getName(accounts[0]);
        if (ensName && ensName.name) {
          setEnsName(ensName.name);
        } else {
          setEnsName('');
        }

        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      console.log("No Ethereum provider found. Install MetaMask.");
    }
  };

  const mintToken = async (mintMethod) => {
    if (!contract || !account) {
      setAlertMessage('Please connect your wallet first.'); // Set alert message if wallet is not connected
      return; // Exit the function to prevent further execution
    }
    try {
      await mintMethod().send({ from: account });
      console.log(`Token minted successfully`);
      setAlertMessage(''); // Clear any previous alert message
    } catch (error) {
      console.error("Error minting token:", error);
      setAlertMessage('An error occurred while minting the token.');
    }
  };

  return (
    <div className="App">
      <>
        <video autoPlay loop muted className="video-background">
          <source src="/images/pokeball.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="header">
            <h1>
                Welcome to Pokedex...
                <FontAwesomeIcon 
                    icon={faInfoCircle} 
                    className="info-icon"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                    <div className="tooltip">
                        <p><strong>Minting Rules:</strong></p>
                        <ul>
                            <li>You can mint only one token at a time.</li>
                            <li>Cooldown period of 1 minute between mints.</li>
                        </ul>
                        <p><strong>Forging Rules:</strong></p>
                        <ul>
                            <li>To forge, you need to burn specific tokens which can be seen during Metamask transaction</li>
                            <li>Each forge creates a new unique token.</li>
                        </ul>
                    </div>
                )}
            </h1>
            <div>
                {!account ? (
                    <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
                ) : (
                    <div className="wallet-info">
                        <p>Connected as: {ensName || account}</p>
                    </div>
                )}
            </div>
        </div>
      </>
      <div className="cards-container">
        <MintCard
          title="Charizard"
          description="Charizard is a large dragon-like Pokémon, mainly orange in color. It has two large wings, the underside of which are turquoise. Like Charmander and Charmeleon, it has a flame at the end of its tail."
          imageUrl="/images/chari.jpeg"
          cooldown={0}
          buttonText="Mint"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenZero) : null}
        />
        <MintCard
          title="Bulbasaur"
          description="Bulbasaur is a small, mainly turquoise amphibian Pokémon with red eyes and a green bulb on its back. It is based on a frog/toad, with the bulb resembling a plant bulb that grows into a flower as it evolves."
          imageUrl="/images/bulba.jpeg"
          cooldown={0}
          buttonText="Mint"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenOne) : null}
        />
        <MintCard
          title="Pikachu"
          description="Pikachu is an Electric type Pokémon introduced in Generation 1. Pikachu has a Gigantamax form available in Pokémon Sword/Shield, with an exclusive G-Max move, G-Max Volt Crash. Pika Pika"
          imageUrl="/images/pika.jpeg"
          cooldown={0}
          buttonText="Mint"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenTwo) : null}
        />
        <MintCard
          title="Salamence"
          description="Salamence is a Dragon/Flying type Pokémon introduced in Generation 3. Salamence is a pseudo-legendary Pokémon. It has a Mega Evolution, available in Omega"
          imageUrl="/images/sala.jpeg"
          cooldown={0}
          buttonText="Forge"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenThree) : null}
        />
        <MintCard
          title="Lumineon"
          description="Lumineon is a Water type Pokémon introduced in Generation 4. It lives on the deep-sea floor. It attracts prey by flashing the patterns on its four tail fins. It competes for food with LANTURN."
          imageUrl="/images/lumi.jpeg"
          cooldown={0}
          buttonText="Forge"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenFour) : null}
        />
        <MintCard
          title="Solgaleo"
          description="Solgaleo is a Psychic/Steel type Pokémon introduced in Generation 7. Since ancient times, Solgaleo has been honored as an emissary of the sun. It is referred to with reverence as the beast that devours the sun."
          imageUrl="/images/solga.jpeg"
          cooldown={0}
          buttonText="Forge"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenFive) : null}
        />
        <MintCard
          title="Corvisquire"
          description="Corvisquire is a Flying type Pokémon introduced in Generation 8. The lessons of many harsh battles have taught it how to accurately judge an opponent's strength. Evolution of Rookidee; evolves into Corviknight."
          imageUrl="/images/corvis.jpeg"
          cooldown={0}
          buttonText="Forge"
          mintFunction={contract ? () => mintToken(contract.methods.mintTokenSix) : null}
        />
      </div>
      {alertMessage && <p className="alert-message">{alertMessage}</p>}
    </div>
  );
};

export default App;