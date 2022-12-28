import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Image, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
const { confirm } = Modal;

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [toggleUpdateProd, setToggleUpdateProd] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState(0);
  const [page, setPage] = useState({
    start: 0,
    end: 10,
  });

  const handleChange = (page, pageSize) => {
    setPage({
      start: (page - 1) * pageSize,
      end: page * pageSize,
    });
  };

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://webbantranh.herokuapp.com/api/product/getpage/${page.start}/${page.end}`
        );
        if (res.data) {
          const newData = res.data?.map((item) => ({
            key: item.id,
            ...item,
          }));
          setDataProduct(newData);
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
  }, [updateData, page]);

  const handleGetOneProduct = useCallback(async (id) => {
    try {
      const res = await axios.get(
        `https://webbantranh.herokuapp.com/api/product/get/${id}`
      );
      console.log(res);
      if (res.status === 200) {
        setUpdateProduct(res.data);
        setToggleUpdateProd(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteProduct = useCallback(async (id) => {
    try {
      const res = await axios.delete(
        `https://webbantranh.herokuapp.com/api/product/delete/${id}`
      );
      if (res.status === 200) {
        openNotificationSuccess(
          "Xoá sản phẩm",
          "Bạn đã xoá sản phẩm thành công",
          "green"
        );
        setUpdateData((prev) => prev - 1);
      }
    } catch (error) {
      openNotificationFail("Error", "Có lỗi xảy ra khi xoá sản phẩm", "red");
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
        handleDeleteProduct(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "images",
      render: (img) => (
        <Image
          src={
            img ??
            "https://gentlenobra.com/wp-content/uploads/2021/11/anh-gai-xinh-nobra.jpg"
          }
          alt=""
          className="!w-20 aspect-video object-cover"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "number",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Tính năng",
      dataIndex: "options",
      fixed: "right",
      render: (_, { key }) => (
        <Space>
          <Button type="primary" onClick={() => handleGetOneProduct(key)}>
            <EditOutlined />
          </Button>
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
          onClick={() => setAddProduct(true)}
        >
          <PlusOutlined /> Thêm sản phẩm
        </Button>
      </div>
      <Table
        scroll={{ x: 1200, y: 500 }}
        dataSource={dataProduct}
        columns={columns}
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          total: dataProduct[0]?.number,
          onChange: handleChange,
        }}
      />
      <AddProduct
        addProduct={addProduct}
        setAddProduct={setAddProduct}
        setUpdateData={setUpdateData}
      />
      <UpdateProduct
        toggleUpdateProd={toggleUpdateProd}
        setToggleUpdateProd={setToggleUpdateProd}
        updateProduct={updateProduct}
        setUpdateProduct={setUpdateProduct}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default Products;
