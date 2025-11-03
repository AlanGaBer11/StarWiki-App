type ToastPayload = {
  message: string;
  state?: "show" | "success" | "error" | "info" | "warning" | "loading";
  duration?: number;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
  icon?: string;
};

const EVENT_NAME = "app-toast";

const ToastService = {
  show(payload: ToastPayload) {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
  },
  success(message: string, opts: Partial<ToastPayload> = {}) {
    this.show({ message, state: "success", ...opts });
  },
  error(message: string, opts: Partial<ToastPayload> = {}) {
    this.show({ message, state: "error", ...opts });
  },
  info(message: string, opts: Partial<ToastPayload> = {}) {
    this.show({ message, state: "info", ...opts });
  },
  warning(message: string, opts: Partial<ToastPayload> = {}) {
    this.show({ message, state: "warning", ...opts });
  },
};

export default ToastService;
