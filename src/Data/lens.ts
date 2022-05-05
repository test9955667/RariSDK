import * as ethers from "ethers";

import lensAbi from '../Fuse/contracts/abi/FusePoolLens.json';
import dirAbi from '../Fuse/contracts/abi/FusepoolDirectory.json';

import { rpcUrl } from "../../ecosystem.config";

const dirAddr = "0x835482FE0532f169024d5E9410199369aAD5C77E";

// todo: remove from prod
const url = rpcUrl;

const provider = new ethers.providers.JsonRpcProvider(url);

const dir = new ethers.Contract(dirAddr, dirAbi, provider);

const dirBlockEth = 12060007;

///////// TYPES /////////

export type PoolSummary = {
    address: String;
    totalSupply: ethers.BigNumber;
    totalBorrow: ethers.BigNumber;
    underlyingTokens:  String[];
    underlyingSymbols: String[];
} 

export type cToken = {
    address: String;
    supplyBal: ethers.BigNumber;
    borrowBal: ethers.BigNumber;
    supplyRate: ethers.BigNumber;
    borrowRate: ethers.BigNumber;
    borrowEnabled?: boolean;

}



//// ISOLATED FUNCTIONS ////

// Functions from lens can be called raw here, or from a LensV1 object which can be significantly more efficient for multuple calls
// because it caches data from on chain

async function getPublicPoolsWithData() {

}

async function getPoolsByAccount() {

}

async function getPoolsWithData(indexes: number[], pools: any[]) {

}


export class LensV1 {
    // fields
    public allPools: String[] = [];
    protected url: string;
    protected provider: any;
    public dir: ethers.Contract;

    // todo: use map (iterable) instead?
    public poolData: PoolSummary[] = [];

    // todo: move to chain file so the chain V1 is on can be specified
    readonly dirBlockEth = 12060007;

    

    constructor(rpcUrl: string) {
        this.url = rpcUrl;
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        this.dir = new ethers.Contract(dirAddr, dirAbi, provider);
    }

    // Gets pools from contract storage, may break evm in future, fast and tried first
    async getPoolsUnsafe() {
        return await dir.methods.getAllPools().call("");
    }



    getPools = async() => {
        let allPools: String[] = [];
        if(this.allPools.length !== 0) return this.allPools;
        try { 
            allPools = await this.getPoolsUnsafe();
            this.allPools = allPools;
            return allPools;
        } catch (e) { 
            allPools = await getPoolsSafe(this.dir, this.provider); 
            this.allPools = allPools;
            return allPools;
        }
    }


    async getPublicPoolsWithData() {   

    }

    async getPoolsByAccountWithData(account: string) {

    }   


    async getPoolSummary(comptroller: any) { 

    }   

    async getPoolAssetsWithData(
    comptroller: any, 
    cTokens: any[] | undefined, 
    user: string | undefined) 
    {

    }

    // use db fallback on chain 
    async getTokenNameAndSymbol(token: string) {

    }

    async getPoolUsersWithData(
        comptroller: any[] | any, 
        maxHealth: bigint | undefined) 
        { 
        let health = maxHealth === undefined ? 0 : maxHealth;

    }


    async getPublicPoolUsersWithData(maxHealth: bigint | undefined) {
        let health = maxHealth === undefined ? 0 : maxHealth;
    }


    async getPoolsBysupplier(account: string) {

    }


    async getPoolsBySupplierWithData(account: string) {

    }


    async getUserSummary(account: string) {

    }

    async getPoolUserSummary(comptroller: any, account: string) {

    }

    async getWhitelistedPoolsByAccount(account: string) {

    }

    async getWhitelistedPoolsByAccountWithData(account: string) {

    }  


    async getPoolsWithData(indexes?: number[], pools?: any[]) {
        if(this.allPools.length === 0) {
            this.allPools = await dir.getAllPools().call();
        }
        
        let toGet = pools === undefined ? this.allPools : pools;
        
    }
    
}


// Uses safe evnt log filter query to get all pools
async function getPoolsSafe(
    dir: ethers.Contract, 
    provider: ethers.providers.JsonRpcProvider
    ) {
    // get pool cretion events from directory
    const filter = dir.filters.PoolRegistered();
    const curr   = await provider.getBlockNumber();
    let start    = dirBlockEth;
    let interval = 100000; // this is arbitrary 

    while(true) {
        try {
            let to = start + interval > curr ? curr : start + interval;
        } catch (e) {
            // reset
            start = dirBlockEth;
            interval /= 2; 
        }
    }

    let events = await dir.queryFilter(filter);

    console.log(events);
    
    return [];
}



