// Inspired by shadcn/ui components system configuration frameworks
import * as React from "react";
import { toast as sonnerToast } from "sonner";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 10000;

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Action =
  | { type: typeof actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes.DISMISS_TOAST; toastId?: string }
  | { type: typeof actionTypes.REMOVE_TOAST; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

// FIX: Change 'ReturnType<typeof setTimeout>' to accept any timer type safely
const toastTimeouts = new Map<string, any>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  // FIX: Pass 'timeout' directly now that the type mapping restrictions are lifted
  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((toast) => addToRemoveQueue(toast.id));

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t,
        ),
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) return { ...state, toasts: [] };
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

// Intercepts and bridges parameters seamlessly into your custom Sonner instance
export function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = generateId();

  const titleString = typeof props.title === "string" ? props.title : "";
  const descriptionString =
    typeof props.description === "string" ? props.description : "";

  // Route directly into your styled sonner layout via error or success channels
  if (props.variant === "destructive") {
    sonnerToast.error(titleString || "Error Exception Raised", {
      description: descriptionString || undefined,
      id,
    });
  } else {
    sonnerToast.success(titleString || "Action Complete", {
      description: descriptionString || undefined,
      id,
    });
  }

  // Keep state sync active for legacy component handlers
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
    } as ToasterToast,
  });

  return {
    id,
    update: (updatedProps: ToasterToast) => {
      dispatch({ type: "UPDATE_TOAST", toast: { ...updatedProps, id } });
    },
    dismiss: () => {
      dispatch({ type: "DISMISS_TOAST", toastId: id });
      sonnerToast.dismiss(id);
    },
  };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      dispatch({ type: "DISMISS_TOAST", toastId });
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
  };
}
