import { useState } from 'react';
import '../AddClients/addClients.css';
import { useDispatch } from 'react-redux';
import { addClient } from 'redux/clients/clients-operation';
import { notification, } from 'antd';


import { UserAddOutlined } from '@ant-design/icons';
import initializationState from '../utils/initialStateClients'
const AddClients = () => {
  const dispatch = useDispatch()
  const [addClients, setAddClients] = useState(initializationState);
  const onChangeForm = e => {
    const { value, name } = e.target
    setAddClients({ ...addClients, [name]: value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault()
    dispatch(addClient(addClients))
    setAddClients(initializationState)
    openNotification()
  }
  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  
  const openNotification = () => {
    const key = `open${Date.now()}`;
    
    notification.open({
      message: 'Внимание',
      description:
        'Новый клиент добавлен',
      key,
      onClose: close,
    });
  };
  const {
    name,
    number,
  } = addClients;
  return (
    <>
      <form className="addClients__form" onSubmit={onSubmitForm}>
        <div className="addClients__form--slice">
          <div className="addClients__form--info">
            <input
              className="addClients__form--name"
              type="text"
              name="name"
              value={name}
              placeholder="Имя"
              onChange={onChangeForm}
              autoComplete="off"
            />
          </div>
          <div className="addClients__form--info">
            <input
              className="addClients__form--tel"
              type="tel"
              name="number"
              value={number}
              placeholder="Контактный телефон"
              onChange={onChangeForm}
            />
          </div>
        </div>
        <button className="addClients__form--btn" type="submit">
          <UserAddOutlined/> ДОБАВИТЬ
        </button>
      </form>
    </>
  );
};
export default AddClients;
