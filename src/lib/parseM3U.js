export function parseM3U(text) {
  const lines = text.split("\n");
  const channels = [];

  const tamilKeywords = [
    "tamil",
    "sun",
    "kalaignar",
    "jaya",
    "raj",
    "polimer",
    "news 7",
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("#EXTINF")) {
      const name = line.split(",")[1]?.trim();
      const url = lines[i + 1]?.trim();

      if (!name || !url) continue;

      const lowerName = name.toLowerCase();

      const isTamil = tamilKeywords.some((keyword) =>
        lowerName.includes(keyword),
      );

      if (isTamil && url.startsWith("http")) {
        // ✅ Extract logo
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        const logoUrl = logoMatch ? logoMatch[1] : null;

        channels.push({
          name,
          url,
          logoUrl, // added logo support
        });
      }
    }
  }

  return channels;
}
