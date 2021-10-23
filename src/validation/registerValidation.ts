type RegisterValidateFieldsRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type RegisterValidatePasswordConfirmationRequest = {
  password: string;
  passwordConfirmation: string;
};

const registerValidation = {
  validateFields(
    data: Partial<RegisterValidateFieldsRequest>
  ): data is RegisterValidateFieldsRequest {
    return (
      !!data.name &&
      !!data.email &&
      !!data.password &&
      !!data.passwordConfirmation
    );
  },
  validatePasswordConfirmationField(
    data: Partial<RegisterValidatePasswordConfirmationRequest>
  ): data is RegisterValidatePasswordConfirmationRequest {
    return (
      !!data.password &&
      !!data.passwordConfirmation &&
      data.password === data.passwordConfirmation
    );
  },
};

export default registerValidation;
