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
import * as React from "react";

import LineBarAreaComposedChart from "./composed-chart";

import {
    EVEYearlyStat,
    TEVECharacterYearlyStat,
    TEVECharacterYearlyStats,
    TChartComponentType
} from "./composed-chart";

// - - - re exports
export type EVEYearlyStat = EVEYearlyStat;
// type Partial<T> = { [P in keyof T]+?: T[P] };
export type TEVECharacterYearlyStat = TEVECharacterYearlyStat;
export type TEVECharacterYearlyStats = TEVECharacterYearlyStats;

// - - - this module types
export type EVECharacterData = {
    /** EVE character ID. */
    characterId: EVEId;
    /** EVE character name. */
    characterName: string;
};
export type EVECharacterYearlyStatChartProps = {
    stats: TEVECharacterYearlyStat[];
    characterData?: EVECharacterData;
};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                            constants, types
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - enable debug log? - - -
//
const DEBUG = 0;
/**
 * NOTE:
 * ```
  "/corporation/{corpID}_{width}.png"
  "/type/{typeID}_{width}.png" ...

  "/character/{characterID}_{width}.jpg"
 ```
 *  ***extension are 2 type**.
 *
 */
const EVE_IMAGE_SERVER_URL = "https://image.eveonline.com";


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                         module vars, functions.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * NOTE: with modify stats
 *
 * @param stats
 */
const collectActualCategories = (stats: TEVECharacterYearlyStat[]) => {
    const propertyNames: string[] = [];
    for (const yearStat of stats) {
        const categories = Object.keys(yearStat);
        // DEVNOTE: tried sort by value but nothing effect
        // {
        //     for (let index = 0; index < categories.length; index++) {
        //         const category = categories[index];
        //         if (category === "year" || category === "isk") {
        //             continue;
        //         }
        //         const categoryObject = yearStat[category] as StringMap<number>;
        //         const keysInCatetory = Object.keys(categoryObject);
        //         const newcategoryObject: StringMap<number> = {};
        //         let prefix = 1; // 効果なし
        //         keysInCatetory
        //             .sort((a, b) => {
        //                 return categoryObject[a]! - categoryObject[b]!;
        //             })
        //             .forEach(key => (newcategoryObject[key] = categoryObject[key]));
        //         console.log(keysInCatetory);
        //         console.log(newcategoryObject);
        //         yearStat[category] = newcategoryObject;
        //     }
        // }
        for (const category of categories) {
            if (category !== "year") {
                !propertyNames.includes(category) && propertyNames.push(category);
            }
        }
    }
    return propertyNames;
};

const EVECharacterImage = React.memo(
    (props: EVECharacterData = {} as EVECharacterData) => {
        const {
            characterId = "0",
            characterName = "anonymouse"
        } = props;
        DEBUG && console.log("EVECharacterImage:: enter, characterId:", characterId);
        return (
            <img
                alt=""
                title={characterName}
                width="24"
                style={{ verticalAlign: "middle" }}
                src={`${EVE_IMAGE_SERVER_URL}/character/${characterId}_32.jpg`}
            />
        );
    },
    (pp, np) => pp!.characterId === np!.characterId
);


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                       class or namespace declare.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const selectStyle = {
    margin: "2px 4px 1px 4px",
    borderRadius: 3,
    borderColor: "rgba(192, 192, 192, 0.53)"
} as React.CSSProperties;

const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(192, 192, 192, 0.48)",
    height: 28
} as React.CSSProperties;
/**
 * 
 * @param param0 EVECharacterYearlyStatChartProps
 */
export default function EVECharacterYearlyStatChart({
    stats,
    characterData
}: EVECharacterYearlyStatChartProps) {
    //
    DEBUG && console.log("EVECharacterYearlyStatChart:: enter");
    const [cacheStats, categories] = React.useMemo<[TEVECharacterYearlyStat[], string[]]>(
        () => {
            DEBUG && console.log("EVECharacterYearlyStatChart:: in React.useMemo");
            stats.sort((a, b) => {
                return (a.year as number) - (b.year as number);
            });
            // use cache.
            const categories = collectActualCategories(stats);
            return [stats, categories];
        },
        [stats]
    );

    const [category, updateCategory] = React.useState("character");
    const [ctype, updateType] = React.useState("bar" as TChartComponentType);

    const categoryRef = React.useRef<HTMLSelectElement | null>(null);
    // DEVNOTE: only focus at first render.
    React.useEffect(() => {
        if (categoryRef.current) {
            // categoryRef.current.focus();
        }
        return () => {
            categoryRef.current = null;
        };
    }, []);

    const categorySelect = React.useMemo(() => {
        DEBUG && console.log("EVECharacterYearlyStatChart@categorySelect in React.useMemo");
        return (
            <select
                ref={categoryRef}
                style={selectStyle}
                defaultValue={category}
                onChange={e => {
                    updateCategory(e.currentTarget.value);
                }}
            >
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        );
    }, []);

    const typeSelect = React.useMemo(() => {
        DEBUG && console.log("EVECharacterYearlyStatChart@typeSelect in React.useMemo");
        return (
            <select
                style={selectStyle}
                defaultValue={ctype}
                onChange={e => {
                    updateType(e.currentTarget.value as TChartComponentType);
                }}
            >
                {["line", "bar", "area"].map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        );
    }, []);

    const character_id = !characterData ? "sample" : characterData.characterId;
    !characterData && (characterData = {} as EVECharacterData);

    return (
        <>
            <div style={headerStyle}>
                <span>{`/characters/${character_id}/stats/:`}</span>
                {categorySelect}
                <span>{", chart type:"}</span>
                {typeSelect}
                <EVECharacterImage {...characterData} />
            </div>
            <LineBarAreaComposedChart
                stats={cacheStats} category={category} type={ctype}
            />
        </>
    );
}
