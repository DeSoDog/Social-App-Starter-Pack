export interface ButtonProps {
  click: Function;
  buttonText: string;
}
export const Button = ({ click, buttonText }: ButtonProps) => {
  return (
    <button className="rounded-md bg-purple-700 px-4" onClick={() => click()}>
      {buttonText}
    </button>
  );
};
