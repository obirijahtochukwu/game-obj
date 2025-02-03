import { userExist } from "../../lib/utils";
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

export const tabs = (userId: string) => [
  {
    label: "Home",
    Icon: Icons.wallet,
    url: "/",
  },
  {
    label: "Games",
    Icon: Icons.pad,
    pages: [
      { label: "Plinko", Icon: Icons.cards, url: "/plinko" },
      { label: "video poker", Icon: Icons.video_poker, url: "/video-poker" },
      { label: "roullete", Icon: Icons.roullete, url: "/roullete" },
      { label: "blackjack", Icon: Icons.slot, url: "/blackjack" },
      { label: "Slot Machine", Icon: Icons.slot, url: "/slot" },
      { label: "Dice Roller", Icon: Icons.dice, url: "/dice-roller" },
      { label: "Aviator", Icon: Icons.aviator, url: "/aviator" },
    ],
  },
  {
    label: "Sports",
    Icon: Icons.globe,
    pages: [
      { label: "cricket", Icon: Icons.cricket, url: userExist ? "/cricket" : "#cricket" },
      { label: "baseball", Icon: Icons.baseball, url: userExist ? "/baseball" : "#baseball" },
      { label: "football", Icon: Icons.football, url: userExist ? "/football" : "#football" },
      { label: "basketball", Icon: Icons.basketball, url: userExist ? "/basketball" : "#basketball" },
      { label: "tennis", Icon: Icons.tennis, url: userExist ? "/tennis" : "#tennis" },
    ],
  },
  {
    label: "Profile",
    Icon: Icons.profile,
    url: userExist ? "/profile/" + userId : "#profile",
  },
];
