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
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    CartesianAxisProps
    // Label,
} from "recharts";

import { scaleSqrt } from "d3-scale";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                            constants, types
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type EVEYearlyStat = {
    [category: string]: StringMap<number> | number;
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
    if (alpha < 0) {
        alpha = 0;
    } else if (alpha > 1) {
        alpha = 1;
    }
    return `rgba(${unity()}, ${unity()}, ${unity()}, ${alpha})`;
}

/**
 *
 * @param category name in `KEVEYearStat`
 */
function collectExistsProperties(category: string, stats: TEVECharacterYearlyStats) {
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
/**
 * collect data by category name from /characters/{character_id}/stats/
 *
 * @param category "character" | "combat" | "industry" | "inventory" | "isk" | "market" | "mining" | "module" | "pve" | "social" | "travel"
 */
function createChartComponentsBy(
    category: string,
    stats: TEVECharacterYearlyStats,
    type: TChartComponentType = "line"
) {
    const components: React.ReactNode[] = [];
    const propertyNames = collectExistsProperties(category, stats);
    for (const property of propertyNames) {
        const keyPath = `${category}.${property}`;
        const color = randomCSSRgba(0.78);
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
                // 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | 'none'
                // useful: line square rect ..., "none" is hide legendType
                component = (
                    <Line key={keyPath}
                        type="monotone" legendType="line" dataKey={keyPath} stroke={color}
                    />
                );
                break;
            case "bar":
                // DEVNOTE: Only the "isk" category seems to use negative value.
                // btw, stackId value accept empty string.
                const sid = category === "isk" ? void 0 : "dummy";
                component = (
                    <Bar key={keyPath}
                        dataKey={keyPath} barSize={80} fill={color}
                        stackId={sid}
                        // legendType="square" // default: rect
                    />
                );
                break;
            default:
                // area
                component = (
                    <Area key={keyPath}
                        dot type="monotone" dataKey={keyPath} fill={color} stroke={color}
                        stackId="bar0"
                    />
                );
                break;
        }
        components.push(component);
    }
    return components;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                       class or namespace declare.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type CustomizedYAxisTickProps = CartesianAxisProps & { payload?: { value: number } };
/**
 *
 */
class CustomizedYAxisTick extends React.Component<CustomizedYAxisTickProps> {
    constructor(props: CustomizedYAxisTickProps) {
        super(props);
    }
    shouldComponentUpdate(np: CustomizedYAxisTickProps) {
        return this.props.payload!.value !== np.payload!.value || this.props.y !== np.y;
    }
    render() {
        const { x, y /* , stroke */, payload } = this.props;
        // console.log(this.props);
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
    }
}

// DEVNOTE: scaleSqrt.exponent - default maybe 0.5
const yScaler = scaleSqrt().exponent(0.34);

/**
 *
 * @param props
 */
const LineBarAreaComposedChart = (props: {
    stats: TEVECharacterYearlyStats;
    /**
     * default is "travel"
     */
    category?: string;
    /**
     * default is "bar"
     */
    type?: TChartComponentType;
}) => {
    const { stats, category = "travel", type = "bar" } = props;
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
                <Tooltip wrapperStyle={{ fontSize: 9 }} />
                {/* verticalAlign - DEFAULT: 'middle'? */}
                <Legend
                    align="left"
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: 10 }}
                />
                {/*
                    "character" | "combat" | "industry" | "inventory" |
                    "isk" | "market" | "mining" | "module" | "pve" | "social" | "travel"
                */}
                {createChartComponentsBy(category, stats, type)}
                {/* {lookupBy("travel")} */}
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default LineBarAreaComposedChart;
