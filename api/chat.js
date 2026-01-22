export const config = {
  runtime: 'edge',
};

const COZE_API_URL = 'https://api.coze.cn/v3/chat';
const BOT_ID = '7598089557539618858';

export default async function handler(request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { message, userId } = await request.json();

  if (!message) {
    return new Response(JSON.stringify({ error: 'Message is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.COZE_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'COZE_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(COZE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        user_id: userId || `user_${Date.now()}`,
        stream: false,
        additional_messages: [
          {
            content: message,
            content_type: 'text',
            role: 'user',
            type: 'question',
          },
        ],
        parameters: {},
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: 'Coze API error', details: errorText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    let aiResponse = '';
    
    if (data.data && data.data.messages) {
      const assistantMessage = data.data.messages.find(
        (msg) => msg.role === 'assistant' && msg.type === 'answer'
      );
      if (assistantMessage) {
        aiResponse = assistantMessage.content;
      }
    } else if (data.messages) {
      const assistantMessage = data.messages.find(
        (msg) => msg.role === 'assistant' && msg.type === 'answer'
      );
      if (assistantMessage) {
        aiResponse = assistantMessage.content;
      }
    }

    if (!aiResponse) {
      aiResponse = '抱歉，我暂时无法回复。请稍后再试。';
    }

    return new Response(JSON.stringify({ success: true, message: aiResponse }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to call Coze API' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
