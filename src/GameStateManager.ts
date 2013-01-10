/**
 * GameStateManager.js
 *
 *  License: Apache 2.0
 *  author:  Ciar�n McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="system/Camera.ts"/>
///<reference path="system/Graphics.ts"/>
///<reference path="system/AssetManager.ts"/>
///<reference path="system/Physics.ts"/>
///<reference path="Worm.ts"/>
///<reference path="system/Utilies.ts"/>
///<reference path="system/Timer.ts" />
///<reference path="Settings.ts" />

class GameStateManager
{
    private nextTurnTrigger: bool;
    private currentPlayerIndex: number;
    private players: Player[];
     isStarted: bool;

    constructor ()
    {
        
        this.nextTurnTrigger = false;
        this.currentPlayerIndex = 0;
        this.isStarted = false;
    }

    init(players)
    {
        this.players = players;
        this.isStarted = true;
    }

    tiggerNextTurn()
    {
        // Stop all game info based effects, eg bouncing arrow over worms head
        GameInstance.miscellaneousEffects.stopAll(); 

        this.nextTurnTrigger = true;
    }

    hasNextTurnBeenTiggered()
    {
        return this.nextTurnTrigger;
    }

    // Is everyone ready for the next turn, animations, the worms etc?
    readyForNextTurn()
    {
        // EVENTS which tigger next go - Eg: Modify this.nextTurnTrigger
        // firing of player weapon in some cases
        // Using up the allowed shots/use of a weapon in a turn.
        // player hurting themsleves
        // turn time up 

        if (this.nextTurnTrigger)
        {
            // REQUIRED STATES 
            // animations finished, which include particle effects.
            // deaths if any
            // players health reduced if any
            // all players most be stationary.
            if (GameInstance.particleEffectMgmt.areAllAnimationsFinished() && GameInstance.wormManager.areAllWormsReadyForNextTurn())
            {
                this.nextTurnTrigger = false;
                return true;
            }
        }

        return false;
    }


    getCurrentPlayerObject()
    {
        return this.players[this.currentPlayerIndex];
    }

    // Selects the next players to have a go and selects the next worm they use
    nextPlayer()
    {

        if (this.currentPlayerIndex + 1 == this.players.length)
        {
            this.currentPlayerIndex = 0;
        }
        else
        {
            this.currentPlayerIndex++;
        }

        this.getCurrentPlayerObject().getTeam().nextWorm();
        GameInstance.camera.panToPosition(Physics.vectorMetersToPixels(this.getCurrentPlayerObject().getTeam().getCurrentWorm().body.GetPosition()));
    }
   
    checkForWinner()
    {
        var playersStillLive = [];
        for (var i = this.players.length - 1; i >= 0; --i)
        {
            if (this.players[i].getTeam().areAllWormsDead() == false)
            {
                playersStillLive.push(this.players[i]);
            }
        }

        if (playersStillLive.length == 1)
        {
            return playersStillLive[0];
            
        }

        return null;
    }
}