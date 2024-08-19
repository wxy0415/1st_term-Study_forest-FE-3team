import { TIME_GAP_OF_DB } from "../../../../constants/global";
import { ReactComponent as StickerEmpty } from "../../../../assets/images/sticker_empty.svg";
import { ReactComponent as Sticker01 } from "../../../../assets/images/sticker_light_green_100_01.svg";
import { ReactComponent as Sticker02 } from "../../../../assets/images/sticker_light_green_100_02.svg";
import { ReactComponent as Sticker03 } from "../../../../assets/images/sticker_light_green_100_03.svg";
import { ReactComponent as Sticker04 } from "../../../../assets/images/sticker_light_mint_100_04.svg";
import { ReactComponent as Sticker05 } from "../../../../assets/images/sticker_light_mint_200_05.svg";
import { ReactComponent as Sticker06 } from "../../../../assets/images/sticker_green_06.svg";
import { ReactComponent as Sticker07 } from "../../../../assets/images/sticker_blue_100_07.svg";
import { ReactComponent as Sticker08 } from "../../../../assets/images/sticker_blue_200_08.svg";
import { ReactComponent as Sticker09 } from "../../../../assets/images/sticker_blue_300_09.svg";
import { ReactComponent as Sticker10 } from "../../../../assets/images/sticker_purple_100_10.svg";
import { ReactComponent as Sticker11 } from "../../../../assets/images/sticker_purple_200_11.svg";
import { ReactComponent as Sticker12 } from "../../../../assets/images/sticker_purple_300_12.svg";
import { ReactComponent as Sticker13 } from "../../../../assets/images/sticker_yellow_100_13.svg";
import { ReactComponent as Sticker14 } from "../../../../assets/images/sticker_yellow_200_14.svg";
import { ReactComponent as Sticker15 } from "../../../../assets/images/sticker_yellow_300_15.svg";
import { ReactComponent as Sticker16 } from "../../../../assets/images/sticker_pink_100_16.svg";
import { ReactComponent as Sticker17 } from "../../../../assets/images/sticker_pink_200_17.svg";
import { ReactComponent as Sticker18 } from "../../../../assets/images/sticker_pink_300_18.svg";

const stickers = [
  <StickerEmpty />,
  <Sticker01 />,
  <Sticker02 />,
  <Sticker03 />,
  <Sticker04 />,
  <Sticker05 />,
  <Sticker06 />,
  <Sticker07 />,
  <Sticker08 />,
  <Sticker09 />,
  <Sticker10 />,
  <Sticker11 />,
  <Sticker12 />,
  <Sticker13 />,
  <Sticker14 />,
  <Sticker15 />,
  <Sticker16 />,
  <Sticker17 />,
  <Sticker18 />,
];

function HabitMark({ type }) {
  let svg = stickers[type];

  return <>{svg}</>;
}

function HabitWeekRecord({ stickerType = 1, successIndices = [] }) {
  const weekRecord = [
    <HabitMark type="0" />,
    <HabitMark type="0" />,
    <HabitMark type="0" />,
    <HabitMark type="0" />,
    <HabitMark type="0" />,
    <HabitMark type="0" />,
    <HabitMark type="0" />,
  ];
  successIndices.map((item) => {
    weekRecord[item] = <HabitMark type={stickerType} />;
  });

  return (
    <div className="flex-row">
      <p>습관 이름</p>
      {weekRecord}
    </div>
  );
}

function Dates() {
  const now = new Date();
  //   now.setHours(now.getHours() + TIME_GAP_OF_DB);
  //   const dbNow = new Date(now);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const recentOneWeek = [];

  for (let i = 0; i < 7; i++) {
    const now = new Date();
    now.setDate(now.getDate() - i);
    const newDate = new Date(now);
    recentOneWeek[6 - i] = {
      date: newDate.getDate(),
      day: weekDays[newDate.getDay()],
    };
  }

  const marks = recentOneWeek.map((date) => {
    const mark = `${date.date} (${date.day})`;
    return <div>{mark}</div>;
  });

  return <div className="flex-row">{marks}</div>;
}

export function HabitRecord() {
  const tempSuccess = [1, 4];
  return (
    <div>
      <div>습관 기록표</div>
      <Dates />
      <HabitWeekRecord stickerType="1" successIndices={tempSuccess} />
    </div>
  );
}

export default HabitRecord;
