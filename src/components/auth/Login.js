import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";
import { openNotificationFail } from "../notificaction";

const Login = () => {
  const { dispatch, state } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setDisabled(true);
      const response = await axios.post(
        "https://webbantranh.herokuapp.com/api/login",
        values
      );
      const { token, userName, role } = response.data;
      if (role === "admin") {
        localStorage.setItem("DucMinhToken", token);
        dispatch({
          type: "CURRENT_USER",
          payload: { userName, role, isLogin: true },
        });
        navigate("/");
      } else {
        openNotificationFail("Đăng nhập", "Chỉ admin mới có quyền đăng nhập");
        setDisabled(false);
      }
    } catch (error) {
      setErrorMessage(true);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (state.user?.isLogin) {
      navigate("/");
    }
  }, [navigate, state.user]);

  return (
    <div className="">
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
            {errorMessage && (
              <div className="text-center mb-2 text-red-500">
                <span>Error: Tài khoản hoặc mật khẩu không đúng!</span>
              </div>
            )}
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Tài khoản không được để trống!",
                },
              ]}
            >
              <Input placeholder="Tài khoản" className="h-14" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" className="h-14" />
            </Form.Item>
            <Space>
              <Button
                className="h-[57px] bg-primary text-white uppercase font-semibold w-[148px]"
                htmlType="submit"
                disabled={disabled}
              >
                Đăng nhập
              </Button>
              <div className="ml-3 text-primary font-semibold">
                <div>
                  <Link to={"/auth/forgot"}>Quên mật khẩu</Link>
                </div>
              </div>
            </Space>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
