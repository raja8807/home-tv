// export function parseM3U(text) {
//   const lines = text.split("\n");
//   const channels = [];

//   for (let i = 0; i < lines.length; i++) {
//     if (lines[i].startsWith("#EXTINF")) {
//       const name = lines[i].split(",")[1]?.trim();
//       const url = lines[i + 1]?.trim();

//       if (url && url.startsWith("http")) {
//         channels.push({ name, url });
//       }
//     }
//   }

//   return channels;
// }

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
    if (lines[i].startsWith("#EXTINF")) {
      const name = lines[i].split(",")[1]?.trim();
      const url = lines[i + 1]?.trim();

      if (!name || !url) continue;

      const lowerName = name.toLowerCase();

      const isTamil = tamilKeywords.some((keyword) =>
        lowerName.includes(keyword),
      );

      if (isTamil && url.startsWith("http")) {
        channels.push({ name, url });
      }
    }
  }

  return channels;
}
