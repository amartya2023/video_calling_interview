import express from "express";
import { ENV } from "../lib/env.js";

const router = express.Router();

const JDOODLE_API = "https://api.jdoodle.com/v1/execute";

const LANGUAGE_VERSIONS = {
  javascript: {
    language: "nodejs",
    versionIndex: "4",
  },
  python: {
    language: "python3",
    versionIndex: "4",
  },
  java: {
    language: "java",
    versionIndex: "4",
  },
};

router.post("/execute", async (req, res) => {
  try {
    const { language, code } = req.body;

    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    const response = await fetch(JDOODLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: ENV.JDOODLE_CLIENT_ID,
        clientSecret: ENV.JDOODLE_CLIENT_SECRET,
        script: code,
        language: languageConfig.language,
        versionIndex: languageConfig.versionIndex,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.error || "JDoodle API request failed",
      });
    }

    if (data.error) {
      return res.json({
        success: false,
        output: data.output || "",
        error: data.error,
      });
    }

    return res.json({
      success: true,
      output: data.output || "No output",
    });
  } catch (error) {
    console.error("JDoodle execution error:", error);

    return res.status(500).json({
      success: false,
      error: `Failed to execute code: ${error.message}`,
    });
  }
});

export default router;