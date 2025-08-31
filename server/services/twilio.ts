import { Router } from 'express';
import { OpenAI } from 'openai';
import twilio from 'twilio';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Store active calls (in production, use Redis or database)
const activeCalls = new Map();

// API to initiate a call
router.post('/api/call/initiate', async (req, res) => {
  try {
    const { phoneNumber, problem } = req.body;

    if (!phoneNumber || !problem) {
      return res.status(400).json({ error: 'Phone number and problem are required' });
    }

    // Generate AI response for the initial greeting
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `You are an AI coding coach specializing in Data Structures and Algorithms. 
        You are about to call a student to help them with a coding problem. Be enthusiastic, 
        encouraging, and professional. Start by introducing yourself and asking about the problem.`
      }, {
        role: "user",
        content: `The student needs help with: ${problem}`
      }],
      max_tokens: 100,
    });

    const greeting = aiResponse.choices[0]?.message?.content || 
      "Hello! I'm your AI coding coach. How can I help you with your DSA problem today?";

    // Store the problem for the call
    activeCalls.set(phoneNumber, { problem, conversation: [] });

    // Make the call using Twilio
    const call = await client.calls.create({
      twiml: `
        <Response>
          <Say voice="woman" language="en-IN" rate="fast">
            ${greeting}
          </Say>
          <Record 
            action="/api/call/handle-response" 
            method="POST" 
            maxLength="10" 
            playBeep="true"
            transcribe="true"
            transcribeCallback="/api/call/transcribe"
          />
        </Response>
      `,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback: '/api/call/status',
      statusCallbackMethod: 'POST'
    });

    res.json({ 
      success: true, 
      callSid: call.sid,
      message: 'Call initiated successfully' 
    });

  } catch (error) {
    console.error('Call initiation error:', error);
    res.status(500).json({ error: 'Failed to initiate call' });
  }
});

// Handle user's voice response
router.post('/api/call/handle-response', async (req, res) => {
  try {
    const { From, RecordingUrl } = req.body;
    const phoneNumber = From;

    // Get conversation context
    const callData = activeCalls.get(phoneNumber) || { problem: '', conversation: [] };

    // Process the recording and continue conversation
    const twiml = new twilio.twiml.VoiceResponse();
    
    twiml.say({ voice: 'woman', language: 'en-IN', rate: 'fast' }, 
      "Thank you for explaining. Let me think about how to approach this..."
    );

    twiml.redirect('/api/call/process-recording');

    res.type('text/xml');
    res.send(twiml.toString());

  } catch (error) {
    console.error('Response handling error:', error);
    res.status(500).send('<Response><Say>Sorry, I encountered an error.</Say></Response>');
  }
});

// Process recording and generate AI response
router.post('/api/call/process-recording', async (req, res) => {
  try {
    const { From } = req.body;
    const phoneNumber = From;

    // In real implementation, you'd process the recording here
    // For now, we'll simulate with the original problem

    const callData = activeCalls.get(phoneNumber);
    if (!callData) {
      return res.status(404).send('<Response><Say>Call data not found.</Say></Response>');
    }

    // Generate AI response
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `You are an AI coding coach having a phone conversation about Data Structures and Algorithms.
        Be conversational, enthusiastic, and provide step-by-step guidance. Speak naturally.`
      }, {
        role: "user",
        content: `Student needs help with: ${callData.problem}. They just explained their approach.`
      }],
      max_tokens: 150,
    });

    const response = aiResponse.choices[0]?.message?.content;

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say({ voice: 'woman', language: 'en-IN', rate: 'fast' }, response);
    twiml.pause({ length: 2 });
    twiml.say("Would you like me to explain any part in more detail?");
    twiml.record({
      action: '/api/call/handle-response',
      maxLength: '10',
      playBeep: true
    });

    res.type('text/xml');
    res.send(twiml.toString());

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).send('<Response><Say>Sorry, I need to end the call now.</Say><Hangup/></Response>');
  }
});

// Call status updates
router.post('/api/call/status', (req, res) => {
  const { CallStatus, From } = req.body;
  console.log(`Call ${CallStatus} for ${From}`);
  
  if (CallStatus === 'completed' || CallStatus === 'failed') {
    activeCalls.delete(From);
  }
  
  res.status(200).end();
});

export default router;