import { NavLink } from "react-router-dom";
import { BrainIcon } from "lucide-react";

function AppNavbar() {
  return (
    <header className="dark:bg-zinc-950 dark:border-neutral-700 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full sticky top-0 bg-white">
      <nav className="relative max-w-[925px] container w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto py-3">
        <div className="flex items-center justify-between w-full px-4">
          <NavLink
            to="/"
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
            aria-label="Brand"
          >
            Countries
          </NavLink>
          <div className="flex gap-2">
            <NavLink
              to={"/chat"}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-full p-3 h-auto"
            >
              <BrainIcon />
            </NavLink>
            <div className="absolute top-14 right-11 -scale-x-100 rotate- w-8">
              <svg
                viewBox="0 0 40 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2_40)">
                  <path
                    d="M27.916 31.4568C20.0191 25.1909 13.7896 18.0721 10.031 8.49523M10.031 8.49523C12.5436 8.84916 15.2028 8.99688 17.7457 8.92371M10.031 8.49523C8.84116 12.6182 8.41809 15.8177 8.49744 20.0916"
                    stroke="#09090B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_2_40">
                    <rect
                      width="24"
                      height="32"
                      fill="white"
                      transform="matrix(0.428577 -0.903505 -0.903505 -0.428577 28.9122 36.3566)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="absolute top-[88px] right-16 rotate-12 text-sm md:text-base md:right-[48px]">
              Try our AI!
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AppNavbar;
