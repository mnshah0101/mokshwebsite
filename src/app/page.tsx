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
            <a href="#projects">blog</a>
          </p>
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
              artificial intelligence. i am deeply interested in making cool
              software products and working with great people. i'm a full stack
              engineer at heart and i love working on building beautiful uis
              with clean, efficient backends. my go-to tech stack consists of
              react and go, but i am always open to learning new technologies.
            </p>
          </div>

          <div className="about-item mt-4">
            <p>
              right now, i am working on a few projects in the realm of sports
              technology that i'm very excited about, both as a developer and
              equity holder. in my own time, im building in cpp and studying
              data structures and algos. super interested in finance and the world of quant finance.
            </p>
          </div>
        </div>

        <hr />

        <div id="experiences" className="experiences py-6 md:py-10">
          <div className="experiences-title lucida-bold py-3 md:py-5">
            <h1 className="text-xl md:text-2xl">experiences</h1>
          </div>
          <div className="experiences-item mt-4">
            <div className="experiences-item mt-4">
              <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
                <h2>software engineer intern @ meaglabs.xyz</h2>
                <p>jan 2024 - present</p>
              </div>
              <p>
                i was hired as a software engineering intern at megalabs, an ai
                venture firm. i was responsible for creating the application
                layer for an ai sports data analyst. the magic is a custom
                text-to-sql engine which takes user questions and automatically
                generates sql queries, which we intelligently debug on the fly.
                i was also responsible for creating the product's rest apis and
                utilized web socket connections for response streaming. we also
                utilized the t3 stack for frontend/backend communication. we are
                in the midst of expanding and fundraising.
              </p>
            </div>

            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>software engineer and founder @ avalon</h2>
              <p>feb 2024 - jun 2024</p>
            </div>
            <p>
              since february 2024, i've been working as an engineer and
              technical lead at avalon in berkeley, ca. alongside a talented
              team of three engineers, i've been developing a
              retrieval-augmented generation chatbot tailored for law firms.
              this chatbot automates eDiscovery and drafts motions and briefs by
              leveraging tens of thousands of case files using technologies like
              pinecone, nextjs, dynamodb, typescript, and go. i've also
              spearheaded the creation of a web socket file transfer pipeline to
              aws s3, ensuring efficient downstream feeding into our rag model.
              moreover, i've optimized our language models with langchain to
              assess the probability of case wins, aggregating metrics from
              various documents to enhance decision-making processes. as a team,
              we sucessfully pitched to various venture capitalists and had a
              couple law firms using our product. we decided put the pause on
              this until we graduate.
            </p>
          </div>

          <div className="experiences-item mt-4">
            <div className="experiences-subtitle text-base md:text-l lucida-bold flex justify-between my-2 md:my-4">
              <h2>lead engineer @ opsmpro</h2>
              <p>may 2021 - sept 2024</p>
            </div>
            <p>
              since june 2023, i’ve been the go-to person for all things tech at
              opsm pro in ottawa, ca, as their lead full stack engineer. i built
              our main e-commerce site using the mern stack (mongo, expressjs,
              react, nodejs) from the ground up. integrating the stripe api, i
              set up a system to handle over a dozen products and subscriptions,
              helping us process more than $1,000,000 in payments each year.
              plus, i designed and implemented mysql databases to keep all our
              user and customer info safe.
            </p>
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
                backtested alpha momentum model which took historical alphas and predicted price direction using a neural network
                recreated idea from peer reviewed research paper. implemented in python.
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
