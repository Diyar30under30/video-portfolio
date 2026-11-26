// Cloudflare Pages Function: POST /api/brief → сообщение в Telegram.
// В настройках проекта Cloudflare (Settings → Variables and Secrets) добавьте:
//   TG_TOKEN   — токен бота от @BotFather
//   TG_CHAT_ID — ваш chat id (напишите боту, затем откройте
//                https://api.telegram.org/bot<TOKEN>/getUpdates и найдите "chat":{"id":...})

const FIELDS = { name: "Имя", brand: "Бренд", type: "Тип", message: "Задача", source: "Источник", contact: "Контакт" };

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response("bad json", { status: 400 });
  }
  if (!data.name || !data.contact) return new Response("missing fields", { status: 400 });

  const clip = (v) => String(v ?? "").slice(0, 1500);
  const text = ["🎬 Новый бриф с сайта", ""]
    .concat(Object.entries(FIELDS).filter(([k]) => data[k]).map(([k, label]) => `${label}: ${clip(data[k])}`))
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text }),
  });
  if (!res.ok) return new Response("telegram error", { status: 502 });
  return new Response("ok");
}
