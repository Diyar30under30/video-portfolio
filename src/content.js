// =====================================================================
//  ВЕСЬ КОНТЕНТ САЙТА — ЗДЕСЬ. Меняйте тексты, ссылки и работы.
// =====================================================================

export const site = {
  brand: ["MYNAME", "PRODUCTION"],          // логотип в шапке: жирная + серая часть
  firstName: "ИМЯ",
  lastName: "ФАМИЛИЯ",                       // эта строка будет контурной
  years: "2021 — 2026",
  // Фоновое видео первого экрана. Пока пусто — показывается анимированный градиент.
  // Положите файлы в public/media/hero/ и раскомментируйте.
  // Пути пишите БЕЗ слеша в начале ("media/...") — так они работают и на GitHub Pages.
  hero: {
    desktop: "", // "media/hero/hero_web.mp4",
    mobile: "",  // "media/hero/hero_mobile.mp4",
    poster: "",  // "media/hero/hero_poster.jpg",
  },
  // Шоурил — кнопка «Смотреть шоурил» на первом экране. .mp4 или ссылка YouTube/Vimeo.
  showreel: "",
  links: {
    telegram: "https://t.me/your_username",
    instagram: "https://instagram.com/your_username",
    email: "you@example.com",
  },
  stats: [
    { value: "5+", ru: "лет в продакшене", en: "years in production" },
    { value: "30+", ru: "брендов", en: "brands" },
    { value: "100+", ru: "проектов", en: "projects" },
  ],
  clients: ["Клиент 1", "Клиент 2", "Клиент 3", "Клиент 4", "Клиент 5", "Клиент 6", "Клиент 7", "Клиент 8"],
  // Отзывы клиентов — ru/en
  testimonials: [
    { ru: "Сделали ролик быстрее срока, а результат превзошёл бриф.", en: "Delivered ahead of schedule and beyond the brief.", who: "Имя, Компания 1" },
    { ru: "Очень спокойно и профессионально на площадке — команда чувствовала себя свободно.", en: "Calm and professional on set — the team felt at ease.", who: "Имя, Компания 2" },
    { ru: "Ролик принёс нам больше заявок, чем вся реклама за квартал.", en: "The film brought more leads than a whole quarter of ads.", who: "Имя, Компания 3" },
  ],
};

// Категории для фильтра. key используется в работах ниже.
export const categories = [
  { key: "brand", ru: "Бренд-видео", en: "Brand films" },
  { key: "promo", ru: "Промо", en: "Promo" },
  { key: "reels", ru: "Reels", en: "Reels" },
  { key: "events", ru: "Ивенты", en: "Events" },
  { key: "aerial", ru: "Аэросъёмка", en: "Aerial" },
  { key: "music", ru: "Клипы", en: "Music videos" },
];

// Работы. featured: true — попадает во вкладку «Избранное».
// poster — картинка .jpg, preview — короткое немое видео (5–8 сек) для наведения,
// full — полное видео: .mp4-ссылка ИЛИ ссылка на YouTube / Vimeo.
// year / place / role — показываются в списке и под плеером.
// Пока poster пустой — рисуется цветная заглушка.
export const works = [
  { client: "Клиент 1", title: "Бренд-фильм", cat: "brand", dur: "1:30", year: 2026, place: "Город", role: "Режиссура, монтаж", featured: true, poster: "", preview: "", full: "" },
  { client: "Клиент 2", title: "Промо запуска", cat: "promo", dur: "0:45", year: 2026, place: "Город", role: "Съёмка, монтаж, цвет", featured: true, poster: "", preview: "", full: "" },
  { client: "Клиент 3", title: "Reels для соцсетей", cat: "reels", dur: "0:20", year: 2025, place: "Город", role: "Съёмка, монтаж", featured: true, poster: "", preview: "", full: "" },
  { client: "Фестиваль", title: "Фестиваль — день I", cat: "events", dur: "2:10", year: 2025, place: "Город", role: "Съёмка, монтаж", featured: true, poster: "", preview: "", full: "" },
  { client: "Клиент 4", title: "Город с высоты", cat: "aerial", dur: "1:05", year: 2025, place: "Регион", role: "Аэросъёмка", featured: false, poster: "", preview: "", full: "" },
  { client: "Артист", title: "Клип — сниппет", cat: "music", dur: "0:30", year: 2024, place: "Город", role: "Режиссура, съёмка", featured: true, poster: "", preview: "", full: "" },
  { client: "Клиент 5", title: "Конференция", cat: "events", dur: "3:00", year: 2024, place: "Город", role: "Съёмка, монтаж", featured: false, poster: "", preview: "", full: "" },
  { client: "Клиент 6", title: "Мерч-кампания", cat: "promo", dur: "0:50", year: 2024, place: "Город", role: "Режиссура, цвет", featured: true, poster: "", preview: "", full: "" },
];

// Тексты интерфейса на двух языках
export const t = {
  ru: {
    nav: ["Работы", "Обо мне", "Контакты"],
    cta: "Обсудить проект",
    role: "Видеограф и режиссёр",
    lead: "Снимаю, режиссирую и монтирую — от идеи до финального кадра. Работаю по всему миру.",
    reel: "Смотреть шоурил",
    scroll: "Листайте",
    worksTitle: ["Избранные", "работы"],
    archive: (n) => `${n} проектов в архиве`,
    featured: "Избранное",
    all: "Все",
    grid: "Сетка",
    list: "Список",
    play: "Смотреть",
    aboutLabel: "О режиссёре",
    aboutTitle: "Стильный визуал со смыслом.",
    aboutText: [
      "Видеограф и режиссёр. Веду проект целиком: сценарий, съёмка, режиссура, монтаж и цвет.",
      "Расскажите здесь свою историю: откуда вы, сколько снимаете и что для вас важно в кадре.",
    ],
    skills: ["Режиссура", "Операторская работа", "Монтаж", "Цветокоррекция", "Аэросъёмка", "Короткая форма"],
    clientsLabel: "Клиенты и партнёры",
    processLabel: "Как работаем",
    process: [
      ["Бриф", "Созваниваемся, разбираем задачу, аудиторию, сроки и бюджет."],
      ["Идея и сценарий", "Предлагаю концепцию, референсы и раскадровку. Согласуем до съёмки."],
      ["Съёмка", "Своя техника и команда: камера, свет, звук, дрон."],
      ["Монтаж и цвет", "Монтаж, цветокоррекция, звук. Две итерации правок включены."],
    ],
    reviewsLabel: "Отзывы",
    contactTitle: "Давайте снимем.",
    form: {
      name: "Ваше имя", brand: "Компания / бренд", type: "Тип проекта",
      types: ["Бренд-фильм", "Промо", "Reels / короткая форма", "Ивент", "Клип", "Аэросъёмка", "Другое"],
      message: "Пара слов о задаче, сроках и бюджете",
      source: "Откуда вы обо мне узнали? (необязательно)",
      sources: ["Instagram", "Сайт", "Рекомендация", "Другое"],
      contact: "Telegram, телефон или email",
      submit: "Отправить бриф", busy: "Отправка…",
      ok: "Спасибо! Бриф получен — отвечу в ближайшее время.",
      fail: "Не получилось отправить. Напишите мне в Telegram — так даже быстрее.",
    },
    rights: "Все права защищены",
    city: "Ваш город, страна",
    close: "Закрыть", prev: "Назад", next: "Вперёд",
    noVideo: "Видео скоро появится",
  },
  en: {
    nav: ["Work", "About", "Contact"],
    cta: "Start a project",
    role: "Videographer & director",
    lead: "I shoot, direct and edit — from the idea to the final frame. Available worldwide.",
    reel: "Watch showreel",
    scroll: "Scroll",
    worksTitle: ["Selected", "work"],
    archive: (n) => `${n} projects in the archive`,
    featured: "Featured",
    all: "All",
    grid: "Grid",
    list: "List",
    play: "Play",
    aboutLabel: "About",
    aboutTitle: "Stylish visuals with meaning.",
    aboutText: [
      "Videographer and director. I run the whole project: script, shooting, directing, editing and color.",
      "Tell your story here: where you are from, how long you have been filming, what matters to you.",
    ],
    skills: ["Directing", "Cinematography", "Editing", "Color grading", "Aerial", "Short form"],
    clientsLabel: "Clients & partners",
    processLabel: "How we work",
    process: [
      ["Brief", "A call to understand the task, audience, timing and budget."],
      ["Idea & script", "Concept, references and storyboard, approved before the shoot."],
      ["Shoot", "My own kit and crew: camera, light, sound, drone."],
      ["Edit & color", "Edit, grade and sound. Two rounds of revisions included."],
    ],
    reviewsLabel: "Testimonials",
    contactTitle: "Let's shoot.",
    form: {
      name: "Your name", brand: "Company / brand", type: "Project type",
      types: ["Brand film", "Promo", "Reels / short form", "Event", "Music video", "Aerial", "Other"],
      message: "A few words about the task, timing and budget",
      source: "How did you find me? (optional)",
      sources: ["Instagram", "Website", "Referral", "Other"],
      contact: "Telegram, phone or email",
      submit: "Send brief", busy: "Sending…",
      ok: "Thank you! Brief received — I'll get back to you soon.",
      fail: "Couldn't send. Message me on Telegram — it is faster.",
    },
    rights: "All rights reserved",
    city: "Your city, country",
    close: "Close", prev: "Previous", next: "Next",
    noVideo: "Video coming soon",
  },
};
