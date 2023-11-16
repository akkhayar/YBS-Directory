# YBS Directory

[Sveltekit](https://kit.svelte.dev/) · [Capicator](https://capacitorjs.com/) · [prisma.io](https://www.prisma.io/)

## Development

ဒီပရောဂျက်ကိုစတင်ရန် dependencies တွေကို install လုပ်ပါ၊ ပြီးရင် database setup လုပ်ပြီးစလို့ရပ်ပြီ။

```
npm install
```

စတင်ရန်။
```
npm run dev
```

### Setup Database

Development database တစ်ခုဆောက်ဖိုအတွက် အောက်ပါ command ကို terminal ထဲကူးထည့်ပါ။
```bash
npx prisma migrate dev --name initialize

node ./scripts/setupDatabase.js
```

`Bus Data Seeded` ဆိုတဲ့ ထွက်စာပေါ်လာရင် ရပါပြီ။ 

## Credits

ဒီပရောဂျက်ဖြစ်တည်မှုအတွက် အသုံးပြုခဲ့သော အခြားပရောဂျက်များကို ကျေးဇူးတင်ပါသည်။

- [Tesseract Myanmar](https://github.com/pndaza/tesseract-myanmar)
- [Auto Mobile Directory](https://www.automobiledirectory.com.mm/)
- [YBS လမ်းညွှန်](https://www.facebook.com/YBS.Directory.Yangon/)
- [OSRM](https://project-osrm.org/)
- [Leaflet](https://leafletjs.com/) & [Routing Machine](https://github.com/perliedman/leaflet-routing-machine)
