import React, { useState, useEffect } from "react";
import { IonToast } from "@ionic/react";

interface ToastProps {
  message?: string;
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
  onClose?: () => void;
}

const EVENT_NAME = "app-toast";

const Toast: React.FC<ToastProps> = ({
  message: propMessage,
  state: propState,
  duration: propDuration = 3000,
  color: propColor,
  icon: propIcon,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(propMessage);
  const [state, setState] = useState<ToastProps["state"] | undefined>(
    propState
  );
  const [duration, setDuration] = useState<number>(propDuration);
  const [color, setColor] = useState<ToastProps["color"] | undefined>(
    propColor
  );
  const [icon, setIcon] = useState<string | undefined>(propIcon);

  useEffect(() => {
    // If parent passes message prop, open toast
    if (propMessage) {
      setMessage(propMessage);
      setState(propState);
      setDuration(propDuration);
      setColor(propColor);
      setIcon(propIcon);
      setIsOpen(true);
    }
  }, [propMessage, propState, propDuration, propColor, propIcon]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      setMessage(detail.message);
      setState(detail.state);
      setDuration(detail.duration ?? 3000);
      setColor(detail.color);
      setIcon(detail.icon);
      setIsOpen(true);
    };
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () =>
      window.removeEventListener(EVENT_NAME, handler as EventListener);
  }, []);

  const colorMap: Record<string, ToastProps["color"] | undefined> = {
    success: "success",
    error: "danger",
    warning: "warning",
    info: "primary",
    loading: "medium",
    show: color ?? "primary",
  };

  const finalColor = color ?? (state ? colorMap[state] : undefined);

  return (
    <IonToast
      isOpen={isOpen}
      message={message}
      duration={duration}
      color={finalColor}
      icon={icon}
      onDidDismiss={() => {
        setIsOpen(false);
        onClose?.();
      }}
    />
  );
};

export default Toast;
