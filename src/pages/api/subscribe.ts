export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), {
        status: 400,
      });
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    const listId = import.meta.env.BREVO_LIST_ID ? parseInt(import.meta.env.BREVO_LIST_ID) : undefined;

    if (!apiKey) {
      console.error('BREVO_API_KEY is not defined');
      return new Response(JSON.stringify({ message: 'Server configuration error' }), {
        status: 500,
      });
    }

    const payload: any = {
      email,
      updateEnabled: false,
    };

    if (listId) {
      payload.listIds = [listId];
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle "Contact already exists" specifically if possible, or generic error
      if (errorData.code === 'duplicate_parameter') {
         return new Response(JSON.stringify({ message: 'You are already subscribed!' }), {
          status: 409,
        });
      }

      console.error('Brevo API Error:', errorData);
      return new Response(JSON.stringify({ message: 'Failed to subscribe. Please try again.' }), {
        status: response.status,
      });
    }

    return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), {
      status: 200,
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
};
