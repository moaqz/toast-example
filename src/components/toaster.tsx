import "./toaster.css";

import { useEffect, useState } from "preact/hooks";
import { Toast, TOAST_EVENT } from "../app";

interface ToasterProps {
  duration: number;
}

const TOAST_DISMISS_ANIMATION = [
  { opacity: 1, transform: "translateX(0)" },
  { opacity: 0, transform: "translateX(100%)" },
];

const TOAST_DISMISS_ANIMATION_DURATION = 400;

export function Toaster(props: ToasterProps) {
  const { duration } = props;
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<Toast>) => {
      const newToast = event.detail;

      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => {
        const toastElement = document.querySelector(`[data-toast-id='${newToast.id}']`);
        if (toastElement) {
          toastElement.animate(TOAST_DISMISS_ANIMATION, {
            duration: TOAST_DISMISS_ANIMATION_DURATION,
            easing: "ease-out"
          });

          setTimeout(() => {
            setToasts((prevToasts) =>
              prevToasts.filter((toast) => toast.id !== newToast.id)
            );
          }, TOAST_DISMISS_ANIMATION_DURATION);
        }
      }, duration);
    };

    const listener = (event: Event) => {
      if (event instanceof CustomEvent) {
        handleToastEvent(event);
      }
    };

    window.addEventListener(TOAST_EVENT, listener);
    return () => {
      window.removeEventListener(TOAST_EVENT, listener);
    };
  }, []);

  return (
    <ol data-toaster>
      {toasts.map((toast) => (
        <li key={toast.id} data-toast data-type={toast.type} data-toast-id={toast.id}>
          <p data-toast-title>{toast.title}</p>
          {toast.description ? <p data-toast-description>{toast.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}
