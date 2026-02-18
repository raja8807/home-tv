export default async function handler(req, res) {
  try {
    // const urlRes = await fetch("https://iptv-org.github.io/iptv/index.m3u");
    const urlRes = await fetch(
      "https://iptv-org.github.io/iptv/countries/in.m3u",
    );

    if (!urlRes.ok) {
      return res.status(500).json({ error: "Failed to fetch playlist" });
    }

    const text = await urlRes.text();

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// export default async function handler(req, res) {
//   try {
//     const urlRes = await fetch(
//       "https://iptv-org.github.io/iptv/index.m3u",
//       { next: { revalidate: 300 } } // 5 min cache
//     );

//     const text = await urlRes.text();

//     res.setHeader("Content-Type", "text/plain");
//     res.setHeader("Cache-Control", "s-maxage=300");
//     res.status(200).send(text);

//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// }
