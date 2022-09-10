import React, { useMemo } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DateCell } from "./DateCell";

type Props = {
  systemDate: {
    year: number;
    month: number;
    date: number;
  };
  displayYearMonth: {
    year: number;
    month: number;
  };
};

export const Calender: React.FC<Props> = React.memo(
  ({ systemDate, displayYearMonth }) => {
    // 1日の曜日インデックス(日：0, 月:1, ..., 土:6)
    const firstDayIndex = useMemo(() => {
      const date = new Date(
        displayYearMonth.year,
        displayYearMonth.month - 1,
        1
      );
      return date.getDay();
    }, [displayYearMonth]);

    // 月末最終日の日付
    const lastDateNumber = useMemo(() => {
      const date = new Date(displayYearMonth.year, displayYearMonth.month, 0); // 翌月の0日を指定
      return date.getDate();
    }, [displayYearMonth]);

    const weekList: (null | number)[][] = useMemo(() => {
      const list = [
        // 日曜日から1日までをnull埋め
        ...Array(firstDayIndex)
          .fill(null)
          .map(() => null),

        // 1日～月末最終日
        ...Array(lastDateNumber)
          .fill(1)
          .map((_, index) => index + 1),

        // 月末最終日から土曜日までをnull埋め
        ...Array(
          (firstDayIndex + lastDateNumber) % 7 === 0
            ? 0
            : 7 - ((firstDayIndex + lastDateNumber) % 7)
        )
          .fill(null)
          .map(() => null),
      ];

      // 7個ごとの配列にする
      return Array(Math.ceil(list.length / 7))
        .fill(1)
        .map((_, index) => list.slice(index * 7, (index + 1) * 7));
    }, [firstDayIndex, lastDateNumber]);

    return (
      <Table>
        <Thead>
          <Tr>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              日曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              月曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              火曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              水曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              木曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              金曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              土曜日
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {weekList.map((week, weekIndex) => {
            return (
              <Tr key={weekIndex}>
                {week.map((date, dateIndex) => {
                  return (
                    <Td
                      key={`${weekIndex}-${dateIndex}`}
                      sx={{
                        height: "120px",
                        padding: "0px",
                        border: "1px solid #aab5c1",
                        fontSize: "16px",
                        color: "#999",
                      }}
                    >
                      {date ? (
                        <DateCell
                          date={date}
                          isToday={
                            systemDate.year === displayYearMonth.year &&
                            systemDate.month === displayYearMonth.month &&
                            systemDate.date === date
                          }
                        />
                      ) : null}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  }
);
