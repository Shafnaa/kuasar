import { NavLink } from "react-router-dom";

function AppFooter() {
  return (
    <footer className="w-full flex justify-center p-2 md:p-5">
      <div className="text-xs md:text-base">
        Built with <span className="text-red-500">&hearts;</span> by{" "}
        <NavLink
          to={"https://github.com/Shafnaa/"}
          target="_blank"
          className="text-blue-600"
        >
          @Shafnaa
        </NavLink>
      </div>
    </footer>
  );
}

export default AppFooter;
