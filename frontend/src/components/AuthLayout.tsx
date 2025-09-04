import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
  rightImage?: string;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  rightImage,
}: Props) {
  return (
    <div className="flex h-screen ">
      <div className="top-1 justify-center p-5 gap-2 mb-6 hidden lg:flex">
        <img src="/icon.svg" alt="logo" className="w-6 h-6" />
        <h2 className="text-lg font-semibold">HD</h2>
      </div>
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-2/5 px-6">
        <div className="max-w-sm w-full ">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <img src="/icon.svg" alt="logo" className="w-6 h-6 lg:hidden " />
            <h2 className="text-lg font-semibold">HD</h2>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl text-center lg:text-left font-bold mb-2">
              {title}
            </h1>
            <p className="text-gray-500 text-center lg:text-left mb-6">
              {subtitle}
            </p>
          </div>
          <div>{children}</div>
        </div>
      </div>

      {/* Right Section - Image */}
      {rightImage && (
        <div className="hidden lg:flex w-3/5">
          <img
            src={rightImage}
            alt="auth"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
