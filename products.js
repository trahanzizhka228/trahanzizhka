const products = [
  {
    id: 1,
    name: "D.L.T.A ☠️",
    price: 16,
    category: "snus",
    brand: "jord",
    flavors: [
      "Red Bull 🐂",
      "Adrenaline RUSH PEPSI 💙",
      "Adrenaline RUSH LIMITED EDITION ICE EFFECT 🔳",
      "Adrenaline RUSH 🤩",
      "Adrenaline VITAMIN POWER 🙃",
      "MONSTER ENERGY 🖤",
    ],
    description: "Cнюс , крепкий"
  },
  {
  id: 2,
  name: "D.L.T.A XS ☠️",
  price: 16,
  category: "snus",
  brand: "jord",
  flavors: [
    "Микс ягод",
    "Зеленый виноград мята"
  ],
  description: "Снюс, крепкий"
},

  {
    id: 8,
    name: "BJORN LONG 80mg 🧛",
    price: 20,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Клюква апельсин 🍊",
      "Мандарин персик 🍑",
      "Персик абрикос 🍑",
      "Мята спрайт",
      "Киви яблоко",
    //  "Ягодная жвачка",
      "Морс из лесных ягод",
    ],
    description: "80mg, 30мл"
  },
  {
    id: 21,
    name: "BJORN V МЁД 60mg 🔥",
    price: 18,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Арбузная жвачка 🤩",
    ],
    description: "60mg, 30мл"
  },
  {
    id: 101,
    name: "BJORN ТЕМНЫЙ ХОР",
    price: 20,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Мятная жвачка",
      "Голубика лед",
      "Арбуз лед",
      "Ягодный микс ментол",
      "Клубника мята",
    ],
    description: "30мл"
  },
  {
    id: 102,
    name: "BJORN СОН ПРИЗРАКА",
    price: 20,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Ледяная клубника личи",
      "Манго со льдом",
      "Ананас манго",
      "Кислое яблоко",
      "Яблоко персик",
      "Вишня",
      "Вишневая кола со льдом",
      "Киви маракуйя гуава",
    ],
    description: "30мл"
  },
  {
    id: 36,
    name: "САМОУБИЙЦА V2 DANGER ⚡️",
    price: 18,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Арбузно дынный фреш 🤩",
    ],
    description: "30мл"
  },
  {
    id: 41,
    name: "ЗЛАЯ МОНАШКА ICE 🧊",
    price: 18,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Виноградные леденцы лед 🧊",
    ],
    description: "30мл"
  },
  {
    id: 81,
    name: "Монашка HOTSPOT",
    price: 18,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Мармеладные червячки",
      "Ледяной энергетик",
      "Кола тамаринд лайм",
      "Вишня ананас мята 1",
    ],
    description: "30мл"
  },
  {
    id: 85,
    name: "HOTSPOT FUEL",
    price: 8,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Свежая перечная мята",
      "Персик маракуйя",
      "Личи лайм",
    ],
    description: "30мл"
  },
  {
    id: 104,
    name: "ЗЛАЯ МОНАШКА",
    price: 18,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Кислый чупа чупс с холодком",
      "Энергетик арбуз",
      "Черничный энергетик",
      "Энергетик виноград лед",
      "Малиновое варенье",
      "Жвачка арбуз",
      "Пина колада",
      "Клубнично ежевичный морс",
      "Доктор Пеппер черешня",
      "Клубника личи",
      "Энергетик смородина"
    ],
    description: "70mg, 30мл"
  },
  {
    id: 105,
    name: "ЗЛАЯ ЛАБУБУ ENERGY",
    price: 16,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Монстр кислые червячки",
      "Флеш оригинал",
      "Адреналин оригинал",
      "Драйв оригинал",
      "HQD с мишками",
      "Лит энерджи малина"
    ],
    description: "70mg, 30мл"
  },
  {
    id: 106,
    name: "HOTSPOT X PODONKI",
    price: 15,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Кислая вишня",
      "Освежающая кола",
      "Освежающий лимонад лайм мята",
      "Холодная клубничная жвачка",
      //"Холодная сладкая мята",
      "Холодный арбуз",
      "Холодное яблоко"
    ],
    description: "60mg, 30мл"
  },
  {
    id: 107,
    name: "PODONKI INFERNO",
    price: 16,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Клубника банан",
      "Вишня слива груша",
      "Малина черника",
      "Арбуз черника",
      "Черника лед"
    ],
    description: "60mg, 30мл"
  },
  {
    id: 108,
    name: "BJORN ZLOY V2.0",
    price: 16,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Мармелад маршмеллоу",
      "Вишня клубника",
      "Смородина малина яблоко",
      "Ваниль вишня",
      "Яблоко виноград",
      "Мохито",
      "Ягодный напиток",
      "Энергетик монстер"
    ],
    description: "60mg, 30мл"
  },
  {
    id: 110,
    name: "CATSWILL X MONSTERVAPOR",
    price: 18,
    category: "liquid",
    brand: "jord",
    flavors: [
     // "Черника малина мята лед",
      "Виноградно-вишневый холм лед",
      "Кислая черника морошка",
      "Красное сладкое яблоко с кислинкой"
    ],
    description: "50mg, 30мл"
  },
  {
    id: 111,
    name: "ANNIMA LOVE ZOMBIE",
    price: 17,
    category: "liquid",
    brand: "jord",
    flavors: [
      "Яблоко виноград",
      "Клубничный леденец",
      "Клубника банан",
      "Ежевичный лимонад",
      "Малина с кислинкой",
      "Арбузный Бабл гам",
      "Алоэ виноград"
    ],
    description: "60mg, 30мл"
  },
  {
  id: 114,
  name: "ANNIMA LOVE SOUR",
  price: 18,
  category: "liquid",
  brand: "jord",
  flavors: [
    "Кислая черника апельсин",
    "Кислая черника малина",
    "Кислое яблоко киви",
    "Кислые арбуз малина",
    "Кислые лесные ягоды",
    "Кислые малиновые червяки",
    "Кислый виноградный чупа-чупс",
    "Кислый зеленый виноград",
    "Кислый скитлс",
    "Энергетик кислая вишня"
  ],
  description: "50mg, 30мл"
},

  {
    id: 48,
    name: "Картридж xros 0.4 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  }, 
  {
    id: 49,
    name: "Картридж xros 0.6 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  },
    {
    id: 112,
    name: "Картридж xros 0.8 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  }, 
    {
    id: 113,
    name: "Картридж xros 0.7 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  }, 
  {
    id: 50,
    name: "Испаритель Aegis Coil B0 (50-58w)",
    price: 13,
    category: "consumables",
    brand: "geekvape",
    flavors: [],
    description: "0.2Ω, 5 шт"
  },
  {
    id: 98,
    name: "испаритель PASITO 3/PASITO 2/KNIGHT 80",
    price: 12,
    category: "consumables",
    brand: "smoant",
    flavors: [],
    description: "0.15Ω,(70-90) "
  },
  {
    id: 97,
    name: "испаритель PASITO 3/PASITO 2/KNIGHT 80",
    price: 12,
    category: "consumables",
    brand: "smoant",
    flavors: [],
    description: "0.15Ω, (55-65)"
  },
  {
    id: 51,
    name: "НИКОБУСТЕР SALT (+20мг на 30 мл)",
    price: 3,
    category: "consumables",
    brand: "jord",
    flavors: [],
    description: "Для миксования"
  },
  {
    id: 52,
    name: "Marlboro Red (KING SIZE)",
    price: 10,
    category: "cigarettes",
    brand: "marlboro",
    flavors: [],
    description: "Полная пачка"
  },
  {
    id: 57,
    name: "Marlboro Brown (COMPACT)",
    price: 10,
    category: "cigarettes",
    brand: "marlboro",
    flavors: [],
    description: "Полная пачка"
  },
  {
    id: 87,
    name: "LOST MARY 5к тяг",
    price: 20,
    category: "disposable",
    brand: "lost mary",
    flavors: [
      "Клубничное мороженое",
      "Клубника гуава мята",
    ],
    description: "5000 тяг"
  },
  {
    id: 88,
    name: "MONSTERVAPOR 11к тяг",
    price: 30,
    category: "disposable",
    brand: "monstervapor",
    flavors: [
      "Белый виноград",
    ],
    description: "11000 тяг"
  },
  {
    id: 89,
    name: "HUSKY 8к тяг",
    price: 30,
    category: "disposable",
    brand: "husky",
    flavors: [
      "PINK SKY",
    ],
    description: "8000 тяг"
  },
  {
    id: 90,
    name: "SPACE PRO 18к тяг",
    price: 30,
    category: "disposable",
    brand: "space pro",
    flavors: [
      "Kentucky Tobacco",
    ],
    description: "18000 тяг"
  },
  {
    id: 91,
    name: "DUFT 7к",
    price: 20,
    category: "disposable",
    brand: "duft",
    flavors: [
      "Пина колада",
      "Клубничный Милкшэйк",
    ],
    description: "7000 тяг"
  },
  {
    id: 92,
    name: "PUFFMI 10к тяг",
    price: 20,
    category: "disposable",
    brand: "puffmi",
    flavors: [
      "Ванильное мороженое",
    ],
    description: "10000 тяг"
  },
  {
    id: 93,
    name: "PODONKI BAR 9к тяг",
    price: 20,
    category: "disposable",
    brand: "podonki bar",
    flavors: [
      "Тянучка нуга",
    ],
    description: "9000 тяг"
  },
  {
    id: 94,
    name: "SOAK CUBE 7к тяг",
    price: 15,
    category: "disposable",
    brand: "soak cube",
    flavors: [
      "Имбирная хурма",
    ],
    description: "7000 тяг"
  },
  {
    id: 95,
    name: "UDN BAR 12к тяг",
    price: 30,
    category: "disposable",
    brand: "udn bar",
    flavors: [
      "Табак",
    ],
    description: "12000 тяг"
  },
  {
    id: 96,
    name: "Lost Mary 5к тяг ",
    price: 20,
    category: "disposable",
    brand: "lost mary",
    flavors: [
      "Клубника гуава мята ",
    ],
    description: "5000 тяг"
  },
  {
    id: 103,
    name: "SiM 7000 PUFFS",
    price: 20,
    category: "disposable",
    brand: "Sim",
    flavors: [
      "Strawberry Avocado ",
      "Rose milk ",
      "Ice mint ",
      "Mulberry grape ",
    ],
    description: "7000 тяг"
  },
];

