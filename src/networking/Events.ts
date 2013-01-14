module Events
{
    // All event names have been shorted to reduce packet size

    export var lobby = {
        CREATE_GAME_LOBBY: "createLob",
        UPDATE_USER_COUNT : "newConnect"
    }

    export var gameLobby = {
        PLAYER_JOIN: "pJoin",
        START_GAME_FOR_OTHER_CLIENTS: "startForOther",
        START_GAME_HOST : "startG"
    }

    export var client = {

        UPDATE_ALL_GAME_LOBBIES: "updateLobs",       
        ASSIGN_USER_ID: "assignId",
        ACTION : "a",
        UPDATE: "u",
        GET_GAME_TIME: "t"
    }

    export var server = {

    }

}

// Hack 
declare var exports: any;
declare var module: any;
if (typeof exports != 'undefined')
{
    (module).exports = Events;
}




