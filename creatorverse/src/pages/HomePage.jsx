// src/pages/Homepage.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import ShowCreators from "./ShowCreators";
// import { useLocation } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const creatorsSectionRef = useRef(null);
  // const location = useLocation();

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select("*");
      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    }
    fetchCreators();
  }, []);
  // }, [location]);

  const scrollToCreators = () => {
    creatorsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-gray-800">
      {/* TOP SECTION */}
      <header className="min-h-[75vh] flex flex-col items-center justify-center text-center w-full px-4 -mt-8 relative bg-cover bg-center bg-[url('/images/homepage-bg.png')]">
        <div className="relative z-10">
          <h1 className="font-[Sono] font-bold text-white text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] leading-tight tracking-wide">
            CREATORVERSE
          </h1>

          {/* Buttons */}
          <nav className="mt-12 w-full flex justify-center">
            <ul className="flex flex-col sm:flex-row gap-16 justify-center items-center">
              <li className="flex-1 min-w-[300px]">
                <button
                  onClick={scrollToCreators}
                  className="block w-full text-center text-lg font-bold
                             bg-blue-400 text-white rounded-lg
                             py-3 border-2 border-transparent
                             hover:bg-blue-500 hover:border-white
                             transition-colors duration-200 cursor-pointer tracking-wider"
                >
                  VIEW ALL CREATORS
                </button>
              </li>

              <li className="flex-1 min-w-[300px]">
                <button
                  onClick={() => navigate("/creators/add")}
                  className="block w-full text-center text-lg font-bold
                             bg-blue-400 text-white rounded-lg
                             py-3 border-2 border-transparent
                             hover:bg-blue-500 hover:border-white
                             transition-colors duration-200 cursor-pointer tracking-wider"
                >
                  ADD A CREATOR
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Separator */}
      <div className="border-t border-gray-400"></div>

      {/* BOTTOM SECTION */}
      <section
        ref={creatorsSectionRef}
        className=" text-blue-400 px-4 py-8 min-h-[30vh] w-full bg-[rgb(0,6,13)]"
      >
        <ShowCreators creators={creators} loading={loading} />
      </section>
    </main>
  );
}
