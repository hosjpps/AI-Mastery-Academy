-- Add content to Foundation Track quests
-- This migration adds theory and practice content to existing quests

-- Quest 1: What is AI?
UPDATE quests SET content = '{
  "theory": "<h2>What is Artificial Intelligence?</h2><p>Artificial Intelligence (AI) is the simulation of human intelligence in machines. These systems are designed to think, learn, and make decisions like humans do.</p><h3>Types of AI</h3><ul><li><strong>Narrow AI (Weak AI)</strong> - Designed for specific tasks like Siri, ChatGPT, or recommendation systems</li><li><strong>General AI (Strong AI)</strong> - Hypothetical AI that could perform any intellectual task a human can (doesn''t exist yet)</li><li><strong>Superintelligent AI</strong> - AI that surpasses human intelligence (theoretical)</li></ul><h3>How AI Works</h3><p>Modern AI systems, especially Large Language Models (LLMs), are trained on massive amounts of text data. They learn patterns in language and can generate human-like responses. Key concepts:</p><ul><li><strong>Machine Learning</strong> - Systems that improve through experience</li><li><strong>Neural Networks</strong> - Computing systems inspired by biological brains</li><li><strong>Training Data</strong> - The information used to teach AI systems</li></ul><h3>Popular AI Tools</h3><p>You''ve probably already used AI without realizing it:</p><ul><li>ChatGPT, Claude, Gemini - Conversational AI</li><li>DALL-E, Midjourney - Image generation</li><li>GitHub Copilot - Code assistance</li><li>Grammarly - Writing assistance</li></ul>",
  "practice": {
    "instructions": "<p>Now it''s your turn to explore! Your task is to have a conversation with an AI assistant (like ChatGPT or Claude) and reflect on the experience.</p><h3>Steps:</h3><ol><li>Open an AI chat tool (ChatGPT, Claude, or similar)</li><li>Ask it 3 different types of questions:<ul><li>A factual question (e.g., \"What is the capital of France?\")</li><li>A creative request (e.g., \"Write a haiku about coding\")</li><li>An opinion question (e.g., \"What do you think about remote work?\")</li></ul></li><li>Observe how it responds to each type</li></ol><h3>Submit your reflection:</h3><p>Write 2-3 sentences about what surprised you or what you learned from this interaction.</p>",
    "hints": [
      "Notice how AI responds differently to factual vs. creative questions",
      "Pay attention to how AI handles opinion questions - does it give a direct opinion?",
      "Try asking follow-up questions to see how it maintains context"
    ],
    "examples": [
      "I was surprised that the AI could write a creative haiku but was careful not to express personal opinions on the remote work question."
    ]
  }
}'::jsonb
WHERE slug = 'what-is-ai';

-- Quest 2: Your First Prompt
UPDATE quests SET content = '{
  "theory": "<h2>Introduction to Prompts</h2><p>A <strong>prompt</strong> is the instruction or question you give to an AI system. The quality of your prompt directly affects the quality of the AI''s response.</p><h3>Why Prompts Matter</h3><p>Think of prompts like giving directions to someone. The clearer and more specific your directions, the better the result. Compare these:</p><ul><li><strong>Vague:</strong> \"Write something about dogs\"</li><li><strong>Better:</strong> \"Write a 100-word paragraph about why golden retrievers make great family pets\"</li></ul><h3>Basic Prompt Structure</h3><p>A good prompt typically includes:</p><ol><li><strong>Task</strong> - What you want the AI to do</li><li><strong>Context</strong> - Background information</li><li><strong>Format</strong> - How you want the output</li><li><strong>Constraints</strong> - Any limitations or requirements</li></ol><h3>Example Breakdown</h3><p>\"Write a professional email (task) to my boss (context) requesting time off next Friday (more context). Keep it under 100 words (constraint) and include a greeting and sign-off (format).\"</p><h3>Common Mistakes</h3><ul><li>Being too vague</li><li>Not specifying the format you want</li><li>Asking multiple unrelated things at once</li><li>Not providing enough context</li></ul>",
  "practice": {
    "instructions": "<p>Practice writing clear prompts by completing this exercise:</p><h3>Task:</h3><p>Write a prompt that would generate a short product description for an imaginary product of your choice.</p><h3>Requirements:</h3><ul><li>Include the product name and type</li><li>Specify the target audience</li><li>Define the tone (professional, fun, luxury, etc.)</li><li>Set a word limit</li></ul><p>Submit your prompt below. Don''t worry about running it - focus on crafting a clear, complete prompt.</p>",
    "hints": [
      "Start with the action: 'Write a product description for...'",
      "Add context: who is the target customer?",
      "Specify tone and length to constrain the output"
    ],
    "examples": [
      "Write a fun, energetic product description for 'CloudWalk' - wireless earbuds designed for teenage athletes. Highlight the sweat-proof design and 12-hour battery life. Keep it under 75 words."
    ]
  }
}'::jsonb
WHERE slug = 'your-first-prompt';

-- Quest 3: Prompt Structure
UPDATE quests SET content = '{
  "theory": "<h2>Mastering Prompt Structure</h2><p>Great prompts follow patterns. Learning these patterns will dramatically improve your AI interactions.</p><h3>The RICE Framework</h3><p>Use this framework to structure your prompts:</p><ul><li><strong>R - Role</strong>: Tell AI who to be (\"You are an expert copywriter...\")</li><li><strong>I - Instructions</strong>: Clear task description</li><li><strong>C - Context</strong>: Background information needed</li><li><strong>E - Examples</strong>: Show what you want (optional but powerful)</li></ul><h3>Role Assignment</h3><p>Giving AI a role changes its perspective and expertise:</p><ul><li>\"You are a senior software engineer...\" - Gets technical responses</li><li>\"You are a kindergarten teacher...\" - Gets simple explanations</li><li>\"You are a marketing expert...\" - Gets persuasive content</li></ul><h3>Using Examples (Few-Shot Prompting)</h3><p>Showing examples teaches AI your desired style:</p><pre>Convert these titles to clickbait style:\n\nOriginal: \"How to Save Money\"\nClickbait: \"This ONE Trick Will 10x Your Savings!\"\n\nOriginal: \"Best Recipes for Dinner\"\nClickbait: [AI completes this]</pre><h3>Step-by-Step Instructions</h3><p>For complex tasks, break them into steps:</p><pre>Please help me write a blog post:\n1. First, create an outline with 5 sections\n2. Then write a catchy introduction\n3. Develop each section with 2-3 paragraphs\n4. End with a call to action</pre>",
  "practice": {
    "instructions": "<p>Apply the RICE framework to create a structured prompt.</p><h3>Scenario:</h3><p>You need to create social media content for a local coffee shop called \"Bean There\".</p><h3>Your Task:</h3><p>Write a prompt using all 4 elements of RICE:</p><ul><li><strong>Role</strong>: Who should the AI be?</li><li><strong>Instructions</strong>: What exactly should it create?</li><li><strong>Context</strong>: What does it need to know about the coffee shop?</li><li><strong>Example</strong>: Provide a sample post style</li></ul><p>Submit your complete structured prompt below.</p>",
    "hints": [
      "For Role, think about what type of expert would write great social media content",
      "For Context, imagine details like: cozy atmosphere, specialty lattes, open mic nights",
      "For Example, write one sample post to show the tone you want"
    ],
    "examples": [
      "Role: You are a social media manager for trendy local businesses.\n\nInstructions: Create 3 Instagram post captions for Bean There coffee shop.\n\nContext: Bean There is a cozy neighborhood coffee shop known for creative latte art, locally sourced beans, and hosting weekly open mic nights on Fridays.\n\nExample style: \"Monday mood: watching our barista turn your latte into a masterpiece. What design should we try next? Drop your ideas below!\""
    ]
  }
}'::jsonb
WHERE slug = 'prompt-structure';

-- Quest 4: Context is King
UPDATE quests SET content = '{
  "theory": "<h2>The Power of Context</h2><p>Context is the secret ingredient that transforms generic AI responses into exactly what you need. Without context, AI has to guess what you mean.</p><h3>What is Context?</h3><p>Context includes:</p><ul><li><strong>Background information</strong> - The situation or scenario</li><li><strong>Your goal</strong> - What you''re trying to achieve</li><li><strong>Constraints</strong> - Limitations or requirements</li><li><strong>Audience</strong> - Who will see/use the output</li><li><strong>Tone</strong> - How it should feel</li></ul><h3>Context in Action</h3><p>Compare these prompts:</p><p><strong>Without context:</strong><br/>\"Write an email about a meeting\"</p><p><strong>With context:</strong><br/>\"Write a friendly but professional email to my team of 5 developers. We need to reschedule tomorrow''s sprint planning meeting from 10am to 2pm due to a client call. Keep it brief and include an apology for the short notice.\"</p><h3>The 5W1H Method</h3><p>Use journalism''s classic questions to add context:</p><ul><li><strong>Who</strong> - Who is involved? Who is the audience?</li><li><strong>What</strong> - What needs to happen?</li><li><strong>When</strong> - Any time constraints?</li><li><strong>Where</strong> - Physical or virtual location?</li><li><strong>Why</strong> - The purpose or goal</li><li><strong>How</strong> - Any specific approach or style?</li></ul><h3>Context Loading</h3><p>For complex tasks, \"load\" context first:</p><pre>I''m building a fitness app for busy professionals aged 30-45. The app focuses on quick 15-minute workouts that can be done at home with no equipment. Our brand voice is motivating but not pushy, like a supportive friend.\n\nWith this context in mind, write 5 push notification messages...</pre>",
  "practice": {
    "instructions": "<p>Practice adding rich context to improve AI outputs.</p><h3>Scenario:</h3><p>You need AI to help write a cover letter, but you only have this vague prompt:</p><p><em>\"Write a cover letter for a job\"</em></p><h3>Your Task:</h3><p>Rewrite this prompt with full context. Include:</p><ul><li>The specific job you''re applying for</li><li>The company and what they do</li><li>Your relevant experience (make it up)</li><li>Why you want this specific job</li><li>The tone and length you want</li></ul>",
    "hints": [
      "Invent a specific job title and company - be detailed!",
      "Include 2-3 relevant skills or experiences",
      "Mention something specific about the company you admire",
      "Specify professional but enthusiastic tone"
    ],
    "examples": [
      "Write a cover letter for a Junior UX Designer position at Spotify. I''m a recent design graduate with 2 internships in mobile app design, and I''m passionate about music and creating intuitive user experiences. I especially admire Spotify''s personalized playlist features and would love to contribute to improving music discovery. Keep it under 300 words with a confident but humble tone."
    ]
  }
}'::jsonb
WHERE slug = 'context-is-king';

-- Quest 5: Output Formatting
UPDATE quests SET content = '{
  "theory": "<h2>Controlling AI Output Format</h2><p>One of the most powerful prompt techniques is specifying exactly how you want your output formatted. This saves time and ensures usability.</p><h3>Common Format Options</h3><ul><li><strong>Lists</strong> - Bullet points, numbered lists</li><li><strong>Tables</strong> - Structured data comparison</li><li><strong>JSON/Code</strong> - Machine-readable formats</li><li><strong>Markdown</strong> - Headers, bold, links</li><li><strong>Templates</strong> - Fill-in-the-blank structures</li></ul><h3>Format Specification Examples</h3><p><strong>For a list:</strong></p><pre>List 5 benefits of remote work.\nFormat: Numbered list with a brief explanation for each point.</pre><p><strong>For a table:</strong></p><pre>Compare Python and JavaScript.\nFormat as a table with columns: Feature, Python, JavaScript</pre><p><strong>For JSON:</strong></p><pre>Create a product listing.\nReturn as JSON with fields: name, price, description, category</pre><h3>Length Control</h3><ul><li>\"In 2-3 sentences...\"</li><li>\"Write a 500-word article...\"</li><li>\"Give me a one-paragraph summary...\"</li><li>\"List exactly 10 items...\"</li></ul><h3>Structure Templates</h3><p>Provide a template for consistent outputs:</p><pre>Analyze this business idea using this structure:\n\n## Strengths\n[List 3 strengths]\n\n## Weaknesses\n[List 3 weaknesses]\n\n## Recommendation\n[One paragraph summary]</pre>",
  "practice": {
    "instructions": "<p>Create a prompt that specifies exact output formatting.</p><h3>Scenario:</h3><p>You want AI to help you plan a weekly meal prep schedule.</p><h3>Your Task:</h3><p>Write a prompt that will generate a meal plan with these specific format requirements:</p><ul><li>Table format with days of the week</li><li>Columns for: Breakfast, Lunch, Dinner, Snack</li><li>Include calorie estimates</li><li>Add a shopping list at the end as bullet points</li></ul><p>Submit your formatted prompt.</p>",
    "hints": [
      "Start with what you want: 'Create a weekly meal plan...'",
      "Explicitly describe the table structure",
      "Mention any dietary preferences or restrictions",
      "Ask for the shopping list grouped by category (produce, dairy, etc.)"
    ],
    "examples": [
      "Create a 7-day healthy meal plan for someone trying to eat around 2000 calories per day.\n\nFormat as a table with:\n- Rows: Monday through Sunday\n- Columns: Breakfast | Lunch | Dinner | Snack | Approx. Calories\n\nPreferences: Include vegetarian options, avoid nuts.\n\nAt the end, provide a consolidated shopping list in bullet points, grouped by category (Produce, Protein, Dairy, Pantry)."
    ]
  }
}'::jsonb
WHERE slug = 'output-formatting';

-- Quest 6: Iterative Prompting
UPDATE quests SET content = '{
  "theory": "<h2>The Art of Iteration</h2><p>Great AI results rarely come from a single prompt. Iteration - refining and building on responses - is how experts get the best outputs.</p><h3>Why Iterate?</h3><ul><li>First outputs are often generic</li><li>AI doesn''t know your preferences yet</li><li>Complex tasks need multiple steps</li><li>Refinement leads to perfection</li></ul><h3>Iteration Techniques</h3><h4>1. Refinement Requests</h4><pre>Initial: \"Write a tagline for a fitness app\"\nAI: \"Get Fit, Stay Strong\"\n\nIteration: \"Make it more playful and add a sense of community\"</pre><h4>2. Expansion/Compression</h4><pre>\"Expand point #3 with more detail\"\n\"Condense this to half the length\"\n\"Give me just the key takeaways\"</pre><h4>3. Style Adjustment</h4><pre>\"Rewrite this in a more casual tone\"\n\"Make it sound more professional\"\n\"Add humor while keeping the information accurate\"</pre><h4>4. Perspective Shifts</h4><pre>\"Now write this from the customer''s perspective\"\n\"How would a skeptic respond to this?\"\n\"Reframe this for a technical audience\"</pre><h3>Building Conversations</h3><p>Use follow-up prompts to build on context:</p><pre>You: \"Explain blockchain\"\nAI: [gives explanation]\nYou: \"Now explain it like I''m 10 years old\"\nAI: [simpler explanation]\nYou: \"Great! Now give me 3 real-world examples\"</pre>",
  "practice": {
    "instructions": "<p>Practice iterative prompting through a multi-step exercise.</p><h3>Your Task:</h3><p>You''re creating a LinkedIn post about a professional achievement. Go through these steps:</p><ol><li><strong>Step 1:</strong> Write an initial prompt asking AI to create a LinkedIn post about getting a promotion/new job/completing a big project (pick one)</li><li><strong>Step 2:</strong> Write a follow-up prompt to refine the tone</li><li><strong>Step 3:</strong> Write another follow-up to add or remove something specific</li></ol><p>Submit all 3 prompts in sequence, showing your iteration process.</p>",
    "hints": [
      "Start simple, then refine based on what you imagine the AI might produce",
      "Common refinements: adjust length, change tone, add call-to-action",
      "Think about what might be missing after each step"
    ],
    "examples": [
      "Step 1: Write a LinkedIn post announcing that I just got promoted to Senior Product Manager after 2 years at TechCorp.\n\nStep 2: The tone is too formal. Make it more personal and authentic - I want to thank my team and share one lesson I learned.\n\nStep 3: Add a question at the end to encourage engagement, and include 3-4 relevant hashtags."
    ]
  }
}'::jsonb
WHERE slug = 'iterative-prompting';

-- Add more quests if they exist with similar pattern...
-- Quest 7-10 can be added similarly

-- Update any quests that might have NULL content
UPDATE quests SET content = '{
  "theory": "<h2>Coming Soon</h2><p>This quest content is being developed. Check back soon for the full lesson!</p><p>In the meantime, explore other quests in the Foundation track.</p>",
  "practice": {
    "instructions": "<p>Content coming soon. For now, share what you''d like to learn about this topic.</p>",
    "hints": ["Think about what questions you have about this topic"],
    "examples": []
  }
}'::jsonb
WHERE content IS NULL AND is_published = true;
