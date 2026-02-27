import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> { }

export const Notes = (props: IProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="134"
            height="134"
            fill="none"
            viewBox="0 0 134 134"
            {...props}
        >
            <rect
                width="133"
                height="133"
                x=".5"
                y=".5"
                fill="#fff"
                stroke="#fff"
                rx="28.5"
            />
            <path
                fill="url(#a)"
                d="M0 30.036C0 13.448 13.448 0 30.036 0h73.928C120.552 0 134 13.448 134 30.036a8.58 8.58 0 0 1-8.582 8.582H8.582A8.58 8.58 0 0 1 0 30.036"
            />
            <path
                stroke="#B5B5B5"
                d="M15.998 48.61h101.004M16 72.745h101.005M16.003 96.882h101.004"
                strokeWidth=".4"
            />
            <defs>
                <linearGradient
                    id="a"
                    x1="64"
                    x2="69"
                    y1="0"
                    y2="39"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFD747" />
                    <stop offset="1" stopColor="#FFBC11" />
                </linearGradient>
            </defs>
        </svg>
    );
};