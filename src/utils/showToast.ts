import { toast } from "react-toastify";

export default function showToast(message: string, error = false): void {
  if (error) {
    toast.error(message);
  } else {
    toast.success(message);
  }
}
