export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).send("Missing url");

  try {
    const upstream = await fetch(url);

    if (!upstream.ok) {
      return res.status(upstream.status).end();
    }

    const contentType = upstream.headers.get("content-type") || "";

    // 🎯 If playlist
    if (contentType.includes("mpegurl")) {
      let text = await upstream.text();

      const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);

      text = text
        .split("\n")
        .map((line) => {
          if (line.trim() === "" || line.startsWith("#")) {
            return line;
          }

          const absolute = line.startsWith("http") ? line : baseUrl + line;

          return `/api/proxy?url=${encodeURIComponent(absolute)}`;
        })
        .join("\n");

      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      res.setHeader("Access-Control-Allow-Origin", "*");

      return res.status(200).send(text);
    }

    // 🎯 If segment (.ts)
    const reader = upstream.body.getReader();

    res.setHeader("Content-Type", contentType || "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }

    res.end();
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).end();
  }
}
