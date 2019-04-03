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

import React from "react";
import ReactDOM from "react-dom";

import sampleStats from "./sample-data";
import EVECharacterYearlyStatChart, {
    TEVECharacterYearlyStat
} from "./components/chart/yearly-stat-chart";
import { launchAuthWindow, EVECharacterData } from "./eve-api";

import "./styles.scss";

const rootElement = document.getElementById("root");
const openAuth = document.getElementById("openAuth");
const darkCheck = document.querySelector(".theme-dark");

/**
 *
 *
 * @param stats
 * @param characterData
 */
const renderComponent = (
    stats: TEVECharacterYearlyStat[],
    characterData?: EVECharacterData
) => {
    const root = rootElement!;
    if (root === null) {
        throw Error("cannot render react components!");
    }
    if (root.children.length) {
        ReactDOM.unmountComponentAtNode(root);
    }
    ReactDOM.render(
        <EVECharacterYearlyStatChart stats={stats} characterData={characterData} />,
        rootElement
    );
};

// const recieveMessage = (/** @type {MessageEvent} */ e) => {
//     console.log(e.data);
//     window.removeEventListener("message", recieveMessage, false);
// };
// window.addEventListener("message", recieveMessage, false);

openAuth!.addEventListener("click", () => {
    launchAuthWindow(renderComponent);
});
darkCheck!.addEventListener("change", function(this: HTMLInputElement) {
    const method = this.checked ? "add" : "remove";
    document.body.classList[method]("dark");
});

renderComponent(sampleStats);
