from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents import (
    build_reader_agent,
    build_search_agent,
    writer_chain,
    critic_chain
)

app = FastAPI(
    title="ResearchMind API",
    version="1.0.0"
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Model
# -----------------------------
class ResearchRequest(BaseModel):
    topic: str


# -----------------------------
# Root Route
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "ResearchMind FastAPI Backend Running"
    }


# -----------------------------
# Research Pipeline Route
# -----------------------------
@app.post("/research")
async def run_research_pipeline(data: ResearchRequest):

    topic = data.topic

    state = {}

    try:

        # =========================================
        # STEP 1 — SEARCH AGENT
        # =========================================
        print("\n" + "=" * 50)
        print("STEP 1 - SEARCH AGENT IS WORKING...")
        print("=" * 50)

        search_agent = build_search_agent()

        search_result = search_agent.invoke({
            "messages": [
                (
                    "user",
                    f"Find recent, reliable and detailed information about: {topic}"
                )
            ]
        })

        state["search_results"] = (
            search_result["messages"][-1].content
        )

        print("\nSEARCH RESULTS:\n")
        print(state["search_results"])


        # =========================================
        # STEP 2 — READER AGENT
        # =========================================
        print("\n" + "=" * 50)
        print("STEP 2 - READER AGENT IS SCRAPING...")
        print("=" * 50)

        reader_agent = build_reader_agent()

        reader_result = reader_agent.invoke({
            "messages": [
                (
                    "user",
                    f"""
Based on the following search results about '{topic}',
pick the most relevant URL and scrape it for deeper content.

Search Results:
{state['search_results'][:800]}
"""
                )
            ]
        })

        state["scraped_content"] = (
            reader_result["messages"][-1].content
        )

        print("\nSCRAPED CONTENT:\n")
        print(state["scraped_content"])


        # =========================================
        # STEP 3 — WRITER CHAIN
        # =========================================
        print("\n" + "=" * 50)
        print("STEP 3 - WRITER IS DRAFTING REPORT...")
        print("=" * 50)

        research_combined = (
            f"""
SEARCH RESULTS:
{state['search_results']}

DETAILED SCRAPED CONTENT:
{state['scraped_content']}
"""
        )

        state["report"] = writer_chain.invoke({
            "topic": topic,
            "research": research_combined
        })

        print("\nFINAL REPORT:\n")
        print(state["report"])


        # =========================================
        # STEP 4 — CRITIC CHAIN
        # =========================================
        print("\n" + "=" * 50)
        print("STEP 4 - CRITIC IS REVIEWING REPORT...")
        print("=" * 50)

        state["feedback"] = critic_chain.invoke({
            "report": state["report"]
        })

        print("\nCRITIC FEEDBACK:\n")
        print(state["feedback"])


        # =========================================
        # FINAL RESPONSE
        # =========================================
        return {
            "success": True,
            "topic": topic,

            "search_results": state["search_results"],

            "scraped_content": state["scraped_content"],

            "report": state["report"],

            "feedback": state["feedback"]
        }

    except Exception as e:

        print("\nERROR:\n", str(e))

        return {
            "success": False,
            "error": str(e)
        }


# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )