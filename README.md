# ResearchMind - Multi-Agent AI Research System

A sophisticated multi-agent research platform powered by advanced AI that delivers comprehensive, well-researched reports comparable to ChatGPT's research mode. ResearchMind combines intelligent web search, content extraction, and AI-driven analysis to produce detailed, factual, and professionally structured research reports.

## 🚀 Features

### Core Capabilities

- **🔍 Intelligent Web Search Agent** - Leverages Tavily API to discover recent, reliable, and relevant information from across the web
- **📄 Content Reader Agent** - Intelligently scrapes and extracts deep content from multiple URLs for comprehensive analysis
- **✍️ Expert Report Writer** - Generates structured, detailed research reports with clear findings and proper source attribution
- **🎯 Critic Chain** - Validates and refines reports for accuracy and coherence before delivery
- **⚡ FastAPI Backend** - High-performance REST API for seamless integration
- **🔄 Multi-Stage Pipeline** - Orchestrated research workflow that mirrors professional research methodology

### Research Quality

✅ **Comparable to ChatGPT Research Mode:**
- Multi-step reasoning and fact-checking
- Real-time web search with current information
- Content verification through multiple sources
- Structured report generation with citations
- Professional formatting and presentation
- Deep content analysis through web scraping
- Quality assurance through critique review

## 🏗️ Architecture

ResearchMind operates through an intelligent multi-agent pipeline:

```
User Query
    ↓
[Search Agent] → Discovers relevant sources via web search
    ↓
[Reader Agent] → Extracts detailed content from top sources
    ↓
[Writer Chain] → Structures findings into professional report
    ↓
[Critic Chain] → Validates and refines final output
    ↓
Comprehensive Research Report
```

### Agent Breakdown

1. **Search Agent** - Uses Tavily's advanced search capabilities to find top 5 most relevant and reliable sources
2. **Reader Agent** - Intelligently scrapes URLs and extracts clean, structured text content for analysis
3. **Writer Agent** - Synthesizes gathered information into well-organized reports with:
   - Introduction
   - Key Findings (minimum 3 comprehensive points)
   - Conclusion
   - Source attribution
4. **Critic Agent** - Reviews reports for factual accuracy, clarity, and professional standards

## 🛠️ Tech Stack

- **LLM**: Mistral AI (Small model for efficiency)
- **Framework**: LangChain with LangChain-Mistral
- **Search**: Tavily API
- **Web Scraping**: BeautifulSoup4, Requests, LXML
- **Backend**: FastAPI
- **Frontend**: HTML5, CSS3, JavaScript
- **Data Processing**: Pandas, Pydantic
- **Additional**: Tenacity (retry logic), Rich (logging)

## 📋 Requirements

- Python 3.8+
- Mistral API Key
- Tavily API Key

## ⚙️ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Lakshay1184/Multi_ai_agent_research_system.git
cd Multi_ai_agent_research_system
```

2. **Create and activate virtual environment:**
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables:**
Create a `.env` file with:
```env
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## 🚀 Usage

### Starting the Backend

```bash
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`

### API Endpoints

#### Health Check
```bash
GET /
```

#### Run Research Pipeline
```bash
POST /research
Content-Type: application/json

{
  "topic": "quantum computing advances in 2024"
}
```

**Response:**
```json
{
  "topic": "quantum computing advances in 2024",
  "search_results": "...",
  "scraped_content": "...",
  "report": "Detailed research report...",
  "critique": "Report validation and feedback..."
}
```

### Frontend Usage

1. Open `index.html` in your browser
2. Enter your research topic in the search box
3. Click "Research" button
4. View the generated comprehensive report

## 📊 Research Methodology

ResearchMind follows a rigorous, multi-stage research methodology:

1. **Discovery Phase** - Search agent identifies top 5 relevant sources
2. **Deep Dive Phase** - Reader agent extracts comprehensive content
3. **Synthesis Phase** - Writer creates structured report with findings
4. **Validation Phase** - Critic reviews for accuracy and quality

This approach ensures:
- ✓ Current, up-to-date information
- ✓ Multiple source verification
- ✓ Comprehensive analysis
- ✓ Professional presentation
- ✓ Quality assurance

## 🎯 Why ResearchMind is Strong

### Key Advantages Over Traditional Research:

| Feature | ResearchMind | Traditional Search |
|---------|-------------|-------------------|
| Real-time Web Search | ✅ Live Tavily API | ❌ Limited |
| Multi-Source Analysis | ✅ 5+ sources per query | ❌ Single source bias |
| Content Extraction | ✅ Deep web scraping | ❌ Snippets only |
| Report Structure | ✅ Professional formatting | ❌ Raw results |
| Citation Management | ✅ Automatic attribution | ❌ Manual tracking |
| Quality Assurance | ✅ Critic validation | ❌ No verification |
| AI Synthesis | ✅ Advanced reasoning | ❌ Keyword matching |

### Comparable to ChatGPT Research Mode:

ResearchMind delivers similar capabilities to ChatGPT's research feature:
- ✅ Live web search with current information
- ✅ Multi-step reasoning and analysis
- ✅ Comprehensive report generation
- ✅ Source verification and attribution
- ✅ Professional structured output
- ✅ Quality refinement through review

## 📁 Project Structure

```
├── app.py              # FastAPI application
├── agents.py           # Multi-agent definitions
├── pipeline.py         # Research pipeline orchestration
├── tools.py            # Web search and scraping tools
├── requirements.txt    # Python dependencies
├── index.html          # Frontend interface
├── style.css           # UI styling
├── script.js           # Frontend logic
└── README.md           # This file
```

## 🔐 Security & Privacy

- Environment variables stored in `.env` (not version controlled)
- API keys protected from exposure
- User queries processed securely
- No data persistence (stateless API)

## 🚀 Future Enhancements

- Multi-language research support
- Advanced citation formats (APA, MLA, Chicago)
- PDF report generation
- Research history and bookmarking
- Custom report templates
- Parallel agent execution for speed optimization
- Caching layer for frequently researched topics
