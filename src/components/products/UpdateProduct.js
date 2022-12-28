import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";
const { Option } = Select;

const UpdateProduct = ({
  toggleUpdateProd,
  setToggleUpdateProd,
  updateProduct,
  setUpdateProduct,
  setUpdateData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([
    {
      url: updateProduct.images,
    },
  ]);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    if (values.file[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
      try {
        const res = await axios.post(
          `https://webbantranh.herokuapp.com/api/product/image/insert`,
          formData
        );
        console.log(res);
        values.images =
          "https://webbantranh.herokuapp.com/api/product/image/files/" +
          res.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      values.images = updateProduct.images;
    }
    try {
      const res2 = await axios.post(
        `https://webbantranh.herokuapp.com/api/product/update/${updateProduct.id}`,
        values
      );
      // console.log(res2);
      if (res2) {
        openNotificationSuccess(
          "Sửa sản phẩm",
          "Bạn đã sửa sản phẩm thành công",
          "green"
        );
      }
      setUpdateData((prev) => prev - 1);
      setToggleUpdateProd(false);
      setLoading(false);
    } catch (error) {
      openNotificationFail("Error", "Có lỗi xảy ra khi sửa sản phẩm", "red");
      setLoading(false);
    }
  };

  const handleRemove = useCallback((e) => {
    return new Promise((resolve, reject) => {
      setFileList([]);
    });
  }, []);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setFileList(e?.fileList);
    return e?.fileList;
  };

  useEffect(() => {
    form.setFieldsValue({
      file: [
        {
          url: updateProduct.images,
        },
      ],
      ...updateProduct,
    });
    setFileList([
      {
        url: updateProduct.images,
      },
    ]);
  }, [updateProduct]);

  return (
    <Modal
      title="Sửa sản phẩm"
      centered
      width={800}
      visible={toggleUpdateProd}
      onCancel={() => {
        setToggleUpdateProd(false);
      }}
      footer={null}
    >
      {updateProduct && (
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          form={form}
          initialValues={updateProduct}
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
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onRemove={handleRemove}
            >
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
              <Option value={4}>Tranh</Option>
              <Option value={14}>Vẽ</Option>
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
              Sửa sản phẩm
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default UpdateProduct;
