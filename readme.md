[![LICENSE](https://img.shields.io/badge/Lisence-AGPLv3-blue.svg)](http://www.gnu.org/licenses/agpl-3.0.en.html) [![Netlify Status](https://api.netlify.com/api/v1/badges/6088402e-62ec-449a-92ee-d987c4eec4b2/deploy-status)](https://app.netlify.com/sites/eve-character-ystat/deploys)

# [EVE online] Character yearly stat chart

Display ESI endpoint [`/characters/{character_id}/stats/`](https://esi.evetech.net/ui/#/Character/get_characters_character_id_stats) as a chart.

sample site: https://eve-character-ystat.netlify.com/

> ## Getting Started

Developed on [codesandbox](https://codesandbox.io/s/r5xwjo0x7m)

> ## details

-   EVE SSO Authentication with implicit flow, which fire ESI request with an access token with an expiration of 20 minutes.

-   developmented core components for chart display with minimal dependencies.
    -   core components: `src/components/chart/\*.tsx`
        -   `react@latest` `recharts@latest` `d3-scale@latest`
        *   by adding the above packages, **it can be reused by other react applications**.

> ## ♻️ development in local

If you want to clone to local and execute or edit

```sh
git clone https://github.com/jeffy-g/eve-character-ystat-chart.git
cd ./eve-character-ystat-chart
yarn install
yarn start
```

> ## Authors

-   **jeffy-g** - [jeffy-g](https://github.com/jeffy-g)

> ## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details

> ## CCP Copyright Notice

EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide.

All other trademarks are the property of their respective owners.  
EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP hf. All artwork,  
screenshots, characters, vehicles, storylines, world facts or other recognizable features of the intellectual property  
relating to these trademarks are likewise the intellectual property of CCP hf.

CCP hf. has granted permission to `eve-character-ystat-chart` to use EVE Online and all associated logos  
and designs for promotional and information purposes on its website but does not endorse,  
and is not in any way affiliated with, `eve-character-ystat-chart`.

CCP is in no way responsible for the content on or functioning of this website,  
nor can it be liable for any damage arising from the use of this website.
