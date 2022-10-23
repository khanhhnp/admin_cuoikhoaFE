import { Form, Input, Select, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  CREATE_USER,
  UPDATE_USER,
} from '../../../constants/globalVariable';
const { Option } = Select;

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

export const CreateUser = () => {
  const { id } = useParams();
  const { userDetail } = useSelector((state) => state.listUserReducer);
  
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueField, setValueField] = useState({
    skill: [],
    certification: [],
    bookingJob: [],
    deleteAt: false,
    _id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: true,
    role: '',
    __v: 0,
    avatar: '',
  });
  const onFinish = (values) => {
    let data = values;
    console.log(data);
    if (id) {
      dispatch({
        type: UPDATE_USER,
        payload: {
          id: id,
          data: data,
        },
      });
    } else {
      dispatch({ type: CREATE_USER, payload: data });
    }
    setTimeout(() => navigate('/', 1000));
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(valueField);
  }, [valueField]);
  useEffect(() => {
    if (id) {
      let valueUserEdit = {
        ...valueField,
        skill: userDetail.skill || [],
        certification: userDetail.certification || [],
        bookingJob: userDetail.bookingJob || [],
        deleteAt: userDetail.deleteAt || false,
        _id: userDetail._id || '',
        name: userDetail.name || '',
        email: userDetail.email || '',
        password: userDetail.password || '',
        phone: userDetail.phone || '',
        birthday: moment(userDetail.birthday) || '',
        gender: userDetail.gender || true,
        role: userDetail.role || '',
        __v: userDetail.__v || 0,
        avatar: userDetail.avatar || '',
      };
      setValueField(valueUserEdit);
    }
  }, [userDetail, id]);
  return (
    <div id='create-user' className='w-[80%] flex gap-y-10'>
      <Form
        form={form}
        validateMessages={validateMessages}
        onFinish={onFinish}
        className='w-full'
      >
        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='name'
          label='Name User'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='email'
          label='Email User'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='password'
          label='Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='phone'
          label='Phone'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='birthday'
          label='Birthday'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <DatePicker format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='skill'
          label='Skill'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='certification'
          label='Certification'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='role'
          label='Role'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value='ADMIN'>ADMIN</Option>
            <Option value='CLIENT'>CLIENT</Option>
          </Select>
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='bookingJob'
          label='Booking Job'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='avatar'
          label='Avatar'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className='flex justify-center mt-4 cursor-pointer'>
          <div className='group relative w-[300px]  h-[300px]  rounded-lg overflow-hidden border-2 transition-all'>
            <img
              id='imgUser'
              className='w-full h-full object-cover absolute z-10 inset-0'
              src={userDetail?.avatar}
              alt=''
            />
            <div className='absolute inset-0 text-8xl justify-center bg-slate-400 text-white flex  items-center transition-all'>
              <BsCardImage />
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-x-4 mt-10 item-center'>
          <button
            type='button'
            className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 '
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          {id ? (
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
            >
              Edit
            </button>
          ) : (
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
            >
              Create
            </button>
          )}
        </div>
      </Form>
    </div>
  );
};
