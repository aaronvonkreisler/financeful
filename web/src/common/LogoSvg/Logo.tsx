import React from 'react';
export function Logo({ style, ...props }: { style?: React.CSSProperties }) {
  return (
    <svg
      width={90}
      height={90}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path
        d="M17.85 22.424c-.613 3.043-1.258 10.023 4.087 15.074l.462.436-.169.643c-1.103 4.217-.681 7.838 1.256 10.762a12.703 12.703 0 003.198 3.256l.48.346-.056.628C26 65.953 33.93 67.61 43.113 69.529c6.6 1.378 14.082 2.94 20.755 8.263l1.192.95-.299-1.586c-7.766-41.28-32.166-51.933-46.02-54.61l-.89-.122z"
        fill="#fff"
      />
      <path
        d="M72.843 42.048c0-18.075-13.19-22.916-33.366-31.936A60.168 60.168 0 0039.23 21.3a52.71 52.71 0 00-15.433-5.584l-1.77-.244c-1.157 4.55-1.21 11.912 4.185 17.01-1.184 4.523-.729 8.448 1.4 11.663a13.656 13.656 0 003.444 3.512c-1.188 13.29 7.526 15.152 16.768 17.083 6.504 1.358 13.875 2.9 20.373 8.082l3.047 2.431.181.218c-.203-3.265 1.418-25.353 1.418-33.422zM48.39 61.52c-9.428-1.968-14.436-3.43-14.435-11.355 0-.263.004-.534.014-.812 3.358 1.525 7.02 2.054 10.622 1.536l-.01-1.318c-7.273-.27-15.154-3.905-15.924-11.46a9.791 9.791 0 01-.046-1.168c.013-.715.082-1.428.206-2.13 2.754 1.712 5.835 2.69 8.994 2.852l.118-1.292c-4.401-1.083-8.294-3.894-10.951-7.906-1.528-2.254-2.32-5.01-2.245-7.822.005-.433.027-.873.066-1.32 8.636 2.006 33.29 9.6 42.048 48.65-6.21-3.863-12.939-5.3-18.457-6.455z"
        fill="#fff"
      />
    </svg>
  );
}

export default Logo;
