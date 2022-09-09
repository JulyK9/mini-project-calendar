import { useEffect, useState } from 'react';

const useDate = (events, nav) => {
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);

  

  useEffect(() => {

    // 이벤트들 중에서(배열) 해당 날짜 이벤트와 같은 첫번째 요소값을 찾아줘
    const eventForDate = (date) => events.find((e) => e.date === date);
    // console.log(eventForDate);

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesdagy",
      "Thursday",
      "Friday",
      "Saturday",
    ]; // en-us 기준일 경우
    // const weekdays = ["일", "월", "화", "수", "목", "금", "토"]; // kr-ko 기준일 경우

    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav); // setMonth 메서드가 인자안의 내용을 반영하여 리턴값으로 dt 변수를 갱신해버림
    }

    const day = dt.getDate();
    // console.log("day: ", day);
    const month = dt.getMonth();
    // console.log("month: ", month);
    const year = dt.getFullYear();
    // console.log("year: ", year);

    const firstDayOfMonth = new Date(year, month, 1); // 주의: month + 1 월의 1일로 표현됨
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); // 0일은 없기 때문에 그 다음달의 하루 전날이라서 전월의 마지막 날짜를 반환하게 됨

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      // 그달의 첫 날짜를 문자열 형식으로 나타내줌 (영어로 하게 되면 weekdays, paddingDay 코드가 달라져야 함)
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setDateDisplay(
      `${dt.toLocaleDateString("kr-ko", { month: "long" })} ${year}`
    );

    //  ??? 그달의 첫 날짜를 문자열로 변환하여 그 요소와 일치하는 요일의 인덱스를 반환
    // const paddingDays = weekdays.indexOf(dateString.split(" ").slice(-1)[0][0]); // kr-ko 기준일 경우
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]); // en-us 기준일 경우

    const daysArr = []; // 아래 반복문을 돌리면서 날짜를 생성해서 담아줄 배열

    for (let i = 1; i <= paddingDays + lastDayOfMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: "padding",
          event: null,
          isCurrentDay: false,
          date: "",
        });
      }
    }

    // 반복문을 돌려서 생성된 daysArr 의 상태로 days 상태를 바꿔줌
    setDays(daysArr);
  }, [events, nav]);

  return {
    days,
    dateDisplay,
  };
};

export default useDate
