import { Form, Input, InputNumber, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  CREATE_JOB,
  GET_ALL_TYPE_JOB,
  SUCCESS,
  UPDATE_JOB,
} from '../../../constants/globalVariable';
import { listWorkApi } from '../../../service/listWorkService';

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

export const CreateJob = () => {
  const { id } = useParams();
  const { workDetail } = useSelector(
    (state) => state.listWorkPageReducer
  );
  const { idJob } = useSelector((state) => state.listWorkPageReducer);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const dispatch = useDispatch();
  const { typeJob } = useSelector(
    (state) => state.listWorkPageReducer
  );
  const [listSubJob, setListSubJob] = useState([]);
  const [valueField, setValueField] = useState({
    proServices: false,
    localSellers: false,
    onlineSellers: false,
    deliveryTime: false,
    type: '',
    subType: '',
    image: '',
    name: '',
    price: 0,
    id: '',
  });
  const onFinish = (values) => {
    let data = values;
    const indexCheckType = typeJob.findIndex(
      (type) => type.name === values.type
    );
    if (indexCheckType !== -1) {
      data = { ...data, type: typeJob[indexCheckType].id };
    }

    const indexCheckSubType = typeJob
      .map((type) =>
        type.subTypeJobs?.filter(
          (subType) => subType.label === values.subType
        )
      )
      .filter((type) => type?.length > 0);
    if (indexCheckSubType[0]?.length > 0) {
      data = { ...data, subType: indexCheckSubType[0][0]?.key };
    }
    console.log(data);
    if (id) {
      dispatch({
        type: UPDATE_JOB,
        payload: {
          id: id,
          data: data,
        },
      });
    } else {
      dispatch({ type: CREATE_JOB, payload: data });
    }

    if (!imageUpload) {
      setTimeout(() => navigate('/job', 1000));
    }

    form.resetFields();
  };

  const handleChangeListSubJob = (job) => {
    const subJob = typeJob.find((item) => item.id === job);
    setListSubJob(subJob.subTypeJobs);
  };

  useEffect(() => {
    (async () => {
      if (imageUpload) {
        const fd = new FormData();
        fd.append('job', imageUpload, imageUpload.name);
        try {
          const res = await listWorkApi.updateImageJob(idJob, fd);
          console.log(res);
          if (res.status === SUCCESS) {
            setTimeout(() => navigate('/job', 800));
          }
          setImageUpload(null);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [idJob, dispatch]);

  useEffect(() => {
    form.setFieldsValue(valueField);
  }, [valueField]);

  useEffect(() => {
    dispatch({ type: GET_ALL_TYPE_JOB });
  }, [dispatch]);
  useEffect(() => {
    if (imageUpload === null) return;
    document.getElementById('imgJob').src =
      URL.createObjectURL(imageUpload);
  }, [imageUpload]);

  useEffect(() => {
    if (id) {
      let valueJobEdit = {
        ...valueField,
        image: workDetail.image || '',
        name: workDetail.name || '',
        deliveryTime: workDetail.deliveryTime || false,
        localSellers: workDetail.localSellers || false,
        onlineSellers: workDetail.onlineSellers || false,
        proServices: workDetail.proServices || false,
        price: workDetail.price || 0,
        id: workDetail._id || '',
      };
      if (workDetail.type) {
        valueJobEdit = {
          ...valueJobEdit,
          subType: workDetail.subType?.name,
          type: workDetail.type?.name,
        };
      }
      setValueField(valueJobEdit);
    }
  }, [workDetail, id]);
  return (
    <div
      id='create-job'
      className='w-[50%] flex flex-col gap-y-10 items-center mx-auto'
    >
      <Form
        form={form}
        // initialValues={valueField}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name='name'
          label='Name Job'
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
            span: 4,
          }}
          name='price'
          label='Price'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <div className='flex flex-col gap-y-4 items-center '>
          <div className='flex items-center gap-x-10 justify-between'>
            <Form.Item
              valuePropName='checked'
              name='proServices'
              label='ProServices'
            >
              <Switch checked={true} />
            </Form.Item>
            <Form.Item
              valuePropName='checked'
              name='localSellers'
              label='LocalSellers'
            >
              <Switch />
            </Form.Item>
          </div>
          <div className='flex items-center gap-x-10  justify-between'>
            <Form.Item
              valuePropName='checked'
              name='onlineSellers'
              label='OnlineSellers'
            >
              <Switch />
            </Form.Item>
            <Form.Item
              valuePropName='checked'
              name='deliveryTime'
              label='DeliveryTime'
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex-1'>
            <Form.Item
              name='type'
              rules={[
                {
                  required: true,
                },
              ]}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label='SELECT A CATEGORIES'
            >
              <Select onChange={(job) => handleChangeListSubJob(job)}>
                {typeJob?.length > 0 &&
                  typeJob.map((job) => {
                    return (
                      <Select.Option key={job.id} value={job.id}>
                        {job.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className='flex-1'>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name='subType'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label='SELECT A SUBCATEGORIES'
            >
              <Select>
                {listSubJob.length > 0 &&
                  listSubJob.map((job) => {
                    return (
                      <Select.Option key={job.key} value={job.key}>
                        {job.label}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className='flex justify-center mt-4 cursor-pointer'>
          <div className='group relative w-[300px]  h-[300px]  rounded-lg overflow-hidden border-2 transition-all'>
            {imageUpload || id ? (
              <img
                id='imgJob'
                className='w-full h-full object-cover absolute z-10 inset-0'
                src={workDetail?.image}
                alt=''
              />
            ) : (
              ''
            )}

            <input
              accept='image/*'
              className='absolute cursor-pointer z-1 w-full h-full top-0 left-0 opacity-0 z-20'
              type='file'
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
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
