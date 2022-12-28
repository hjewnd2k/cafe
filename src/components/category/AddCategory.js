import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React from "react";
import axios from "axios";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";
const { Option } = Select;

const AddCategory = ({ addCategory, setAddCategory, setUpdateData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const res = await axios.post(
        "https://webbantranh.herokuapp.com/api/category/insert",
        values
      );
      if (res.status === 200) {
        form.setFieldValue({
          name: null,
        });
        openNotificationSuccess(
          "Thêm loại sản phẩm",
          "Bạn đã thêm loại sản phẩm thành công",
          "green"
        );
        setUpdateData((prev) => prev + 1);
      }
      setLoading(false);
      setAddCategory(false);
    } catch (error) {
      openNotificationFail(
        "Error",
        "Có lỗi xảy ra khi thêm loại sản phẩm",
        "red"
      );
      setAddCategory(false);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm loại sản phẩm"
      centered
      width={800}
      visible={addCategory}
      onOk={() => setAddCategory(false)}
      onCancel={() => setAddCategory(false)}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label={<div>Loại sản phẩm</div>}
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập loại sản phẩm",
            },
          ]}
        >
          <Input placeholder="Tên loại sản phẩm" />
        </Form.Item>
        <div className="flex justify-center items-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-60"
            loading={loading}
          >
            Thêm loại sản phẩm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCategory;
