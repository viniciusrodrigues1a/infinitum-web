import { AxiosLanguage } from "./libs";
import { ValidationLanguage } from "./validation";
import { PagesLanguage } from "./pages";
import { ComponentsLanguage } from "./components";

export type Language = {
  pages: PagesLanguage;
  components: ComponentsLanguage;
  validation: ValidationLanguage;
  libs: {
    axios: AxiosLanguage;
  };
};
