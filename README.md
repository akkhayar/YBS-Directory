<p align="center">
  <h3 align="center">YBS Directory</h3>
  
  <p align="center">
    Yangon Bus Service (YBS) guide mobile application  <br />
  <a href="https://ybs-directory.akkhayar.com/"><strong>Try Now »</strong></a>
  </p>
</p>

#### 🧡 Built With [Sveltekit](https://kit.svelte.dev/)

## Contributing

ဤပရောဂျက်ကို run ရန် dependencies များကို install လုပ်ပါ၊ ပြီးရင် database setup လုပ်ပြီးစလို့ရပါပြီ။

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

-   UI Figma: [YBS Directory UI](https://www.figma.com/file/GZYvYrX6ifqphqYLqmtRpR/YBS?type=design&node-id=0%3A1&mode=design&t=pHOs2oRURsbC7FbE-1)

## Licenses

၁. [ဤပရောဂျက်၏လိုင်စဥ်။](./LICENSE)

၂. [လိုင်းကား နှင် မှတ်တိုင် ဒေတာ၏လိုင်စဥ်။](https://github.com/thantthet/YBS-Data/blob/master/LICENSE.md)

## Credits

ဤပရောဂျက်အတွက် အသုံးပြုခဲ့ရသော အခြားပရောဂျက်များကို ကျေးဇူးတင်လျှက်။

-   [Tesseract Myanmar](https://github.com/pndaza/tesseract-myanmar)
-   [OSRM](https://project-osrm.org/)
-   [Open Street Map](https://www.openstreetmap.org/about)
-   [Leaflet](https://leafletjs.com/) & [Routing Machine](https://github.com/perliedman/leaflet-routing-machine)
