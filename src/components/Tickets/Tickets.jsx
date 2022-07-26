import { Button, Typography, Radio, Col, Row, DatePicker  } from 'antd';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import locale from 'antd/lib/locale/ru_RU';
import { useState, useEffect } from 'react';
import '../Tickets/tickets.css';
const Tickets = () => {
  const [value, setValue] = useState(0);
const chanchDate = (date, dateString) => {

  console.log(date, dateString)
}
  useEffect(() => {
    console.log("Mouting phase: same when componentDidMount runs", value);
  }, [value]);

  return (
  
  <>
  <DatePicker locale={locale} format={"YYYY-MM-DD HH:mm:ss"} onChange={chanchDate}/>
  <button onClick={() => setValue(value + 1)}>{value}</button>
  </>
  
  );
}
export default Tickets