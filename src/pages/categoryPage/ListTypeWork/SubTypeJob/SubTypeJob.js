import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { SearchOutlined, EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { deleteSubTypeJobServiceThunk, setTypeJobsServiceThunk } from '../../categorySlice';

const ListTypeWork = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log("id", id);
  const { arrayTypeJobs } = useSelector(state => state.categoryReducer)
  // console.log("🚀 ~ file: ListTypeWork.js ~ line 38 ~ ListTypeWork ~ arrayTypeJobs", arrayTypeJobs)
  let index = arrayTypeJobs.findIndex((typeJob) => {
  
    return typeJob._id === id;
  })
  // console.log("index", index);

  const data = arrayTypeJobs[index]?.subTypeJobs;
  // console.log("data subtype", data);

  useEffect(() => {
    dispatch(setTypeJobsServiceThunk());
  }, [])

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
              color: "gray"
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


  const columns = [
    {
      title: 'SubTypeJob',
      dataIndex: 'name',
      render: (text, subTypeJob, index) => {

        return (
          <div>
            <a href="/" key={index}>
              {subTypeJob.name}
            </a>
          </div>
        );
      },
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'ID SubTypeJob',
      dataIndex: '_id',
      key: 'subTypeJobs',
      width: '45%',
    },
    {
      title: 'SubTypeJob Image',
      dataIndex: '_id',
      key: 'subTypeJobs',
      render: (text, subTypeJob, index) => {
      
        return (
          <img style={{width:'100px', height:'100px', border:'1px solid black'}} src={subTypeJob.image || `https://picsum.photos/100`} alt="image Subtypejob" key={index} />
        );
      },
      width: '25%',
    },
    {
      title: 'Operation',
      dataIndex: '_id',
      render: (text, subTypeJob, index) => {

        return (
          <div className='flex' key={index}>
            <NavLink key={1} className='bg-slate-400 text-white mr-2 p-2 text-2xl' to={`/category/typejob/${id}/${subTypeJob._id}`}><EditOutlined /></NavLink>
            <span style={{ cursor: 'pointer' }}

              onClick={() => {
                if (window.confirm(`Ban co chac muon xoa ${subTypeJob.name}`)) {
                  dispatch(deleteSubTypeJobServiceThunk(subTypeJob._id))
                }
              }}
              key={2} className='bg-red-400 text-white p-2 text-2xl hover:bg-red-500 hover:text-gray-500' ><DeleteOutlined /></span>
          </div>
        );
      }
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <div>
          <p className='text-3xl'>{arrayTypeJobs[index]?.name}</p>
        </div>
        <button
          onClick={() => {
            navigate(`/category/typejob/${id}/addnew`);
          }}
          className='text-2xl bg-green-500 border-2 p-3 rounded-lg hover:shadow-md'><AppstoreAddOutlined />
          <span className='ml-2'>New SubTypeJob</span>
        </button>
      </div>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={data}
        size="small"
      />
    </div>
  );
};

export default ListTypeWork;
