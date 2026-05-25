import type { NewsArticle } from "@/lib/types";

export const newsArticles: NewsArticle[] = [
  {
    id: "n1",
    slug: "bch-knights-playoff-push",
    title: "BCH Knights extend winning streak to three games",
    titleEn: "BCH Knights extend winning streak to three games",
    excerpt: "Boldbaatar Ganbat leads BCH to another victory as playoffs approach.",
    excerptEn: "Boldbaatar Ganbat leads BCH to another victory as playoffs approach.",
    content: "BCH Knights dominated the fourth quarter to secure their third consecutive win. Ganbat recorded 28 points and 10 assists in a commanding performance at MBA Arena.",
    contentEn: "BCH Knights dominated the fourth quarter to secure their third consecutive win. Ganbat recorded 28 points and 10 assists in a commanding performance at MBA Arena.",
    date: "2025-05-24",
    category: "Game Recap",
    categoryEn: "Game Recap",
    thumbnail: "/images/news-1.jpg",
    author: "MBA Media",
  },
  {
    id: "n2",
    slug: "mba-season-milestone",
    title: "MBA 2024-25 season reaches halfway mark with record attendance",
    titleEn: "MBA 2024-25 season reaches halfway mark with record attendance",
    excerpt: "League officials report highest average attendance in five years across all venues.",
    excerptEn: "League officials report highest average attendance in five years across all venues.",
    content: "The Mongolian Basketball Association announced that average attendance has increased 18% compared to last season, with MBA Arena leading all venues.",
    contentEn: "The Mongolian Basketball Association announced that average attendance has increased 18% compared to last season, with MBA Arena leading all venues.",
    date: "2025-05-22",
    category: "League News",
    categoryEn: "League News",
    thumbnail: "/images/news-2.jpg",
    author: "MBA Media",
  },
  {
    id: "n3",
    slug: "erdenet-miners-trade",
    title: "Erdenet Miners sign international guard David Chen",
    titleEn: "Erdenet Miners sign international guard David Chen",
    excerpt: "Taiwanese guard joins Miners roster ahead of playoff push.",
    excerptEn: "Taiwanese guard joins Miners roster ahead of playoff push.",
    content: "Erdenet Miners completed the signing of David Chen, bringing elite three-point shooting to their backcourt as they chase a top-two seed.",
    contentEn: "Erdenet Miners completed the signing of David Chen, bringing elite three-point shooting to their backcourt as they chase a top-two seed.",
    date: "2025-05-20",
    category: "Transactions",
    categoryEn: "Transactions",
    thumbnail: "/images/news-3.jpg",
    author: "MBA Media",
  },
  {
    id: "n4",
    slug: "all-star-voting",
    title: "MBA All-Star voting opens for 2025 showcase",
    titleEn: "MBA All-Star voting opens for 2025 showcase",
    excerpt: "Fans can vote for their favorite players through the MBA website.",
    excerptEn: "Fans can vote for their favorite players through the MBA website.",
    content: "Voting for the 2025 MBA All-Star Game is now open. The showcase will be held in Ulaanbaatar on June 15 with top performers from across the league.",
    contentEn: "Voting for the 2025 MBA All-Star Game is now open. The showcase will be held in Ulaanbaatar on June 15 with top performers from across the league.",
    date: "2025-05-18",
    category: "Events",
    categoryEn: "Events",
    thumbnail: "/images/news-4.jpg",
    author: "MBA Media",
  },
  {
    id: "n5",
    slug: "khovd-falcons-home-win",
    title: "Khovd Falcons defend home court against Mongolians BT",
    titleEn: "Khovd Falcons defend home court against Mongolians BT",
    excerpt: "Falcons soar to 95-89 victory in front of passionate home crowd.",
    excerptEn: "Falcons soar to 95-89 victory in front of passionate home crowd.",
    content: "Khovd Falcons used a strong second half to pull away from Mongolians Basketball Team, with Ariunbold Tsog dishing 12 assists in the win.",
    contentEn: "Khovd Falcons used a strong second half to pull away from Mongolians Basketball Team, with Ariunbold Tsog dishing 12 assists in the win.",
    date: "2025-05-17",
    category: "Game Recap",
    categoryEn: "Game Recap",
    thumbnail: "/images/news-5.jpg",
    author: "MBA Media",
  },
  {
    id: "n6",
    slug: "youth-development",
    title: "MBA launches youth development program across provinces",
    titleEn: "MBA launches youth development program across provinces",
    excerpt: "New initiative aims to grow basketball talent in rural Mongolia.",
    excerptEn: "New initiative aims to grow basketball talent in rural Mongolia.",
    content: "The Mongolian Basketball Association unveiled a nationwide youth program partnering with schools in Darkhan, Erdenet, Khovd, and Sukhbaatar.",
    contentEn: "The Mongolian Basketball Association unveiled a nationwide youth program partnering with schools in Darkhan, Erdenet, Khovd, and Sukhbaatar.",
    date: "2025-05-15",
    category: "Community",
    categoryEn: "Community",
    thumbnail: "/images/news-6.jpg",
    author: "MBA Media",
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getLatestNews(limit = 3): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
