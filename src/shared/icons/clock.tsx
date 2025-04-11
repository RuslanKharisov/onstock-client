import { FC, SVGProps } from "react"

const Clock: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.9999 2.36363C14.2106 2.36363 17.6363 5.78929 17.6363 9.99999C17.6363 14.2107 14.2106 17.6364 9.9999 17.6364C5.7892 17.6364 2.36354 14.2107 2.36354 9.99999C2.36354 5.78929 5.7892 2.36363 9.9999 2.36363ZM9.9999 0.727264C4.87871 0.727264 0.727173 4.87881 0.727173 9.99999C0.727173 15.1212 4.87871 19.2727 9.9999 19.2727C15.1211 19.2727 19.2726 15.1212 19.2726 9.99999C19.2726 4.87881 15.1211 0.727264 9.9999 0.727264Z"
        fill="currentColor"
      />
      <path
        d="M10 5.36362V10.2727"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99988 10.2727L6.69324 12.1818"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { Clock }
