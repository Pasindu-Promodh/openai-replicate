// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Replicate from "replicate";

// dotenv.config();

// const app = express();

// app.use(cors());

// app.use(express.json());

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// app.options("/v1/chat/completions", (req, res) => {
//   res.sendStatus(204);
// });

// app.post("/v1/chat/completions", async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   try {
//     const messages = req.body.messages || [];

//     const systemMessage = `
// You are MamaBot, a pregnancy and maternal health assistant.

// Allowed topics ONLY:
// - Pregnancy (all trimesters)
// - Prenatal care
// - Nutrition during pregnancy
// - Physical and emotional changes in pregnancy
// - Labor, delivery, and postpartum care
// - Newborn care (first months only)

// Disallowed topics:
// - Politics, religion, finance, programming, relationships unrelated to pregnancy
// - Mental health therapy outside pregnancy context
// - Any topic not directly related to pregnancy or maternal health

// If the user asks about a disallowed topic:
// - Politely refuse
// - Briefly state that you can only help with pregnancy-related topics
// - Offer to reframe the question into a pregnancy context

// You must never answer disallowed topics.
// Do not continue the conversation outside your role.
// `;

//     // Build prompt for the model
//     const prompt =
//       [systemMessage]
//         .concat(
//           messages.map((m) =>
//             m.role === "user"
//               ? `User: ${m.content}`
//               : `Assistant: ${m.content}`,
//           ),
//         )
//         .join("\n") + "\nAssistant: ";

//     // const prompt =
//     //   messages.map((m) => `${m.role}: ${m.content}`).join("\n") + " assistant:";

//     // ✅ THIS is the correct streaming API
//     const stream = await replicate.stream("meta/meta-llama-3-8b-instruct", {
//       input: {
//         prompt,
//         temperature: 0.4,
//         max_new_tokens: 400,
//       },
//     });

//     for await (const event of stream) {
//       if (event.event === "output") {
//         const token = String(event.data ?? "");

//         res.write(
//           `data: ${JSON.stringify({
//             choices: [
//               {
//                 delta: { content: token },
//               },
//             ],
//           })}\n\n`,
//         );
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.end();
//   }
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Server is running ✅",
//     timestamp: new Date(),
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

//===================================== language ===========================================================

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Replicate from "replicate";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// app.options("/v1/chat/completions", (req, res) => {
//   res.sendStatus(204);
// });

// app.post("/v1/chat/completions", async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   try {
//     const { messages = [], language = "en" } = req.body;

//     // 🔒 LANGUAGE ENFORCEMENT
//     let languageInstruction = "";
//     switch (language) {
//       case "si":
//         languageInstruction =
//           "Respond ONLY in Sinhala. Do not use English unless absolutely necessary.";
//         break;
//       case "ta":
//         languageInstruction =
//           "Respond ONLY in Tamil. Do not use English unless absolutely necessary.";
//         break;
//       default:
//         languageInstruction = "Respond ONLY in English.";
//     }

//     const systemMessage = `
// You are MamaBot, a pregnancy and maternal health assistant.

// ${languageInstruction}

// Allowed topics ONLY:
// - Pregnancy (all trimesters)
// - Prenatal care
// - Nutrition during pregnancy
// - Physical and emotional changes in pregnancy
// - Labor, delivery, and postpartum care
// - Newborn care (first months only)

// Disallowed topics:
// - Politics, religion, finance, programming, relationships unrelated to pregnancy
// - Mental health therapy outside pregnancy context
// - Any topic not directly related to pregnancy or maternal health

// Rules:
// - Stay strictly within allowed topics
// - Be calm, empathetic, and supportive
// - You are NOT a doctor
// - Do NOT provide diagnoses or prescriptions
// - If danger signs are mentioned (heavy bleeding, severe pain, fainting, fever, reduced baby movement),
//   advise seeking immediate medical care

// If the user asks about a disallowed topic:
// - Politely refuse
// - State you can only help with pregnancy-related topics
// - Invite them to ask a pregnancy-related question
// `;

//     // 🧠 PROMPT BUILDING
//     const prompt =
//       [systemMessage]
//         .concat(
//           messages.map((m) =>
//             m.role === "user"
//               ? `User: ${m.content}`
//               : `Assistant: ${m.content}`,
//           ),
//         )
//         .join("\n") + "\nAssistant:";

//     // 🚀 STREAMING RESPONSE
//     const stream = await replicate.stream("meta/meta-llama-3-8b-instruct", {
//       input: {
//         prompt,
//         temperature: 0.4,
//         max_new_tokens: 400,
//       },
//     });

//     for await (const event of stream) {
//       if (event.event === "output") {
//         res.write(
//           `data: ${JSON.stringify({
//             choices: [
//               {
//                 delta: { content: String(event.data ?? "") },
//               },
//             ],
//           })}\n\n`,
//         );
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.end();
//   }
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Server is running ✅",
//     timestamp: new Date(),
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

// =========================================================================================================









import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.options("/v1/chat/completions", (req, res) => {
  res.sendStatus(204);
});

app.post("/v1/chat/completions", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { messages = [], language = "en" } = req.body;

    // 🔒 LANGUAGE ENFORCEMENT & MODEL SELECTION
    let languageInstruction = "";
    let modelId = "meta/meta-llama-3-8b-instruct"; // default for English
    
    switch (language) {
      case "si":
        languageInstruction =
          "ඔබ MamaBot, ගැබිනි සහ මාතෘ සෞඛ්‍ය සහායකයෙකි. සිංහලෙන් පමණක් පිළිතුරු දෙන්න.";
        modelId = "pasindu-promodh/llama3-sinhala"; // 🎯 YOUR DEPLOYED MODEL
        break;
      case "ta":
        languageInstruction =
          "Respond ONLY in Tamil. Do not use English unless absolutely necessary.";
        // Keep default model or find a Tamil-specific one
        break;
      default:
        languageInstruction = "Respond ONLY in English.";
    }

    const systemMessage = `
You are MamaBot, a pregnancy and maternal health assistant.

${languageInstruction}

Allowed topics ONLY:
- Pregnancy (all trimesters)
- Prenatal care
- Nutrition during pregnancy
- Physical and emotional changes in pregnancy
- Labor, delivery, and postpartum care
- Newborn care (first months only)

Disallowed topics:
- Politics, religion, finance, programming, relationships unrelated to pregnancy
- Mental health therapy outside pregnancy context
- Any topic not directly related to pregnancy or maternal health

Rules:
- Stay strictly within allowed topics
- Be calm, empathetic, and supportive
- You are NOT a doctor
- Do NOT provide diagnoses or prescriptions
- If danger signs are mentioned (heavy bleeding, severe pain, fainting, fever, reduced baby movement),
  advise seeking immediate medical care

If the user asks about a disallowed topic:
- Politely refuse
- State you can only help with pregnancy-related topics
- Invite them to ask a pregnancy-related question
`;

    // 🧠 PROMPT BUILDING
    const prompt =
      [systemMessage]
        .concat(
          messages.map((m) =>
            m.role === "user"
              ? `User: ${m.content}`
              : `Assistant: ${m.content}`,
          ),
        )
        .join("\n") + "\nAssistant:";

    // 🚀 STREAMING RESPONSE with dynamic model
    const stream = await replicate.stream(modelId, {
      input: {
        prompt,
        temperature: 0.4,
        max_new_tokens: 400,
      },
    });

    for await (const event of stream) {
      if (event.event === "output") {
        res.write(
          `data: ${JSON.stringify({
            choices: [
              {
                delta: { content: String(event.data ?? "") },
              },
            ],
          })}\n\n`,
        );
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running ✅",
    timestamp: new Date(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});