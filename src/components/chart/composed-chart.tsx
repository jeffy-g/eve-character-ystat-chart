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
// import {
//     ResponsiveContainer,
//     ComposedChart,
//     Line, //LineProps,
//     Area,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     CartesianAxisProps
//     // Label,
// } from "recharts";

// DEVNOTE: these import statement are best solution for bundler. however, cannot refer to type definition.
// @ts-ignore
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
// @ts-ignore
import ComposedChart from "recharts/lib/chart/ComposedChart";
// @ts-ignore
import Line from "recharts/lib/cartesian/Line";
// @ts-ignore
import Area from "recharts/lib/cartesian/Area";
// @ts-ignore
import Bar from "recharts/lib/cartesian/Bar";
// @ts-ignore
import XAxis from "recharts/lib/cartesian/XAxis";
// @ts-ignore
import YAxis from "recharts/lib/cartesian/YAxis";
// @ts-ignore
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
// @ts-ignore
import Tooltip from "recharts/lib/component/Tooltip";
// @ts-ignore
import Legend from "recharts/lib/component/Legend";

import {
    CartesianAxisProps,
    LegendPayload,
    // TooltipFormatter
} from "recharts";

// @ts -ignore 
import { scaleSqrt } from "d3-scale";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                            constants, types
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - enable debug log? - - -
//
const DEBUG = 0;

export type TYearlyStatProperties = "character" | "combat" | "industry" | "inventory" | "isk" | "market" | "mining" | "module" | "orbital" | "pve" | "social" | "travel";
export type EVEYearlyStat = {
    [category in TYearlyStatProperties]: StringMap<number> | number;
};
// type Partial<T> = { [P in keyof T]+?: T[P] };
export type TEVECharacterYearlyStat = Partial<EVEYearlyStat> & { year: number };
export type TEVECharacterYearlyStats = TEVECharacterYearlyStat[];

export type TChartComponentType = "line" | "bar" | "area";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                         module vars, functions.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const unity = (): number => {
    return ~~(Math.random() * 255);
};
function randomCSSRgba(alpha: number): string {
    // if (alpha < 0) {
    //     alpha = 0;
    // } else if (alpha > 1) {
    //     alpha = 1;
    // }
    return `rgba(${unity()}, ${unity()}, ${unity()}, ${alpha})`;
}

/**
 *
 * @param category name in `TYearlyStatProperties`
 */
function collectExistsProperties(category: TYearlyStatProperties, stats: TEVECharacterYearlyStats) {
    const propertyNames: string[] = [];
    for (const yearStat of stats) {
        const categoryObject = yearStat[category];
        if (categoryObject !== void 0) {
            for (const property of Object.keys(categoryObject)) {
                !propertyNames.includes(property) && propertyNames.push(property);
            }
        }
    }
    return propertyNames;
}

// ...
// const MemorizedLine = React.memo((props: LineProps) => {
//     DEBUG && console.log("MemorizedLine:: enter");
//     return <Line {...props}/>;
// }, (pp, np) => pp.strokeOpacity === np.strokeOpacity);

// const colors = new Array(100).fill("").map(() => randomCSSRgba(1));
// const fillColors = new Array(100).fill("").map(() => randomCSSRgba(0.2));

/**
 * collect data by category name from /characters/{character_id}/stats/
 *
 * @param category "character" | "combat" | "industry" | "inventory" | "isk" |
 *      "market" | "mining" | "module" | "orbital" (PvP) | "pve" | "social" | "travel"
 */
function createChartComponentsBy(
    stats: TEVECharacterYearlyStats,
    category: TYearlyStatProperties,
    type: TChartComponentType,
    opacitizeKey: string = ""
) {

    const propertyNames = React.useMemo(() => {
        DEBUG && console.log("createChartComponentsBy.propertyNames in React.useMemo");
        return collectExistsProperties(category, stats);
    }, [category]);

    const randomColors = React.useMemo(() => {
        DEBUG && console.log("createChartComponentsBy.randomColors in React.useMemo");
        return new Array(propertyNames.length).fill("").map(() => randomCSSRgba(1));
    }, [category]);

    const components: React.ReactNode[] = [];
    // const components = React.useMemo(() => {
    //     console.log("createChartComponentsBy.components in React.useMemo");
    //     return [] as React.ReactNode[];
    // }, [category, type]);

    const DEFAULT_OPACITY = 0.4;

    // if (components.length === 0) {

    let colorIndex = 0;
    for (const property of propertyNames) {

        const keyPath = `${category}.${property}`;
        const color = randomColors[colorIndex++];
        // const color = randomCSSRgba(0.78);
        const opacity = opacitizeKey === keyPath ? 1 : DEFAULT_OPACITY;

        // DEVNOTE: Only the "isk" category seems to use negative value.
        // btw, stackId value accept empty string.
        const sid = category === "isk" ? void 0 : "dummy";
        let component: React.ReactNode;

        switch (type) {
            case "line":
                // type props:
                // 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' |
                // 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' |
                // 'step' | 'stepBefore' | 'stepAfter' | Function
                // useful: linear monotoneX monotoneY? monotone step

                // legendType props:
                // 'line' | 'square' | 'rect'| 'circle' | 'cross' |
                // 'diamond' | 'star' | 'triangle' | 'wye' | 'none'
                // useful: line square rect ..., "none" is hide legendType
                component = (
                    <Line key={keyPath}
                        strokeOpacity={opacity}
                        type="monotone" legendType="line" dataKey={keyPath} stroke={color}
                    />
                );
                break;
            case "bar":
                component = (
                    <Bar key={keyPath}
                        fillOpacity={opacity}
                        fill={color}
                        // stroke={strokeColor} strokeWidth={2}
                        dataKey={keyPath}
                        barSize={40}
                        background={{ fill: "rgba(210, 210, 210, 0.2)" }}
                    // stackId={sid}
                    // legendType="rect" // default: rect
                    />
                );
                break;
            default:
                // area
                component = (
                    <Area key={keyPath} // dot
                        fillOpacity={opacity}
                        fill={color}
                        stroke={color}
                        type="monotone" dataKey={keyPath}
                        stackId={sid}
                    />
                );
                break;
        }
        components.push(component);
    }
    // } else {
    // // DEVNOTE: bit heavy..., use with - const components = React.useMemo...
    // type TempProps = {
    //     dataKey: string;
    //     strokeOpacity: number;
    //     fillOpacity: number;
    // };
    // // console.log("components.findIndex");
    // const revert = opacitizeKey[0] === "!";
    // revert && (opacitizeKey = opacitizeKey.substr(1));
    // const x = components.findIndex(node => {
    //     return (node as React.ReactElement<TempProps>).props.dataKey === opacitizeKey;
    // });
    // if (x >= 0) {
    //     const old = components[x] as React.ReactElement<TempProps>;
    //     const opacity = revert ? DEFAULT_OPACITY: 1;
    //     // console.log("element found, ", old);
    //     components[x] = React.cloneElement(old, { strokeOpacity: opacity, fillOpacity: opacity });
    // }
    // }

    return components;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                       class or namespace declare.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type CustomizedYAxisTickProps = CartesianAxisProps & { payload?: { value: number } };
// /**
//  *
//  */
// class CustomizedYAxisTick extends React.Component<CustomizedYAxisTickProps> {
//     constructor(props: CustomizedYAxisTickProps) {
//         super(props);
//     }
//     shouldComponentUpdate(np: CustomizedYAxisTickProps) {
//         return this.props.payload!.value !== np.payload!.value || this.props.y !== np.y;
//     }
//     render() {
//         const { x, y /* , stroke */, payload } = this.props;
//         // console.log(this.props);
//         const tick = payload!.value;
//         const tickText = tick < 1e3 ? tick : (tick / 1e3).toLocaleString() + "k";
//         return (
//             <g transform={`translate(${x}, ${y})`}>
//                 <text
//                     x={0} y={0} dy={0}
//                     fontSize={11} textAnchor="end" fill="#999"
//                     transform="rotate(-35)"
//                 >
//                     {tickText}
//                 </text>
//             </g>
//         );
//     }
// }
/**
 * 
 */
const CustomizedYAxisTick = React.memo((props: CustomizedYAxisTickProps) => {
    const { x, y /* , stroke */, payload } = props;
    // print CartesianAxisProps
    // console.log(this.props);
    DEBUG && console.log("CustomizedYAxisTick:: in React.memo");
    const tick = payload!.value;
    const tickText = tick < 1e3 ? tick : (tick / 1e3).toLocaleString() + "k";
    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                x={0} y={0} dy={0}
                fontSize={11} textAnchor="end" fill="#999"
                transform="rotate(-35)"
            >
                {tickText}
            </text>
        </g>
    );
}, (pp, np) => pp.payload!.value === np.payload!.value && pp.y === np.y);

// DEVNOTE: scaleSqrt.exponent - default maybe 0.5
const yScaler = scaleSqrt().exponent(0.3);

const cutoff = (p: string) => {
    return p.substr(p.indexOf(".") + 1);
}

/**
 *
 * @param props
 */
const LineBarAreaComposedChart = (props: {
    stats: TEVECharacterYearlyStats;
    /**
     * default is "travel"
     */
    category?: TYearlyStatProperties;
    /**
     * default is "line"
     */
    type?: TChartComponentType;
}) => {

    const { stats, category = "travel", type = "line" } = props;

    const [opacitizeKey, changeOpacitizeKey] = React.useState("");
    const mouseEnterHandler = React.useCallback((context: { dataKey: string }) => {
        // console.log("enter");
        // console.log(
        //     JSON.stringify(context, null, 2)
        // );
        changeOpacitizeKey(context.dataKey);
    }, []);
    const mouseLeaveHandler = React.useCallback((context: { dataKey: string }) => {
        // console.log("leave");
        changeOpacitizeKey("!" + context.dataKey);
    }, []);

    return (
        <ResponsiveContainer>
            <ComposedChart
                // width={600} height={400}
                data={stats}
                margin={{ top: 20, right: 10, bottom: 20, left: 20 }}
            >
                <CartesianGrid stroke="#edededa5" />
                <XAxis dataKey="year" />
                {/* scale:
                    'auto' | 'linear' | 'pow' | 'sqrt' |
                    'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal' |
                    'quantile' | 'quantize' | 'utc' | 'sequential' | 'threshold' | Function
                */}
                <YAxis scale={yScaler} tick={<CustomizedYAxisTick />} />
                <Tooltip
                    wrapperStyle={{ fontSize: 9 }}
                    cursor={{ stroke: "red" }}
                    formatter={(value: string, name: string/* , props */) => {
                        // console.log(props);
                        return [value.toLocaleString(), cutoff(name)];
                    }}
                />
                {/* verticalAlign - DEFAULT: 'middle'? */}
                <Legend
                    align="left"
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: 10 }}
                    formatter={(value: string, entry: LegendPayload/* , index */) => {
                        // console.log(entry);
                        return <span style={{ color: entry!.color }}>{cutoff(value)}</span>;
                    }}
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                />
                {createChartComponentsBy(stats, category, type, opacitizeKey)}
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default LineBarAreaComposedChart;
