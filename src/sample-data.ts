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

const sampleStats = [
    {
        character: {
            days_of_activity: 86,
            sessions_started: 201,
            minutes: 24014
        },
        combat: {
            deaths_high_sec: 4,
            damage_to_players_hybrid_num_shots: 4,
            damage_from_players_hybrid_num_shots: 4,
            kills_high_sec: 25,
            warp_scrambledby_npc: 88,
            webifiedby_npc: 166,
            probe_scans: 272,
            damage_to_players_hybrid_amount: 1500,
            damage_from_players_hybrid_amount: 1500,
            repair_hull_self_amount: 3235,
            dscans: 5061,
            npc_flag_set: 6312,
            repair_capacitor_self_amount: 14370,
            drone_engage: 26696,
            repair_shield_self_amount: 399918,
            repair_armor_self_amount: 1325579,
            damage_from_np_cs_num_shots: 264653,
            damage_from_np_cs_amount: 2622658
        },
        industry: {
            hacking_successes: 562,
            jobs_completed_copy_blueprint: 3,
            jobs_completed_manufacture: 15,
            jobs_completed_manufacture_module: 13,
            jobs_completed_manufacture_module_quantity: 26,
            jobs_completed_manufacture_other: 2,
            jobs_completed_manufacture_other_quantity: 3,
            jobs_completed_material_productivity: 3,
            jobs_started_copy_blueprint: 3,
            jobs_started_manufacture: 16,
            jobs_started_material_productivity: 1,
            reprocess_item: 111,
            reprocess_item_quantity: 14594
        },
        inventory: {
            abandon_loot_quantity: 884532,
            trash_item_quantity: 8
        },
        isk: {
            in: 6321969455,
            out: -6267577575
        },
        market: {
            accept_contracts_item_exchange: 13,
            buy_orders_placed: 55,
            create_contracts_item_exchange: 13,
            isk_gained: 6040429474,
            isk_spent: 6112700474,
            search_contracts: 61,
            sell_orders_placed: 34
        },
        mining: {
            drone_mine: 57,
            ore_plagioclase: 195599,
            ore_pyroxeres: 23448,
            ore_scordite: 20902,
            ore_veldspar: 10373
        },
        module: {
            activations_hybrid_weapon: 4059,
            activations_probe_launcher: 64,
            activations_strip_miner: 35,
            link_weapons: 77,
            overload: 14
        },
        pve: {
            dungeons_completed_agent: 11,
            dungeons_completed_distribution: 204,
            missions_succeeded: 19
        },
        social: {
            add_contact_bad: 2,
            add_contact_good: 4,
            add_contact_horrible: 6,
            add_contact_neutral: 1,
            add_note: 100,
            added_as_contact_bad: 1,
            added_as_contact_good: 1,
            added_as_contact_high: 2,
            added_as_contact_neutral: 2,
            chat_messages_fleet: 3,
            chat_messages_solarsystem: 20,
            chat_total_message_length: 9235,
            direct_trades: 131,
            fleet_joins: 77
        },
        travel: {
            acceleration_gate_activations: 593,
            align_to: 829,
            distance_warped_high_sec: 46902,
            distance_warped_low_sec: 2203,
            docks_high_sec: 490,
            docks_low_sec: 1,
            jumps_stargate_high_sec: 1384,
            jumps_stargate_low_sec: 21,
            warps_high_sec: 3003,
            warps_low_sec: 144,
            warps_to_bookmark: 309,
            warps_to_celestial: 2215,
            warps_to_fleet_member: 138,
            warps_to_scan_result: 34
        },
        year: 2017
    },
    {
        character: {
            days_of_activity: 20,
            minutes: 7043,
            sessions_started: 54
        },
        combat: {
            damage_from_np_cs_amount: 1127573,
            damage_from_np_cs_num_shots: 180841,
            drone_engage: 4500,
            dscans: 942,
            npc_flag_set: 723,
            probe_scans: 245,
            repair_armor_self_amount: 838838,
            repair_shield_self_amount: 54335,
            warp_scrambledby_npc: 122,
            webifiedby_npc: 89
        },
        industry: {
            hacking_successes: 232,
            jobs_completed_manufacture: 4,
            jobs_completed_manufacture_other: 4,
            jobs_completed_manufacture_other_quantity: 8,
            jobs_started_manufacture: 4,
            jobs_started_material_productivity: 3,
            reprocess_item: 137,
            reprocess_item_quantity: 1287
        },
        inventory: {
            abandon_loot_quantity: 17
        },
        isk: {
            in: 2053990045,
            out: -2413103933
        },
        market: {
            accept_contracts_item_exchange: 5,
            buy_orders_placed: 10,
            cancel_market_order: 2,
            create_contracts_item_exchange: 1,
            isk_gained: 1377869201,
            isk_spent: 1361022701,
            modify_market_order: 8,
            search_contracts: 22,
            sell_orders_placed: 29
        },
        mining: {
            drone_mine: 1,
            ore_hedbergite: 2148
        },
        module: {
            activations_hybrid_weapon: 969,
            activations_probe_launcher: 63,
            activations_strip_miner: 1,
            link_weapons: 80
        },
        pve: {
            dungeons_completed_agent: 1,
            dungeons_completed_distribution: 17,
            missions_succeeded: 2
        },
        social: {
            add_note: 55,
            chat_messages_solarsystem: 1,
            chat_total_message_length: 671,
            direct_trades: 11,
            fleet_joins: 3
        },
        travel: {
            acceleration_gate_activations: 101,
            align_to: 114,
            distance_warped_high_sec: 8277,
            docks_high_sec: 97,
            jumps_stargate_high_sec: 245,
            warps_high_sec: 524,
            warps_to_bookmark: 43,
            warps_to_celestial: 372,
            warps_to_fleet_member: 2,
            warps_to_scan_result: 26
        },
        year: 2016
    },
    {
        character: {
            days_of_activity: 229,
            minutes: 111730,
            sessions_started: 523
        },
        combat: {
            cap_drainedby_npc: 22,
            criminal_flag_set: 7,
            damage_from_np_cs_amount: 13342937,
            damage_from_np_cs_num_shots: 2009119,
            damage_from_players_combat_drone_amount: 19965,
            damage_from_players_combat_drone_num_shots: 216,
            damage_from_players_hybrid_amount: 23403,
            damage_from_players_hybrid_num_shots: 26,
            damage_from_players_missile_amount: 2783,
            damage_from_players_missile_num_shots: 15,
            damage_from_players_projectile_amount: 34033,
            damage_from_players_projectile_num_shots: 27,
            damage_to_players_combat_drone_amount: 1318,
            damage_to_players_combat_drone_num_shots: 2,
            damage_to_players_hybrid_amount: 9000,
            damage_to_players_hybrid_num_shots: 18,
            deaths_high_sec: 8,
            drone_engage: 191496,
            dscans: 16430,
            kills_high_sec: 183,
            npc_flag_set: 42662,
            probe_scans: 4959,
            repair_armor_by_remote_amount: 13331,
            repair_armor_remote_amount: 13691,
            repair_armor_self_amount: 8318400,
            repair_capacitor_self_amount: 285760,
            repair_shield_self_amount: 1331073,
            warp_scrambledby_npc: 975,
            weapon_flag_set: 4,
            webifiedby_npc: 828
        },
        industry: {
            hacking_successes: 4357,
            jobs_completed_copy_blueprint: 3,
            jobs_completed_invention: 5,
            jobs_completed_manufacture: 46,
            jobs_completed_manufacture_module: 46,
            jobs_completed_manufacture_module_quantity: 183,
            jobs_completed_material_productivity: 3,
            jobs_started_copy_blueprint: 3,
            jobs_started_invention: 5,
            jobs_started_manufacture: 46,
            jobs_started_material_productivity: 3,
            reprocess_item: 390,
            reprocess_item_quantity: 13015
        },
        inventory: {
            abandon_loot_quantity: 865701,
            trash_item_quantity: 695
        },
        isk: {
            in: 21474612453,
            out: -21403824035
        },
        market: {
            accept_contracts_item_exchange: 22,
            buy_orders_placed: 155,
            cancel_market_order: 1,
            create_contracts_item_exchange: 30,
            isk_gained: 2969891293,
            isk_spent: 2963937003,
            modify_market_order: 5,
            search_contracts: 110,
            sell_orders_placed: 89
        },
        mining: {
            ore_arkonor: 31,
            ore_plagioclase: 59665,
            ore_scordite: 76309,
            ore_veldspar: 32864
        },
        module: {
            activations_armor_hardener: 562,
            activations_armor_repair_unit: 3529,
            activations_armor_resistance_shift_hardener: 91,
            activations_automated_targeting_system: 5,
            activations_capacitor_booster: 784,
            activations_cargo_scanner: 1785,
            activations_cloaking_device: 1535,
            activations_damage_control: 3085,
            activations_data_miners: 5056,
            activations_drone_tracking_modules: 134,
            activations_eccm: 1,
            activations_ecm: 26,
            activations_ecm_burst: 1,
            activations_energy_vampire: 259,
            activations_fueled_armor_repairer: 6,
            activations_hybrid_weapon: 16389,
            activations_mining_laser: 1,
            activations_passive_targeting_system: 2,
            activations_probe_launcher: 1243,
            activations_propulsion_module: 11865,
            activations_remote_armor_repairer: 40,
            activations_remote_sensor_damper: 7,
            activations_salvager: 4208,
            activations_sensor_booster: 741,
            activations_shield_booster: 917,
            activations_shield_hardener: 716,
            activations_ship_scanner: 6,
            activations_stasis_web: 4805,
            activations_strip_miner: 16,
            activations_survey_scanner: 23,
            activations_target_painter: 1300,
            activations_tracking_computer: 161,
            activations_tractor_beam: 414,
            activations_warp_scrambler: 20,
            link_weapons: 473,
            overload: 15
        },
        pve: {
            dungeons_completed_agent: 149,
            dungeons_completed_distribution: 873,
            missions_succeeded: 281
        },
        social: {
            add_contact_bad: 20,
            add_contact_good: 10,
            add_contact_high: 4,
            add_contact_horrible: 38,
            add_contact_neutral: 24,
            add_note: 227,
            added_as_contact_bad: 4,
            added_as_contact_good: 1,
            added_as_contact_high: 2,
            added_as_contact_horrible: 1,
            added_as_contact_neutral: 8,
            chat_messages_fleet: 113,
            chat_messages_solarsystem: 81,
            chat_total_message_length: 20565,
            direct_trades: 518,
            fleet_broadcasts: 2,
            fleet_joins: 256,
            mails_received: 14,
            mails_sent: 6
        },
        travel: {
            acceleration_gate_activations: 3484,
            align_to: 4304,
            distance_warped_high_sec: 258970,
            distance_warped_low_sec: 23340,
            distance_warped_wormhole: 166,
            docks_high_sec: 2473,
            docks_low_sec: 14,
            jumps_stargate_high_sec: 7253,
            jumps_stargate_low_sec: 477,
            jumps_wormhole: 2,
            warps_high_sec: 14929,
            warps_low_sec: 1716,
            warps_to_bookmark: 1794,
            warps_to_celestial: 10768,
            warps_to_fleet_member: 619,
            warps_to_scan_result: 583,
            warps_wormhole: 4
        },
        year: 2015
    },
    {
        character: {
            days_of_activity: 132,
            minutes: 100251,
            sessions_started: 301
        },
        combat: {
            cap_drainedby_npc: 80,
            cap_drainedby_pc: 1,
            criminal_flag_set: 2,
            damage_from_np_cs_amount: 2345662,
            damage_from_np_cs_num_shots: 147483,
            damage_from_players_combat_drone_amount: 19405,
            damage_from_players_combat_drone_num_shots: 386,
            damage_from_players_energy_amount: 1662,
            damage_from_players_energy_num_shots: 2,
            damage_from_players_hybrid_amount: 45248,
            damage_from_players_hybrid_num_shots: 518,
            damage_from_players_missile_amount: 5309,
            damage_from_players_missile_num_shots: 10,
            damage_from_players_projectile_amount: 8129,
            damage_from_players_projectile_num_shots: 6,
            damage_from_players_smart_bomb_amount: 528,
            damage_from_players_smart_bomb_num_shots: 11,
            damage_to_players_combat_drone_amount: 271,
            damage_to_players_combat_drone_num_shots: 38,
            damage_to_players_hybrid_num_shots: 40,
            damage_to_players_smart_bomb_amount: 528,
            damage_to_players_smart_bomb_num_shots: 11,
            deaths_high_sec: 7,
            deaths_low_sec: 5,
            deaths_pod_low_sec: 2,
            drone_engage: 40796,
            dscans: 1471,
            engagement_register: 1,
            kills_high_sec: 2,
            npc_flag_set: 8018,
            probe_scans: 576,
            pvp_flag_set: 48,
            repair_armor_remote_amount: 241,
            repair_armor_self_amount: 636614,
            repair_capacitor_self_amount: 909276,
            repair_hull_self_amount: 7430,
            repair_shield_self_amount: 449003,
            warp_scrambledby_npc: 14,
            warp_scrambledby_pc: 10,
            weapon_flag_set: 30,
            webifiedby_npc: 105,
            webifiedby_pc: 2
        },
        industry: {
            hacking_successes: 20,
            jobs_cancelled: 1,
            jobs_completed_copy_blueprint: 3,
            jobs_completed_invention: 4,
            jobs_completed_manufacture: 41,
            jobs_completed_manufacture_charge: 24,
            jobs_completed_manufacture_charge_quantity: 520420,
            jobs_completed_manufacture_drone: 6,
            jobs_completed_manufacture_drone_quantity: 860,
            jobs_completed_manufacture_module: 69,
            jobs_completed_manufacture_module_quantity: 177,
            jobs_completed_manufacture_ship: 6,
            jobs_completed_manufacture_ship_quantity: 27,
            jobs_completed_material_productivity: 10,
            jobs_started_copy_blueprint: 4,
            jobs_started_invention: 4,
            jobs_started_manufacture: 104,
            jobs_started_material_productivity: 27,
            reprocess_item: 749,
            reprocess_item_quantity: 361436
        },
        inventory: {
            abandon_loot_quantity: 178307,
            trash_item_quantity: 50
        },
        isk: {
            in: 3136776044,
            out: -2287757528
        },
        market: {
            accept_contracts_item_exchange: 14,
            buy_orders_placed: 1120,
            cancel_market_order: 35,
            create_contracts_item_exchange: 14,
            isk_gained: 1614712934,
            isk_spent: 1706828636,
            modify_market_order: 116,
            search_contracts: 93,
            sell_orders_placed: 614
        },
        mining: {
            drone_mine: 445,
            ore_arkonor: 20,
            ore_hedbergite: 7267,
            ore_hemorphite: 10100,
            ore_jaspet: 30400,
            ore_kernite: 36260,
            ore_omber: 223006,
            ore_plagioclase: 13311986,
            ore_pyroxeres: 2733826,
            ore_scordite: 5370953,
            ore_veldspar: 11584041
        },
        module: {
            activations_armor_hardener: 37,
            activations_armor_repair_unit: 688,
            activations_armor_resistance_shift_hardener: 74,
            activations_automated_targeting_system: 31,
            activations_capacitor_booster: 1396,
            activations_cargo_scanner: 5,
            activations_cloaking_device: 41,
            activations_damage_control: 906,
            activations_data_miners: 31,
            activations_eccm: 1,
            activations_ecm: 3,
            activations_ecm_burst: 2,
            activations_energy_vampire: 112,
            activations_fueled_armor_repairer: 49,
            activations_fueled_shield_booster: 2,
            activations_hull_repair_unit: 8,
            activations_hybrid_weapon: 7200,
            activations_mining_laser: 1095,
            activations_probe_launcher: 39,
            activations_propulsion_module: 3069,
            activations_remote_armor_repairer: 2,
            activations_remote_sensor_damper: 7,
            activations_salvager: 842,
            activations_sensor_booster: 4,
            activations_shield_booster: 425,
            activations_shield_hardener: 326,
            activations_ship_scanner: 4,
            activations_smart_bomb: 11,
            activations_stasis_web: 1292,
            activations_strip_miner: 1165,
            activations_survey_scanner: 3773,
            activations_target_painter: 2802,
            activations_tracking_computer: 244,
            activations_tractor_beam: 554,
            activations_warp_scrambler: 1,
            link_weapons: 312,
            overload: 41
        },
        pve: {
            dungeons_completed_agent: 398,
            dungeons_completed_distribution: 62,
            missions_succeeded: 955,
            missions_succeeded_epic_arc: 2
        },
        social: {
            add_contact_bad: 6,
            add_contact_high: 7,
            add_contact_horrible: 7,
            add_contact_neutral: 6,
            add_note: 664,
            added_as_contact_bad: 1,
            added_as_contact_good: 2,
            added_as_contact_high: 10,
            added_as_contact_horrible: 1,
            added_as_contact_neutral: 6,
            calendar_event_created: 4,
            chat_messages_fleet: 101,
            chat_messages_solarsystem: 21,
            chat_total_message_length: 8981,
            direct_trades: 277,
            fleet_broadcasts: 4,
            fleet_joins: 104,
            mails_received: 60,
            mails_sent: 14
        },
        travel: {
            acceleration_gate_activations: 913,
            align_to: 398,
            distance_warped_high_sec: 309941,
            distance_warped_low_sec: 16995,
            docks_high_sec: 3532,
            docks_low_sec: 167,
            jumps_stargate_high_sec: 8343,
            jumps_stargate_low_sec: 866,
            jumps_wormhole: 2,
            warps_high_sec: 14054,
            warps_low_sec: 642,
            warps_to_bookmark: 474,
            warps_to_celestial: 12936,
            warps_to_fleet_member: 111,
            warps_to_scan_result: 26
        },
        year: 2014
    }
];

export default sampleStats;
