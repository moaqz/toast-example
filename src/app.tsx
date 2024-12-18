import { Toaster } from "./components/toaster";

export const TOAST_EVENT = "create-toast";

export type Toast = {
  id: string;
  description: string;
  title: string;
  type: "success" | "error" | "info";
};

const TOAST_DETAILS = {
  error: {
    title: "Oops! Something went wrong.",
    description: "There was an issue processing your request.",
  },
  success: {
    title: "Success! Everything went smoothly.",
    description: "Your request was successful!",
  },
  info: {
    title: "Here's something you should know.",
    description: "No action required, just an update.",
  },
};

export function App() {
  const addToast = () => {
    const types = ["error", "success", "info"];
    const type = types[Math.floor(Math.random() * types.length)] as Toast["type"];
    const { title, description } = TOAST_DETAILS[type];

    const toastEvent = new CustomEvent<Toast>(TOAST_EVENT, {
      detail: {
        id: crypto.randomUUID(),
        title,
        description,
        type,
      },
      bubbles: true
    });

    dispatchEvent(toastEvent);
  };

  return (
    <div class="page">
      <button onClick={addToast}>Render a toast</button>
      <Toaster duration={4000} />
    </div>
  );
}
