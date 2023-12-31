<p align="center">
  <h3 align="center">YBS Directory</h3>
  
  <p align="center">
    Yangon Bus Service (YBS) guide mobile application  <br />
  <a href="https://docs.akkhayar.com/"><strong>Learn more »</strong></a>
  </p>
</p>

#### Built With

[Sveltekit](https://kit.svelte.dev/) · [Capicator](https://capacitorjs.com/) · [prisma.io](https://www.prisma.io/)

## Development

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

## Licenses

1. [ဤပရောဂျက်၏လိုင်စဥ်](./LICENSE)။

2. [Geo နှင် မှတ်တိုင်များဆိုင်ရာ OSM မှဒေတာများ၏လိုင်စဉ်](https://opendatacommons.org/licenses/odbl/1-0/)။

## Credits

ဤပရောဂျက်အတွက် အသုံးပြုခဲ့ရသော အခြားပရောဂျက်များကို ကျေးဇူးတင်လျှက်။

- [Tesseract Myanmar](https://github.com/pndaza/tesseract-myanmar)
- [OSRM](https://project-osrm.org/)
- [Open Street Map](https://www.openstreetmap.org/about)
- [Leaflet](https://leafletjs.com/) & [Routing Machine](https://github.com/perliedman/leaflet-routing-machine)
