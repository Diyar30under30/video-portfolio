# Видео-портфолио (шаблон)

React + Vite, хостинг на Cloudflare Pages, форма брифа → Telegram.

## Запуск на компьютере
```
npm install
npm run dev
```
Откройте адрес, который покажет терминал (обычно http://localhost:5173).

## Что менять
- **Все тексты, ссылки, работы, категории** — `src/content.js`.
- **Фоновое видео** — положите в `public/media/hero/` файлы `hero_web.mp4`, `hero_mobile.mp4`, `hero_poster.jpg` и раскомментируйте пути в `site.hero`.
- **Работы** — для каждой: `poster` (.jpg), `preview` (короткое немое .mp4, играет при наведении), `full` (.mp4 или ссылка YouTube/Vimeo).
  Мелкие файлы можно класть в `public/media/...`, большие видео (> 25 МБ) — на Cloudflare R2 / Bunny / YouTube.
- **Цвета и шрифт** — переменные в начале `src/styles.css`.
- **Название вкладки и описание для Google** — `index.html`.

## Сжатие видео (ffmpeg)
```
ffmpeg -i in.mov -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart hero_web.mp4
ffmpeg -i in.mov -ss 5 -t 6 -vf scale=640:-2 -c:v libx264 -crf 28 -an -movflags +faststart preview.mp4
ffmpeg -i in.mov -ss 3 -frames:v 1 -vf scale=960:-2 poster.jpg
```

## Публикация

### GitHub Pages (уже настроено)
Каждый `git push` в `main` сам собирает и публикует сайт (`.github/workflows/deploy.yml`).
Адрес: `https://<логин>.github.io/<репозиторий>/`. Форма брифа здесь не отправляет заявки
(нет серверной части) — посетителю предлагается написать в Telegram.

### Cloudflare Pages (с рабочей формой)
1. Залейте папку на GitHub.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `npm run build`, output: `dist`.
4. Settings → Variables and Secrets: `TG_TOKEN`, `TG_CHAT_ID` (см. `functions/api/brief.js`).

Форма работает только на Cloudflare (локально `npm run dev` покажет ошибку отправки — это нормально).
