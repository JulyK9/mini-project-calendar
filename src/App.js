import { useEffect, useState } from 'react';
import './App.css';
import CalendarHeader from './components/CalendarHeader';
import Day from './components/Day';
import DeleteEventModal from './components/DeleteEventModal';
import NewEventModal from './components/NewEventModal';
import useDate from './hooks/useDate';



const App = () => {

  const [nav, setNav] = useState(0) // 현재 보여지는 월의 상태
  // const [days, setDays] = useState([]) // 전체 날짜들의 상태 => useDate 커스텀훅으로 이동
  // const [dateDisplay, setDateDisplay] = useState('') // 헤더부분 연월(현재 날짜의 연월)=> useDate 커스텀훅으로 이동
  const [clicked, setClicked] = useState() // 클릭한 날짜의 상태
  const [events, setEvents] = useState( // 해당 날짜 이벤트 존재 상태
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );

  // 이벤트들 중에서(배열) 해당 날짜 이벤트와 같은 첫번째 요소값을 찾아줘
  const eventForDate = date => events.find((e) => e.date === date);

  // event 상태를 로컬스토리지에 저장하여 관리 => event 상태가 바뀔 때마다 로컬스토리지를 업데이트 시켜줘야 인식되므로 useEffect 활용
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  // useDate을 hook으로 빼서 events, nav 값을 넘겨주면서 hook 안에서 사용하게하고 그에 따라 반영되서 리턴하는 days, dateDisplay 값은 구조분해 할당으로 가져옴
  const { days, dateDisplay } = useDate(events, nav); 

  // console.log(events)
  // console.log(nav)

  return (
    <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        {/* 배열로 만들어놓고 map으로 돌려서 바꿔보기 */}
        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((day, idx) => (
            <Day
              key={idx}
              day={day}
              onClick={() => {
                if (day.value !== "padding") {
                  // ??? 이부분 이해 안감
                  setClicked(day.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* 날짜를 clicked 한 상태이고, 클릭한날짜의 이벤트가 없으면 -> 해당날짜의 이벤트 모달을 띄워주는 것을 이렇게 표현  */}
      {/* 즉 Day 컴포넌트에 onClick 했을 때 모달을 띄워주는 방법 말고도, 상태를 가지고 이렇게 표현할 수도 있겠네 */}
      {/* 근데 문제는 이렇게 하면 작성한 걸 수정하기 위한 모달을 열어주기도 어렵고... 한개 이상 이벤트를 넣어주려면 문제가 생길듯.. 무조건 개선해봐야 할 듯 */}
      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvents([...events, { title, date: clicked }]); // 날짜를 클릭하면 setClicked(day.date)으로 clicked의 상태가 바뀌어 있으므로 객체에게 필요한 정보를 이렇게 전달하면 됨
            setClicked(null);
          }}
        />
      )}

      {/* 날짜를 clicked 한 상태이고, 클릭한 날짜의 이벤트가 있는 상태면 -> 해당날짜 이벤트 모달을 지워주는 모달을 띄워줌 */}
      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </>
  );
}

export default App;
