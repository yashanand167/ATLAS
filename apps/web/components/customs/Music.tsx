import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const Music = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="124"
      height="124"
      fill="none"
      viewBox="0 0 124 124"
      {...props}
    >
      <g fill="#fff">
        <path d="M49.082 108.5c12.84 0 23.25-10.41 23.25-23.25S61.922 62 49.082 62s-23.25 10.41-23.25 23.25 10.41 23.25 23.25 23.25" />
        <path d="M62 15.5v69.75h10.333V36.167l28.417 7.75V25.833z" />
      </g>
    </svg>
  );
};