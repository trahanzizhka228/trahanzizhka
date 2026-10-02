const products = [
   {
    id: 1,
    name: "💀 D.L.T.A ☠️",
    price: 16,
    category: "snus",
    brand: "D.L.T.A",
    flavors: [
      "Red Bull 🐂⚡",
      "Adrenaline RUSH PEPSI 💙⚡",
      "Adrenaline RUSH LIMITED EDITION ICE EFFECT 🔳🧊",
      "Adrenaline RUSH 🤩⚡",
      "Adrenaline VITAMIN POWER 🙃💪",
      "Red bull The blue edition 💙",
      "Red bull The pink edition 💗"
    ],
    description: "Снюс, крепкий"
  },
  {
    id: 2,
    name: "💀 D.L.T.A XS ☠️",
    price: 16,
    category: "snus",
    brand: "D.L.T.A",
    flavors: [
      "Микс ягод 🫐🍓",
      "Зеленый виноград мята 🍇🌿"
    ],
    description: "Снюс, крепкий"
  },
/*  {
    id: 301,
    name: "🔥 Iceburn Ghetto",
    price: 16,
    category: "snus",
    brand: "iceburn",
    flavors: [
      "GHOST-энергетик Байкал 👻⚡",
      "DARTH VADER-перечная мята 🖤🌿🌶️"
    ],
    description: "150 мг"
  },*/
  {
    id: 303,
    name: "🔥 Iceberg Hardcore",
    price: 16,
    category: "snus",
    brand: "iceberg",
    flavors: [
      "Black fury 🖤⚡",
      "Ice shock 🧊💥"
    ],
    description: "150мг"
  },
  {
    id: 500,
    name: "⚡ Кофеиновые паучи Iceberg",
    price: 13,
    category: "kofein",
    brand: "ICBERG",
    flavors: [
      "Клубника с манго 🍓🥭",
      "Сладкая мята 🌿🍬",
      "Энергетик ⚡",
      "Мятный арбуз 🌿🍉",
      "Зеленое яблоко 🍏"
    ],
    description: "Кофеиновые паучи"
  },
  {
    id: 8,
    name: "🧪 Bjorn Long 80mg 🧛",
    price: 20,
    category: "liquid",
    brand: "bjorn",
    flavors: [
    //  "Клюква апельсин 🍊🫐",
     // "Виноград арбуз 🍇🍉",
      "Энергетик черника ⚡🫐",
      "Клубника банан 🍓🍌",
      "Морс из лесных ягод 🫐🍓",
      "Мята спрайт 🌿🧊",
      "Малиновая газировка 🫧🍓",
      "Фруктовый мармелад 🍬🍊"
    ],
    description: "80mg, 30мл"
  },
  {
  id: 101,
  name: "🧪 Bjorn Темный Хор",
  price: 20,
  category: "liquid",
  brand: "bjorn",
  flavors: [
    "Арбуз лед 🍉🧊",
    "Арбуз мята 🍉🌿",
    "Голубика лед 🫐🧊",
    "Кислое зеленое яблоко 🍏🍋",
    "Кислый ягодный микс 🫐🍓🍋",
    "Мятная жвачка 🌿🫧"
  ],
  description: "80 мг, 30мл"
}
,
  {
    id: 102,
    name: "🧪 Bjorn Сон Призрака",
    price: 20,
    category: "liquid",
    brand: "bjorn",
    flavors: [
      "Ледяная клубника личи 🍓🧊",
      "Манго со льдом 🥭🧊",
      "Ананас манго 🍍🥭",
      "Кислое яблоко 🍏",
      "Яблоко персик 🍎🍑"
    ],
    description: "30мл"
  },
  {
    id: 81,
    name: "🧪 Монашка Hotspot",
    price: 18,
    category: "liquid",
    brand: "hotspot , монашка",
    flavors: [
      "Мармеладные червячки 🍬🪱",
      "Ледяной энергетик ⚡🧊",
      "Кола тамаринд лайм 🥤🍋",
      "Вишня ледяной лайм 🍒🧊🍋",
      "Кислый ленточки вишня черника 🎀🍒🫐",
      "Кислые клубничный чупа чупс 🍓🍭",
      "Кислый скитлс малина ананас 🍬🍓🍍",
      "Клубника лайм 🍓🍋",
      "Манго черная смородина 🥭🫐",
      "Морозные лесные ягоды 🧊🫐🍓"
    ],
    description: "30мл"
  },
  {
    id: 104,
    name: "🧪 Злая Монашка",
    price: 18,
    category: "liquid",
    brand: "злая монашка",
    flavors: [
      "Кислый чупа чупс с холодком 🍭🧊",
      "Энергетик арбуз ⚡🍉",
      "Черничный энергетик ⚡🫐",
      "Жвачка арбуз 🫧🍉",
      "Пина колада 🍹🥥",
      "Клубнично ежевичный морс 🍓🫐",
      "Доктор Пеппер черешня 🥤🍒",
      "Клубника личи 🍓🥭"
    ],
    description: "70mg, 30мл"
  },
  {
    id: 120,
    name: "🧪 Злая Монашка Ice",
    price: 18,
    category: "liquid",
    brand: "злая монашка",
    flavors: [
      "Виноградный леденцы лед 🍇🍬🧊",
      "Вишня лед 🍒🧊",
      "Газировка с клубникой и киви лед 🍓🥝🧊🫧",
      "Клубника арбуз лед 🍓🍉🧊",
      "Морс из красных ягод лед 🍓🧊",
      "Смородиновый мармелад лед 🫐🍬🧊"
    ],
    description: "70 мг, 30мл"
  },
  {
    id: 105,
    name: "🧪 Злая Лабуба Energy",
    price: 16,
    category: "liquid",
    brand: "злая лабуба",
    flavors: [
      "Флеш оригинал ⚡🔴",
      "Адреналин оригинал ⚡💙",
      "Драйв оригинал ⚡🟠",
      "HQD с мишками 🧸🫧",
      "Лит энерджи малина ⚡🍓"
    ],
    description: "70mg, 30мл"
  },
  {
    id: 115,
    name: "🧪 Злая Лабуба Extra Hard",
    price: 16,
    category: "liquid",
    brand: "злая лабуба",
    flavors: [
    //  "Виноград малина 🍇🍓",
      "Мятная жвачка 🌿🫧",
      "Виноград клубника 🍇🍓",
    //  "Холодный виноград 🍇🧊",
      "Фруктовые леденцы 🍬🍊",
      "Вишня яблоко 🍒🍎",
      "Клубника персик 🍓🍑"
    ],
    description: "70 мг, 30мл"
  },
  {
    id: 116,
    name: "🧪 Dogswill",
    price: 15,
    category: "liquid",
    brand: "dogswill",
    flavors: [
      "Mountain dew ⛰️🫧",
     // "Виноград черника смородина 🍇🫐",
  //    "Кислый чупа чупс с холодком 🍭🧊",
    //  "Клубнично банановая жвачка 🍓🍌🫧",
     // "Ягодный морс 🫐🍓"
    ],
    description: "60 мг, 30мл"
  },
  {
    id: 117,
    name: "🧪 Anima Love Killer",
    price: 17,
    category: "liquid",
    brand: "anima",
    flavors: [
      "Арбузный смузи 🍉🥤",
      "Банан клубника 🍌🍓",
      "Виноград вишня 🍇🍒",
   //   "Виноград малина арбуз 🍇🍓🍉",
      "Вишневая газировка 🍒🫧",
      "Вишня скитлс лимон 🍒🍬🍋",
      "Клубничный коктейль 🍓🍹",
     // "Лесные ягоды 🫐🍓",
   //   "Редбулл с ананасом ⚡🍍",
      "Чернично-малиновые червячки 🫐🍓🪱",
      "Яблочный лимонад 🍎🍋",
      "Ягодная жвачка 🫐🫧"
    ],
    description: "80 мг, 30мл"
  },
  {
    id: 118,
    name: "🧪 Bjorn Joker 🃏",
    price: 20,
    category: "liquid",
    brand: "bjorn",
    flavors: [
      "Арбуз дыня 🍉🍈",
      "Виноград черная смородина 🍇🫐",
      //"Халапеньо лайм 🌶️🍋",
      "Клубника банан 🍓🍌",
      "Кола вишня 🥤🍒",
      "Черника мята 🫐🌿",
      "Энергетик ⚡"
    ],
    description: "80 мг, 30мл"
  },
  {
    id: 201,
    name: "🧪 Hotspot Don't Chew It 60 мг",
    price: 14,
    category: "liquid",
    brand: "hotspot",
    flavors: [
      "Жвачка арбуз 🫧🍉",
      "Жвачка зеленое яблоко 🫧🍏",
      "Жвачка ледяная вишня 🫧🍒🧊",
      "Жвачка ледяной виноград 🫧🍇🧊",
      "Жвачка маракуйя 🫧🥭",
      "Жвачка сочный персик 🫧🍑"
    ],
    description: "60мг"
  },
  {
    id: 202,
    name: "🧪 Hotspot Dot 60 мг",
    price: 14,
    category: "liquid",
    brand: "hotspot",
    flavors: [
      "Банан лайм 🍌🍋",
      "Клубника мята 🍓🌿",
      "Малина смородина 🍓🫐",
      "Нектарин вишня 🍑🍒"
    ],
    description: "60мг"
  },
  {
    id: 203,
    name: "🧪 Hotspot Fuel 60 мг",
    price: 14,
    category: "liquid",
    brand: "hotspot",
    flavors: [
      "Дыня черника 🍈🫐",
      "Смородина мята 🫐🌿"
    ],
    description: "60мг"
  },
  {
    id: 106,
    name: "🧪 Hotspot x Podonki 60 мг",
    price: 15,
    category: "liquid",
    brand: "hotspot , podonki",
    flavors: [
      "Освежающая кола 🥤❄️",
      "Освежающий лимонад лайм мята 🍋🌿❄️",
      "Холодное яблоко 🍎🧊",
      "Холодный арбуз 🍉🧊"
    ],
    description: "60мг"
  },
  {
    id: 107,
    name: "🧪 Podonki Inferno",
    price: 16,
    category: "liquid",
    brand: "podonki",
    flavors: [
     // "Клубника банан 🍓🍌",
      "Вишня слива груша 🍒🫐🍐",
    //  "Арбуз черника 🍉🫐",
      "Черника лед 🫐🧊"
    ],
    description: "60mg, 30мл"
  },
  {
    id: 108,
    name: "🧪 Bjorn Zloy V2.0",
    price: 16,
    category: "liquid",
    brand: "bjorn",
    flavors: [
      "Мармелад маршмеллоу 🍬🍡",
      "Вишня клубника 🍒🍓",
      "Смородина малина яблоко 🫐🍓🍎",
      "Ваниль вишня 🍦🍒",
      "Яблоко виноград 🍎🍇",
      "Мохито 🍋🌿🫧",
      "Ягодный напиток 🫐🍓🥤",
      "Энергетик монстер ⚡🖤"
    ],
    description: "60mg, 30мл"
  },
  {
    id: 111,
    name: "🧪 Anima Love Zombie",
    price: 17,
    category: "liquid",
    brand: "anima",
    flavors: [
      "Яблоко виноград 🍎🍇",
      "Клубничный леденец 🍓🍬",
      "Клубника банан 🍓🍌",
      "Ежевичный лимонад 🫐🍋",
      "Малина с кислинкой 🍓",
      "Арбузный Бабл гам 🍉🫧",
      "Алоэ виноград 🌵🍇"
    ],
    description: "60mg, 30мл"
  },
  {
    id: 114,
    name: "🧪 Anima Love Sour",
    price: 16,
    category: "liquid",
    brand: "anima",
    flavors: [
      "Кислая черника апельсин 🫐🍊🍋",
      "Кислое яблоко киви 🍏🥝",
      "Кислые арбуз малина 🍉🍓🍋",
     // "Кислые лесные ягоды 🫐🍓🍋",
   //   "Кислые малиновые червяки 🍓🪱🍋",
      "Кислый виноградный чупа-чупс 🍇🍭🍋",
      "Кислый зеленый виноград 🍇🍋",
  //    "Кислый скитлс 🍬🍋",
   //   "Энергетик кислая вишня ⚡🍒🍋"
    ],
    description: "50mg, 30мл"
  },
  {
    id: 119,
    name: "🧪 Anima Love Phobia",
    price: 17,
    category: "liquid",
    brand: "anima",
    flavors: [
      "Вишневый скитлс 🍒🍬",
      "Голубика черная смородина 🫐",
      "Дикие ягоды 🫐🍓",
      "Кислые ягодные червячки 🪱🍋",
      "Клубнично-банановый фреш 🍓🍌🥤",
      "Морс из домашних ягод 🫐🍓",
      "Ред Булл малина ⚡🍓",
      "Ред Булл со льдом ⚡🧊",
      "Смородина лимонад 🫐🍋",
      "Фруктовый скитлс 🍬🍊",
      "Ягодный Ред Булл ⚡🫐"
    ],
    description: "70мг, 30мл"
  },
  {
    id: 122,
    name: "🧪 Rich",
    price: 18,
    category: "liquid",
    brand: "Rich",
    flavors: [
      "Виноградный чупа чупс 🍇🍭",
      "Черничный энергетик ⚡🫐",
      "Вишневые леденцы 🍒🍬",
      "Виноград черная смородина скитлс 🍇🫐🍬",
      "Вишня клубника 🍒🍓",
      "Морозные лесные ягоды 🧊🫐🍓"
    ],
    description: "80 мг, 30мл"
  },
  {
    id: 123,
    name: "🧪 Catswill x Hotspot",
    price: 17,
    category: "liquid",
    brand: "catswill, hotspot",
    flavors: [
      "Энергетик яблоко смородина малина ⚡🍎🫐🍓",
      //"Виноград черника мята 🍇🫐🌿",
      "Кислая мамба лесная земляника 🍋🫐🍓",
      "Харибо тропические фрукты 🍬🥭🍍",
      "Малиновый энергетик с клубникой ⚡🍓",
      "Кислая клубника ананас 🍓🍍🍋",
      "Кислая черная смородина 🫐🍋",
      "Ледяная черешня с черникой 🍒🫐🧊",
      "Мармеладные червячки малина лайм 🪱🍓🍋"
    ],
    description: "70 мг, 30мл"
  },
 
  {
    id: 48,
    name: "🔧 Картридж Xros 0.4 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  },
  {
    id: 49,
    name: "🔧 Картридж Xros 0.6 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  },
  {
    id: 112,
    name: "🔧 Картридж Xros 0.8 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  },
  {
    id: 113,
    name: "🔧 Картридж Xros 0.7 (3мл)",
    price: 13,
    category: "consumables",
    brand: "vaporesso",
    flavors: [],
    description: "Оригинал, 3мл"
  },
  {
    id: 50,
    name: "🔧 Испаритель Aegis Coil B0 (50-58w)",
    price: 13,
    category: "consumables",
    brand: "geekvape",
    flavors: [],
    description: "0.2Ω, 5 шт"
  },
  {
    id: 98,
    name: "🔧 Испаритель Pasito 3/Pasito 2/Knight 80",
    price: 12,
    category: "consumables",
    brand: "smoant",
    flavors: [],
    description: "0.15Ω, (70-90)"
  },
  {
    id: 97,
    name: "🔧 Испаритель Pasito 3/Pasito 2/Knight 80 (0.15Ω, 55-65w)",
    price: 12,
    category: "consumables",
    brand: "smoant",
    flavors: [],
    description: "0.15Ω, (55-65)"
  },
  {
    id: 121,
    name: "🔧 Испаритель Voopoo V.THRU 0.4 Ом",
    price: 13,
    category: "consumables",
    brand: "voopoo",
    flavors: [],
    description: "0.4 Ом"
  },
  {
    id: 51,
    name: "🔧 Никобустер Salt (+20мг на 30 мл)",
    price: 3,
    category: "consumables",
    brand: "jord",
    flavors: [],
    description: "Для миксования"
  }
];
