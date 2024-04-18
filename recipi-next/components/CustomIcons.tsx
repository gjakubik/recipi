type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  twitter: (props: IconProps) => (
    <svg
      {...props}
      height="23"
      viewBox="0 0 1200 1227"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  react: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
        fill="currentColor"
      />
    </svg>
  ),
  tailwind: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  apple: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  ),
  paypal: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
        fill="currentColor"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  circlex: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  ),
  logo: (props: IconProps) => (
    <svg
      width="83"
      height="114"
      viewBox="0 0 83 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 111.091C1 111.643 1.44772 112.091 2 112.091H5.30256C5.85484 112.091 6.30256 111.643 6.30256 111.091H10.9077C10.9077 111.643 11.3554 112.091 11.9077 112.091H15.2102C15.7625 112.091 16.2102 111.643 16.2102 111.091V107.613C16.2102 107.061 15.7625 106.613 15.2102 106.613V101.658C15.7625 101.658 16.2102 101.21 16.2102 100.658V93.703C16.2102 93.1507 15.7625 92.703 15.2102 92.703V87.7479C15.7625 87.7479 16.2102 87.3002 16.2102 86.7479V79.7927C16.2102 79.2404 15.7625 78.7927 15.2102 78.7927V73.8376C15.7625 73.8376 16.2102 73.3898 16.2102 72.8376V68.4773H19.4304C19.4304 69.0296 19.8781 69.4773 20.4304 69.4773H27.8878C28.4401 69.4773 28.8878 69.0296 28.8878 68.4773H34.3452C34.3452 69.0296 34.7929 69.4773 35.3452 69.4773H39.0739C39.9971 69.4773 40.9034 69.4608 41.7925 69.4277C41.982 69.4206 42.1573 69.3612 42.3049 69.2639L42.9139 70.3936C42.4278 70.6557 42.2462 71.2622 42.5083 71.7484L45.8108 77.8741C46.0729 78.3602 46.6795 78.5418 47.1656 78.2797L49.5191 82.645C49.0329 82.9071 48.8513 83.5136 49.1134 83.9998L52.4159 90.1255C52.678 90.6116 53.2846 90.7932 53.7707 90.5312L56.1242 94.8964C55.638 95.1585 55.4564 95.7651 55.7185 96.2512L59.0211 102.377C59.2831 102.863 59.8897 103.045 60.3758 102.783L62.7293 107.148C62.2431 107.41 62.0615 108.016 62.3236 108.503L63.9749 111.565C64.1494 111.889 64.4874 112.091 64.8551 112.091H68.6903C69.2426 112.091 69.6903 111.643 69.6903 111.091H75.3608C75.3608 111.643 75.8085 112.091 76.3608 112.091H80.196C80.5493 112.091 80.8763 111.905 81.0564 111.601C81.2364 111.297 81.2428 110.92 81.073 110.61L79.3951 107.548C79.1298 107.063 78.522 106.886 78.0377 107.151L75.6427 102.779C76.1271 102.514 76.3047 101.906 76.0393 101.422L72.6835 95.2962C72.4181 94.8118 71.8104 94.6343 71.326 94.8996L68.9311 90.5279C69.4155 90.2626 69.593 89.6548 69.3277 89.1705L65.9718 83.0448C65.7065 82.5604 65.0987 82.3829 64.6144 82.6482L62.2194 78.2765C62.7038 78.0112 62.8814 77.4034 62.616 76.9191L59.2602 70.7933C58.9948 70.309 58.3871 70.1314 57.9027 70.3968L55.5527 66.107C55.8851 65.9939 56.2131 65.8768 56.5367 65.7556C56.5386 65.7603 56.5405 65.765 56.5424 65.7697C56.7517 66.2808 57.3357 66.5255 57.8468 66.3162C58.7152 65.9605 59.553 65.5744 60.3601 65.1577L60.3646 65.1553C61.699 64.4576 62.9543 63.6958 64.1295 62.8693C64.5813 62.5515 64.69 61.9278 64.3723 61.476C64.369 61.4715 64.3658 61.4669 64.3626 61.4625C66.1472 60.1158 67.7209 58.6089 69.0836 56.9418C69.0886 56.9457 69.0936 56.9496 69.0987 56.9534C69.5393 57.2864 70.1665 57.1991 70.4994 56.7585C71.3877 55.5831 72.1802 54.3359 72.877 53.0177C73.5859 51.6766 74.2017 50.2848 74.7247 48.8427C74.9129 48.3235 74.6447 47.7499 74.1255 47.5617C74.1207 47.5599 74.1159 47.5582 74.1112 47.5566C74.8076 45.438 75.3045 43.209 75.602 40.8694C75.6061 40.8699 75.6102 40.8703 75.6143 40.8707C76.1638 40.9267 76.6545 40.5266 76.7105 39.9772C76.8601 38.5076 76.9347 36.999 76.9347 35.4517C76.9347 33.8975 76.8594 32.3805 76.7085 30.901C76.6525 30.3516 76.1616 29.9516 75.6122 30.0076C75.6081 30.0081 75.604 30.0085 75.5999 30.009C75.301 27.6576 74.8019 25.4118 74.1027 23.2715C74.1073 23.2699 74.112 23.2683 74.1166 23.2666C74.6363 23.0796 74.906 22.5068 74.7191 21.9871C74.198 20.5385 73.5849 19.1374 72.8797 17.7843C72.1842 16.4497 71.392 15.187 70.5031 13.9968C70.1726 13.5544 69.5459 13.4636 69.1034 13.7941C69.0984 13.7979 69.0933 13.8017 69.0884 13.8056C67.7183 12.1094 66.1333 10.5772 64.3335 9.20879C64.0694 9.00801 63.8007 8.81076 63.5273 8.61705C62.3821 7.8054 61.1557 7.05569 59.848 6.3679L60.318 5.48523C60.3173 5.48486 60.3166 5.48449 60.3159 5.48413C59.5064 5.05314 58.6658 4.65368 57.7944 4.28556C57.2857 4.07063 56.699 4.30883 56.4841 4.81757C56.4821 4.82234 56.4801 4.8271 56.4782 4.83188C55.4434 4.43175 54.3641 4.07402 53.2404 3.7587C53.2414 3.75467 53.2425 3.75062 53.2435 3.74656C53.3792 3.21122 53.0553 2.6672 52.5199 2.53148C50.8017 2.09585 48.9911 1.75397 47.089 1.5048C46.5414 1.43306 46.0393 1.81883 45.9675 2.36644C45.9671 2.36956 45.9667 2.37268 45.9664 2.3758C44.8649 2.25245 43.7315 2.15946 42.5663 2.09684C42.5665 2.09431 42.5666 2.09177 42.5667 2.08923C42.5878 1.53735 42.1576 1.0728 41.6057 1.05163C40.7081 1.01719 39.7931 1 38.8608 1H35.7891C35.2368 1 34.7891 1.44772 34.7891 2H30.6456C30.6456 1.44772 30.1979 1 29.6456 1H23.5021C22.9498 1 22.5021 1.44772 22.5021 2H18.3587C18.3587 1.44772 17.9109 1 17.3587 1H11.2152C10.6629 1 10.2152 1.44772 10.2152 2H6.07173C6.07173 1.44772 5.62402 1 5.07173 1H2C1.44772 1 1 1.44772 1 2V5.40907C1 5.96136 1.44772 6.40907 2 6.40907V11.2273C1.44772 11.2273 1 11.675 1 12.2273V19.0454C1 19.5977 1.44772 20.0454 2 20.0454V24.8636C1.44772 24.8636 1 25.3113 1 25.8636V32.6818C1 33.2341 1.44772 33.6818 2 33.6818V38.5C1.44772 38.5 1 38.9477 1 39.5V46.3182C1 46.8705 1.44772 47.3182 2 47.3182V52.1364C1.44772 52.1364 1 52.5841 1 53.1364V59.9545C1 60.5068 1.44772 60.9545 2 60.9545V65.7727C1.44772 65.7727 1 66.2204 1 66.7727V73.5909C1 74.1432 1.44772 74.5909 2 74.5909V79.4091C1.44772 79.4091 1 79.8568 1 80.4091V87.2273C1 87.7796 1.44772 88.2273 2 88.2273V93.0455C1.44772 93.0455 1 93.4932 1 94.0455V100.864C1 101.416 1.44772 101.864 2 101.864V106.682C1.44772 106.682 1 107.13 1 107.682V111.091ZM16.2102 56.5455H19.2706C19.2706 55.9932 19.7183 55.5455 20.2706 55.5455H27.6214C28.1737 55.5455 28.6214 55.9932 28.6214 56.5455H33.9723C33.9723 55.9932 34.42 55.5455 34.9723 55.5455H38.6477C39.8794 55.5455 41.0564 55.5067 42.1791 55.4295C42.7264 55.3919 43.201 55.8021 43.2444 56.3476C45.1003 56.1781 46.811 55.8996 48.3765 55.5123C48.236 54.9872 48.5414 54.4441 49.066 54.2931C50.2359 53.9564 51.3056 53.5536 52.2775 53.0871L52.281 53.0854C53.0852 52.7032 53.833 52.2856 54.5256 51.8331C54.9801 51.5362 55.5867 51.6567 55.8941 52.1002C56.8344 51.4072 57.6731 50.6416 58.41 49.8033C57.9948 49.4627 57.9219 48.8515 58.2511 48.4221C58.7615 47.7563 59.21 47.0455 59.5969 46.289L59.5989 46.2852C60.0149 45.4802 60.3762 44.6317 60.682 43.739C60.8585 43.2239 61.4137 42.946 61.9299 43.1098C62.2752 41.9251 62.5318 40.6748 62.6996 39.3589C62.1585 39.2999 61.7626 38.8177 61.8125 38.2735C61.8957 37.3665 61.9375 36.426 61.9375 35.4517C61.9375 34.4673 61.8948 33.5144 61.8099 32.5926C61.7597 32.0483 62.1556 31.5658 62.6968 31.5067C62.5267 30.1706 62.2666 28.8952 61.9163 27.6806C61.3988 27.8424 60.8444 27.5615 60.6706 27.0451C60.3658 26.1398 60.0064 25.2738 59.5928 24.4465C59.2002 23.6614 58.7485 22.9237 58.2376 22.2327C57.9156 21.7972 57.9997 21.1865 58.422 20.8535C57.671 19.9622 56.8173 19.1495 55.8608 18.4153C55.5446 18.8527 54.9356 18.9611 54.487 18.655C53.7849 18.1759 53.0273 17.7345 52.2133 17.3316L52.2062 17.3281L52.2062 17.328C51.2284 16.8343 50.1523 16.408 48.9754 16.0513C48.4532 15.893 48.1554 15.346 48.3029 14.8232C46.7115 14.4077 44.9707 14.1095 43.0805 13.9284C43.0349 14.4735 42.5589 14.8818 42.0119 14.8422C40.875 14.7601 39.6827 14.7188 38.4347 14.7188H35.5316C34.9793 14.7188 34.5316 14.271 34.5316 13.7188H30.7255C30.7255 14.271 30.2778 14.7188 29.7255 14.7188H23.9194C23.3671 14.7188 22.9194 14.271 22.9194 13.7188H19.1133C19.1133 14.271 18.6656 14.7188 18.1133 14.7188H16.2102V17.1963C16.2102 17.7486 15.7625 18.1963 15.2102 18.1963V23.1515C15.7625 23.1515 16.2102 23.5992 16.2102 24.1515V31.1066C16.2102 31.6589 15.7625 32.1066 15.2102 32.1066V37.0618C15.7625 37.0618 16.2102 37.5095 16.2102 38.0618V45.0169C16.2102 45.5692 15.7625 46.0169 15.2102 46.0169V50.9721C15.7625 50.9721 16.2102 51.4198 16.2102 51.9721V56.5455Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="7 7"
      />
    </svg>
  ),
  logo2: (props: IconProps) => (
    <svg
      width="114"
      height="120"
      viewBox="0 0 114 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M84.0353 8.85631C86.0063 10.182 87.7568 11.6779 89.2869 13.3441C89.2915 13.3401 89.2961 13.3362 89.3007 13.3322C89.7207 12.9737 90.3519 13.0235 90.7105 13.4436C91.71 14.6146 92.6105 15.862 93.4116 17.1852C94.2328 18.5135 94.9474 19.8987 95.5553 21.3402C95.7699 21.8491 95.5313 22.4356 95.0225 22.6501C95.0173 22.6523 95.0121 22.6545 95.0068 22.6566C95.8288 24.8051 96.4141 27.0795 96.7629 29.4798C96.7675 29.4792 96.7721 29.4786 96.7768 29.4781C97.3253 29.4141 97.8219 29.8069 97.8859 30.3554C98.0612 31.8575 98.1484 33.4033 98.1484 34.9922C98.1484 36.8275 98.0053 38.6006 97.7174 40.3105C97.6257 40.8551 97.1099 41.2223 96.5652 41.1306C96.5594 41.1296 96.5536 41.1286 96.5477 41.1275C95.976 43.9123 94.996 46.504 93.6078 48.9026C93.6133 48.906 93.6188 48.9094 93.6243 48.9128C94.0912 49.2078 94.2306 49.8255 93.9356 50.2924C92.9957 51.78 91.9004 53.1904 90.6517 54.5235C89.3197 55.9454 87.8562 57.2459 86.262 58.4248C85.818 58.7532 85.1918 58.6594 84.8634 58.2154C84.8604 58.2113 84.8574 58.2072 84.8545 58.203C82.3857 59.9153 79.6078 61.3466 76.5209 62.497C76.5221 62.5005 76.5234 62.504 76.5246 62.5075C76.7058 63.0292 76.4298 63.599 75.9081 63.7802C74.9832 64.1015 74.0333 64.3987 73.0583 64.6719C73.1059 64.6981 73.1533 64.7245 73.2007 64.751C73.6824 65.0211 73.854 65.6306 73.5839 66.1123C73.5799 66.1194 73.5758 66.1265 73.5717 66.1335C74.6405 66.8036 75.6416 67.5699 76.5749 68.4326C76.5803 68.4269 76.5859 68.4213 76.5916 68.4157C76.9854 68.0285 77.6185 68.0338 78.0057 68.4275C78.7033 69.1369 79.3605 69.9003 79.9773 70.7172C80.4699 71.3686 80.9455 72.0204 81.4041 72.6726C81.7218 73.1243 81.6132 73.7481 81.1614 74.0658C81.1593 74.0673 81.1573 74.0687 81.1552 74.0701C81.6828 74.8452 82.1857 75.6204 82.664 76.3955C82.6664 76.394 82.6689 76.3925 82.6714 76.391C83.1463 76.1091 83.7598 76.2656 84.0417 76.7406C84.4589 77.4435 84.8564 78.1468 85.2341 78.8507C85.647 79.6014 86.0725 80.4016 86.5106 81.2511C86.7638 81.7419 86.5711 82.3451 86.0802 82.5982C86.079 82.5989 86.0778 82.5995 86.0766 82.6001C86.5601 83.556 87.0593 84.5716 87.5742 85.6468C87.575 85.6465 87.5757 85.6461 87.5765 85.6457C88.0759 85.4098 88.6719 85.6234 88.9079 86.1227C89.2808 86.9121 89.6615 87.7312 90.0499 88.58M84.0353 8.85631L89.1406 88.9961M84.0353 8.85631C84.0381 8.85205 84.0408 8.84775 84.0436 8.84343C84.3376 8.3759 84.1969 7.75856 83.7294 7.46456C82.4665 6.67043 81.1239 5.94188 79.7023 5.27836C78.0778 4.51187 76.3668 3.85132 74.5701 3.29596C74.0424 3.13286 73.4825 3.42839 73.3194 3.95605C73.3182 3.95988 73.317 3.96371 73.3159 3.96755C70.6505 3.213 67.791 2.68492 64.7374 2.3833C64.7377 2.3805 64.7379 2.3777 64.7381 2.37489C64.7831 1.82443 64.3733 1.34177 63.8228 1.29684C62.067 1.15349 60.2522 1.08203 58.3789 1.08203H52.2021C51.6499 1.08203 51.2021 1.52975 51.2021 2.08203H40.8486C40.8486 1.52975 40.4009 1.08203 39.8486 1.08203H27.4951C26.9428 1.08203 26.4951 1.52975 26.4951 2.08203H16.1416C16.1416 1.52975 15.6939 1.08203 15.1416 1.08203H8.96484C8.47572 1.08203 8.00834 1.10578 7.56368 1.15462C7.0147 1.21492 6.61854 1.70883 6.67883 2.25782C6.68087 2.27636 6.6834 2.29472 6.68641 2.3129C6.4904 2.35806 6.30225 2.40984 6.12197 2.46824C6.10916 2.4383 6.09478 2.40871 6.07879 2.37957C5.81319 1.89534 5.20533 1.71812 4.72111 1.98373C4.24083 2.24717 3.81453 2.57192 3.45015 2.96059L3.45015 2.96059L3.44863 2.96221C3.07536 3.36215 2.77674 3.83649 2.54288 4.36829C2.32056 4.87385 2.55017 5.46392 3.05573 5.68624C3.08214 5.69785 3.10878 5.70823 3.13558 5.7174C3.08062 5.92984 3.03267 6.1533 2.99173 6.38778C2.97795 6.38604 2.96407 6.38458 2.9501 6.3834C2.39978 6.33683 1.91591 6.74519 1.86934 7.29551C1.83117 7.74656 1.8125 8.22251 1.8125 8.72266C1.8125 9.22996 1.83171 9.71348 1.87094 10.1725C1.91797 10.7228 2.40219 11.1308 2.95247 11.0837C2.96617 11.0825 2.97978 11.0811 2.9933 11.0794C3.03655 11.3289 3.08756 11.5667 3.14633 11.7928C3.12105 11.8014 3.0959 11.8111 3.07095 11.8218C2.56375 12.0404 2.32976 12.6287 2.54832 13.1359C2.77781 13.6685 3.06805 14.1466 3.42711 14.5569C3.44172 14.5736 3.45689 14.5899 3.47258 14.6055C3.8447 14.9777 4.27857 15.2854 4.76477 15.533C5.2569 15.7837 5.85904 15.5879 6.10969 15.0958C6.1242 15.0673 6.13722 15.0384 6.14877 15.0093C6.32357 15.0616 6.5057 15.108 6.69516 15.1487C6.69252 15.1658 6.69031 15.1831 6.68854 15.2005C6.63252 15.7499 7.03251 16.2407 7.58194 16.2968C8.0207 16.3415 8.48196 16.3633 8.96484 16.3633H11.9434C12.4956 16.3633 12.9434 15.9156 12.9434 15.3633H16.9004C16.9004 15.9156 17.3481 16.3633 17.9004 16.3633H19.8789V20.948C19.8789 21.5003 20.3266 21.948 20.8789 21.948V31.1174C20.3266 31.1174 19.8789 31.5651 19.8789 32.1174V43.2869C19.8789 43.8391 20.3266 44.2869 20.8789 44.2869V53.4563C20.3266 53.4563 19.8789 53.904 19.8789 54.4563V65.6257C19.8789 66.178 20.3266 66.6257 20.8789 66.6257V75.7952C20.3266 75.7952 19.8789 76.2429 19.8789 76.7952V87.9646C19.8789 88.5169 20.3266 88.9646 20.8789 88.9646V98.134C20.3266 98.134 19.8789 98.5817 19.8789 99.134V103.719H17.9004C17.3481 103.719 16.9004 104.166 16.9004 104.719H12.9434C12.9434 104.166 12.4956 103.719 11.9434 103.719H8.96484C8.47572 103.719 8.00834 103.743 7.56368 103.791C7.0147 103.852 6.61854 104.346 6.67883 104.895C6.68087 104.913 6.6834 104.931 6.68641 104.95C6.4904 104.995 6.30225 105.047 6.12197 105.105C6.10916 105.075 6.09478 105.045 6.07879 105.016C5.81319 104.532 5.20533 104.355 4.72111 104.62C4.24083 104.884 3.81453 105.209 3.45015 105.597L3.44863 105.599C3.07536 105.999 2.77674 106.473 2.54288 107.005C2.32056 107.511 2.55017 108.101 3.05573 108.323C3.08214 108.335 3.10878 108.345 3.13558 108.354C3.08062 108.567 3.03267 108.79 2.99173 109.025C2.97795 109.023 2.96407 109.021 2.9501 109.02C2.39978 108.974 1.91591 109.382 1.86934 109.932C1.83117 110.383 1.8125 110.859 1.8125 111.359C1.8125 111.867 1.83171 112.35 1.87094 112.809C1.91797 113.36 2.40219 113.767 2.95247 113.72C2.96617 113.719 2.97978 113.718 2.9933 113.716C3.03655 113.966 3.08756 114.203 3.14633 114.43C3.12105 114.438 3.0959 114.448 3.07095 114.459C2.56375 114.677 2.32976 115.265 2.54832 115.773C2.77781 116.305 3.06805 116.783 3.42711 117.194C3.44172 117.21 3.45689 117.227 3.47258 117.242C3.8447 117.614 4.27857 117.922 4.76477 118.17C5.2569 118.42 5.85904 118.225 6.10969 117.733C6.1242 117.704 6.13722 117.675 6.14877 117.646C6.32357 117.698 6.50569 117.745 6.69516 117.785C6.69252 117.803 6.69031 117.82 6.68854 117.837C6.63252 118.387 7.03251 118.877 7.58194 118.933C8.0207 118.978 8.48196 119 8.96484 119H13.8721C14.4244 119 14.8721 118.552 14.8721 118H22.6865C22.6865 118.552 23.1342 119 23.6865 119H33.501C34.0533 119 34.501 118.552 34.501 118H42.3154C42.3154 118.552 42.7631 119 43.3154 119H48.2227C48.6986 119 49.1525 118.979 49.5834 118.935C50.1329 118.88 50.5333 118.389 50.4779 117.84C50.4761 117.822 50.4738 117.804 50.4711 117.787C50.6461 117.749 50.8144 117.706 50.9759 117.658C50.9883 117.689 51.0024 117.72 51.0182 117.75C51.2738 118.239 51.8779 118.429 52.3675 118.174C52.8516 117.921 53.2797 117.604 53.6397 117.219C54.0181 116.815 54.327 116.344 54.573 115.816C54.8062 115.315 54.5894 114.72 54.0887 114.487C54.0629 114.475 54.0367 114.464 54.0104 114.454C54.0756 114.223 54.132 113.98 54.1797 113.724C54.1942 113.726 54.2088 113.728 54.2234 113.729C54.7734 113.78 55.2604 113.376 55.3112 112.826C55.354 112.361 55.375 111.872 55.375 111.359C55.375 110.854 55.3546 110.372 55.3129 109.916C55.2625 109.366 54.7759 108.961 54.2259 109.011C54.211 109.012 54.1961 109.014 54.1814 109.016C54.1361 108.775 54.0828 108.546 54.0217 108.328C54.0496 108.318 54.0773 108.306 54.1046 108.293C54.6034 108.056 54.8153 107.459 54.578 106.961C54.3322 106.444 54.0223 105.985 53.6407 105.598C53.2935 105.207 52.8809 104.881 52.4125 104.617C51.9312 104.347 51.3214 104.517 51.0506 104.998C51.0331 105.029 51.0176 105.061 51.0038 105.093C50.8366 105.039 50.662 104.99 50.4802 104.948C50.4832 104.93 50.4858 104.911 50.4879 104.892C50.5477 104.343 50.151 103.849 49.602 103.789C49.1651 103.742 48.705 103.719 48.2227 103.719H45.0488C44.4965 103.719 44.0488 104.166 44.0488 104.719H39.7012C39.7012 104.166 39.2535 103.719 38.7012 103.719H36.5273V100.092C36.5273 99.54 36.0796 99.0923 35.5273 99.0923V91.8394C36.0796 91.8394 36.5273 91.3916 36.5273 90.8394V81.5864C36.5273 81.0341 36.0796 80.5864 35.5273 80.5864V73.3335C36.0796 73.3335 36.5273 72.8858 36.5273 72.3335V68.707H38.8477C39.3999 68.707 39.8477 68.2593 39.8477 67.707H44.4883C44.4883 68.2593 44.936 68.707 45.4883 68.707H48.8086C49.6576 68.707 50.4757 68.7432 51.2632 68.815C51.8065 68.8645 52.2879 68.4697 52.3478 67.9299C53.4095 68.0704 54.4198 68.2775 55.3787 68.5509C55.2165 69.0659 55.4934 69.6193 56.007 69.7963C56.7815 70.0631 57.5148 70.3783 58.2079 70.7413L58.2247 70.7499C58.889 71.0821 59.5289 71.457 60.1446 71.8748C60.5939 72.1797 61.2025 72.0698 61.5176 71.6317C62.2286 72.174 62.9067 72.774 63.5518 73.4316C63.156 73.8008 63.1253 74.4203 63.4868 74.827C63.9743 75.3753 64.4419 75.9625 64.8894 76.5891L64.8924 76.5933C65.2958 77.1518 65.6838 77.7118 66.0566 78.2734C66.3602 78.7308 66.9753 78.8574 67.4346 78.5589C67.826 79.1747 68.1998 79.7927 68.556 80.4129C68.0784 80.6803 67.904 81.283 68.1669 81.7646C68.4952 82.366 68.8065 82.9692 69.1008 83.5742C69.1039 83.5807 69.1072 83.5872 69.1105 83.5937C69.1122 83.5969 69.1139 83.6002 69.1156 83.6035C69.4942 84.3209 69.9082 85.1335 70.3576 86.0419C70.602 86.536 71.1999 86.7389 71.6944 86.4963C72.1658 87.4644 72.6712 88.5254 73.2106 89.6791C72.7105 89.9118 72.4933 90.5056 72.7253 91.0062C73.093 91.7993 73.4756 92.6333 73.8733 93.5082C74.3139 94.4996 74.7402 95.4506 75.1519 96.3611C75.3795 96.8643 75.972 97.0877 76.4752 96.8601C76.4755 96.86 76.4759 96.8598 76.4763 96.8596C77.1071 98.2453 77.702 99.5304 78.261 100.715C78.2603 100.715 78.2597 100.716 78.259 100.716C77.7606 100.954 77.5493 101.551 77.7872 102.049C78.2746 103.071 78.7337 104.012 79.1642 104.873L79.1641 104.873L79.1689 104.882C79.7043 105.926 80.2439 106.909 80.7878 107.832C81.0683 108.307 81.6813 108.466 82.1571 108.185C82.1601 108.183 82.1632 108.182 82.1662 108.18C83.0454 109.601 83.9322 110.854 84.8267 111.941C84.8215 111.946 84.8163 111.95 84.8112 111.955C84.3992 112.323 84.3634 112.955 84.7312 113.367C85.5567 114.291 86.3978 115.091 87.2558 115.761C87.2629 115.766 87.27 115.772 87.2772 115.777C88.0388 116.339 88.8435 116.828 89.6909 117.244C90.1867 117.487 90.7858 117.283 91.0291 116.787C91.034 116.777 91.0388 116.767 91.0434 116.756C92.0381 117.164 93.0911 117.472 94.2023 117.679C94.2009 117.688 94.1996 117.697 94.1984 117.706C94.1273 118.254 94.5137 118.755 95.0614 118.826C95.9554 118.942 96.8792 119 97.832 119H99.5898C100.142 119 100.59 118.552 100.59 118H102.105C102.105 118.552 102.553 119 103.105 119H104.863C105.339 119 105.793 118.979 106.224 118.935C106.774 118.88 107.174 118.389 107.118 117.84C107.117 117.822 107.114 117.804 107.112 117.787C107.287 117.749 107.455 117.706 107.617 117.658C107.629 117.689 107.643 117.72 107.659 117.75C107.914 118.239 108.518 118.429 109.008 118.174C109.492 117.921 109.92 117.604 110.28 117.219C110.659 116.815 110.968 116.344 111.214 115.816C111.447 115.315 111.23 114.72 110.729 114.487C110.703 114.475 110.677 114.464 110.651 114.454C110.716 114.223 110.773 113.98 110.82 113.724C110.835 113.726 110.849 113.728 110.864 113.729C111.414 113.78 111.901 113.376 111.952 112.826C111.995 112.361 112.016 111.872 112.016 111.359C112.016 110.854 111.995 110.372 111.953 109.916C111.903 109.366 111.417 108.961 110.867 109.011C110.852 109.012 110.837 109.014 110.822 109.016C110.777 108.775 110.723 108.546 110.662 108.328C110.69 108.318 110.718 108.306 110.745 108.293C111.244 108.056 111.456 107.459 111.219 106.961C110.973 106.444 110.663 105.985 110.281 105.598C109.934 105.207 109.522 104.881 109.053 104.617C108.572 104.347 107.962 104.517 107.691 104.998C107.674 105.029 107.658 105.061 107.644 105.093C107.477 105.039 107.303 104.99 107.121 104.948C107.124 104.93 107.126 104.911 107.129 104.892C107.188 104.343 106.792 103.849 106.243 103.789C105.806 103.742 105.346 103.719 104.863 103.719H104.18C103.915 103.719 103.675 103.821 103.496 103.989C103.317 103.821 103.077 103.719 102.812 103.719H102.129C101.284 103.719 100.468 103.542 99.6743 103.182C99.1908 102.963 98.6247 103.161 98.3791 103.623C97.3769 103.007 96.418 102.132 95.5023 100.997M84.0353 8.85631L95.5023 100.997M90.0499 88.58L89.1406 88.9961M90.0499 88.58C90.0498 88.5796 90.0496 88.5793 90.0495 88.5789L89.1406 88.9961M90.0499 88.58C90.4028 89.3487 90.7396 90.0767 91.0604 90.7642C91.2937 91.2642 91.078 91.8585 90.5785 92.0925C90.4403 91.7989 90.2989 91.497 90.1542 91.187C89.8323 90.4972 89.4944 89.7669 89.1406 88.9961M95.5023 100.997C95.9322 100.671 96.0264 100.059 95.71 99.6181C95.2035 98.9117 94.7064 98.1106 94.2198 97.2125C93.9054 96.6254 93.5439 95.9205 93.135 95.0962C92.8901 94.6026 92.2922 94.4003 91.7981 94.6432L95.5023 100.997ZM74.4634 21.3278L74.4707 21.3334C75.5398 22.151 76.4665 23.0521 77.2545 24.036C77.5932 24.4588 78.2051 24.5337 78.6352 24.2106C79.8134 25.8893 80.654 27.7864 81.1569 29.902C80.6279 30.0129 80.2809 30.5263 80.3791 31.0611C80.6045 32.2897 80.7188 33.5994 80.7188 34.9922C80.7188 36.5873 80.5807 38.0686 80.3089 39.4389C80.2031 39.9723 80.5428 40.4907 81.0704 40.6091C80.439 43.1113 79.3466 45.2736 77.793 47.0961C77.396 46.7339 76.7803 46.7499 76.4028 47.1379C74.5377 49.0545 72.0368 50.5533 68.8561 51.6072C68.3375 51.7791 68.0538 52.3346 68.216 52.8541C66.0703 53.4826 63.6689 53.9225 61.0118 54.1741C60.9656 53.6281 60.4879 53.2202 59.9403 53.2615C58.4886 53.3708 56.9591 53.4258 55.3516 53.4258H50.3955C49.8432 53.4258 49.3955 53.8735 49.3955 54.4258H41.4834C41.4834 53.8735 41.0357 53.4258 40.4834 53.4258H36.5273V49.543C36.5273 48.9907 36.0796 48.543 35.5273 48.543V40.7773C36.0796 40.7773 36.5273 40.3296 36.5273 39.7773V30.0117C36.5273 29.4594 36.0796 29.0117 35.5273 29.0117V21.2461C36.0796 21.2461 36.5273 20.7984 36.5273 20.2461V16.3633H40.7275C41.2798 16.3633 41.7275 15.9156 41.7275 15.3633H50.1279C50.1279 15.9156 50.5756 16.3633 51.1279 16.3633H56.3281C58.03 16.3633 59.6444 16.4413 61.1721 16.5965C61.7175 16.6519 62.2051 16.2579 62.2667 15.7146C65.1068 16.073 67.6571 16.7058 69.9176 17.6127C69.7049 18.112 69.9298 18.6919 70.4268 18.916C71.9214 19.5896 73.2656 20.3943 74.4634 21.3278Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10 10"
      />
    </svg>
  ),
  recipiLogo: (props: IconProps) => (
    <svg
      width="216"
      height="216"
      viewBox="0 0 216 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M114.799 35.6098C115.524 33.6219 109.175 33.7377 93.2702 36.1431C100.372 33.4969 105.282 31.9813 112.713 31.207L112.276 22.111L116.299 30.339C125.212 25.4989 136.632 25.6712 137.858 25.7047C137.906 25.702 137.943 25.7031 137.966 25.7081C137.966 25.7081 137.929 25.7066 137.858 25.7047C135.781 25.8169 111.075 32.7006 118.5 34.4566L114.799 35.6098Z"
        fill="#146730"
      />
      <path
        d="M118.832 34.5274C118.715 34.5048 118.604 34.4812 118.5 34.4566M118.5 34.4566C110.901 32.6594 136.956 25.4915 137.966 25.7081C137.966 25.7081 125.73 25.2179 116.299 30.339L112.276 22.111L112.713 31.207C105.282 31.9813 100.372 33.4969 93.2702 36.1431C109.175 33.7377 115.524 33.6219 114.799 35.6098L118.5 34.4566Z"
        stroke="black"
      />
      <path
        d="M85.3582 56.3435C89.8831 37.5934 97.1377 39.9971 113.553 33.2782C134.926 28.9876 152.821 30.7765 155.994 50.3508C159.167 69.925 129.861 78.483 131.219 77.668C132.577 76.8531 87.4944 90.3809 85.3582 56.3435Z"
        fill="#F01630"
        stroke="black"
      />
      <path
        d="M51.784 124.916C56.2002 105.911 68.0947 96.948 64.7366 52H87.2839L93 124.916C87.8026 199.771 79.1284 196.333 59.9392 195.834C40.7499 195.334 47.3677 143.92 51.784 124.916Z"
        fill="#7728B5"
        stroke="black"
      />
      <path
        d="M58.1227 62.4501C56.8075 61.4527 66.3879 39.898 71.3177 41.9757C76.2475 44.0533 76.0337 40.3422 74.0477 34.0134C72.0618 27.6846 79.5078 33.2901 79.5078 33.2901C75.9447 38.6454 84.5145 43.9827 87.2428 45.3881C89.9712 46.7935 92.7963 59.9959 91.7929 67L81.3278 51.6442C78.6925 59.0124 76.5595 62.1658 72.2277 67C70.9766 61.4227 70.7502 58.1099 71.7727 51.6442C71.7727 51.6442 59.4379 63.4476 58.1227 62.4501Z"
        fill="#146730"
        stroke="black"
      />
      <path
        d="M103.354 74.275C103.997 75.1912 109.559 83.806 115.962 89.4736L119.063 87.8478L113.987 68.7008L103.354 74.275Z"
        fill="#146730"
        stroke="black"
      />
      <path
        d="M136.5 82.7114C129.122 71.6342 98.0384 88.384 101 98.2114C103.962 108.039 132.544 141.315 168.603 193.284C146.699 130.085 142.745 94.5559 136.5 82.7114Z"
        fill="#F9822C"
        stroke="black"
        strokeLinejoin="round"
      />
    </svg>
  ),
  logoMonochrome: (props: IconProps) => (
    <svg
      width="216"
      height="216"
      viewBox="0 0 216 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M118.799 35.6098C119.524 33.6219 113.175 33.7377 97.2702 36.1432C104.372 33.4969 109.282 31.9813 116.713 31.2071L116.276 22.111L120.299 30.339C129.212 25.4989 140.632 25.6712 141.858 25.7047C141.906 25.7021 141.943 25.7031 141.966 25.7081C141.966 25.7081 141.929 25.7066 141.858 25.7047C139.781 25.8169 115.075 32.7006 122.5 34.4566L118.799 35.6098Z"
        fill="black"
      />
      <path
        d="M122.832 34.5274C122.715 34.5049 122.604 34.4812 122.5 34.4566M122.5 34.4566C114.901 32.6594 140.956 25.4915 141.966 25.7081C141.966 25.7081 129.73 25.2179 120.299 30.339L116.276 22.111L116.713 31.2071C109.282 31.9813 104.372 33.4969 97.2702 36.1432C113.175 33.7377 119.524 33.6219 118.799 35.6098L122.5 34.4566Z"
        stroke="black"
      />
      <path
        d="M89.3582 56.3436C93.8831 37.5935 101.138 39.9972 117.553 33.2782C138.926 28.9877 156.821 30.7765 159.994 50.3508C163.167 69.925 133.861 78.483 135.219 77.668C136.577 76.8531 91.4944 90.3809 89.3582 56.3436Z"
        fill="#D9D9D9"
        stroke="black"
      />
      <path
        d="M55.784 124.916C60.2002 105.911 72.0947 96.948 68.7366 52H91.2839L97 124.916C91.8026 199.771 83.1284 196.333 63.9392 195.834C44.7499 195.334 51.3677 143.92 55.784 124.916Z"
        fill="#D9D9D9"
        stroke="black"
      />
      <path
        d="M62.1227 62.4501C60.8075 61.4527 70.3879 39.898 75.3177 41.9757C80.2475 44.0533 80.0337 40.3422 78.0477 34.0134C76.0618 27.6846 83.5078 33.2901 83.5078 33.2901C79.9447 38.6454 88.5145 43.9827 91.2428 45.3881C93.9712 46.7935 96.7963 59.9959 95.7929 67L85.3278 51.6442C82.6925 59.0124 80.5595 62.1658 76.2277 67C74.9766 61.4227 74.7502 58.1099 75.7727 51.6442C75.7727 51.6442 63.4379 63.4476 62.1227 62.4501Z"
        fill="black"
        stroke="black"
      />
      <path
        d="M107.354 74.275C107.997 75.1912 113.559 83.806 119.962 89.4736L123.063 87.8478L117.987 68.7008L107.354 74.275Z"
        fill="black"
        stroke="black"
      />
      <path
        d="M140.5 82.7114C133.122 71.6342 102.038 88.384 105 98.2114C107.962 108.039 136.544 141.315 172.603 193.284C150.699 130.085 146.745 94.5559 140.5 82.7114Z"
        fill="#D9D9D9"
        stroke="black"
        strokeLinejoin="round"
      />
    </svg>
  ),
}
