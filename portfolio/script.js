// Add solid black background to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Horizontal scroll logic using mouse wheel over the slider wrappers
const sliders = document.querySelectorAll('.slider-wrapper');
sliders.forEach(slider => {
    slider.addEventListener('wheel', (evt) => {
        // Prevent default vertical scroll and translate to horizontal
        if (slider.scrollWidth > slider.clientWidth) {
            evt.preventDefault();
            slider.scrollLeft += evt.deltaY * 2;
        }
    });
});

// Dataflix Modal Data map
const itemDetailsMap = {
    // Experience Seasons
    "S2: Consultant": {
        title: "AI and Data - Consultant at Deloitte",
        tags: ['<span class="match-score">99% Match</span>', '<span class="duration">2025 - Present</span>', '<span class="cert-age">T</span>'],
        genres: ["Agentic AI", "LLMs", "Leadership", "MCP", "LangGraph"],
        description: `
            <p><strong>Pune, India</strong></p>
            <ul>
                <li style="margin-bottom: 0.5rem">Designed, built and deployed various <strong>Agentic AI applications</strong> using <strong>Multi-agent architectures, MCP, LangGraph</strong> and <strong>OpenAI/Bedrock LLMs</strong> in cloud environments.</li>
                <li style="margin-bottom: 0.5rem">Collaborated with cross-functional teams to define and conduct <strong>statistical experiments</strong> to validate model hypotheses; built a regression testing suite using <strong>Ragas</strong> to monitor 'Context Recall' and 'Faithfulness', maintaining &lt;5% performance degradation.</li>
                <li style="margin-bottom: 0.5rem">Led the architecture and development of <strong>10+ scalable Gen-AI tools and demos</strong>, enabling Managers to drive smooth client demos and Proposal meetings.</li>
                <li>Conducted code reviews and mentored <strong>5+ junior developers</strong>, leading efforts in technical documentation, code quality improvements, and knowledge sharing.</li>
            </ul>
        `
    },
    "S1: Analyst": {
        title: "AI and Data - Analyst at Deloitte",
        tags: ['<span class="match-score">96% Match</span>', '<span class="duration">2023 - 2025</span>', '<span class="cert-age">T</span>'],
        genres: ["NLP", "Pipelines", "Prompt Engineering"],
        description: `
            <p><strong>Hyderabad, India</strong></p>
            <ul>
                <li style="margin-bottom: 0.5rem">Diminished manual efforts by <strong>4800+ hrs/month</strong> by optimizing Ingestion pipelines by leveraging <strong>GPU-based ingestion and retrieval</strong>, achieving up to <strong>95% improved processing speeds</strong>.</li>
                <li style="margin-bottom: 0.5rem">Developed a <strong>SetFit-based multi-label classification model</strong> and custom translation services, ensuring cross-lingual alignment and data normalization for global pharmaceutical clients.</li>
                <li>Used various <strong>prompt engineering techniques</strong> along with custom document ingestion process to automate document generation and summarization with <strong>LLM chains and React agents</strong> along with memory based chatbots.</li>
            </ul>
        `
    },
    // Skills
    "Data Science & AI": {
        title: "Data Science & AI",
        tags: ['<span class="cert-age">Core Concept</span>', '<span class="duration">Primary Skills</span>'],
        genres: ["Machine Learning", "NLP", "LLMs", "Prompt Eng"],
        description: `
            <p><strong>Technical Arsenal:</strong></p>
            <ul>
                <li>Machine Learning & Deep Learning frameworks (TensorFlow, PyTorch)</li>
                <li>Natural Language Processing (NLP)</li>
                <li>LangGraph, Langchain, MCP (Model Context Protocol)</li>
                <li>Vector Databases and RAG implementations</li>
                <li>Prompt Engineering techniques and architectures</li>
                <li>A2A (Agent-to-Agent) Protocols</li>
            </ul>
        `
    },
    "System Design": {
        title: "System Design & Architecture",
        tags: ['<span class="cert-age">Architecture</span>', '<span class="duration">Production Scale</span>'],
        genres: ["Multi-Agent Architecture", "RAG", "APIs"],
        description: `
            <p><strong>Building highly scalable, fault-tolerant logic flows:</strong></p>
            <ul>
                <li>Architecting complex Multi-Agent systems using MCP and Langgraph.</li>
                <li>Designing scalable RAG (Retrieval-Augmented Generation) pipelines for massive datasets.</li>
                <li>Enterprise-grade RESTful API design.</li>
                <li>System integration methodologies reducing coupling and maximizing availability.</li>
            </ul>
        `
    },
    "Cloud & DevOps": {
        title: "Cloud Infrastructure & DevOps",
        tags: ['<span class="cert-age">Infrastructure</span>', '<span class="duration">Deployment</span>'],
        genres: ["AWS", "Kubernetes", "Docker", "CI/CD"],
        description: `
            <p><strong>Creating robust deployment environments:</strong></p>
            <ul>
                <li>Deep expertise in AWS cloud services (Bedrock, Sagemaker, Lambda, EC2).</li>
                <li>Orchestrating containerized infrastructures with Docker and Kubernetes (K8s).</li>
                <li>Managing machine learning pipelines with Kubeflow.</li>
                <li>Designing CI/CD pipelines via GitHub actions for smooth, automated deployments.</li>
            </ul>
        `
    },
    "Languages": {
        title: "Programming Languages",
        tags: ['<span class="cert-age">Syntax</span>', '<span class="duration">Tools</span>'],
        genres: ["Python", "SQL", "Bash"],
        description: `
            <p><strong>Fluent in multiple paradigms:</strong></p>
            <ul>
                <li><strong>Python:</strong> Primary language used for ML engineering, LLM interfaces, and backend logic.</li>
                <li><strong>SQL:</strong> Advanced querying and data manipulation.</li>
                <li><strong>Bash / Shell Scripting:</strong> Essential for DevOps tasks, deployment automation, and system debugging.</li>
            </ul>
        `
    },
    // Achievements
    "Performance Awards": {
        title: "Outstanding Performer & GEM Awards",
        tags: ['<span class="cert-age">Award</span>', '<span class="duration">Deloitte SME</span>'],
        genres: ["Leadership", "Gen-AI"],
        description: `
            <p>Received multiple <strong>Outstanding Performer</strong> and <strong>GEM awards</strong> for exceptional contributions while leading Gen-AI teams across various impactful Proof of Concepts (POCs) and enterprise use-cases.</p>
            <p style="margin-top:0.5rem">Recognized across the organization as a Subject Matter Expert (SME) within the Generative AI domain.</p>
        `
    },
    "Consultant in 2.5 Yrs": {
        title: "Accelerated Promotion",
        tags: ['<span class="cert-age">Career</span>', '<span class="duration">Record Time</span>'],
        genres: ["Performance", "Growth"],
        description: `
            <p>Achieved a rare, highly accelerated promotion to the role of Consultant at Deloitte in merely <strong>2.5 years</strong>.</p>
            <p style="margin-top:0.5rem">This acceleration demonstrates massive professional growth, unwavering technical mastery, and consistent leadership on high-stakes, fast-moving corporate projects.</p>
        `
    },
    "Hosted Deep Dives": {
        title: "Technical Conference & Deep Dives",
        tags: ['<span class="cert-age">Speaker</span>', '<span class="duration">50+ Attendees</span>'],
        genres: ["Tech Talks", "Scalable Architectures"],
        description: `
            <p>Presented multiple extensive deep-dive sessions focusing on scalable architectural paradigms.</p>
            <p style="margin-top:0.5rem">Topics included the complete theoretical and practical pipelines required for the development of production-ready Gen-AI applications.</p>
            <p style="margin-top:0.5rem">Sessions were highly attended by cross-functional teams comprising over <strong>50+ developers</strong>.</p>
        `
    },
    "IEEE Publication": {
        title: "IEEE Research Publication",
        tags: ['<span class="cert-age">Research</span>', '<span class="duration">1st Author</span>', '<span class="match-score">Aug 18, 2022</span>'],
        genres: ["Computer Vision", "Machine Learning"],
        description: `
            <p><strong>Published as 1st Author:</strong><br/> <em>A comparative Study of Handwritten Devanagari Script Character Recognition Techniques</em>.</p>
            <p style="margin-top:0.5rem">A published academic research paper evaluating the efficiencies of various Machine Learning and Deep Learning algorithms applied to recognizing intricate handwritten regional scripts.</p>
            <div style="margin-top: 1.5rem">
                <a href="https://ieeexplore.ieee.org/document/9848911" target="_blank" class="btn btn-play" style="display:inline-flex; width:220px; align-items:center; justify-content:center; text-decoration:none;"><svg viewBox="0 0 24 24" style="margin-right:10px;"><path d="M8 5v14l11-7z"/></svg> Read Paper</a>
            </div>
        `
    },
    "Student of the Year": {
        title: "Student of the Year Award",
        tags: ['<span class="cert-age">Award</span>', '<span class="duration">Gold</span>'],
        genres: ["Academic Excellence", "Leadership"],
        description: `
            <p>Awarded the prestigious <strong>Dynamic Student Award</strong> declaring me the overall <em>Student of the Year</em> across all operational departments during my final year of Engineering.</p>
            <p style="margin-top:0.5rem">Given for exemplary performance encompassing academics, interpersonal excellence, and technical project implementations.</p>
        `
    },
    // Certifications
    "AWS ML Specialty": {
        title: "AWS Certified ML - Specialty",
        tags: ['<span class="match-score">Certified</span>', '<span class="cert-age">Cloud</span>'],
        genres: ["Amazon Web Services", "Machine Learning"],
        description: `
            <p><strong>Certification Status: Verified Active</strong></p>
            <p style="margin-top:0.5rem">A high-level specialized certification confirming deep architectural knowledge in designing, building, tuning, and deploying scalable Machine Learning solutions natively on the AWS platform.</p>
        `
    },
    "AWS Practitioner": {
        title: "AWS Certified Cloud Practitioner",
        tags: ['<span class="match-score">Certified</span>', '<span class="cert-age">Cloud</span>'],
        genres: ["Amazon Web Services", "Infrastructure"],
        description: `
            <p><strong>Certification Status: Verified Active</strong></p>
            <p style="margin-top:0.5rem">Foundational knowledge verifying an overarching understanding of the AWS Cloud platform, covering security, architecture, pricing, and infrastructure operations.</p>
        `
    },
    // Education
    "MIT Academy of Eng": {
        title: "B.Tech, Information Technology",
        tags: ['<span class="match-score">Grade: 9.4</span>', '<span class="duration">2018 - 2022</span>'],
        genres: ["B.Tech", "IT", "Minor: Machine Learning"],
        description: `
            <p><strong>Institution:</strong> MIT, Academy of Engineering (Pune, India)</p>
            <ul style="margin-top:1rem">
                <li>Graduated with a phenomenal grade score of <strong>9.4</strong>.</li>
                <li>Completed a rigorous, integrated Minor Specialization exactly targeting <strong>Machine Learning</strong>.</li>
                <li>Focus areas included advanced algorithm design, database architectures, software engineering, and early-stage neural network deployments.</li>
            </ul>
        `
    },
    "Jai Hind Jr College": {
        title: "12th Standard, PCMB",
        tags: ['<span class="match-score">Grade: 89.3%</span>', '<span class="duration">2016 - 2018</span>'],
        genres: ["HSC", "Sciences"],
        description: `
            <p><strong>Institution:</strong> Jai Hind Junior College</p>
            <p style="margin-top:1rem">Completed my Higher Secondary Education under the Physics, Chemistry, Mathematics, and Biology (PCMB) module with high distinction, scoring <strong>89.3%</strong>.</p>
        `
    },
    "Nirmal Bethany High": {
        title: "10th Standard, SSC",
        tags: ['<span class="match-score">Grade: 92%</span>', '<span class="duration">2015 - 2016</span>'],
        genres: ["SSC", "Primary Boards"],
        description: `
            <p><strong>Institution:</strong> Nirmal Bethany High School</p>
            <p style="margin-top:1rem">Completed my Secondary School Certificate (SSC) demonstrating fundamental analytical strength across science and mathematics modules, achieving an excellent score of <strong>92%</strong>.</p>
        `
    }
};

// Modal Logic
const modal = document.getElementById('item-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalTags = document.getElementById('modal-tags');
const modalDesc = document.getElementById('modal-desc');
const modalGenres = document.getElementById('modal-genres-list');
const modalHeader = document.getElementById('modal-header');

document.querySelectorAll('.slider-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent immediate click-outs
        const itemKey = item.querySelector('.item-visuals h3').innerText.trim();
        const data = itemDetailsMap[itemKey];

        if (data) {
            // Populate Modal
            modalTitle.innerText = data.title;
            modalTags.innerHTML = data.tags.join("");
            modalDesc.innerHTML = data.description;

            // Populate genres
            modalGenres.innerHTML = "";
            data.genres.forEach(genre => {
                const li = document.createElement('li');
                li.innerText = genre;
                modalGenres.appendChild(li);
            });

            // Extract the background class to mimic the image
            const bgClass = [...item.querySelector('.item-visuals').classList].find(cls => cls.startsWith('bg-'));
            modalHeader.className = "modal-header " + (bgClass || "");

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
        }
    });
});

// Close Modal logic
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = "auto";
});

// Close clicking outside
modal.addEventListener('click', (e) => {
    // If we click anywhere inside the modal but not the specific modal-container
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = "auto";
    }
});

// AI Chat Search Click Teaser
const aiChatSearch = document.querySelector('.ai-chat-search');
if (aiChatSearch) {
    aiChatSearch.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent modal close on clicking the search bar

        modalTitle.innerText = "Gen-AI Powered Search Bar";
        modalTags.innerHTML = '<span class="match-score">Coming Soon</span><span class="cert-age">Pre-release</span>';
        modalDesc.innerHTML = `
            <p><strong>Experience my portfolio interactively!</strong></p>
            <p style="margin-top:0.5rem">Soon, this search bar will evolve into an intelligent, context-aware chatbot. Powered by LLMs and advanced RAG pipelines, it will act as an interactive agent that knows my entire resume!</p>
            <ul style="margin-top:1rem; margin-left: 1.5rem;">
                <li style="margin-bottom:0.5rem">Ask complex questions about my technical experience.</li>
                <li style="margin-bottom:0.5rem">Compare my skills against your job requirements dynamically.</li>
                <li>Experience robust Multi-Agent architecture in real-time.</li>
            </ul>
        `;

        modalGenres.innerHTML = "";
        ["Gen-AI", "RAG Pipeline", "Gemini API", "Assistant"].forEach(genre => {
            const li = document.createElement('li');
            li.innerText = genre;
            modalGenres.appendChild(li);
        });

        modalHeader.className = "modal-header bg-gradient-2";
        modal.classList.add('active');
        document.body.style.overflow = "hidden";
    });
}
