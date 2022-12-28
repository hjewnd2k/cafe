import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="lg:mt-15">
      <Row className="h-[80vh] lg:h-[100vh] flex items-center">
        <Col
          lg={12}
          span={24}
          className="text-[54px] font-bold flex justify-center items-center border-b border-[#ccc] lg:border-b-0 lg:border-r lg:border-[#ccc] h-40 lg:h-[100vh]"
        >
          <div className="w-[80%] text-center">Đăng nhập</div>
        </Col>
        <Col lg={12} span={24} className="flex justify-center items-center">
          <Form className="w-[80%]" onFinish={onFinish}>
            <Typography.Title level={3}>Phục hồi mật khẩu</Typography.Title>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống!",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input placeholder="Email" className="h-14" />
            </Form.Item>
            <Space>
              <Button
                className="h-[57px] bg-primary text-white uppercase font-semibold px-7"
                htmlType="submit"
              >
                Gửi
              </Button>
              <div className="ml-3 text-primary font-semibold">
                <Link to={"/auth/login"}>Huỷ</Link>
              </div>
            </Space>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Forgot;
