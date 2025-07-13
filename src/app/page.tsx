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
            <a href="#projects">projects</a>
            <span className="px-2 md:px-3">|</span>
            <a href="/articles">articles</a>
            <span className="px-2 md:px-3">|</span>
            <a href="https://medium.com/@mnshah0101">medium</a>
          </p>
          <div className="mt-6">
            <a 
              href="/articles/" 
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg lucida text-sm hover:bg-blue-600 transition-colors"
            >
              🧮 check out what i'm learning →
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
              artificial intelligence. i am deeply interested in software and math. right now am reading
              through principles of mathematical analysis by rudin and doing gilbert strang's matrix methods for data analysis and signal processing.
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
              <h2>software engineer intern @ meaglabs.xyz</h2>
              <p>jan 2024 - present</p>
            </div>
          </div>
          <div className="experiences-item mt-1">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>software engineer and founder @ avalon</h2>
              <p>feb 2024 - jun 2024</p>
            </div>
          </div>

          <div className="experiences-item mt-1">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>lead engineer @ opsmpro</h2>
              <p>may 2021 - sept 2024</p>
            </div>
          </div>
        </div>

        <hr />

        <div id="projects" className="projects py-6 md:py-10">
          <div className="projects-title lucida-bold py-3 md:py-5">
            <h1 className="text-xl md:text-2xl">projects</h1>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>github.com/mnshah0101/futuresalphamomentumbacktest</h2>
            </div>

            <p>
              backtested alpha momentum model which took historical alphas and
              predicted price direction using a neural network recreated idea
              from peer reviewed research paper. implemented in python.
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>github.com/mnshah0101/VectorVisualizationCpp</h2>
            </div>

            <p>
              c++ project that helps visualize vector operations in 3-d space
              with opengui
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>github.com/mnshah0101/ml_library_c-</h2>
            </div>

            <p>
              a modern c++ machine learning library that provides implementations of various machine learning algorithms using eigen for efficient matrix operations. includes supervised learning models (linear regression, logistic regression, knn, decision trees), unsupervised learning (k-means clustering, pca), data handling with csv loading and dataset management, and optimization with gradient descent and learning rate scheduling. built with c++17, eigen, and cmake.
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>github.com/mnshah0101/stats_lib_cpp</h2>
            </div>

            <p>
              a modern c++17 header+static library for probability distributions, random number generation, and statistical estimation. includes probability distributions (normal, beta, gamma, poisson, binomial), random number generators, estimation routines (mle), and a clean api with minimal dependencies. designed for quant, ml, or whenever you need fast statistics in c++. built with c++17 and cmake.
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>github.com/mnshah0101/polymarket_bot</h2>
            </div>

            <p>
              a c++ bot that automatically spots and takes advantage of price differences between traditional sportsbooks and polymarket. watches odds on the odds api and polymarket, spots arbitrage opportunities, and automatically places bets when profitable. includes kelly criterion betting, sqlite for transaction history, and docker support. built with c++17, libcurl, nlohmann/json, and cmake.
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>github.com/mnshah0101/zetamactracker</h2>
            </div>

            <p>
              chrome extension that helps track zetamac scores (mental math
              game). developed in js. can download here:{" "}
              <a href="https://chromewebstore.google.com/detail/zetamac-score-tracker/dklbimmbofmkbcblgpelfdajbjeppajo">
                <b>get now</b>
              </a>
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>counsia.com</h2>
            </div>

            <p>
              an edtech platform that connects students with college counselors
              to help them get into their dream schools. i built the entire
              platform from scratch using the meen stack (mongodb, expressjs,
              ejs, nodejs) and integrated the stripe api to handle payments. i
              also created a custom admin dashboard to manage user data and
              track counselor availability.
            </p>
          </div>

          <div className="projects-item mt-4">
            <div className="projects-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>spindleapi.com</h2>
            </div>

            <p>
              a powerful ai-powered api generator and serverless hosting
              provider that fully automates generating apis from mongo schemas.
              created using the mern stack.
            </p>
          </div>
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
