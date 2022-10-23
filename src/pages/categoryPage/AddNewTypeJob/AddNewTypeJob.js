import React from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addTypeJobServiceThunk } from "../categorySlice";
import { NavLink, useNavigate } from "react-router-dom";
import { DoubleLeftOutlined } from "@ant-design/icons";

export default function AddNewTypeJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(addTypeJobServiceThunk(values));
    navigate("/category");
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div>
      <div className="border-2 p-3 rounded-lg w-96 text-center text-2xl bg-green-500 flex items-center">
        <div>
          <NavLink className="" to="/category">
            <DoubleLeftOutlined />
          </NavLink>
        </div>
        <h1 className="" style={{ marginLeft: "75px" }}>
          Add New TypeJob
        </h1>
      </div>
      <div className="border-2 p-3 rounded-lg w-96">
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name TypeJob"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your TypeJob!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="w-24 mx-auto">
            <Form.Item>
              <button className="border-2 rounded-lg bg-blue-500 block p-2 w-24 mx-auto cursor-pointer hover:text-white hover:shadow-lg">
                Add
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
