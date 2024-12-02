import { prisma } from "../../../../lib/prisma";// Adjust the path to your prisma client file.

export async function POST(req) {
  try {
    const { name, country, experienceRate, feedback } = await req.json();

    // Validate required fields
    if (!name || !country || !experienceRate || !feedback) {
      return new Response('All fields are required', { status: 400 });
    }

    // Save feedback to the database
    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        country,
        experienceRate: parseInt(experienceRate),
        feedback,
      },
    });

    return new Response(JSON.stringify(newFeedback), { status: 201 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return new Response('Failed to submit feedback', { status: 500 });
  }
}
