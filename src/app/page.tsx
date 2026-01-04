import Image from "next/image";
import AnimatedCursor from "react-animated-cursor";

export default function Home() {
  return (
    <main className="bg-white mx-4 md:mx-12 px-4 md:px-12">
      <AnimatedCursor />
      <div
        style={{ height: "100vh" }}
        className="header w-full h-full flex flex-col justify-center items-center"
      >
        <img src="/images/moksh_logo.png" alt="" className="w-48 md:w-96" />

        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-base md:text-xl lucida">
            <a href="#about">about</a>
            <span className="px-2 md:px-3">|</span>
            <a href="#experiences">experiences</a>
            <span className="px-2 md:px-3">|</span>
            <a href="/articles">articles</a>
            <span className="px-2 md:px-3">|</span>
            <a href="https://github.com/mnshah0101">github</a>
          </p>
          <div className="mt-6">
            <a
              href="/articles/"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg lucida text-sm hover:bg-blue-600 transition-colors"
            >
              check out what i'm learning →
            </a>
          </div>
        </div>
      </div>

      <div className="content px-4 md:px-12 mx-4 md:mx-12 lucida">
        <hr />
        <div id="about" className="about py-6 md:py-10">
          <div className="about-title lucida-bold py-3 md:py-5">
            <h1 className="text-xl md:text-2xl">about</h1>
          </div>
          <div className="about-item">
            <p>
              hello! i am moksh shah, a student at georgia tech studying
              computer science with a focus on system architecture and
              artificial intelligence. i am deeply interested in software and
              math. i am currently working at headlands as a research intern.
            </p>
          </div>
        </div>

        <hr />

        <div id="experiences" className="experiences py-6 md:py-10">
          <div className="experiences-title lucida-bold py-3 md:py-5">
            <h1 className="text-xl md:text-2xl">experiences</h1>
          </div>

          <div className="experiences-item mt-1">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>qr intern @ headlands tech </h2>
              <p>sept 2025 - present</p>
            </div>
          </div>

          <div className="experiences-item mt-1">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>sde intern @ amazon </h2>
              <p>may 2025 - august 2025</p>
            </div>
          </div>

          <div className="experiences-item mt-1">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>founding engineer @ strike (YC W25) </h2>
              <p>dec 2024 - march 2025</p>
            </div>
          </div>

          <div className="experiences-item mt-1">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>software engineer intern @ megalabs.xyz</h2>
              <p>jan 2024 - present</p>
            </div>
          </div>
      

        <hr />

        
         
        </div>

        <div id="contact" className="contact py-6 md:py-10">
          <div className="contact-title lucida-bold py-3 md:py-5">
            <h1 className="text-xl md:text-2xl">contact</h1>
          </div>
          <div className="contact-item mt-4">
            <div className="contact-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4"></div>

            <p>
              if you want to get in touch, feel free to email me at mshah415
              [at] gatech [dot] edu.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
