function Telegram({
  size = "35",
  color = "currentColor",
}: {
  size?: string | "35"
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className="telegram-icon"
    >
      <g clipPath="url(#clip0_9728_19)">
        <path
          d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35Z"
          fill="#D0D8DE"
        />
        <path
          d="M8.0076 17.1204L24.8805 10.6148C25.6636 10.3319 26.3476 10.8058 26.0939 11.99L26.0953 11.9885L23.2224 25.5233C23.0095 26.4829 22.4393 26.7162 21.6416 26.2642L17.2666 23.0398L15.1564 25.0727C14.923 25.306 14.7261 25.5029 14.2741 25.5029L14.5847 21.0506L22.693 13.7254C23.0459 13.4148 22.6143 13.2398 22.1491 13.5489L12.1289 19.8577L7.80927 18.5102C6.87156 18.2127 6.85114 17.5725 8.0076 17.1204Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_9728_19">
          <rect width="35" height="35" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Telegram }
