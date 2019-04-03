/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) 2019  jeffy-g hirotom1107@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                                imports.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - useImplicitAuth - - - -
// https://login.eveonline.com/v2/oauth/authorize/?response_type=token&redirect_uri=<redirect_uri>&client_id=<client_id>&scope=esi-characterstats.read.v1&state=login
import * as util from "./util";
import { TEVECharacterYearlyStat } from "./components/chart/yearly-stat-chart";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                            constants, types
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * modify from SSOVerifyResponse
 */
export type SSOVerifyResult = {
    /** EVE character ID. */
    characterId: number;
    /** EVE character name. */
    characterName: string;
    /** ESI scopes. */
    scopes: string[];
    /** unused. (Especially not necessary data */
    type: string;
    /** unused. (Especially not necessary data */
    characterOwnerHash: string;
};
export type EVECharacterData = Pick<SSOVerifyResult, "characterId" | "characterName">;
/*
{
  "scp": [
    "esi-assets.read_assets.v1",
    "esi-bookmarks.read_character_bookmarks.v1",
    ...
  ],
  "jti": "2761dc47-4355-466c-ab6f-1df84720c320",
  "kid": "JWT-Signature-Key",
  "sub": "CHARACTER:EVE:94892413",
  "azp": "cec4e98a77c84b09a6a174573fa12fac",
  "name": "annony mouse",
  "owner": "moh0x659OHKs+SqpeXqPLr3b7Ss=",
  "exp": 1548351381,
  "iss": "login.eveonline.com"
}
*/
type EVEJWTData = {
    /** esi scopes. */
    scp: string[];
    /** uuid of ? */
    jti: string;
    /** jwt type (?) */
    kid: string;
    /** contains EVE character ID. (e.g - "CHARACTER:EVE:<character_id>") */
    sub: string;
    /** Application client ID. */
    azp: string;
    /** EVE character name. */
    name: string;
    /** owner hash. */
    owner: string;
    /** expire date as 1/1000. (UNIX timestamp */
    exp: number;
    /** issure host name. (?) */
    iss: string;
};

//
// - - - enable debug log? - - -
//
const DEBUG = 0;

const eve_auth_base = "https://login.eveonline.com/v2/oauth/authorize/";
// TODO: where do you want to fix redirect_uri?
const redirect_uri = "https://r5xwjo0x7m.codesandbox.io/callback/dummy.html";
const client_id = "2bb259b381244ca89501b72a8faa827a";
const scope = "esi-characterstats.read.v1";

const debugLog = (tag: string, args?: any) => {
    DEBUG && console.log(`${tag}, authWindow:`, authWindow, args);
};
const ALERT_MSG = "Failed to authorize your character, please try again.";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                         module vars, functions.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// DEVNOTE: cleanup beforeunload
window.addEventListener(
    "beforeunload",
    e => {
        DEBUG && console.log(e);
        authWindow && authWindow.close();
    },
    { once: true }
);

const createAuthUrl = () => {
    return `${eve_auth_base}?response_type=token&redirect_uri=${encodeURIComponent(
        redirect_uri
    )}&client_id=${client_id}&scope=${scope}&state=login`;
};

let authWindow: Window | null = null;
let authCallback: <T extends TEVECharacterYearlyStat[]>(
    jsonData: T,
    characterData: EVECharacterData
) => void;

/**
 * shared for `Window` and `Electron.BrowserWindow`.
 */
const closeHandler = (/* e?: Event */): void => {
    DEBUG && debugLog("closeHandler:: enter");
    if (authWindow !== null) {
        authWindow.close();
        authWindow = null;
    }
};
/** for auth process guard. */
let guardCounter = 0;

/**
 *
 * @param url
 * @param sso
 * @returns `true` if authentication process started successfully, otherwise `false`
 */
function handleCallbackResponse(url: string): boolean {
    if (guardCounter > 0) {
        DEBUG && console.log("handleCallbackResponse::running!!", guardCounter);
        return false;
    }

    const error = /\?error=(.+)$/.test(url);
    const matches = /access_token=([^&]*)/.exec(url);
    const access_token = (matches && matches[1]) || void 0;

    if (access_token || error) {
        closeHandler();
    }

    if (access_token) {
        DEBUG &&
            console.log(
                "handleCallbackResponse:: got access_token, guardCounter:",
                guardCounter++
            );

        const verifyData = verify(access_token);
        const esi_base = "https://esi.evetech.net/latest/";
        // https://esi.evetech.net/latest/characters/<character_id>/stats/?datasource=tranquility&token=<access_token>
        const esi_url = `${esi_base}characters/${
            verifyData.characterId
        }/stats/?datasource=tranquility&token=${access_token}`;

        // DEVNOTE: async process
        fetch(esi_url)
            .then(async response => {
                const ys = <Parameters<typeof authCallback>[0]>await response.json();
                DEBUG && console.log(ys);
                authCallback(ys, verifyData);
                DEBUG && debugLog("fetch.then:: exit");
            })
            .catch(reason => {
                console.warn(reason);
            });

        return true;
    } else if (error) {
        alert(ALERT_MSG);
    }

    return false;
}
/**
 * SSO v2 `accessToken` contains json data as base64 encoded.
 *
 * @date 2019-01-26
 * @private
 * @param {string} accessToken
 * @returns {SSOVerifyResult} modified or convert from `JWT` data.
 */
// TODO: 2019-3-14 23:57:33 - EVEJWTData による auth data の簡素化
function verify(accessToken: string): SSOVerifyResult {
    const data = atob(accessToken.split(".")[1]);
    const jwt: EVEJWTData = JSON.parse(data);
    return {
        characterId: parseInt(jwt.sub.split(":")[2]),
        characterName: jwt.name,
        scopes: jwt.scp,
        type: jwt.kid,
        characterOwnerHash: jwt.owner
    } as SSOVerifyResult;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                       class or namespace declare.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const AuthEventMarshaller = {
    // DEVNOTE: cannot change value "enable" when access with "this" keyword.
    // must access with AuthEventMarshaller
    enable: false,
    // timerId: null,
    _handleMessage: function(e: MessageEvent): any {
        DEBUG && debugLog("AuthEventMarshaller::_handleMessage enter");
        const data = e.data as string;
        if (handleCallbackResponse(data)) {
            DEBUG && console.log("authorize process running...");
            window.removeEventListener("message", this._handleMessage, false);
            AuthEventMarshaller.enable = false;
        }
    },
    listen: function(): void {
        DEBUG && debugLog(`AuthEventMarshaller::listen enter`, this);
        if (!AuthEventMarshaller.enable) {
            DEBUG && console.log("initializeing message event...");
            window.addEventListener("message", this._handleMessage, false);
            AuthEventMarshaller.enable = true;
        }
    }
};
/**
 *
 */
export function launchAuthWindow(callback: typeof authCallback) {
    DEBUG && debugLog("launchAuthWindow:: enter");
    if (authWindow !== null && !authWindow.closed) {
        console.warn("auth window already launched");
        return;
    }

    authCallback = callback;
    AuthEventMarshaller.listen();

    // clear guard counter
    guardCounter = 0;
    authWindow = util.openWindow(createAuthUrl(), { width: 450, height: 700 });
    // DEVNOTE: cannot work
    // authWindow.addEventListener("load", () => {
    //     DEBUG && debugAuthWindow("authWindow::load");
    //     authWindow!.addEventListener("beforeunload", e => console.error(e));
    // });
    DEBUG && debugLog("launchAuthWindow:: exit");
}
