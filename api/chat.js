// Vercel Serverless Function - 代理 Coze API
const COZE_API_URL = 'https://api.coze.cn/v3/chat';
const BOT_ID = '7598089557539618858';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, userId } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.COZE_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'COZE_API_KEY not configured' });
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
      console.error('Coze API error:', errorText);
      return res.status(response.status).json({ error: 'Coze API error', details: errorText });
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
      console.log('Coze response:', JSON.stringify(data, null, 2));
      aiResponse = '抱歉，我暂时无法回复。请稍后再试。';
    }

    return res.status(200).json({ 
      success: true, 
      message: aiResponse,
      raw: data
    });

  } catch (error) {
    console.error('Error calling Coze API:', error);
    return res.status(500).json({ error: 'Failed to call Coze API' });
  }
}
