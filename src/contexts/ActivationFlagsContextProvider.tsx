import { PropsWithChildren, useReducer } from "react";
import { ActivationFlagsContext } from "./ActivationFlagsContext";
import { GlobalFlags } from "../types";
import { defaultFlags } from "../globals";

export enum FlagActivationTypes {
  ToggleJobFlag = "toggleJobFlag",
  ToggleAbilityFlag = "toggleAbilityFlag",
  ToggleTargetFlag = "toggleTargetFlag",
  ToggleAbilityTypeFlag = "toggleAbilityTypeFlag",
}

interface ActionWithNumber {
  type:
    | FlagActivationTypes.ToggleJobFlag
    | FlagActivationTypes.ToggleAbilityFlag;
  payload: number;
}

interface ActionWithString {
  type:
    | FlagActivationTypes.ToggleTargetFlag
    | FlagActivationTypes.ToggleAbilityTypeFlag;
  payload: string;
}

export type FlagActivationAction = ActionWithNumber | ActionWithString;

function reducer(state: GlobalFlags, action: FlagActivationAction) {
  if (action.type === "toggleJobFlag") {
    return {
      ...state,
      jobs: { ...state.jobs, [action.payload]: !state.jobs[action.payload] },
    };
  }

  if (action.type === "toggleAbilityFlag") {
    return {
      ...state,
      abilities: {
        ...state.abilities,
        [action.payload]: !state.abilities[action.payload],
      },
    };
  }

  if (action.type === "toggleTargetFlag") {
    return {
      ...state,
      target: {
        ...state.target,
        [action.payload]: !state.target[action.payload],
      },
    };
  }

  if (action.type === "toggleAbilityTypeFlag") {
    return {
      ...state,
      type: {
        ...state.type,
        [action.payload]: !state.type[action.payload],
      },
    };
  }

  throw Error("mrow");
}
export const ActivationFlagsContextProvider = ({
  children,
}: PropsWithChildren) => {
  // const [flags, setFlags] = useState<GlobalFlags>(defaultFlags);
  const [state, dispatch] = useReducer(reducer, defaultFlags);

  return (
    <ActivationFlagsContext.Provider value={[state, dispatch]}>
      {children}
    </ActivationFlagsContext.Provider>
  );
};
