import {
  Anchor,
  Button,
  Card,
  Flex,
  Group,
  Image,
  NumberInput,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store-context";

export const Login = () => {
  const { userStore, authStore } = useStore();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"register" | "login">("login");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate: {
      userName: isNotEmpty("Name cannot be empty"),
      password: matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        "Password should have minimum eight characters, at least one letter, one number and one special character"
      ),
    },
    validateInputOnBlur: true,
  });

  const register = async (values: {
    userName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const result = await userStore.AddUser({ id: 0, ...values });
    if (result) {
      notifications.show({
        message: "Registered successfully",
        color: "green",
      });
      setLoginType("login");
    } else {
      notifications.show({
        message: "User registration failed",
        color: "red",
      });
    }
    setLoading(false);
    form.reset();
  };

  const login = async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    setLoading(true);
    const token = await authStore.Login({
      userName: userName,
      password: password,
    });
    if (token) {
      sessionStorage.setItem("userToken", token);
      form.reset();
      navigate("/Home");
    } else {
      notifications.show({
        message: "Incorrect User name/Password",
        color: "red",
      });
    }
    setLoading(false);
  };

  const toggleLoginType = () => {
    if (loginType == "login") {
      setLoginType("register");
    } else {
      setLoginType("login");
    }
    form.reset();
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card shadow="sm" radius="md" withBorder padding="lg" w={400}>
        <Card.Section style={{ margin: 0 }}>
          <form
            onSubmit={form.onSubmit((value) => {
              if (loginType == "register") {
                register(value);
              } else {
                login(value);
              }
            })}
          >
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps("userName")}
            />
            <PasswordInput
              mt="sm"
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            {loginType == "register" ? (
              <TextInput
                mt="sm"
                type="email"
                label="Email"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
            ) : null}
            <Group position="apart">
              <Anchor
                component="button"
                type="button"
                onClick={() => {
                  toggleLoginType();
                }}
              >
                {loginType == "login" ? "Register user" : "Login"}
              </Anchor>
              <Button type="submit" mt="sm" loading={loading}>
                {loginType === "login" ? "Login" : "Register"}
              </Button>
            </Group>
          </form>
        </Card.Section>
      </Card>
    </div>
  );
};
