import Container, { ContainerProps } from "./Container";
import CloseButton from "./CloseButton";

const Modal = { Container, CloseButton };

export type ModalProps = Omit<ContainerProps, "children">;
export default Modal;
