/*
Logging for the whole application. Logging will have a set number of levels. Low, Medium and Verbose.
Low: errors only.
Medium: errors, and non-reversable actions (writes, deletes)
Verbose: everything. Connects, writes, reads etc...
*/
import { MongoClient, MongoCursorInUseError } from "mongodb";

export const LoggingLevel = Object.freeze( {
    Off: 0,
    Low: 1,
    Medium: 2,
    Verbose: 3
});

export let currentLoggingLevel = LoggingLevel.Off;
export let logDirectory = `./logs/`;

let missingLogLevelCatcher = false;

function loggingOffCheck() {
    return currentLoggingLevel === LoggingLevel.Off;
}

function shouldWeLog(messageLevel) {

    //we only want to log if the message report level is less than or equal to the current logging level.
    // e.g. if the message logging level is Medium and the app logging level is set to verbose then log it. (true function outcome)
    // e.g.2 if the message logging level is set to Medium and the app logging level is set to low, return and don't log. (false function outcome)
    const logDecision = messageLevel <= currentLoggingLevel;
   
    //catch our logging level not set (in this event log everything!)
    if(logDecision === null || logDecision === undefined) {

        //have we already logged that the logging level is missing?
        if(!missingLogLevelCatcher){
            logMessage(LoggingLevel.Low, "logging level not set properly by application", "calling app: " +  shouldWeLog.caller.caller);
            missingLogLevelCatcher = true;
        }
        return true;
    }


    return logDecision;
}


//log an error
export function logMessage(level, message, data) {

    if(loggingOffCheck()) return;
    if(!shouldWeLog()) return;

    console.log(Date.now().toISOString() + " :" + message);
    console.log(`--------------------------`);
    console.log(data);
}

//log access to DB resources
export function logDbAction(level, message, data) {
   
    if(loggingOffCheck()) return;
    if(!shouldWeLog()) return;

    if(level !== LoggingLevel.Off) {
        logMessage(level, message, data);   
    }

}

//log web requests
export function logWebAction(level, message, data) {
    
    if(loggingOffCheck()) return;
    if(!shouldWeLog()) return;

    if(level !== LoggingLevel.Off) {
        logMessage(level, message, data);   
    }
}