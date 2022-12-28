import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";
const { Option } = Select;

const AddProduct = ({ addProduct, setAddProduct, setUpdateData }) => {
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", values.file.file.originFileObj);
    try {
      const res = await axios.post(
        "https://webbantranh.herokuapp.com/api/product/image/insert",
        formData
      );
      console.log(res);
      values.images =
        "https://webbantranh.herokuapp.com/api/product/image/files/" + res.data;
      const res2 = await axios.post(
        "https://webbantranh.herokuapp.com/api/product/insert",
        values
      );

      form.setFieldValue({
        file: [],
        categoryId: null,
        name: null,
        price: null,
        number: null,
        description: null,
      });
      openNotificationSuccess(
        "Thêm sản phẩm",
        "Bạn đã thêm sản phẩm thành công",
        "green"
      );
      setUpdateData((prev) => prev + 1);
      setAddProduct(false);
      setLoading(false);
    } catch (error) {
      openNotificationFail("Error", "Có lỗi xảy ra khi thêm sản phẩm", "red");
      setLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/category/getall`
        );
        if (res.data) {
          const newData = res.data?.map((item) => ({
            key: item.id,
            ...item,
          }));
          setDataCategory(newData);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openNotificationFail(
          "Error",
          "Có lỗi xảy ra khi lấy danh sách sản phẩm",
          "red"
        );
      }
    })();
  }, []);

  return (
    <Modal
      title="Thêm sản phẩm"
      centered
      width={800}
      visible={addProduct}
      onOk={() => setAddProduct(false)}
      onCancel={() => setAddProduct(false)}
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
          label={<div>Hình ảnh</div>}
          name="file"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Upload listType="picture">
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label={<div>Loại sản phẩm</div>}
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại sản phẩm",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn loại sản phẩm"
            optionFilterProp="children"
          >
            <Option value="4">Tranh</Option>
            <Option value="14">Vẽ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<div>Tên sản phẩm</div>}
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm",
            },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item
          label={<div>Giá</div>}
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá sản phẩm",
            },
          ]}
        >
          <Input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Nhập giá"
          />
        </Form.Item>
        <Form.Item
          label={<div>Số lượng</div>}
          name="number"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng sản phẩm",
            },
          ]}
        >
          <Input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Nhập số lượng"
          />
        </Form.Item>
        <Form.Item
          label={<div>Mô tả</div>}
          name="description"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="Nhập mô tả sản phẩm" />
        </Form.Item>
        <div className="flex justify-center items-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-60"
            loading={loading}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProduct;
