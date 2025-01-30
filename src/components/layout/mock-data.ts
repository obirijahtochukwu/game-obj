import { Icons } from "../ui/icons";

export const pages = (userId: string) => [
  { label: "Home", Icon: Icons.pad, url: "/" },
  { label: "Plinko", Icon: Icons.cards, url: "/plinko" },
  { label: "video poker", Icon: Icons.video_poker, url: "/video-poker" },
  { label: "roullete", Icon: Icons.roullete, url: "/roullete" },
  { label: "blackjack", Icon: Icons.blackjack, url: "/blackjack" },
  { label: "Sports", Icon: Icons.globe, url: "/sports" },
  { label: "Account", Icon: Icons.profile, url: "/profile/" + userId },
];
