import {
    Contract,
    providers,
    BigNumber,
    Event
} from "ethers";

// Constants to potentially be moved to env file

const url = "";
const provider = new providers.JsonRpcProvider(url);

const factAddr = "";
const factAbi = require("./abi/UniV3.0.1-Factory.json");
const factory = new Contract(factAddr, factAbi, provider);


/*/////////////////////////////////////
            Getter Functions 
////////////////////////////////////*/

const walletAbi = require("./abi/UniV3.0.1.json");

// todo: test
/**
 * @notice should be run when user first loads page
 * @param user address to query SmartWallet for
 * @returns 
 */
async function getUserWallet(user: string) {
    let wallet = await factory.getManager(user);
    // checks
    return BigNumber.from(wallet) == BigNumber.from(0) ? undefined : wallet;
}

// todo: test
const SmartWallet: any = async (user: string) => {
    let wAddr = await getUserWallet(user);
    if(wAddr == undefined) throw new Error("User has no smart wallet");
    return new Contract(wAddr, walletAbi, provider);
}


// todo: test
/**
 * Gets all the "current" positions the SmartWallet owner has yet to close themself
 * @param user address of user to query
 * @returns List of Events the user has yet to close themself
 */
async function getCurrentPositions(user: string) {
    let wallet: Contract = await SmartWallet(user);

    // todo: add block posted as start block
    let blockPosted = await wallet.blockPosted();

    // List of opened events and closed events to compare
    let filterOpened = wallet.filters.PositionOpened();
    let opened = await wallet.queryFilter(filterOpened);
    let filterClosed = wallet.filters.PositionClosed();
    let closed = await wallet.queryFilter(filterClosed);


    // Structure the events so they can be filtered and returned
    let eventMap = new Map<string, Event>();
    opened.forEach(event => {
        // todo: add each event to map based on comptroller address of event 
        // if a more recent event with the same pool address is found, overwrite it
    });

    closed.forEach(event => {
        // todo: if the timestamp of the pool address of this event in the eventMap 
        // is less than this event's timestamp, then delete it below 

        eventMap.delete(""/** todo add pool address */);
    });

    return Array.from(eventMap);    
}

/**
 * Gets current position status accounting for edits / liquidations
 * @param position 
 * @param wallet 
 */
async function getPositionStatus(position: Event, wallet: Contract) {
    // todo: 
    // 1) query cTokens from event for users balances
    // 2) return position struct of current position status
}





