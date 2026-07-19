import axiosInstance from "./axios";

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */
export async function executeCode(language, code) {
  try {
    const response = await axiosInstance.post("/code/execute", {
      language,
      code,
    });

    const data = response.data;

    if (!data.success) {
      return {
        success: false,
        output: data.output || "",
        error: data.error || "Code execution failed",
      };
    }

    return {
      success: true,
      output: data.output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.error ||
        `Failed to execute code: ${error.message}`,
    };
  }
}