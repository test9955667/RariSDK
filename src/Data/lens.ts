import ethers from "ethers";

const lensAbi = require('../Fuse/contracts/abi/FusePoolLens.json');
const dirAbi  = require('../Fuse/contracts/abi/FusePoolDirectory.json');

const dirAddr = "0x835482FE0532f169024d5E9410199369aAD5C77E";
const url = "";
const provider = new ethers.providers.JsonRpcProvider(url);

const dir = new ethers.Contract(dirAddr, dirAbi, provider);

const dirBlockEth = 12060007;

///////// TODO: /////////

// 1) finish skeleton 

// 2) finish logic

// 3) make types/typefile for params and objects
    // 3a) can the comptroller type just be its address instead?

// @dev this file is modified from storms python impl of the lens to fit the ts sdk
// safe pool fetching has been implemented 

/////// ON-CHAIN DATA /////////

// Gets pools from contract storage, may break evm in future, fast and tried first
async function getPoolsUnsafe() {

}

// Gets pools from contract events, safe for long term calling, used as fallback
async function getPoolsSafe() {
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
    

}
getPoolsSafe();

const getPools = async() => {
    try{ return await getPoolsUnsafe();
    } catch (e) { return await getPoolsSafe(); }
}

/*/////////   OG LENS export async functionS     //////*/

export async function getPublicPoolsWithData() {

}

export async function getPoolsByAccountWithData(account: string) {

}

export async function getPoolsWithData(indexes: bigint[], pools: any[]) { 

}

export async function getPoolSummary(comptroller: any) { 

}

export async function getPoolAssetsWithData(
    comptroller: any, 
    cTokens: any[] | undefined, 
    user: string | undefined) 
    {

}

// use db fallback on chain 
export async function getTokenNameAndSymbol(token: string) {

}

export async function getPoolUsersWithData(
    comptroller: any[] | any, 
    maxHealth: bigint | undefined) 
    { 
    let health = maxHealth == undefined ? 0 : maxHealth;

}


export async function getPublicPoolUsersWithData(maxHealth: bigint | undefined) {
    let health = maxHealth == undefined ? 0 : maxHealth;
}


export async function getPoolsBysupplier(account: string) {

}


export async function getPoolsBySupplierWithData(account: string) {

}


export async function getUserSummary(account: string) {

}

export async function getPoolUserSummary(comptroller: any, account: string) {

}

export async function getWhitelistedPoolsByAccount(account: string) {

}

export async function getWhitelistedPoolsByAccountWithData(account: string) {

}