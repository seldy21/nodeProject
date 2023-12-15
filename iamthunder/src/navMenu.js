import { PiFlyingSaucerDuotone, PiGiftDuotone, PiMusicNotesDuotone, PiHeartBreakDuotone  } from "react-icons/pi";
import { RiCss3Fill, RiHtml5Line, RiReactjsLine, RiJavascriptLine } from "react-icons/ri";

export const NavMenu = [
  {
    id: 1,
    list: [
      {
        id: 1,
        name: "홈",
        path: "/",
        icon: <PiFlyingSaucerDuotone className="navIcons"/>
      },
      {
        id: 2,
        name: "자기소개",
        path: "/intro",
        icon:<PiGiftDuotone className="navIcons"/>,
      },
    ],
  },
  {
    id: 2,
    list: [
      {
        id: 1,
        name: "다이어리",
        path: "diary/story",
        icon: <PiMusicNotesDuotone className="navIcons"/>,
      },
      {
        id: 2,
        name: "울지말고 일어나",
        path: "diary/overcome",
        icon: <PiHeartBreakDuotone className="navIcons"/>,
      },
    ],
  },
  {
    id: 3,
    list: [
      {
        id: 1,
        name: "HTML",
        path: "/board/html",
        icon: <RiHtml5Line className="navIcons"/>,
      },
      {
        id: 2,
        name: "CSS",
        path: "/board/css",
        icon: <RiCss3Fill className="navIcons"/>,
      },
      {
        id: 3,
        name: "javascript",
        path: "/board/js",
        icon: <RiJavascriptLine className="navIcons"/>,
      },
      {
        id: 4,
        name: "react",
        path: "/board/react",
        icon: <RiReactjsLine className="navIcons"/>,
      },
    ],
  },
];
