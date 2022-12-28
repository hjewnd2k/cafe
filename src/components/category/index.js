import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";
import AddCategory from "./AddCategory";
const { confirm } = Modal;

const Category = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://webbantranh.herokuapp.com/api/category/getall`
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
  }, [updateData]);

  const hanleUpdate = async (name, id) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `https://webbantranh.herokuapp.com/api/category/update`,
        {
          id: id,
          name: name,
        }
      );
      if (res.status === 200) {
        openNotificationSuccess(
          "Sửa loại sản phẩm",
          "Bạn đã sửa loại sản phẩm thành công",
          "green"
        );
        setLoading(false);
      }
    } catch (error) {
      openNotificationFail(
        "Error",
        "Có lỗi xảy ra khi sửa loại sản phẩm",
        "red"
      );
      setLoading(false);
    }
  };

  const handleDeleteCategory = useCallback(async (id) => {
    try {
      const res = await axios.delete(
        `https://webbantranh.herokuapp.com/api/category/delete/${id}`
      );
      if (res.status === 200) {
        openNotificationSuccess(
          "Xoá loại sản phẩm",
          "Bạn đã loại xoá sản phẩm thành công",
          "green"
        );
        setUpdateData((prev) => prev - 1);
      }
    } catch (error) {
      openNotificationFail(
        "Error",
        "Có lỗi xảy ra khi xoá loại sản phẩm",
        "red"
      );
    }
  }, []);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xoá sản phẩm này không?",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      centered: true,
      onOk() {
        handleDeleteCategory(id);
      },
    });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (name, { key }) => (
        <Input
          defaultValue={name}
          style={{ maxWidth: 300 }}
          onBlur={(e) => {
            if (e.target.value) {
              hanleUpdate(e.target.value, key);
            }
          }}
        />
      ),
    },
    {
      title: "Tính năng",
      dataIndex: "options",
      render: (_, { key }) => (
        <Space>
          <Button type="primary" danger onClick={() => showDeleteConfirm(key)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <Button
          type="primary flex items-center"
          onClick={() => setAddCategory(true)}
        >
          <PlusOutlined /> Thêm loại sản phẩm
        </Button>
      </div>
      <Table
        scroll={{ y: 500 }}
        dataSource={dataCategory}
        columns={columns}
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          total: 10,
        }}
      />
      <AddCategory
        addCategory={addCategory}
        setAddCategory={setAddCategory}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default Category;
