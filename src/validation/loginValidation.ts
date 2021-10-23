type LoginValidateFieldsRequest = {
  email: string;
  password: string;
};

const loginValidation = {
  validateFields(
    data: Partial<LoginValidateFieldsRequest>
  ): data is LoginValidateFieldsRequest {
    return !!data.email && !!data.password;
  },
};

export default loginValidation;
