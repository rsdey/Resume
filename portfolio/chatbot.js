/**
 * Chatbot Logic for Dataflix Portfolio
 * Powered by OpenRouter API
 */

const CHAT_PROXY_URL = "/api/chat";

// Profile Context - Extracted from Ranadeep's Portfolio
const PROFILE_DATA = {
    name: "Ranadeep Dey",
    role: "AI & Data Scientist (Consultant at Deloitte)",
    summary: "Over 3 years of experience in AWS, Generative AI, LLMs, Agents, Python, ML/DL, and Multi-agent architectures. Currently leading Gen-AI projects at Deloitte.",
    experience: [
        {
            title: "Consultant, AI and Data",
            company: "Deloitte",
            period: "2025 - Present",
            location: "Pune, India",
            highlights: [
                "Designed multi-agent architectures using MCP and LangGraph.",
                "Led architecture and development of 10+ scalable Gen-AI tools and demos.",
                "Mentored 5+ junior developers.",
                "Used Ragas for testing LLM outputs (Context Recall & Faithfulness)."
            ]
        },
        {
            title: "Analyst, AI and Data",
            company: "Deloitte",
            period: "2023 - 2025",
            location: "Hyderabad, India",
            highlights: [
                "Reduced manual efforts by 4800+ hrs/mo via GPU-based ingestion pipelines (up to 95% faster).",
                "Developed SetFit-based multi-label classification models for global pharmaceutical clients.",
                "Automated document generation using LLM chains and ReAct agents."
            ]
        }
    ],
    skills: {
        ai_ml: ["Machine Learning", "NLP", "LLMs", "LangGraph", "Langchain", "Vector DBs", "RAG", "Prompt Engineering", "A2A Protocol"],
        architecture: ["Multi-Agent Architectures", "Scalable RAG Pipelines", "RESTful API Design", "MCP"],
        cloud_devops: ["AWS (Bedrock, Sagemaker, Lambda, EC2)", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
        languages: ["Python", "SQL", "Bash/Shell"]
    },
    achievements: [
        "Outstanding Performer and multiple GEM awards at Deloitte.",
        "Accelerated to Consultant in just 2.5 years (industry record time).",
        "1st Author of IEEE Research Paper on Handwritten Devanagari Script Recognition.",
        "Student of the Year (MIT Academy of Engineering) among all departments."
    ],
    certifications: [
        "AWS Certified Machine Learning - Specialty",
        "AWS Certified Cloud Practitioner"
    ],
    education: [
        "B.Tech in Information Technology (Minor: ML) from MIT Academy of Engineering, Pune (Grade: 9.4/10)",
        "HSC from Jai Hind Junior College (89.3%)",
        "SSC from Nirmal Bethany High School (92%)"
    ]
};

class DataflixChatbot {
    constructor() {
        this.isActive = false;
        this.mode = 'profile'; // 'profile' or 'general'
        this.history = [];

        // DOM Elements
        this.widget = null;
        this.chatWindow = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.sendBtn = null;
        this.modeBtns = null;
        this.quickActions = null;

        this.init();
    }

    init() {
        this.createDOM();
        this.addEventListeners();
        this.renderInitialMessage();
    }

    createDOM() {
        const widgetHTML = `
            <div class="chat-widget" id="dataflix-chatbot">
                <div class="chat-button" id="chatbot-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div class="chat-window" id="chatbot-window">
                    <div class="chat-header">
                        <h3>DATAFLIX AI</h3>
                        <div class="chat-header-actions">
                            <button class="chat-header-btn" id="chatbot-clear" title="Clear Chat">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                            <button class="chat-header-btn" id="chatbot-close" title="Close">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chatbot-messages"></div>
                    
                    <div class="chat-input-area">
                        <div class="chat-mode-toggle">
                            <button class="mode-btn active profile-active" data-mode="profile">Profile Mode</button>
                            <button class="mode-btn" data-mode="general">General Mode</button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <input type="text" class="chat-input" id="chatbot-input" placeholder="Ask anything about Ranadeep..." maxlength="500">
                            <button class="send-btn" id="chatbot-send" disabled>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = widgetHTML;
        document.body.appendChild(div);

        // Map DOM
        this.widget = document.getElementById('dataflix-chatbot');
        this.chatWindow = document.getElementById('chatbot-window');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.closeBtn = document.getElementById('chatbot-close');
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.clearBtn = document.getElementById('chatbot-clear');
    }

    addEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.toggleWindow());
        this.closeBtn.addEventListener('click', () => this.toggleWindow(false));

        this.inputField.addEventListener('input', () => {
            this.sendBtn.disabled = !this.inputField.value.trim();
        });

        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.sendBtn.disabled) {
                this.handleSendMessage();
            }
        });

        this.sendBtn.addEventListener('click', () => this.handleSendMessage());

        this.clearBtn.addEventListener('click', () => {
            this.history = [];
            this.messagesContainer.innerHTML = "";
            this.renderInitialMessage();
        });

        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.mode = btn.dataset.mode;
                this.modeBtns.forEach(b => {
                    b.classList.remove('active', 'profile-active');
                    if (b === btn) {
                        btn.classList.add('active');
                        if (this.mode === 'profile') btn.classList.add('profile-active');
                    }
                });
                this.inputField.placeholder = this.mode === 'profile' ? "Ask about Ranadeep..." : "Ask me anything...";

                // Remove initial messages if switching to general mode fresh
                if (this.mode === 'general' && this.history.length <= 1) {
                    this.messagesContainer.innerHTML = "";
                    this.history = [];
                } else if (this.mode === 'profile' && this.history.length === 0) {
                    this.renderInitialMessage();
                }
            });
        });

        // Global trigger from the portfolio's search bar
        document.getElementById('ai-chat-search-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWindow(true);
        });
    }

    toggleWindow(state) {
        this.isActive = state !== undefined ? state : !this.isActive;
        this.chatWindow.classList.toggle('active', this.isActive);
    }

    renderInitialMessage() {
        this.addMessage("ai", `Hi! I'm Ranadeep's AI assistant. In **Profile Mode**, I can tell you about his experience, projects, and skills. Switch to **General Mode** for anything else!`);
    }

    addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        // Simple markdown-to-html for bold and links
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        msgDiv.innerHTML = formattedText;
        this.messagesContainer.appendChild(msgDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        if (sender !== 'typing') {
            this.history.push({ role: sender === 'ai' ? 'assistant' : 'user', content: text });
        }
        return msgDiv;
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return typingDiv;
    }

    getSystemPrompt() {
        if (this.mode === 'general') {
            return "You are a helpful, professional AI assistant. Keep responses concise and informative.";
        }

        return `You are "Dataflix AI", the personal career assistant for Ranadeep Dey. 
Ranadeep's Profile Data:
${JSON.stringify(PROFILE_DATA, null, 2)}

Your goal:
1. Answer questions based ONLY on Ranadeep's profile when in Profile Mode.
2. If asked about his suitability for a role, compare the role's requirements with his skills (Machine Learning, Gen-AI, AWS, Python) and experience at Deloitte as Consultant/Analyst.
3. Be professional, technical, and impressive.
4. If a question is outside his profile, politely suggest switching to General Mode or answer within the context of how Ranadeep might approach it.

Formatting: Use bold text for key terms. Use bullet points for lists. Keep responses under 150 words.`;
    }

    async handleSendMessage() {
        const text = this.inputField.value.trim();
        if (!text) return;

        this.inputField.value = "";
        this.sendBtn.disabled = true;
        this.addMessage("user", text);

        const typingIndicator = this.showTyping();

        try {
            const response = await fetch(CHAT_PROXY_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openrouter/free", // Automatically pick an available free model
                    messages: [
                        { role: "system", content: this.getSystemPrompt() },
                        ...this.history.slice(-10) // Context of last 10 messages
                    ]
                })
            });

            const data = await response.json();
            typingIndicator.remove();

            if (data.error) {
                this.addMessage("ai", `Error: ${data.error.message || "Failed to get response"}`);
            } else {
                const aiResponse = data.choices[0].message.content;
                this.addMessage("ai", aiResponse);
            }
        } catch (error) {
            typingIndicator.remove();
            this.addMessage("ai", "Sorry, I encountered an error connecting to OpenRouter. Please check your internet or API key.");
            console.error("Chatbot Error:", error);
        } finally {
            this.sendBtn.disabled = false;
        }
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    window.dataflixAssistant = new DataflixChatbot();
});
