import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	POST: () => POST,
	prerender: () => false
});
var WINDOW_MS = 6e5;
var MAX_PER_WINDOW = 5;
var hits = /* @__PURE__ */ new Map();
var clean = (v, max) => typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";
var json = (status, body) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-store"
	}
});
var POST = async ({ request, clientAddress }) => {
	if (!(request.headers.get("content-type") ?? "").includes("application/json")) return json(415, { error: "unsupported_media_type" });
	const raw = await request.text();
	if (raw.length > 8192) return json(413, { error: "too_large" });
	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		return json(400, { error: "invalid_json" });
	}
	if (clean(data.website, 200)) return json(200, { ok: true });
	const msg = {
		name: clean(data.name, 120),
		email: clean(data.email, 200),
		company: clean(data.company, 160),
		phone: clean(data.phone, 40),
		type: clean(data.type, 80) || "General",
		message: clean(data.message, 4e3)
	};
	const errors = [];
	if (!msg.name) errors.push("name");
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email)) errors.push("email");
	if (msg.message.length < 10) errors.push("message");
	if (errors.length) return json(400, {
		error: "validation",
		fields: errors
	});
	const key = clientAddress || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
	const now = Date.now();
	const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_PER_WINDOW) return json(429, { error: "rate_limited" });
	recent.push(now);
	hits.set(key, recent);
	return json(503, { error: "not_configured" });
};
var ALL = () => json(405, { error: "method_not_allowed" });
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
