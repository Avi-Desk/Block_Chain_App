
const SHA256 = require("crypto-js/sha256");
class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;


    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(diffculty){
        while(this.hash.substring(0, diffculty) !==Array(diffculty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();

        }
        console.log("Block Mined:" + this.hash);
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.diffculty = 3;

    }

    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.diffculty);
        this.chain.push(newBlock);

    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousHash = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            if (currentBlock.previousHash !== previousHash.hash){
                return false;
            } 
        }

        return true;
    }
}

let blockchain = new Blockchain();

console.log('Mining Block 1.............')
blockchain.addBlock(new Block(1, "10/10/2019", {amount: 4}));

console.log('Mining Block 2.............')
blockchain.addBlock(new Block(2, "10/10/2014", {amount: 10}));


