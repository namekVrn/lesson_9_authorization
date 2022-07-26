import { useSelector } from "react-redux";
import { Button, Col, Row, Statistic } from 'antd';
import React from 'react';
const Main = () => {
    const  selector = useSelector(store=>store.clientsItems)
    // const {client} = selector
    console.log(selector)
return(
    <><Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Users" value={[].length} />
    </Col>
    <Col span={12}>
      <Statistic title="Account Balance (CNY)" value={[].length} precision={2} />
      <Button
        style={{
          marginTop: 16,
        }}
        type="primary"
      >
        Recharge
      </Button>
    </Col>
    <Col span={12}>
      <Statistic title="Active Users" value={[].length} loading />
    </Col>
  </Row></>
) 
  

}
export default Main

