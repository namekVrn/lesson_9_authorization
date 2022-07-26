import { useDispatch, useSelector } from 'react-redux';
import { Table, Typography, Input, Button, Space, Modal, message} from 'antd';
import Highlighter from 'react-highlight-words';
import { NavLink } from 'react-router-dom';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import { DeleteOutlined} from '@ant-design/icons';
import { fetchClientsGet, deleteClient } from 'redux/clients/clients-operation';
const ClientList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const dispatch = useDispatch()

  useEffect(()=>{ //eslint-disable-line

    dispatch(fetchClientsGet()) //eslint-disable-line
  }, [dispatch]); //eslint-disable-line
  const clients = useSelector(store => store.clientsItems);
  console.log(clients)
  // const {
  //   name, // eslint-disable-line
  //   number, // eslint-disable-line
  // } = clients;
  console.log(clients)
  const showConfirm = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Действительно удалить клиента?',
      icon: <ExclamationCircleOutlined />,
      content: `Клиент с ID : ${id}`,
  
      onOk() {
        console.log('OK');
        dispatch(deleteClient(id))
        message.success('Клиент удален')
      },
  
      onCancel() {
        return
      },
    });
  };
 

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const column = [
    
    {
      title: 'ID',
      dataIndex: '',
      key: 'id',
      render: (store)=>{return <NavLink to={`/clientList/${store.id}`}>Карточка: {store.id}</NavLink> }
    },
   
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'id',
      ...getColumnSearchProps('name'),
    },
    
    {
      title: 'Телефон',
      dataIndex: 'number',
      key: 'id',
      ...getColumnSearchProps('tel'),
      sortDirections: ['descend', 'ascend'],
      render: (text) => {return <><Typography.Text copyable>{text}</Typography.Text> <br/> </>},
       
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'id',
      render: (text) => {return (
        <div>
          <Button type="dashed" onClick={()=>{showConfirm(text.id)}}><DeleteOutlined />delete</Button>
        </div>
      )},
    },
  ];
  return (
    <>
    <p>Клиенты</p>
      {/* <Table dataSource={clients} columns={column} /> */}
    </>
  );
};
export default ClientList;
