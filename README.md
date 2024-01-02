<p align="center">
  <h3 align="center">YBS Directory</h3>
  
  <p align="center">
    Yangon Bus Service (YBS) guide mobile application  <br />
  <a href="https://ybs-directory.akkhayar.com/"><strong>Try Now »</strong></a>
  </p>
</p>

#### Built With [Sveltekit](https://kit.svelte.dev/)

## Contributing

ဤပရောဂျက်ကိုစတင်ရန် dependencies တွေကို install လုပ်ပါ၊ ပြီးရင် database setup လုပ်ပြီးစလို့ရပ်ပြီ။

```
npm install
```

စတင်ရန်။

```
npm run dev
```

### Setup Database

Dev database တစ်ခုဆောက်ရန် အောက်ပါ command အား terminal ထဲသို့ကူးထည့်ပါ။

```bash
npx prisma migrate dev --name initialize

node ./scripts/setupDatabase.js
```

`Bus Data Seeded` ဆိုတဲ့ စာပေါ်လာရင် ရပါပြီ။

### Resources

-   Database design and API spec: [YBS Directory Design](https://docs.google.com/spreadsheets/d/1Q6ZpYY1SJoLgS7RcC3Hd43BCBkl-3pBzAlSL2KB9GMc/edit#gid=0)
-   [Eraser.io Technology diagramming](https://app.eraser.io/workspace/DCg4rler38qxR7gOFpw1)
-   UI Figma: [YBS Directory UI](https://www.figma.com/file/GZYvYrX6ifqphqYLqmtRpR/YBS?type=design&node-id=0%3A1&mode=design&t=pHOs2oRURsbC7FbE-1)

## Licenses

1. [ဤပရောဂျက်၏လိုင်စဥ်](./LICENSE)။

2. [Geo နှင် မှတ်တိုင်များဆိုင်ရာ OSM မှဒေတာများ၏လိုင်စဉ်](https://opendatacommons.org/licenses/odbl/1-0/)။

## Credits

ဤပရောဂျက်အတွက် အသုံးပြုခဲ့ရသော အခြားပရောဂျက်များကို ကျေးဇူးတင်လျှက်။

-   [Tesseract Myanmar](https://github.com/pndaza/tesseract-myanmar)
-   [OSRM](https://project-osrm.org/)
-   [Open Street Map](https://www.openstreetmap.org/about)
-   [Leaflet](https://leafletjs.com/) & [Routing Machine](https://github.com/perliedman/leaflet-routing-machine)
