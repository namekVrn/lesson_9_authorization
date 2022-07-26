import { Form, InputNumber, Input, Popconfirm, Table, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientApi } from 'components/utils/api';
import { updateClient } from 'redux/clients/clients-operation';
import '../ClientCard/clientcard.css';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ClientCard = () => {
  const dispatch = useDispatch();
  const { idElem } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const selector = useSelector(store => store.clients.loading);
  const [newDataState, setNewDataState] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.key === editingKey;

  useEffect(async () => {
    console.log(idElem)
    setNewDataState(await fetchClientApi(Number(idElem)));
    console.log(newDataState);
   
  }, [idElem]);

  useEffect(async () => {
    // eslint-disable-line
    if (data.length > 0) {
      console.log('больше 0 ');
      dispatch(await updateClient(data[0]));
    }

    // setNewDataState(await fetchClientApi(Number(idElem)))
    console.log(selector);
  }, [data]); //

  const edit = record => {
    form.setFieldsValue({
      name: '',
      number: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: true,
      render: store => {
        return <p>id: {store}</p>;
      },
    },
   
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'id',
      editable: true,
    },
   
    {
      title: 'Телефон',
      dataIndex: 'number',
      key: 'id',
      editable: true,
      sortDirections: ['descend', 'ascend'],
      render: text => {
        return (
          <>
            <Typography.Text copyable>{text}</Typography.Text> <br />{' '}
          </>
        );
      },
    },
    
    
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
   <>
   {selector && <Spin/>}
   <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={[newDataState]}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    
   </>
    
     
  );
};
export default ClientCard;
