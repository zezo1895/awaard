import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import clsx from "clsx";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // يظهر عند فتح الصفحة مباشرةً

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // التعامل مع الإجابة على الـ popup
  const handleAudioChoice = (choice) => {
    if (choice === "yes") {
      setIsAudioPlaying(true);
      setIsIndicatorActive(true); // تفعيل الحركة عند الموافقة
      // تشغيل الموسيقى
      audioElementRef.current.play().catch((err) => console.error("Audio play error:", err));
    }
    setShowPopup(false); // إغلاق الـ popup
  };

  // التعامل مع حركة الـ navbar بناءً على التمرير
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // تأثير الحركة باستخدام GSAP
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div>
      {/* Popup يظهر عند تحميل الصفحة لأول مرة */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black p-6 rounded-lg shadow-lg text-center w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 xl:h-1/4 xl:flex xl:flex-col xl:items-center xl:justify-center">
            <h2 className="text-4xl font-semibold mb-4 text-white">Do you want to listen to the music of the game?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAudioChoice("yes")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                yes
              </button>
              <button
                onClick={() => handleAudioChoice("no")}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                no
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <img src="/img/logo.png" alt="logo" className="w-10" />

              <Button
                id="product-button"
                title="Products"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a key={index} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                    {item}
                  </a>
                ))}
              </div>

              {/* زر الموسيقى */}
              <button
                onClick={() => {
                  setIsAudioPlaying((prev) => {
                    const newState = !prev;
                    if (newState) {
                      audioElementRef.current.play().catch((err) => console.error("Audio play error:", err));
                    } else {
                      audioElementRef.current.pause();
                    }
                    return newState;
                  });
                  setIsIndicatorActive(!isIndicatorActive);
                }}
                className="ml-10 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop2_0.mp3"
                  loop
                />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", { active: isIndicatorActive })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
