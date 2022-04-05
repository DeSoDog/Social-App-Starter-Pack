import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Action } from "../State/App.state";
export interface ActionType {
  onClick: Function;
  label: string;
}
export enum ActionName {
  HotFeed = "Hot Feed",
  MyPosts = "My Posts",
}
export const Actions = () => {
  const [selectedAction, setAction] = useRecoilState(Action);
  const [actions] = useState<ActionType[]>([
    {
      onClick: () => {
        setAction(ActionName.HotFeed);
      },
      label: ActionName.HotFeed,
    },
    {
      onClick: () => {
        setAction(ActionName.MyPosts);
      },
      label: ActionName.MyPosts,
    },
  ]);
  return (
    <div className="flex justify-center">
      {actions.map((action, index) => {
        const isSelected = action.label === selectedAction;
        return (
          <div
            onClick={() => {
              action.onClick();
            }}
            className={`text-lg hover:text-blue-700  hover:underline p-4 cursor-pointer px-36 border-gray-300 ${
              isSelected ? "text-blue-700 underline" : ""
            }`}
          >
            {action.label}
          </div>
        );
      })}
    </div>
  );
};
