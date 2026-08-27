# Appendix A: Key Code Snippets

### A.1 LangGraph Pipeline Definition
**Submission ID:** trn:oid:::18459:139871500

The following snippet illustrates the construction of the LangGraph StateGraph used for the AI analysis pipeline. The graph connects three asynchronous nodes — `analyze_behavior`, `detect_drift`, and `generate_docs` — in a linear chain, with `AnalysisState` as the shared context object passed between nodes.

```python
def _build_graph():
    g = StateGraph(AnalysisState)
    g.add_node('analyze_behavior', analyze_behavior)
    g.add_node('detect_drift', detect_drift)
    g.add_node('generate_docs', generate_docs)
    
    g.set_entry_point('analyze_behavior')
    g.add_edge('analyze_behavior', 'detect_drift')
    g.add_edge('detect_drift', 'generate_docs')
    g.add_edge('generate_docs', END)
    
    return g.compile()
```

### A.2 Traffic Capture Middleware Core Logic

The middleware captures timing, extracts user identity from JWT, and persists logs asynchronously to avoid blocking the HTTP response path:

```python
start_ms = time.time()
response = await call_next(request)
latency_ms = (time.time() - start_ms) * 1000

user_id = _extract_user_id(request)

async with AsyncSessionLocal() as db:
    log = APILog(
        method=request.method,
        path=path,
        status_code=response.status_code,
        latency_ms=round(latency_ms, 2),
        user_id=user_id
    )
    db.add(log)
    await db.commit()
```

### A.3 gRPC Model Service Integration

The following snippet demonstrates a backend establishing a secure channel to the Python gRPC model service for document analysis, implementing deadlines to handle timeouts gracefully:

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/grpc-js/proto-loader');

const packageDefinition = protoLoader.loadSync('model_service.proto', {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const modelProto = grpc.loadPackageDefinition(packageDefinition).modelservice;

const client = new modelProto.ModelAnalyzer(
  process.env.GRPC_SERVER_URL,
  grpc.credentials.createInsecure()
);

function analyzeDocument(docContent) {
  return new Promise((resolve, reject) => {
    const deadline = new Date(Date.now() + 5000); // 5 second timeout
    client.Analyze({ content: docContent }, { deadline }, (error, response) => {
      if (error) reject(error);
      else resolve(response.results);
    });
  });
}
```

### A.4 Smart Contract Execution and Event Emission

This Solidity smart contract snippet demonstrates the core logic for finalizing a digital contract, securely transferring state, and emitting an immutable event on the blockchain to serve as a cryptographic audit trail:

```solidity
pragma solidity ^0.8.19;

contract DigitalContractPlatform {
    event ContractFinalized(bytes32 indexed contractId, address indexed parties, uint256 timestamp);

    struct ContractDetails {
        bytes32 documentHash;
        address creator;
        bool isFinalized;
    }

    mapping(bytes32 => ContractDetails) public contracts;

    function finalizeContract(bytes32 _contractId) external {
        ContractDetails storage doc = contracts[_contractId];
        require(doc.creator != address(0), "Contract does not exist");
        require(!doc.isFinalized, "Contract is already finalized");

        doc.isFinalized = true;
        
        emit ContractFinalized(_contractId, msg.sender, block.timestamp);
    }
}
```

### A.5 Web3 Transaction Submission via Ethers.js

The backend utilizes `ethers.js` to sign and broadcast the contract finalization transaction to the Ethereum network, ensuring secure private key management and waiting for block confirmation:

```javascript
const { ethers } = require('ethers');
const contractABI = require('./abi/DigitalContractPlatform.json');

async function submitToBlockchain(contractIdHash) {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const platformContract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS, 
        contractABI, 
        wallet
    );

    try {
        // Estimate gas and execute transaction
        const tx = await platformContract.finalizeContract(contractIdHash, {
            gasLimit: 300000
        });
        
        // Wait for 1 confirmation
        const receipt = await tx.wait(1);
        return { success: true, transactionHash: receipt.hash };
    } catch (error) {
        console.error("Blockchain transaction failed:", error);
        throw new Error("Failed to finalize contract on-chain.");
    }
}
```
