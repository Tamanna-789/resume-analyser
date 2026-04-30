from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
import json
import re
import pdfplumber
import tempfile
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

ANALYSE_PROMPT = """You are an expert career coach and resume analyst. You will be given a resume and a job description.

Analyse how well the resume matches the job and return ONLY a valid JSON object with this exact structure (no markdown, no explanation):

{
  "match_score": <integer 0-100>,
  "summary": "2-3 sentence overall assessment of the match",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "missing_keywords": ["keyword1", "keyword2", "keyword3"],
  "improvements": [
    {
      "section": "e.g. Experience / Skills / Summary",
      "issue": "What is weak or missing",
      "suggestion": "Concrete fix or rewrite"
    }
  ],
  "rewritten_summary": "A rewritten professional summary tailored to this job description",
  "verdict": "strong_match" | "good_match" | "partial_match" | "weak_match"
}

Be specific, honest, and actionable. Return ONLY the JSON."""


@app.route("/api/analyse", methods=["POST"])
def analyse():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    resume_file = request.files["resume"]
    job_description = request.form.get("job_description", "").strip()

    if not job_description:
        return jsonify({"error": "No job description provided"}), 400

    if not resume_file.filename.endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            resume_file.save(tmp.name)
            with pdfplumber.open(tmp.name) as pdf:
                resume_text = "\n".join(
                    page.extract_text() or "" for page in pdf.pages
                ).strip()

        if not resume_text:
            return jsonify({"error": "Could not extract text from PDF. Make sure it's not a scanned image."}), 400

    except Exception as e:
        return jsonify({"error": f"Failed to read PDF: {str(e)}"}), 500

    try:
        prompt = f"{ANALYSE_PROMPT}\n\n---RESUME---\n{resume_text}\n\n---JOB DESCRIPTION---\n{job_description}"

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000,
            temperature=0.3,
        )

        raw = response.choices[0].message.content.strip()
        raw = re.sub(r"^```json\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)

        result = json.loads(raw)
        return jsonify(result)

    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse AI response. Please try again."}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": "llama-3.3-70b-versatile"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)