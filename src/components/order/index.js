import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://webbantranh.herokuapp.com/api/order/getall"
        );
        setDataOrder(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người đặt",
      dataIndex: "shipName",
      key: "shipName",
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Giá",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataOrder}
      loading={loading}
      rowClassName="cursor-pointer"
      onRow={(record) => {
        return {
          onClick: () => {
            navigate("detail", {
              state: { id: record.id },
            });
          },
        };
      }}
    />
  );
};

export default Order;
