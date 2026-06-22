const products = [{
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
        id: 8, 
        name: "BJORN LONG 80mg 🧛", 
        price: 20, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Виноград арбуз 🍉",
            "Виноградный чупа-чупс 🪡",
            "Вишня Dr Pepper ❤️",
            "Киви яблоко 🍎",
            "Клубника банан 🍌",
            "Клюква апельсин 🍊",
            "Малиновая газировка 🥤",
            "Мандарин персик 🍑",
            "Мята спрайт ❤️",
            "Персик абрикос 🍑",
            "Фруктовый мармелад 🍑",
            "Ягодная жвачка 🍬",
            "Арбузная жвачка 🍬"
        ],
        description: "80mg, 30мл" 
    },

    // 🔥 BJORN V МЁД 60mg (1 карточка + 6 вкусов)
    { 
        id: 21, 
        name: "BJORN V МЁД 60mg 🔥", 
        price: 18, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Арбузная жвачка 🤩",
            "Вишневая кола 🍒",
            "Клубника банан 🍌",
            "Клубника малина вишня со льдом ❄️",
            "Клюквенный ред булл 🐂",
            "Мятная вишнёвая жвачка 🤩"
        ],
        description: "60mg, 30мл" 
    },

    // 🦴 ANNIMA & САМОУБИЙЦА 80MG (1 карточка + 2 вкуса)
    { 
        id: 28, 
        name: "ANNIMA & САМОУБИЙЦА 80MG 🔥", 
        price: 18, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Арбуз малина 🍓",
            "Скитлс 🍬"
        ],
        description: "80mg, 30мл" 
    },

    // ☠️ ГРЕХ САМОУБИЙЦА (1 карточка + 4 вкуса)
    { 
        id: 30, 
        name: "ГРЕХ САМОУБИЙЦА ☠️", 
        price: 18, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Сок земляники и смородины лед 🧊",
            "Холодный фруктовый скитлс 🍭",
            "Барбарис малина лед 🥶",
            "Клюква+красная смородина+лайм 🤩"
        ],
        description: "30мл" 
    },

    // ⚡ LIT ENERGY CLASSIK (1 карточка + 2 вкуса)
    { 
        id: 36, 
        name: "САМОУБИЙЦА V2 DANGER ⚡️", 
        price: 18, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Арбузно дынный фреш 🤩",
            "Вишня виноград 🍇",
            "Малина виноград 🍇",
            "LIT ENERGY CLASSIK⚡️"
        ],
        description: "30мл" 
    },

    // ☠️ ЗЛАЯ МОНАШКА x TPL (1 карточка + 3 вкуса)
    { 
        id: 76, 
        name: "ЗЛАЯ МОНАШКА x TPL ☠️", 
        price: 18, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            //"Кислый арбуз земляника 🍓",
            //"Кислые вишневые червячки 🍒",
            "Кислые земляничные червячки 🤩"
        ],
        description: "30мл" 
    },

    // 🧊 ЗЛАЯ МОНАШКА ICE (1 карточка + 5 вкусов)
    { 
        id: 41, 
        name: "ЗЛАЯ МОНАШКА ICE 🧊", 
        price: 18, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Лимонад из малины и черники 🫐",
            "Малина арбуз лед 🥶",
            "Клубничный коктейль 🍸",
            "Морс из красных ягод 🥶",
            "Виноградные леденцы лед 🧊"
        ],
        description: "30мл" 
    },
    /* // 🧊 ANIMMA LOVE TOYZ (1 карточка + 4)
    { 
        id: 79, 
        name: "ANIMMA LOVE TOYZ✔️", 
        price: 16, 
        category: "liquid", 
        brand: "jord", 
        flavors: [
            "Скитлс цитрусовый 🍋‍🟩",
            "Виноградный микс  🍇",
            "Ягодные мармеладные червячки 🤩",
            "Тути фрути ⚡️",

        ],
        description: "75mg,30мл" 
    },*/

    // Одиночные жидкости
   // { id: 27, name: "ANNIMA LOVE MISIDE — Добрый арбуз 🍉", price: 16, category: "liquid", brand: "jord", flavors: [], description: "30мл" },
   // { id: 34, name: "HOTSPOT ICE — Кола 🥤", price: 14, category: "liquid", brand: "jord", flavors: [], description: "30мл" },
   

    // 🔧 РАСХОДНИКИ
    { id: 46, name: "Картридж xros 0.8 (3мл)", price: 13, category: "consumables", brand: "vaporesso", flavors: [], description: "Оригинал, 3мл" },
    { id: 47, name: "Картридж xros 0.6 (3мл)", price: 13, category: "consumables", brand: "vaporesso", flavors: [], description: "Оригинал, 3мл" },
    { id: 48, name: "Картридж xros 0.4 (3мл)", price: 13, category: "consumables", brand: "vaporesso", flavors: [], description: "Оригинал, 3мл" },
    { id: 49, name: "Картридж xros 0.6 (2мл)", price: 13, category: "consumables", brand: "vaporesso", flavors: [], description: "Оригинал, 2мл" },
    { id: 50, name: "Испаритель Aegis Coil B0 (50-58w)", price: 13, category: "consumables", brand: "geekvape", flavors: [], description: "0.2Ω, 5 шт" },
    { id: 51, name: "НИКОБУСТЕР SALT (+20мг на 30 мл)", price: 3, category: "consumables", brand: "jord", flavors: [], description: "Для миксования" },

    // 🚬 MARLBORO
    { id: 52, name: "Marlboro Red (KING SIZE)", price: 10, category: "cigarettes", brand: "marlboro", flavors: [], description: "Полная пачка" },
    { id: 53, name: "Marlboro Premium Black (KING SIZE)", price: 10, category: "cigarettes", brand: "marlboro", flavors: [], description: "Полная пачка" },
    { id: 54, name: "Marlboro Gold (KING SIZE)", price: 10, category: "cigarettes", brand: "marlboro", flavors: [], description: "Полная пачка" },
    { id: 55, name: "Marlboro Flavor code (KING SIZE)", price: 10, category: "cigarettes", brand: "marlboro", flavors: [], description: "Полная пачка" },
    { id: 56, name: "Marlboro Vista (COMPACT)", price: 10, category: "cigarettes", brand: "marlboro", flavors: [], description: "Полная пачка" },
    { id: 57, name: "Marlboro Brown (COMPACT)", price: 10, category: "cigarettes", brand: "marlboro", flavors: [], description: "Полная пачка" },

    // ☁️ LOST MARY
    { 
        id: 58, 
        name: "LOST MARY 5к ☁️", 
        price: 20, 
        category: "pod", 
        brand: "lostmary", 
        flavors: [
            "Клубничное мороженое",
            "Клубника гуава мята",
            "Клубника арбуз"
        ],
        description: "5000 тяг" 
    },
    { id: 59, name: "LOST MARY 10к — Матча мята со льдом", price: 30, category: "pod", brand: "lostmary", flavors: [], description: "10000 тяг" },

    // ☁️ Остальные поды (одиночные)
    { id: 62, name: "UÐN 12к — Табак", price: 30, category: "pod", brand: "udn", flavors: [], description: "12000 тяг" },
    { id: 63, name: "PODONKI 11к — Белый виноград", price: 30, category: "pod", brand: "podonki", flavors: [], description: "11000 тяг" },
    { id: 64, name: "PODONKI 11к — Клубника с бананом", price: 30, category: "pod", brand: "podonki", flavors: [], description: "11000 тяг" },
    { id: 65, name: "PODONKI 10к — Клубничное мороженое", price: 30, category: "pod", brand: "podonki", flavors: [], description: "10000 тяг" },
    { id: 66, name: "PODONKI BAR 7к — Тутовый виноград", price: 25, category: "pod", brand: "podonki", flavors: [], description: "7000 тяг" },
    { id: 67, name: "PODONKI BAR 9к — Нуга", price: 25, category: "pod", brand: "podonki", flavors: [], description: "9000 тяг" },
    { id: 68, name: "DUFT 7к — Клубничный милкшейк", price: 20, category: "pod", brand: "duft", flavors: [], description: "7000 тяг" },
    { id: 69, name: "DUFT 7к — Пина колада", price: 20, category: "pod", brand: "duft", flavors: [], description: "7000 тяг" },
    { id: 70, name: "DUFT 7к — Клубничная Маргарита", price: 20, category: "pod", brand: "duft", flavors: [], description: "7000 тяг" },
    { id: 71, name: "PUFFMI 10к — Ванильное мороженое", price: 20, category: "pod", brand: "puffmi", flavors: [], description: "10000 тяг" },
    { id: 72, name: "HUSKY 8к — Клубничный молочный коктейль", price: 30, category: "pod", brand: "husky", flavors: [], description: "8000 тяг" },
    { id: 73, name: "HUSKY 8к — Клубничное мороженое холодок", price: 30, category: "pod", brand: "husky", flavors: [], description: "8000 тяг" },
    { id: 74, name: "PLONQ 6к — Мускатный табак", price: 35, category: "pod", brand: "plonq", flavors: [], description: "6000 тяг" },
    { id: 75, name: "SOAK 7к — Имбирная хурма", price: 15, category: "pod", brand: "soak", flavors: [], description: "7000 тяг" }
];
