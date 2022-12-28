import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Divider, Image, Table } from "antd";

const DetailOrder = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state?.id) {
      (async function () {
        try {
          setLoading(true);
          const res = await axios.get(
            `https://webbantranh.herokuapp.com/api/orderitem/getall/order/${state.id}`
          );
          console.log(res);
          const newData = res.data.map((item) => ({
            ...item.productVO,
            quantity: item.quantity,
          }));
          setData(newData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      })();
    }
  }, [state?.id]);

  const pirceSum = useMemo(() => {
    return data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
  }, [data]);

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
      dataIndex: "quantity",
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: 1200, y: 500 }}
        dataSource={data}
        columns={columns}
        loading={loading}
      />
      <div className="flex justify-end">
        <div className="flex flex-col w-[350px]">
          <div className="flex justify-between items-center">
            <span>Tạm tính</span>
            <span>{new Intl.NumberFormat("vi-VN").format(pirceSum)}đ</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Phí vận chuyển tạm tính</span>
            <span>0đ</span>
          </div>
          <Divider />
          <div className="flex justify-between items-center">
            <span>Tổng cộng</span>
            <span className="text-base">
              <span className="text-xs">VNĐ</span>{" "}
              {new Intl.NumberFormat("vi-VN").format(pirceSum)}đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
