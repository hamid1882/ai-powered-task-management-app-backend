const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Get task suggestions
// @route   GET /api/suggestions
// @access  Private
exports.getTaskSuggestions = async (req, res) => {
  try {
    const currentTime = new Date().toISOString();
    const prompt = `Generate 5 different developer tasks (${currentTime}). Return only plain tasks, one per line, without any numbers or bullet points. Each task should be 3-4 words, focusing on common programming tasks. Example format:
Update API documentation
Fix database queries
Implement user authentication`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: prompt
      }],
      max_tokens: 200,
      temperature: 0.9,  // Increased for more randomness
      presence_penalty: 0.6,  // Added to encourage different responses
      frequency_penalty: 0.6,  // Added to discourage repetition
      n: 1
    });

    const suggestions = completion.choices[0].message.content
      .split('\n')
      .filter(suggestion => suggestion.trim() !== '')
      .slice(0, 5);

    res.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({ message: 'Error generating suggestions', error: error.message });
  }
};