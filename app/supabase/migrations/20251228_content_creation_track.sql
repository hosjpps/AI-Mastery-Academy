-- =============================================
-- Content Creation Track - 25 Quests
-- =============================================

-- First, add subtracks for Content Creation
INSERT INTO subtracks (track_id, slug, title, description, icon, order_index) VALUES
((SELECT id FROM tracks WHERE slug = 'content-creation'), 'text-generation', 'Text Generation', 'Master AI-powered writing for blogs, social media, and marketing', '✍️', 0),
((SELECT id FROM tracks WHERE slug = 'content-creation'), 'image-generation', 'Image Generation', 'Create stunning visuals with AI image tools', '🎨', 1),
((SELECT id FROM tracks WHERE slug = 'content-creation'), 'presentations-design', 'Presentations & Design', 'Build professional presentations and designs with AI', '📊', 2);

-- =============================================
-- TEXT GENERATION SUBTRACK (8 quests)
-- =============================================

-- Quest 1: Blog Writing Basics
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'blog-writing-basics',
'Blog Writing with AI',
'Learn to create engaging blog posts using AI assistance',
'beginner', 15, 100, 'lesson', 0, true,
'{
  "theory": "<h2>AI-Powered Blog Writing</h2><p>AI can be your ultimate writing partner for blog content. Learn how to leverage it effectively while maintaining your unique voice.</p><h3>When to Use AI for Blogging</h3><ul><li><strong>Brainstorming</strong> - Generate topic ideas and angles</li><li><strong>Outlining</strong> - Create structured content plans</li><li><strong>Drafting</strong> - Get a first draft to refine</li><li><strong>Editing</strong> - Improve clarity and flow</li><li><strong>SEO</strong> - Optimize for search engines</li></ul><h3>The Human-AI Collaboration</h3><p>Best results come from combining AI capabilities with human creativity:</p><ol><li>You provide the expertise and unique insights</li><li>AI helps structure and expand your ideas</li><li>You edit and add your personal voice</li><li>AI helps polish and optimize</li></ol><h3>Blog Post Structure Prompt</h3><pre>Write a blog post outline about [topic] for [audience].\n\nInclude:\n- Attention-grabbing headline options (3)\n- Introduction hook\n- 5-7 main sections with subpoints\n- Conclusion with call-to-action\n- Meta description for SEO</pre><h3>Voice and Tone Tips</h3><p>Always specify your brand voice in prompts:</p><ul><li>\"Write in a conversational, friendly tone\"</li><li>\"Use a professional but approachable style\"</li><li>\"Be witty and use pop culture references\"</li></ul>",
  "practice": {
    "instructions": "<p>Create a prompt for an AI-assisted blog post.</p><h3>Scenario:</h3><p>You run a blog about productivity and want to write about morning routines.</p><h3>Your Task:</h3><p>Write a detailed prompt that would generate a blog post outline with:</p><ul><li>3 headline options</li><li>Target audience specified</li><li>Your unique angle (what makes this different from other morning routine articles)</li><li>Desired tone and length</li></ul>",
    "hints": [
      "Specify your unique angle - maybe you focus on night owls, or busy parents",
      "Include your target word count (1000-1500 words is typical)",
      "Mention any specific tips or methods you want included"
    ],
    "examples": [
      "Write a blog post outline about ''Morning Routines for Night Owls Who Hate Mornings'' targeting young professionals aged 25-35.\n\nUnique angle: Practical tips that don''t require waking up at 5am.\n\nInclude:\n- 3 catchy headline options\n- Introduction that acknowledges the struggle\n- 5 main sections with actionable tips\n- Conclusion with a ''start small'' message\n- SEO meta description\n\nTone: Funny, relatable, encouraging. No toxic positivity.\nLength: Outline for a 1200-word post."
    ]
  }
}'::jsonb);

-- Quest 2: Social Media Mastery
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'social-media-mastery',
'Social Media Content',
'Create scroll-stopping social media posts with AI',
'beginner', 15, 100, 'practice', 1, true,
'{
  "theory": "<h2>AI for Social Media Content</h2><p>Social media requires quick, engaging content at scale. AI is perfect for this - but you need to guide it well.</p><h3>Platform-Specific Prompting</h3><p>Each platform has unique requirements:</p><ul><li><strong>Twitter/X</strong> - Concise, punchy, hashtag-aware (280 chars)</li><li><strong>LinkedIn</strong> - Professional, value-driven, longer form</li><li><strong>Instagram</strong> - Visual focus, emoji-friendly, hashtag strategy</li><li><strong>TikTok</strong> - Trendy, casual, hook-focused</li></ul><h3>The Hook Formula</h3><p>Great social posts start with a hook:</p><ul><li>\"Most people don''t know this, but...\"</li><li>\"I made $X doing Y. Here''s how:\"</li><li>\"Stop doing [common mistake]\"</li><li>\"The #1 thing I wish I knew about...\"</li></ul><h3>Batch Content Creation</h3><p>Create multiple posts at once:</p><pre>Create a week of LinkedIn posts for a marketing consultant.\n\nTopics: Personal branding, networking, AI tools, career advice\n\nFormat for each:\n- Hook (first line that makes people click ''see more'')\n- 3-5 value points\n- Call to action\n- 3 relevant hashtags\n\nTone: Professional but personable</pre><h3>Repurposing Content</h3><p>AI excels at transforming content across platforms:</p><pre>Take this blog post and create:\n1. A Twitter thread (8-10 tweets)\n2. A LinkedIn post\n3. 5 Instagram carousel slide titles\n4. A TikTok script hook</pre>",
  "practice": {
    "instructions": "<p>Create a multi-platform content prompt.</p><h3>Scenario:</h3><p>You''re launching a new online course about freelancing. You need content for multiple platforms.</p><h3>Your Task:</h3><p>Write a prompt that generates:</p><ul><li>1 LinkedIn post (professional, value-focused)</li><li>1 Twitter/X thread (5 tweets)</li><li>3 Instagram caption options</li></ul><p>All should promote the course launch while providing genuine value.</p>",
    "hints": [
      "Give context about the course (topic, who it''s for, key benefit)",
      "Specify different tones for each platform",
      "Include hooks and calls-to-action"
    ],
    "examples": [
      "I''m launching ''Freelance Freedom'' - an online course teaching professionals how to transition from 9-5 to freelancing.\n\nTarget audience: Professionals aged 28-40 feeling stuck in corporate jobs\nKey benefit: Step-by-step roadmap to replace your salary in 6 months\n\nCreate:\n\n1. LinkedIn post\n- Start with a personal story hook\n- Share 3 lessons from my freelance journey\n- Soft mention of course launch\n- End with question for engagement\n\n2. Twitter thread (5 tweets)\n- Tweet 1: Bold hook about corporate life\n- Tweets 2-4: Key tips from the course\n- Tweet 5: Course launch CTA with link placeholder\n\n3. Instagram captions (3 options)\n- Emotional/inspirational version\n- Practical/tips version\n- Behind-the-scenes/personal version\n\nInclude relevant hashtags and emojis for Instagram."
    ]
  }
}'::jsonb);

-- Quest 3: Email Marketing
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'email-marketing-ai',
'Email Marketing',
'Craft compelling emails that convert with AI help',
'intermediate', 20, 150, 'lesson', 2, true,
'{
  "theory": "<h2>AI-Powered Email Marketing</h2><p>Email remains the highest-ROI marketing channel. AI can help you write emails that actually get opened and clicked.</p><h3>Email Types & Prompts</h3><h4>1. Welcome Sequences</h4><pre>Write a 5-email welcome sequence for new subscribers to [business].\n\nEmail 1: Warm welcome + free resource delivery\nEmail 2: Our story and mission (day 2)\nEmail 3: Best content/products for beginners (day 4)\nEmail 4: Social proof and testimonials (day 7)\nEmail 5: Special offer for new subscribers (day 10)\n\nTone: Friendly, helpful, not salesy\nEach email: Subject line + preview text + body (150 words max)</pre><h4>2. Sales Emails</h4><pre>Write a sales email for [product] using the PAS framework:\n- Problem: What pain point does this solve?\n- Agitation: Why is this problem urgent?\n- Solution: How does our product help?\n\nInclude: 3 subject line options, compelling CTA</pre><h4>3. Newsletter Content</h4><pre>Create a weekly newsletter template with:\n- Engaging subject line\n- Personal intro (2-3 sentences)\n- Main story/tip of the week\n- 3 quick links/resources\n- Community spotlight\n- Sign-off with personality</pre><h3>Subject Line Optimization</h3><p>AI can generate and test subject lines:</p><ul><li>Ask for 10 variations of different styles</li><li>Request A/B test pairs</li><li>Specify length constraints</li><li>Include power words and urgency</li></ul>",
  "practice": {
    "instructions": "<p>Create an email marketing prompt.</p><h3>Scenario:</h3><p>You run an online bookshop and want to re-engage customers who haven''t purchased in 3 months.</p><h3>Your Task:</h3><p>Write a prompt for a win-back email campaign that:</p><ul><li>Acknowledges their absence warmly (not guilt-tripping)</li><li>Shares what''s new (new arrivals, features)</li><li>Offers an incentive to return</li><li>Creates urgency without being pushy</li></ul>",
    "hints": [
      "Include your brand voice (bookish, cozy, intellectual?)",
      "Specify the incentive clearly (discount, free shipping, etc.)",
      "Ask for multiple subject line options to test"
    ],
    "examples": [
      "Write a win-back email for ''PageTurner Books'' - an online indie bookshop targeting book lovers aged 25-45.\n\nContext: Customer hasn''t purchased in 3+ months\nOffer: 20% off next order + free bookmark\nExpires: 7 days\n\nTone: Warm, bookish, like a letter from a friend who runs a bookshop\n\nInclude:\n- 5 subject line options (mix of curiosity, offer-focused, personal)\n- Preview text\n- Body: Personal greeting, ''we miss you'' message (not guilt-trippy), what''s new (mention 2-3 trending books), the offer, soft urgency, warm sign-off\n- CTA button text options\n\nLength: Under 200 words for the body"
    ]
  }
}'::jsonb);

-- Quest 4: Copywriting Formulas
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'copywriting-formulas',
'Copywriting Formulas',
'Master proven copywriting frameworks with AI',
'intermediate', 20, 150, 'lesson', 3, true,
'{
  "theory": "<h2>Classic Copywriting Formulas + AI</h2><p>The best copywriters use proven frameworks. Teaching these to AI produces consistently great copy.</p><h3>AIDA Framework</h3><ul><li><strong>A</strong>ttention - Grab their focus</li><li><strong>I</strong>nterest - Build curiosity</li><li><strong>D</strong>esire - Create want</li><li><strong>A</strong>ction - Tell them what to do</li></ul><pre>Write landing page copy for [product] using AIDA:\n\nAttention: Bold headline addressing main pain point\nInterest: 3 intriguing benefits/features\nDesire: Social proof + emotional benefits\nAction: Clear, compelling CTA\n\nProduct: [details]\nAudience: [details]</pre><h3>PAS Framework</h3><ul><li><strong>P</strong>roblem - Identify the pain</li><li><strong>A</strong>gitation - Make it worse</li><li><strong>S</strong>olution - Save the day</li></ul><h3>Before-After-Bridge</h3><ul><li><strong>Before</strong> - Current painful state</li><li><strong>After</strong> - Dream outcome</li><li><strong>Bridge</strong> - Your product/service</li></ul><h3>4 Ps Formula</h3><ul><li><strong>P</strong>romise - What you offer</li><li><strong>P</strong>icture - Paint the outcome</li><li><strong>P</strong>roof - Evidence it works</li><li><strong>P</strong>ush - Call to action</li></ul><h3>Pro Tip: Combine Frameworks</h3><pre>Use AIDA for the overall structure,\nPAS for the main body,\nand 4Ps for the CTA section.</pre>",
  "practice": {
    "instructions": "<p>Apply a copywriting formula with AI.</p><h3>Scenario:</h3><p>You''re writing a landing page for a productivity app called ''FocusFlow'' that blocks distracting websites.</p><h3>Your Task:</h3><p>Write a prompt using the PAS (Problem-Agitation-Solution) framework to create:</p><ul><li>Headline</li><li>Subheadline</li><li>3-4 paragraphs of body copy</li><li>Call-to-action</li></ul>",
    "hints": [
      "Clearly define the Problem (distraction, wasted time)",
      "Agitate with specific, relatable scenarios",
      "Position FocusFlow as the obvious solution"
    ],
    "examples": [
      "Write landing page copy for FocusFlow using the PAS framework.\n\nProduct: Browser extension that blocks distracting sites (social media, news, YouTube) during work hours. Users set ''focus sessions'' and the app blocks their chosen sites.\n\nTarget audience: Remote workers and students struggling with digital distraction\n\nPAS Structure:\n\nPROBLEM:\n- Headline addressing the distraction epidemic\n- Subhead with a painful stat or relatable statement\n\nAGITATION (2 paragraphs):\n- Paint the picture of lost hours\n- Career/academic consequences\n- The guilt and frustration cycle\n\nSOLUTION (2 paragraphs):\n- Introduce FocusFlow as the answer\n- Key features (customizable blocking, focus sessions, progress tracking)\n- Benefits (more done in less time, guilt-free breaks)\n\nCTA:\n- Compelling button text\n- Reduce friction (''Start free - no credit card'')\n\nTone: Understanding, not preachy. We''ve all been there."
    ]
  }
}'::jsonb);

-- Quest 5: Product Descriptions
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'product-descriptions',
'Product Descriptions',
'Write product descriptions that sell',
'beginner', 15, 100, 'practice', 4, true,
'{
  "theory": "<h2>Product Descriptions That Convert</h2><p>Great product descriptions combine information with emotion. AI can help you scale this without losing quality.</p><h3>The Anatomy of a Great Product Description</h3><ol><li><strong>Headline</strong> - Benefit-driven title</li><li><strong>Hook</strong> - Opening that creates desire</li><li><strong>Features</strong> - What it has/does</li><li><strong>Benefits</strong> - How it improves their life</li><li><strong>Social Proof</strong> - Why others love it</li><li><strong>CTA</strong> - What to do next</li></ol><h3>Features vs Benefits</h3><p>Always translate features into benefits:</p><ul><li>Feature: \"500GB storage\" → Benefit: \"Store 100,000 photos without ever deleting memories\"</li><li>Feature: \"Titanium frame\" → Benefit: \"Survives drops that would shatter other phones\"</li><li>Feature: \"24/7 support\" → Benefit: \"Help whenever you need it, even at 3am\"</li></ul><h3>Sensory Language</h3><p>For physical products, engage the senses:</p><ul><li>Sight: \"Gleaming chrome finish\"</li><li>Touch: \"Buttery-soft leather\"</li><li>Sound: \"Whisper-quiet motor\"</li><li>Smell: \"Notes of vanilla and cedar\"</li><li>Taste: \"Bold espresso with hints of chocolate\"</li></ul><h3>Batch Generation</h3><pre>Create product descriptions for these 5 items:\n[List products with key specs]\n\nFor each, provide:\n- SEO-friendly title (under 60 chars)\n- 100-word description\n- 5 bullet points (features as benefits)\n- Suggested keywords</pre>",
  "practice": {
    "instructions": "<p>Write a product description prompt.</p><h3>Scenario:</h3><p>You''re selling a premium mechanical keyboard called ''TypeForce Pro''.</p><h3>Product Details:</h3><ul><li>Hot-swappable switches</li><li>Aluminum frame</li><li>RGB backlighting</li><li>USB-C connection</li><li>Programmable keys</li><li>Price: $149</li></ul><h3>Your Task:</h3><p>Write a prompt for a product description targeting gaming enthusiasts and programmers.</p>",
    "hints": [
      "Convert each feature to a benefit",
      "Use sensory language (the sound, the feel)",
      "Address both target audiences in the description"
    ],
    "examples": [
      "Write a product description for TypeForce Pro mechanical keyboard.\n\nSpecs:\n- Hot-swappable switches\n- Aluminum frame\n- RGB backlighting with 16.8M colors\n- USB-C with braided cable\n- Full programmable keys via software\n- Price: $149\n\nTarget audiences: Gamers and programmers\n\nFormat:\n1. Headline (benefit-focused, under 10 words)\n2. Opening hook (1-2 sentences creating desire)\n3. Main description (100 words, sensory language)\n4. 5 bullet points (features → benefits)\n5. Closing line with subtle urgency\n\nTone: Premium, enthusiast, technical but accessible\n\nInclude sensory words: the satisfying click, the solid aluminum feel, the glow of RGB"
    ]
  }
}'::jsonb);

-- Quest 6: SEO Content
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'seo-content',
'SEO Content Creation',
'Create content that ranks on search engines',
'intermediate', 25, 175, 'lesson', 5, true,
'{
  "theory": "<h2>AI-Powered SEO Content</h2><p>AI can help you create search-optimized content at scale, but you need to guide it properly.</p><h3>SEO Content Types</h3><ul><li><strong>Pillar Pages</strong> - Comprehensive guides (2000+ words)</li><li><strong>Blog Posts</strong> - Targeted keyword articles</li><li><strong>FAQ Sections</strong> - Answer common questions</li><li><strong>Product Pages</strong> - Conversion-focused</li><li><strong>Meta Content</strong> - Titles, descriptions, alt text</li></ul><h3>Keyword-Focused Prompts</h3><pre>Write an SEO-optimized article about [topic].\n\nPrimary keyword: [main keyword]\nSecondary keywords: [keyword list]\nSearch intent: [informational/transactional/navigational]\n\nRequirements:\n- Use primary keyword in H1, first paragraph, 2-3 H2s\n- Include secondary keywords naturally\n- Write for humans first, search engines second\n- Include FAQ section with 5 common questions\n- Meta title (under 60 chars) and description (under 155 chars)</pre><h3>Content Structure for SEO</h3><ol><li>Compelling H1 with primary keyword</li><li>Hook paragraph (keyword in first 100 words)</li><li>Table of contents for long content</li><li>H2/H3 hierarchy with keywords</li><li>FAQ section (featured snippet opportunity)</li><li>Internal/external link suggestions</li></ol><h3>The E-E-A-T Factor</h3><p>Google values Experience, Expertise, Authoritativeness, Trust:</p><ul><li>Ask AI to include expert perspectives</li><li>Request citations and data points</li><li>Add ''About the Author'' section content</li></ul>",
  "practice": {
    "instructions": "<p>Create an SEO content brief.</p><h3>Scenario:</h3><p>You''re writing content for a plant shop website, targeting the keyword ''best indoor plants for beginners''.</p><h3>Your Task:</h3><p>Write a prompt that generates:</p><ul><li>SEO-optimized article outline</li><li>Meta title and description</li><li>5 FAQ questions with answers</li><li>Suggested internal linking opportunities</li></ul>",
    "hints": [
      "Specify the search intent (informational)",
      "Include secondary keywords like ''low maintenance plants'', ''easy houseplants''",
      "Ask for featured snippet-friendly formatting"
    ],
    "examples": [
      "Create an SEO content brief for an article about indoor plants for beginners.\n\nPrimary keyword: best indoor plants for beginners\nSecondary keywords: easy houseplants, low maintenance indoor plants, plants that don''t need much light, hard to kill plants\n\nSearch intent: Informational (people researching before buying)\n\nTarget length: 1500-2000 words\n\nCreate:\n\n1. Meta title (under 60 chars, keyword at start)\n2. Meta description (under 155 chars, includes CTA)\n3. Article outline:\n   - H1 (includes primary keyword)\n   - Introduction hook\n   - 6-8 H2 sections (include secondary keywords)\n   - Each H2 has 2-3 H3 subheadings\n4. FAQ section (5 questions - use ''People Also Ask'' style)\n5. Internal link opportunities (suggest 3-4 related page topics)\n6. CTA ideas for converting readers to customers\n\nNote: Include specific plant names (Pothos, Snake Plant, etc.) for long-tail keywords"
    ]
  }
}'::jsonb);

-- Quest 7: Script Writing
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'script-writing',
'Video & Podcast Scripts',
'Write engaging scripts for video and audio content',
'intermediate', 20, 150, 'practice', 6, true,
'{
  "theory": "<h2>AI-Assisted Script Writing</h2><p>Video and podcast content requires different writing skills than text. AI can help you write for the ear, not the eye.</p><h3>The Spoken Word Difference</h3><ul><li>Shorter sentences</li><li>Conversational language</li><li>Natural pauses built in</li><li>Repetition for emphasis</li><li>Questions to engage</li></ul><h3>YouTube Video Script Structure</h3><pre>Write a YouTube video script about [topic].\n\nHook (first 30 seconds):\n- Pattern interrupt or bold statement\n- Promise of value\n- Quick intro\n\nBody (organized sections):\n- Clear transitions\n- B-roll suggestions in [brackets]\n- Key points emphasized\n\nOutro:\n- Recap main points\n- CTA (subscribe, comment)\n- Teaser for next video\n\nInclude:\n- Suggested thumbnails\n- Title options (curiosity + keyword)\n- Description with timestamps</pre><h3>Podcast Episode Structure</h3><pre>Write a podcast script for [topic].\n\nInclude:\n- Cold open teaser (30 sec)\n- Intro music cue\n- Welcome + episode overview\n- Main content (3-4 segments)\n- Listener questions (suggest FAQs)\n- Outro + next episode teaser\n- Sponsor read placeholder</pre><h3>TikTok/Reels Scripts</h3><p>For short-form, the hook is everything:</p><pre>Write 5 TikTok script hooks for [topic].\n\nEach should be:\n- Under 3 seconds to say\n- Create curiosity or controversy\n- Lead into a 30-60 second explanation\n\nFormat: Hook | Main Point | CTA</pre>",
  "practice": {
    "instructions": "<p>Create a video script prompt.</p><h3>Scenario:</h3><p>You''re creating a YouTube video: ''5 AI Tools That Replaced My Entire Team''.</p><h3>Your Task:</h3><p>Write a prompt that generates:</p><ul><li>Hook (first 30 seconds)</li><li>Introduction</li><li>5 tool sections with transitions</li><li>Outro with CTA</li><li>3 thumbnail ideas</li></ul>",
    "hints": [
      "Specify your audience (solo entrepreneurs?)",
      "Ask for B-roll suggestions in brackets",
      "Include personality notes (humor level, energy)"
    ],
    "examples": [
      "Write a YouTube video script: ''5 AI Tools That Replaced My Entire Team''\n\nChannel style: Solo entrepreneur sharing real experiences, casual but informative, occasional humor\n\nTarget audience: Business owners, freelancers looking to scale without hiring\n\nDuration: 8-10 minutes\n\nStructure:\n\nHOOK (0-30 sec):\n- Bold claim that creates curiosity\n- Quick results preview\n- ''Stay until the end for the game-changer''\n\nINTRO (30-60 sec):\n- Channel intro\n- What we''ll cover\n- Quick credibility (''I''ve saved $X/month'')\n\nMAIN CONTENT (5 tools, ~90 sec each):\nFor each tool:\n- Name and one-line description\n- What team member it replaces\n- Quick demo suggestion [B-roll: screen recording of tool]\n- Cost vs hiring comparison\n- Transition hook to next tool\n\nOUTRO:\n- Recap with monthly savings total\n- ''If you could only pick one'' recommendation\n- CTA: Like, subscribe, comment which tool you''ll try\n- Teaser for related video\n\nAlso provide:\n- 3 thumbnail concepts (text, imagery)\n- 3 title options\n- 5-line description with timestamps"
    ]
  }
}'::jsonb);

-- Quest 8: Content Repurposing Boss Quest
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'text-generation'),
'content-repurposing-boss',
'Content Repurposing Master',
'Transform one piece of content into many formats',
'advanced', 30, 250, 'boss', 7, true,
'{
  "theory": "<h2>The Content Multiplication System</h2><p>One piece of quality content can become 10+ pieces across platforms. This is the secret to consistent content without burnout.</p><h3>The Content Waterfall</h3><ol><li><strong>Long-form content</strong> (blog post, podcast, video)</li><li><strong>Medium-form</strong> (newsletter, LinkedIn article)</li><li><strong>Short-form</strong> (social posts, threads)</li><li><strong>Micro-content</strong> (quotes, stats, tips)</li></ol><h3>The 1 → 10 Framework</h3><p>From one 2000-word blog post:</p><ul><li>1 YouTube video script</li><li>1 podcast episode outline</li><li>1 newsletter edition</li><li>1 LinkedIn article</li><li>1 Twitter/X thread (10 tweets)</li><li>5 LinkedIn posts (different angles)</li><li>10 Instagram carousel ideas</li><li>15 quote graphics</li><li>30 social media posts</li></ul><h3>Master Repurposing Prompt</h3><pre>I have this [content type] about [topic]:\n\n[Paste content or summary]\n\nRepurpose into:\n1. Twitter thread (8-10 tweets)\n2. LinkedIn post (professional angle)\n3. Instagram carousel (7 slides)\n4. Newsletter intro paragraph\n5. 5 quote graphics (text only)\n6. YouTube video hook\n7. Podcast talking points\n8. Pinterest pin description\n\nMaintain core message but adapt tone/format for each platform.</pre>",
  "practice": {
    "instructions": "<p>This is your Boss Quest! Demonstrate mastery of content repurposing.</p><h3>The Challenge:</h3><p>You''ve written a blog post: <strong>''The 5-Hour Workday: How I Doubled Productivity by Working Less''</strong></p><h3>Key Points:</h3><ul><li>Cutting from 8 to 5 hours forced prioritization</li><li>Parkinson''s Law: work expands to fill time</li><li>Deep work blocks vs. scattered tasks</li><li>The guilt phase and how to overcome it</li><li>Results: more output, less burnout</li></ul><h3>Your Task:</h3><p>Write a comprehensive prompt that repurposes this into at least 5 different content formats across different platforms.</p>",
    "hints": [
      "Think about which platforms favor which aspects of the story",
      "Personal story works great on LinkedIn",
      "Controversial takes work on Twitter",
      "How-to steps work on Instagram carousels"
    ],
    "examples": [
      "Repurpose my blog post ''The 5-Hour Workday: How I Doubled Productivity by Working Less'' into multiple content formats.\n\nCore message: Working fewer hours with intention beats working long hours with distraction.\n\nKey points:\n1. I cut from 8 to 5 hours and got more done\n2. Parkinson''s Law forces prioritization\n3. 3 deep work blocks > 8 scattered hours\n4. The guilt phase is real but temporary\n5. 6 months in: more output, zero burnout\n\n---\n\nCreate:\n\n1. TWITTER THREAD (10 tweets)\n- Tweet 1: Controversial hook (''I work 5 hours a day...'')\n- Tweets 2-8: Key insights with specific tactics\n- Tweet 9: Results\n- Tweet 10: CTA\n\n2. LINKEDIN POST\n- Personal story format\n- Professional angle (productivity, leadership)\n- End with question for engagement\n\n3. INSTAGRAM CAROUSEL (8 slides)\n- Slide 1: Hook title\n- Slides 2-7: One tip per slide\n- Slide 8: CTA\n\n4. YOUTUBE VIDEO HOOK (30 seconds)\n- Pattern interrupt opening\n- Promise of the video\n\n5. NEWSLETTER INTRO (100 words)\n- Personal + relatable\n- Teases the full article\n\n6. 5 QUOTE GRAPHICS\n- Pull the most shareable lines\n- Format for visual impact\n\n7. PODCAST TALKING POINTS\n- 15-minute episode structure\n- Stories and examples to include\n\n---\n\nPlatform-specific notes:\n- Twitter: More edgy/controversial\n- LinkedIn: Professional growth angle\n- Instagram: Visual, step-by-step\n- Podcast: Conversational, story-heavy"
    ]
  }
}'::jsonb);

-- =============================================
-- IMAGE GENERATION SUBTRACK (8 quests)
-- =============================================

-- Quest 1: Image AI Basics
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'image-ai-basics',
'Image AI Fundamentals',
'Understand how AI image generation works',
'beginner', 15, 100, 'lesson', 0, true,
'{
  "theory": "<h2>Introduction to AI Image Generation</h2><p>AI can now create stunning images from text descriptions. Understanding how it works helps you get better results.</p><h3>How It Works</h3><p>AI image models are trained on billions of images with text descriptions. They learn patterns between words and visual elements. When you give a prompt, the AI:</p><ol><li>Interprets your text</li><li>Starts with noise (random pixels)</li><li>Gradually refines toward your description</li><li>Produces the final image</li></ol><h3>Popular Tools</h3><ul><li><strong>Midjourney</strong> - Artistic, stylized images</li><li><strong>DALL-E 3</strong> - Great at following complex prompts</li><li><strong>Stable Diffusion</strong> - Open source, highly customizable</li><li><strong>Leonardo AI</strong> - Good for consistency</li><li><strong>Ideogram</strong> - Best for text in images</li></ul><h3>Basic Prompt Structure</h3><pre>[Subject] + [Setting] + [Style] + [Details] + [Technical Parameters]</pre><p>Example:</p><pre>A golden retriever puppy playing in autumn leaves, Central Park, warm sunlight, photorealistic, 8K resolution, shallow depth of field</pre><h3>What AI Can and Can''t Do</h3><p><strong>Great at:</strong></p><ul><li>Creative concepts and artistic styles</li><li>Generating variations quickly</li><li>Combining unexpected elements</li></ul><p><strong>Struggles with:</strong></p><ul><li>Specific text and numbers</li><li>Exact counts of objects</li><li>Hands and fingers (improving!)</li><li>Specific real people''s faces</li></ul>",
  "practice": {
    "instructions": "<p>Create your first image generation prompt.</p><h3>Your Task:</h3><p>Write a detailed prompt for generating a professional headshot-style image that could be used as a social media profile picture.</p><h3>Requirements:</h3><ul><li>Describe the subject (appearance, expression, clothing)</li><li>Specify the background</li><li>Define the style and quality</li><li>Include lighting details</li></ul>",
    "hints": [
      "Think about colors, mood, and atmosphere",
      "Specify camera angle (front-facing, slight angle)",
      "Include quality modifiers (professional, high resolution)"
    ],
    "examples": [
      "Professional headshot portrait of a confident woman in her 30s, warm smile, wearing a navy blue blazer, minimal makeup, soft neutral gray background, studio lighting with key light from the left, shallow depth of field, professional photography, 85mm lens, warm color grading, corporate yet approachable, high resolution"
    ]
  }
}'::jsonb);

-- Quest 2: Prompt Engineering for Images
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'image-prompt-engineering',
'Visual Prompt Engineering',
'Master the art of describing images to AI',
'beginner', 20, 125, 'lesson', 1, true,
'{
  "theory": "<h2>Mastering Visual Prompts</h2><p>The difference between amateur and professional AI images is in the prompt details.</p><h3>The Visual Description Stack</h3><ol><li><strong>Subject</strong> - What/who is the main focus</li><li><strong>Action/Pose</strong> - What are they doing</li><li><strong>Setting/Environment</strong> - Where are they</li><li><strong>Lighting</strong> - How is the scene lit</li><li><strong>Mood/Atmosphere</strong> - What feeling does it evoke</li><li><strong>Style</strong> - What artistic style</li><li><strong>Technical</strong> - Camera, resolution, aspect ratio</li></ol><h3>Lighting Vocabulary</h3><ul><li>Golden hour, sunset lighting</li><li>Studio lighting, three-point lighting</li><li>Dramatic shadows, chiaroscuro</li><li>Soft diffused light, overcast</li><li>Neon lights, cyberpunk lighting</li><li>Backlit, silhouette</li><li>Natural window light</li></ul><h3>Style Keywords</h3><ul><li><strong>Photographic:</strong> photorealistic, DSLR, 50mm, bokeh, RAW photo</li><li><strong>Artistic:</strong> oil painting, watercolor, digital art, concept art</li><li><strong>Specific artists:</strong> \"in the style of [artist name]\"</li><li><strong>Movements:</strong> Art Nouveau, Bauhaus, Cyberpunk, Cottagecore</li></ul><h3>Negative Prompts</h3><p>Tell AI what to avoid:</p><pre>--no text, no watermark, no blurry, no distorted faces</pre><h3>Aspect Ratio Matters</h3><ul><li>1:1 - Social media profiles</li><li>16:9 - YouTube thumbnails, desktop</li><li>9:16 - Phone wallpapers, Stories</li><li>4:5 - Instagram posts</li></ul>",
  "practice": {
    "instructions": "<p>Create a detailed visual prompt using the full stack.</p><h3>Scenario:</h3><p>You need a hero image for a website about sustainable fashion.</p><h3>Your Task:</h3><p>Write a comprehensive prompt that includes all 7 elements of the visual description stack.</p>",
    "hints": [
      "Think about what ''sustainable fashion'' visually means",
      "Consider the mood: hopeful, natural, modern?",
      "The style should match a premium fashion brand"
    ],
    "examples": [
      "Subject: A young woman wearing an elegant flowing dress made from organic linen\n\nAction/Pose: Standing gracefully, wind gently blowing the dress, one hand touching wheat stalks\n\nSetting: Golden wheat field at sunset, distant mountains, clear blue sky\n\nLighting: Golden hour sunlight from behind (backlit), warm glow, lens flare\n\nMood: Serene, hopeful, connection with nature, quiet confidence\n\nStyle: Editorial fashion photography, Vogue magazine aesthetic, natural and organic feel, minimalist luxury\n\nTechnical: Shot on Canon EOS R5, 85mm lens, f/1.8, shallow depth of field, 16:9 aspect ratio, 8K resolution, professional color grading\n\n--no logos, no text, no urban elements, no synthetic fabrics"
    ]
  }
}'::jsonb);

-- Quest 3: Brand Visual Identity
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'brand-visual-identity',
'Brand Visual Identity',
'Create consistent brand imagery with AI',
'intermediate', 25, 175, 'lesson', 2, true,
'{
  "theory": "<h2>Building Brand Identity with AI</h2><p>Consistency is key for brand recognition. Learn to create cohesive visual assets with AI.</p><h3>Brand Consistency Elements</h3><ul><li><strong>Color Palette</strong> - Specific hex codes or color names</li><li><strong>Style</strong> - Minimalist, bold, vintage, etc.</li><li><strong>Mood</strong> - Professional, playful, luxurious</li><li><strong>Recurring Elements</strong> - Shapes, patterns, motifs</li><li><strong>Photography Style</strong> - Lighting, angles, filters</li></ul><h3>Creating a Brand Prompt Template</h3><pre>Base brand parameters:\n- Colors: [hex codes or names]\n- Style: [description]\n- Mood: [atmosphere]\n- Recurring elements: [motifs]\n\n---\nFor each image, add:\n[specific subject/scene]\n\nMaintain: [brand parameters above]</pre><h3>Use Cases</h3><ul><li>Social media graphics</li><li>Website hero images</li><li>Product mockups</li><li>Marketing materials</li><li>Presentation backgrounds</li></ul><h3>Consistency Techniques</h3><ol><li><strong>Style Reference</strong> - Use consistent style descriptions</li><li><strong>Color Locking</strong> - Always specify your brand colors</li><li><strong>Seed Numbers</strong> - Some tools let you lock visual elements</li><li><strong>Reference Images</strong> - Use previous outputs as references</li></ol><h3>Template Example</h3><pre>Brand: TechFlow (B2B SaaS)\nColors: Deep navy (#1a1f36), electric blue (#3b82f6), white\nStyle: Clean, modern, geometric, minimal\nMood: Professional, innovative, trustworthy\nElements: Subtle grid patterns, flowing lines, abstract shapes\n\nGenerate: Website hero image showing abstract representation of data flowing through connected nodes, using brand colors on dark background</pre>",
  "practice": {
    "instructions": "<p>Create a brand visual identity system.</p><h3>Scenario:</h3><p>You''re launching a wellness app called ''MindfulMoment'' targeting stressed professionals.</p><h3>Your Task:</h3><p>Create a brand prompt template that includes:</p><ul><li>Color palette (describe colors and mood)</li><li>Visual style</li><li>Mood/atmosphere</li><li>Recurring visual elements</li></ul><p>Then write 3 specific image prompts using this template for: app icon, social media post, and website hero image.</p>",
    "hints": [
      "Wellness apps often use soft, calming colors",
      "Think about what visually represents ''mindfulness''",
      "Consider nature elements, breathing, calm spaces"
    ],
    "examples": [
      "BRAND: MindfulMoment\n\nCOLOR PALETTE:\n- Primary: Soft sage green (#a8c5a8)\n- Secondary: Warm cream (#f5f0e6)\n- Accent: Soft lavender (#c4b7d4)\n- Neutral: Warm gray (#6b6b6b)\n\nVISUAL STYLE:\n- Soft, organic shapes\n- Minimalist with breathing room\n- Hand-drawn feel mixed with modern clean lines\n- Gentle gradients\n\nMOOD:\n- Calm, serene, reassuring\n- Luxurious simplicity\n- Warm and inviting\n- Professional but not corporate\n\nRECURRING ELEMENTS:\n- Soft flowing lines (like breath)\n- Abstract leaf/nature motifs\n- Circles and organic shapes\n- Subtle texture overlays\n\n---\n\nIMAGE 1 - APP ICON:\nMinimalist app icon, abstract leaf shape made of two flowing curved lines suggesting breath, sage green on cream background, subtle shadow, rounded corners, iOS app icon style, clean and recognizable at small sizes\n\nIMAGE 2 - SOCIAL MEDIA POST:\nInstagram square post, person sitting peacefully in minimalist room, morning light through window, sage green and cream color palette, soft focus, plants in background, space for text overlay, calm and aspirational\n\nIMAGE 3 - WEBSITE HERO:\nWide hero image, abstract flowing shapes representing calm breath, sage green to lavender gradient, subtle particle effect, generous white space on left for headline text, organic flowing lines, premium wellness aesthetic, 16:9 aspect ratio"
    ]
  }
}'::jsonb);

-- Quest 4: Social Media Graphics
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'social-media-graphics',
'Social Media Graphics',
'Design scroll-stopping social graphics with AI',
'intermediate', 20, 150, 'practice', 3, true,
'{
  "theory": "<h2>AI-Generated Social Graphics</h2><p>Social media moves fast. AI lets you create professional graphics at the speed of trends.</p><h3>Platform Dimensions</h3><ul><li><strong>Instagram Post:</strong> 1080x1080 (1:1) or 1080x1350 (4:5)</li><li><strong>Instagram Story:</strong> 1080x1920 (9:16)</li><li><strong>Facebook:</strong> 1200x630</li><li><strong>Twitter:</strong> 1200x675 (16:9)</li><li><strong>LinkedIn:</strong> 1200x627</li><li><strong>Pinterest:</strong> 1000x1500 (2:3)</li></ul><h3>Graphics That Work</h3><ul><li><strong>Quote graphics</strong> - Inspiring text + imagery</li><li><strong>Announcement posts</strong> - New product/feature reveals</li><li><strong>Behind-the-scenes</strong> - Authentic lifestyle shots</li><li><strong>Data visualizations</strong> - Stats made beautiful</li><li><strong>Carousel covers</strong> - Eye-catching first slides</li></ul><h3>Prompting for Social</h3><pre>Create an Instagram post graphic for [topic].\n\nDimensions: 1080x1080\nBrand colors: [colors]\nStyle: [style]\nSpace for text: [where and how much]\nMood: [feeling]\n\nNote: Leave [top/bottom/left/right] area relatively clean for text overlay</pre><h3>Text in Images</h3><p>AI struggles with text. Best approach:</p><ol><li>Generate image with space for text</li><li>Add text in Canva/Figma</li><li>Or use Ideogram for text-heavy graphics</li></ol>",
  "practice": {
    "instructions": "<p>Create a social media graphic prompt.</p><h3>Scenario:</h3><p>You''re promoting a podcast episode about ''Overcoming Imposter Syndrome''.</p><h3>Your Task:</h3><p>Write a prompt for an Instagram post graphic that:</p><ul><li>Is eye-catching in a busy feed</li><li>Leaves space for the episode title</li><li>Has a strong visual metaphor for imposter syndrome</li><li>Uses a bold but professional color scheme</li></ul>",
    "hints": [
      "Think of visual metaphors: masks, shadows, mirrors, reflections",
      "Bold colors stand out in feeds",
      "Specify where to leave space for text"
    ],
    "examples": [
      "Create an Instagram post graphic (1080x1080) for a podcast episode about imposter syndrome.\n\nVisual concept: Person confidently walking forward while their shadow behind them appears hesitant or smaller - representing overcoming self-doubt\n\nColor palette:\n- Bold coral orange (#ff6b6b)\n- Deep purple (#4a0080)\n- Clean white for contrast\n- Gradient background\n\nStyle:\n- Modern illustration style\n- Bold, clean lines\n- Slightly geometric\n- Empowering and positive\n\nComposition:\n- Person/figure on right side of image\n- Large open space on left for episode title\n- Gradient from purple (left) to coral (right)\n- Small podcast logo placeholder in bottom corner\n\nMood: Empowering, bold, conversation-starting\n\nTechnical: High contrast for mobile viewing, no fine details that get lost at small sizes\n\n--no text, no photorealistic, no cluttered composition"
    ]
  }
}'::jsonb);

-- Quest 5: Product Photography
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'product-photography',
'AI Product Photography',
'Create professional product photos without a studio',
'intermediate', 25, 175, 'lesson', 4, true,
'{
  "theory": "<h2>AI-Powered Product Photography</h2><p>Professional product photos used to require expensive studios. AI changes everything.</p><h3>Product Photography Types</h3><ul><li><strong>White background</strong> - E-commerce standard</li><li><strong>Lifestyle shots</strong> - Products in use</li><li><strong>Flat lay</strong> - Top-down arrangements</li><li><strong>Hero shots</strong> - Dramatic, aspirational</li><li><strong>Detail shots</strong> - Texture, materials, craftsmanship</li></ul><h3>The Perfect Product Prompt</h3><pre>Professional product photography of [product],\n[setting/background],\n[lighting type],\n[angle/composition],\n[props if any],\nstyle: [commercial/lifestyle/editorial],\n[technical specifications]</pre><h3>Background Options</h3><ul><li>Pure white (#ffffff) studio background</li><li>Gradient backgrounds</li><li>Lifestyle scenes (kitchen, bathroom, desk)</li><li>Nature settings</li><li>Abstract/geometric backgrounds</li></ul><h3>Lighting Vocabulary</h3><ul><li>\"Clean studio lighting, softbox\"</li><li>\"Natural window light, soft shadows\"</li><li>\"Dramatic side lighting\"</li><li>\"Bright, even e-commerce lighting\"</li><li>\"Golden hour, warm ambient light\"</li></ul><h3>Angles That Sell</h3><ul><li>45-degree angle - Most versatile</li><li>Straight-on - Shows full product</li><li>Top-down/flat lay - Great for sets</li><li>Low angle - Makes products look premium</li><li>Detail/macro - Highlights quality</li></ul>",
  "practice": {
    "instructions": "<p>Create product photography prompts.</p><h3>Scenario:</h3><p>You''re selling a premium leather wallet and need photos for your e-commerce site.</p><h3>Your Task:</h3><p>Write 3 different prompts:</p><ol><li>White background e-commerce shot</li><li>Lifestyle shot showing the wallet in use</li><li>Detail shot highlighting the leather quality</li></ol>",
    "hints": [
      "For e-commerce: clean, clear, professional",
      "For lifestyle: think about who uses this wallet and where",
      "For detail: focus on texture, stitching, craftsmanship"
    ],
    "examples": [
      "1. E-COMMERCE SHOT:\nProfessional product photography of a premium brown leather bifold wallet, pure white background, studio softbox lighting, 45-degree angle, wallet slightly open showing card slots, clean commercial style, shot on medium format camera, perfectly sharp focus, subtle shadow for depth, 1:1 aspect ratio for web\n\n2. LIFESTYLE SHOT:\nEditorial lifestyle photography of a brown leather wallet being pulled from the back pocket of dark jeans, busy urban café background softly blurred, natural window light, casual sophisticated mood, man''s hands visible, wooden table with coffee cup in background, warm color grading, shot on 85mm lens, shallow depth of field\n\n3. DETAIL SHOT:\nMacro product photography showing the texture of full-grain brown leather wallet, focus on hand-stitched edges, dramatic side lighting highlighting the leather grain and texture, dark moody background, visible quality craftsmanship, luxury brand aesthetic, extreme close-up, shot on macro lens, rich warm tones, 4:5 aspect ratio"
    ]
  }
}'::jsonb);

-- Quest 6: Illustration & Art
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'illustration-art',
'Custom Illustrations',
'Create unique illustrations and artwork with AI',
'intermediate', 20, 150, 'practice', 5, true,
'{
  "theory": "<h2>AI Illustration & Digital Art</h2><p>AI excels at creating custom illustrations that would take artists hours. Learn to guide it toward your vision.</p><h3>Illustration Styles</h3><ul><li><strong>Flat design</strong> - Simple shapes, minimal shadows</li><li><strong>Isometric</strong> - 3D-like, technical</li><li><strong>Hand-drawn</strong> - Sketchy, organic</li><li><strong>Watercolor</strong> - Soft, artistic</li><li><strong>Vector art</strong> - Clean lines, scalable</li><li><strong>Concept art</strong> - Detailed, imaginative</li><li><strong>Children''s book</strong> - Whimsical, friendly</li></ul><h3>Style References</h3><p>Reference known styles for consistency:</p><ul><li>\"In the style of Studio Ghibli\"</li><li>\"Pixar-style 3D rendering\"</li><li>\"New Yorker illustration style\"</li><li>\"Notion-style flat illustration\"</li><li>\"Dribbble illustration aesthetic\"</li></ul><h3>Illustration Prompt Structure</h3><pre>[Subject/scene] as a [style] illustration,\n[color palette],\n[mood/feeling],\n[specific artistic elements],\n[background type],\n[intended use]</pre><h3>For Blog/Website Illustrations</h3><pre>Create a blog header illustration for an article about [topic].\n\nStyle: Modern flat design\nColors: [brand colors]\nMood: [relevant mood]\nElements: [symbolic objects]\nSpace for: Text on [left/right]\n\nNote: Should be simple enough to work at small sizes</pre>",
  "practice": {
    "instructions": "<p>Create custom illustration prompts.</p><h3>Scenario:</h3><p>You''re creating illustrations for a financial literacy app for young adults.</p><h3>Your Task:</h3><p>Write prompts for 2 illustrations:</p><ol><li>An onboarding screen showing ''building financial habits''</li><li>An achievement badge for ''First $1000 Saved''</li></ol><p>Make them consistent in style and appropriate for the audience.</p>",
    "hints": [
      "Young adults = modern, not childish, relatable",
      "Financial = growth, building, upward momentum",
      "Avoid boring corporate imagery"
    ],
    "examples": [
      "ILLUSTRATION 1 - ONBOARDING SCREEN:\nModern flat illustration for a financial app, young professional building a tower of colorful coins like building blocks, each coin represents a habit (coffee cup, piggy bank, chart icons on coins), warm and encouraging color palette with mint green, coral, and soft yellow, friendly rounded shapes, person shown from side with focused expression, subtle growth plant emerging from top, clean white background, in the style of Notion/Stripe illustrations, uplifting and motivating mood, space on right side for text, simple enough to work as app screen\n\n--no photo realistic, no corporate stiff style, no dark colors\n\nILLUSTRATION 2 - ACHIEVEMENT BADGE:\nCircular achievement badge illustration, ''$1000 saved'' milestone celebration, stack of coins transforming into a small plant growing upward, number 1000 subtly integrated, gold and mint green color scheme with white highlights, modern flat design with subtle gradients, celebratory confetti elements around the circle, golden ring border, friendly and rewarding feeling, would look great as an app notification or profile badge, centered composition\n\n--no text (we''ll add that), no 3D, no complex details that won''t work small"
    ]
  }
}'::jsonb);

-- Quest 7: Thumbnails & Covers
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'thumbnails-covers',
'Thumbnails & Covers',
'Design click-worthy thumbnails and cover images',
'intermediate', 20, 150, 'practice', 6, true,
'{
  "theory": "<h2>Designing for Clicks</h2><p>Thumbnails and covers are often your first impression. They need to work hard at small sizes.</p><h3>What Makes Thumbnails Click-Worthy</h3><ul><li><strong>Contrast</strong> - Stands out in a sea of content</li><li><strong>Emotion</strong> - Faces with expressions perform well</li><li><strong>Curiosity</strong> - Creates \"I need to know\" feeling</li><li><strong>Clarity</strong> - Message clear at tiny sizes</li><li><strong>Branding</strong> - Recognizable as yours</li></ul><h3>YouTube Thumbnail Formula</h3><ol><li>Bold, contrasting background</li><li>Expressive face (often creator)</li><li>Minimal text (3-5 words max)</li><li>Bright, saturated colors</li><li>Clear visual hierarchy</li></ol><pre>YouTube thumbnail for video about [topic],\nexpressive face showing [emotion],\nbold [color] background,\nspace for large text on [side],\nhigh contrast, saturated colors,\ndramatic lighting,\n16:9 aspect ratio,\nshould be readable at very small sizes</pre><h3>Podcast Cover Formula</h3><ul><li>Works at 50x50 pixels (Apple Podcasts grid)</li><li>Simple, bold design</li><li>Readable show name</li><li>Unique but professional</li></ul><h3>Course/Book Cover Tips</h3><ul><li>Clear title hierarchy</li><li>Relevant imagery/metaphor</li><li>Professional but eye-catching</li><li>Works in both print and digital</li></ul>",
  "practice": {
    "instructions": "<p>Design a thumbnail prompt.</p><h3>Scenario:</h3><p>You''re creating a YouTube thumbnail for a video: ''I Tried AI for 30 Days - Here''s What Happened''.</p><h3>Your Task:</h3><p>Write a prompt that will generate a thumbnail that:</p><ul><li>Shows a clear ''before/after'' concept</li><li>Has space for text</li><li>Uses bold, contrasting colors</li><li>Works at small sizes</li></ul>",
    "hints": [
      "Split compositions work great for before/after",
      "Consider robot/human imagery for AI theme",
      "Use complementary colors for contrast"
    ],
    "examples": [
      "YouTube thumbnail for ''30 Days of AI'' video,\n\nConcept: Split screen composition\n\nLeft side (before):\n- Overwhelmed person surrounded by messy papers and tasks\n- Chaotic, stressed expression\n- Warm orange/yellow tint\n- Slight blur or chaos effect\n\nRight side (after):\n- Same person, now calm and confident\n- Clean desk with one laptop\n- Subtle robot/AI helper figure in background\n- Cool blue/teal tint\n- Clean, organized feel\n\nDivider: Glowing diagonal line separating the two\n\nTechnical:\n- 16:9 aspect ratio (1280x720)\n- High contrast, saturated colors\n- Large open space in top portion for text overlay\n- Should be clearly readable at 120x68 pixels\n- Faces are prominently visible\n\nStyle: YouTube thumbnail style, slightly exaggerated expressions, bold and attention-grabbing\n\n--no text, no subtle details, no muted colors"
    ]
  }
}'::jsonb);

-- Quest 8: Visual Campaign Boss Quest
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'image-generation'),
'visual-campaign-boss',
'Visual Campaign Master',
'Create a complete visual campaign with AI',
'advanced', 35, 300, 'boss', 7, true,
'{
  "theory": "<h2>Complete Visual Campaign Creation</h2><p>Real-world projects need multiple coordinated visuals. This is where your skills come together.</p><h3>Campaign Visual Checklist</h3><ul><li>Hero image (main visual)</li><li>Social media variations (multiple formats)</li><li>Email headers</li><li>Web banners</li><li>Story/Reel graphics</li><li>Profile/avatar versions</li></ul><h3>Maintaining Visual Coherence</h3><ol><li><strong>Color consistency</strong> - Same palette across all</li><li><strong>Style matching</strong> - Same illustration/photo style</li><li><strong>Mood alignment</strong> - Same emotional feel</li><li><strong>Element repetition</strong> - Use recurring visual motifs</li></ol><h3>Campaign Brief Template</h3><pre>CAMPAIGN: [Name]\nGOAL: [What action do we want?]\nAUDIENCE: [Who are we reaching?]\nKEY MESSAGE: [One sentence]\nMOOD: [Feeling/emotion]\nCOLORS: [Palette]\nSTYLE: [Visual approach]\n\nDELIVERABLES:\n1. Hero image - [specs]\n2. Social posts - [platforms and sizes]\n3. Stories/Reels - [specs]\n4. Email header - [specs]\n5. Web banner - [specs]</pre>",
  "practice": {
    "instructions": "<p>This is your Boss Quest! Create a complete visual campaign.</p><h3>The Challenge:</h3><p>You''re launching a <strong>''Summer of AI''</strong> promotion for an online course platform. The campaign runs for 6 weeks with 30% off AI courses.</p><h3>Create Prompts For:</h3><ol><li>Main hero image (website banner)</li><li>Instagram post (1:1)</li><li>Instagram story (9:16)</li><li>Email header</li><li>YouTube thumbnail for announcement video</li></ol><h3>Requirements:</h3><ul><li>All visuals must feel cohesive</li><li>Summer + AI theme throughout</li><li>Space for text on each</li><li>Specific dimensions for each format</li></ul>",
    "hints": [
      "Create a brief first: colors, style, mood, recurring elements",
      "Think of visual metaphors that combine ''summer'' and ''AI''",
      "Keep a consistent subject/character or visual element across all"
    ],
    "examples": [
      "CAMPAIGN BRIEF: Summer of AI\n\nGOAL: Drive course enrollments with 30% discount\nAUDIENCE: Professionals 25-45 interested in upskilling\nKEY MESSAGE: Learn AI skills this summer, transform your career\nMOOD: Exciting, optimistic, refreshing, smart\nCOLORS: Electric blue (#00d4ff), sunset orange (#ff6b35), white, soft yellow (#fff3cd)\nSTYLE: Modern illustration, geometric, clean lines, tech-meets-summer vibe\nRECURRING ELEMENTS: Abstract AI brain/circuit pattern, sun rays, palm leaf accents\n\n---\n\n1. HERO IMAGE (Website Banner - 1920x600):\nWide hero illustration, person relaxing in modern beach chair with laptop, abstract AI/neural network patterns floating around them like light bubbles, palm trees made of geometric circuit patterns, sunset gradient background (orange to blue), left side clear for headline text, modern flat illustration style with subtle 3D elements, optimistic summer learning vibes\n\n2. INSTAGRAM POST (1080x1080):\nSquare illustration, centered composition of an abstract AI brain icon wearing sunglasses with sun reflection in lenses, geometric palm leaves framing the corners, gradient background from electric blue to orange, clean space in upper third for text overlay, modern minimalist style, bold and scroll-stopping\n\n3. INSTAGRAM STORY (1080x1920):\nVertical illustration, person on beach blanket with laptop, AI assistant character (friendly robot) next to them pointing at screen, beach/sunset scene with geometric twist, top third left empty for headline, bottom area clear for swipe-up CTA, same color palette, playful but professional\n\n4. EMAIL HEADER (600x200):\nWide thin banner, abstract wave pattern combining water wave and sound/data wave, transitioning from blue to orange, minimal geometric brain icon on right side, lots of clean space for email title text, simple and email-safe design, optimized for light and dark mode compatibility\n\n5. YOUTUBE THUMBNAIL (1280x720):\nSplit style: person looking amazed on left with robot/AI overlay on right, bright bold colors, electric blue and orange gradient background, large open space on right for text like ''SUMMER OF AI / 30% OFF'', expressive face, high contrast, extremely bold - must work at small size\n\n---\n\nALL: --no photo realistic, no dark moody, no corporate stiff, no complex details that don''t scale"
    ]
  }
}'::jsonb);

-- =============================================
-- PRESENTATIONS & DESIGN SUBTRACK (9 quests)
-- =============================================

-- Quest 1: Presentation Basics
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'presentation-basics',
'AI Presentation Basics',
'Learn to create compelling presentations with AI assistance',
'beginner', 15, 100, 'lesson', 0, true,
'{
  "theory": "<h2>AI-Powered Presentations</h2><p>Presentations often take hours. AI can help you create professional slides in minutes.</p><h3>What AI Can Help With</h3><ul><li><strong>Content generation</strong> - Main points, scripts</li><li><strong>Structure</strong> - Logical flow, sections</li><li><strong>Speaker notes</strong> - What to say on each slide</li><li><strong>Visual suggestions</strong> - Images, layouts</li><li><strong>Design feedback</strong> - Improvements</li></ul><h3>Presentation Structure Prompt</h3><pre>Create a presentation outline for [topic].\n\nAudience: [who]\nDuration: [X minutes]\nGoal: [what should they do/feel after]\n\nProvide:\n- Title slide\n- Agenda/Overview\n- [X] main sections\n- Key points per slide (max 3)\n- Conclusion slide\n- Call to action\n\nFor each slide include:\n- Headline\n- 2-3 bullet points\n- Speaker notes (what to say)\n- Visual suggestion</pre><h3>The 10-20-30 Rule</h3><ul><li><strong>10</strong> slides maximum</li><li><strong>20</strong> minutes maximum</li><li><strong>30</strong> point font minimum</li></ul><h3>Slide Content Best Practices</h3><ul><li>One idea per slide</li><li>Maximum 3 bullet points</li><li>6 words or less per bullet</li><li>Visuals over text when possible</li></ul>",
  "practice": {
    "instructions": "<p>Create a presentation outline prompt.</p><h3>Scenario:</h3><p>You need to pitch a new project idea to your team: implementing AI tools to improve customer support.</p><h3>Your Task:</h3><p>Write a prompt that generates:</p><ul><li>Complete slide deck outline (8-10 slides)</li><li>Key points for each slide</li><li>Speaker notes</li><li>Visual suggestions</li></ul>",
    "hints": [
      "Define the audience (team, executives?)",
      "Clarify the goal (approval, feedback, buy-in?)",
      "Include problem, solution, benefits, next steps"
    ],
    "examples": [
      "Create a presentation outline for pitching AI implementation in customer support.\n\nAudience: Leadership team (VP level and above)\nDuration: 15-minute pitch\nGoal: Get approval and budget for a 3-month pilot program\n\nStructure:\n1. Title slide - attention-grabbing headline\n2. Problem statement - current support challenges (data-driven)\n3. Proposed solution - AI tools overview\n4. How it works - simple visual explanation\n5. Benefits - quantified improvements\n6. Case study - similar company success story\n7. Timeline - 3-month pilot plan\n8. Budget - costs vs. projected savings\n9. Risks & mitigation\n10. Call to action - specific ask\n\nFor each slide provide:\n- Headline (6 words or less)\n- 2-3 bullet points (minimal text)\n- Speaker notes (what to say, 2-3 sentences)\n- Visual suggestion (chart type, image, icon)\n\nTone: Confident, data-driven, but not technical jargon\nStyle: Executive-friendly, visually clean"
    ]
  }
}'::jsonb);

-- Quest 2: Slide Design
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'slide-design',
'Slide Design Principles',
'Master visual hierarchy and slide layout',
'beginner', 20, 125, 'practice', 1, true,
'{
  "theory": "<h2>Slide Design Fundamentals</h2><p>Good design isn''t about decoration—it''s about communication. Learn the principles that make slides work.</p><h3>Visual Hierarchy</h3><p>Guide the eye with size, color, and placement:</p><ol><li>Headline - biggest, boldest</li><li>Key point - second largest</li><li>Supporting details - smaller</li><li>Source/notes - smallest</li></ol><h3>The Rule of Thirds</h3><p>Divide slide into 9 sections. Place key elements at intersections for visual interest.</p><h3>White Space is Your Friend</h3><ul><li>Don''t fill every corner</li><li>Let content breathe</li><li>Creates focus and elegance</li><li>Makes text readable</li></ul><h3>Color Guidelines</h3><ul><li><strong>2-3 colors max</strong> (plus black/white)</li><li>One accent color for emphasis</li><li>Dark on light OR light on dark</li><li>Test contrast for readability</li></ul><h3>Font Rules</h3><ul><li>2 fonts maximum (heading + body)</li><li>Minimum 24pt for body text</li><li>Sans-serif for screens</li><li>Consistent throughout</li></ul><h3>AI Prompt for Design Feedback</h3><pre>Review this slide design and suggest improvements:\n\n[Describe or paste slide content]\n\nEvaluate:\n- Visual hierarchy\n- Text amount\n- Color usage\n- White space\n- Overall impact\n\nProvide 3 specific improvements.</pre>",
  "practice": {
    "instructions": "<p>Get AI feedback on a slide design.</p><h3>Scenario:</h3><p>You have a slide with the following content:</p><p><strong>Headline:</strong> Q3 Sales Performance<br/><strong>Content:</strong> Total revenue: $2.4M (up 15%), New customers: 127 (up 23%), Churn rate: 3.2% (down from 4.1%), Top product: Premium Plan (45% of sales), Regional breakdown: NA 52%, EU 35%, APAC 13%</p><h3>Your Task:</h3><p>Write a prompt asking AI to redesign this slide with better visual hierarchy and suggest layout options.</p>",
    "hints": [
      "This slide has too much data - ask AI how to simplify",
      "Request specific layout options (2-3 alternatives)",
      "Ask about data visualization opportunities"
    ],
    "examples": [
      "Help me redesign this data-heavy slide for better visual impact.\n\nCurrent content:\n- Headline: Q3 Sales Performance\n- Total revenue: $2.4M (up 15%)\n- New customers: 127 (up 23%)\n- Churn rate: 3.2% (down from 4.1%)\n- Top product: Premium Plan (45% of sales)\n- Regional breakdown: NA 52%, EU 35%, APAC 13%\n\nProblems: Too much text, no visual hierarchy, boring\n\nPlease provide:\n\n1. CONTENT RESTRUCTURE\n- What''s the ONE key message for this slide?\n- What can move to backup/appendix slides?\n- What should be highlighted vs. supporting?\n\n2. LAYOUT OPTIONS (describe 3)\n- Option A: [description]\n- Option B: [description]\n- Option C: [description]\n\n3. DATA VISUALIZATION\n- Which numbers should become charts?\n- What chart types work best?\n- How to show the ''up/down'' trends visually?\n\n4. VISUAL HIERARCHY\n- What should be biggest/boldest?\n- Color recommendations for emphasis\n- Where should the eye go first, second, third?\n\nGoal: Executive audience needs to understand Q3 wins in 5 seconds"
    ]
  }
}'::jsonb);

-- Quest 3: Data Visualization
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'data-visualization',
'Data Visualization',
'Turn complex data into clear visual stories',
'intermediate', 25, 175, 'lesson', 2, true,
'{
  "theory": "<h2>Data Visualization with AI</h2><p>Data tells stories. AI can help you find the right visual for your data.</p><h3>Chart Type Selection</h3><ul><li><strong>Comparison</strong> → Bar charts</li><li><strong>Trend over time</strong> → Line charts</li><li><strong>Part of whole</strong> → Pie/donut (only 2-5 segments!)</li><li><strong>Distribution</strong> → Histograms</li><li><strong>Relationship</strong> → Scatter plots</li><li><strong>Geographic</strong> → Maps</li></ul><h3>AI Prompts for Data Viz</h3><pre>I have this data: [paste data]\n\nGoal: [what story/message to convey]\nAudience: [technical/non-technical]\n\nRecommend:\n1. Best chart type and why\n2. How to simplify if needed\n3. Key visual emphasis\n4. Color scheme suggestion\n5. What to title/label</pre><h3>Data Simplification</h3><p>AI can help reduce complexity:</p><pre>Simplify this data table for a presentation:\n[paste complex data]\n\n- Identify the key insight\n- Suggest what to cut\n- Recommend groupings\n- Create a \"headline stat\"</pre><h3>Chart Best Practices</h3><ul><li>One message per chart</li><li>Start axes at zero (usually)</li><li>Label clearly, but not cluttered</li><li>Use color meaningfully</li><li>Include source</li></ul>",
  "practice": {
    "instructions": "<p>Get AI to recommend data visualizations.</p><h3>Scenario:</h3><p>You have this data about customer satisfaction:</p><ul><li>Jan: 72%, Feb: 74%, Mar: 71%, Apr: 78%, May: 82%, Jun: 85%</li><li>By channel: Email 88%, Phone 72%, Chat 91%, Social 65%</li><li>By customer segment: Enterprise 89%, Mid-market 78%, SMB 71%</li></ul><h3>Your Task:</h3><p>Write a prompt asking AI to recommend visualizations for a board presentation.</p>",
    "hints": [
      "Multiple datasets might need multiple slides",
      "Ask for the ''headline'' insight for each",
      "Consider what story you''re telling with each"
    ],
    "examples": [
      "Recommend data visualizations for a board presentation on customer satisfaction.\n\nDATA:\n\n1. Monthly trend (H1 2024):\nJan: 72%, Feb: 74%, Mar: 71%, Apr: 78%, May: 82%, Jun: 85%\n\n2. By support channel:\nEmail: 88%, Phone: 72%, Chat: 91%, Social: 65%\n\n3. By customer segment:\nEnterprise: 89%, Mid-market: 78%, SMB: 71%\n\n---\n\nFor each dataset, provide:\n\n1. RECOMMENDED CHART TYPE\n- What type and why\n- Alternative option\n\n2. KEY INSIGHT (one sentence headline)\n- What story does this data tell?\n\n3. VISUAL DESIGN\n- Color recommendations\n- What to highlight/de-emphasize\n- Labels needed\n\n4. SLIDE LAYOUT\n- Should this be its own slide or combined?\n- Suggested headline\n- Supporting text (if any)\n\n5. POTENTIAL CONCERNS\n- What questions might the board ask?\n- What context might be missing?\n\nAUDIENCE: Board members, non-technical, want high-level insights\nTONE: Good news story (satisfaction is improving)"
    ]
  }
}'::jsonb);

-- Quest 4: Pitch Decks
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'pitch-decks',
'Pitch Deck Creation',
'Build investor-ready pitch decks with AI',
'intermediate', 30, 200, 'lesson', 3, true,
'{
  "theory": "<h2>AI-Powered Pitch Decks</h2><p>Whether pitching to investors, clients, or leadership, AI can help you structure a compelling story.</p><h3>The Classic Pitch Structure</h3><ol><li><strong>Cover</strong> - Company name, tagline, logo</li><li><strong>Problem</strong> - Pain point you solve</li><li><strong>Solution</strong> - Your product/service</li><li><strong>Market</strong> - Size and opportunity</li><li><strong>Product</strong> - How it works</li><li><strong>Traction</strong> - Proof it works</li><li><strong>Business Model</strong> - How you make money</li><li><strong>Competition</strong> - Your advantage</li><li><strong>Team</strong> - Why you''ll win</li><li><strong>Ask</strong> - What you need</li></ol><h3>AI Prompting for Pitch Content</h3><pre>Create pitch deck content for [company type].\n\nCompany: [name and brief description]\nProduct: [what you offer]\nTarget customer: [who]\nCurrent stage: [idea/MVP/revenue]\n\nFor each standard pitch section, provide:\n- Slide headline\n- Key points (max 3)\n- Data/proof points needed\n- Visual suggestion\n- Potential investor questions</pre><h3>Storytelling in Pitches</h3><p>Great pitches follow narrative arcs:</p><ul><li>Hero (customer) has a problem</li><li>They''ve tried solutions (competitors)</li><li>Nothing works until... (your solution)</li><li>Transformation (results)</li><li>Call to adventure (invest/buy)</li></ul>",
  "practice": {
    "instructions": "<p>Create a pitch deck outline.</p><h3>Scenario:</h3><p>You''re building an AI-powered meal planning app called ''PlateMate'' that creates personalized weekly meal plans based on dietary restrictions, preferences, and grocery budget.</p><h3>Your Task:</h3><p>Write a prompt to generate a complete 10-slide pitch deck outline with content for each slide.</p>",
    "hints": [
      "Include the problem (meal planning is time-consuming)",
      "Market size: meal kit industry, health apps",
      "Traction ideas: waitlist, beta users, partnerships"
    ],
    "examples": [
      "Create a complete pitch deck outline for PlateMate.\n\nCOMPANY: PlateMate - AI-powered personalized meal planning app\n\nPRODUCT: App that creates weekly meal plans based on:\n- Dietary restrictions (keto, vegan, allergies, etc.)\n- Taste preferences (learned over time)\n- Grocery budget\n- Available time to cook\n- Family size\n\nTARGET CUSTOMER: Health-conscious millennials and busy parents\n\nCURRENT STAGE: MVP with 500 beta users\n\nTRACTION:\n- 500 beta users\n- 73% weekly active rate\n- 4.6 App Store rating (beta)\n- Partnership talks with 2 grocery chains\n\nASK: $1.5M seed round\n\n---\n\nFor each of the 10 slides, provide:\n\n1. SLIDE HEADLINE (punchy, benefit-focused)\n\n2. KEY CONTENT (3 bullets max)\n\n3. DATA/PROOF NEEDED\n- What stats or evidence should appear?\n- What''s missing that we need to gather?\n\n4. VISUAL SUGGESTION\n- Chart, image, mockup, or graphic\n\n5. POTENTIAL INVESTOR QUESTIONS\n- What might they ask after this slide?\n\n6. SPEAKER NOTES\n- 2-3 sentences of what to say\n\n---\n\nMake it compelling, data-driven, and realistic for a seed-stage startup."
    ]
  }
}'::jsonb);

-- Quest 5: Report Design
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'report-design',
'Professional Reports',
'Create polished business reports with AI',
'intermediate', 25, 175, 'practice', 4, true,
'{
  "theory": "<h2>AI-Assisted Report Creation</h2><p>Reports need to be comprehensive yet readable. AI helps with structure, content, and executive summaries.</p><h3>Report Types</h3><ul><li><strong>Executive summaries</strong> - 1-page overviews</li><li><strong>Quarterly reports</strong> - Business performance</li><li><strong>Research reports</strong> - Findings and analysis</li><li><strong>Project reports</strong> - Status and updates</li><li><strong>Annual reports</strong> - Year-in-review</li></ul><h3>Report Structure</h3><ol><li>Executive Summary (write last!)</li><li>Introduction/Context</li><li>Key Findings</li><li>Detailed Analysis</li><li>Recommendations</li><li>Next Steps</li><li>Appendix</li></ol><h3>AI Prompts for Reports</h3><pre>Create an executive summary for this report:\n[paste or describe full report]\n\nRequirements:\n- One page maximum\n- Lead with key insight\n- Include: context, findings, recommendation\n- Business-appropriate tone\n- Highlight action items</pre><h3>Report Writing Tips</h3><ul><li>Lead with conclusions, not background</li><li>Use headings and subheadings liberally</li><li>Include visual breaks (charts, callouts)</li><li>Bold key takeaways</li><li>End sections with \"So what?\"</li></ul>",
  "practice": {
    "instructions": "<p>Create a report structure with AI.</p><h3>Scenario:</h3><p>You''ve completed research on remote work productivity for your company. Key findings:</p><ul><li>72% of employees prefer hybrid (2-3 days office)</li><li>Productivity up 12% for focused work, down 8% for collaboration</li><li>Communication tools are the #1 challenge</li><li>New hires struggle more than tenured staff</li></ul><h3>Your Task:</h3><p>Write a prompt to generate a complete report outline with an executive summary.</p>",
    "hints": [
      "The audience is likely leadership making policy decisions",
      "Include clear recommendations",
      "Ask for data visualization suggestions"
    ],
    "examples": [
      "Create a complete report structure for remote work research findings.\n\nCONTEXT:\nCompany-wide survey of 500 employees about remote work preferences and productivity. Conducted May 2024 as company considers permanent policy changes.\n\nKEY FINDINGS:\n1. 72% prefer hybrid model (2-3 days office)\n2. Productivity: +12% focused work, -8% collaboration\n3. #1 challenge: communication tools and async work\n4. New hires (<1 year) struggle significantly more\n5. Senior roles adapt better than junior\n6. No significant difference by department\n\nAUDIENCE: Executive leadership team deciding on policy\n\n---\n\nProvide:\n\n1. EXECUTIVE SUMMARY (one page)\n- Opening hook\n- Key findings (prioritized)\n- Primary recommendation\n- Call to action\n\n2. REPORT OUTLINE\n- Section titles\n- What each section covers\n- Estimated length\n- Key data/charts for each section\n\n3. VISUAL RECOMMENDATIONS\n- What charts/graphs for each finding\n- Suggested callout boxes\n- Executive-friendly formatting\n\n4. RECOMMENDATIONS SECTION\n- Specific policy recommendations\n- Implementation considerations\n- Risks and mitigations\n\n5. APPENDIX SUGGESTIONS\n- What supporting data to include\n- Survey methodology details\n- Full data tables\n\nTONE: Objective, data-driven, actionable\nLENGTH: Aim for 10-12 pages including visualizations"
    ]
  }
}'::jsonb);

-- Quest 6: Infographics
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'infographics',
'Infographic Design',
'Create shareable infographics with AI',
'intermediate', 25, 175, 'practice', 5, true,
'{
  "theory": "<h2>AI-Powered Infographics</h2><p>Infographics make complex information digestible and shareable. AI helps with structure, content, and visual concepts.</p><h3>Infographic Types</h3><ul><li><strong>Statistical</strong> - Data-heavy, lots of numbers</li><li><strong>Timeline</strong> - Chronological events</li><li><strong>Process</strong> - Step-by-step flows</li><li><strong>Comparison</strong> - Side-by-side analysis</li><li><strong>List</strong> - Top 10, tips, etc.</li><li><strong>Geographic</strong> - Location-based data</li></ul><h3>Infographic Structure</h3><ol><li>Catchy headline</li><li>Introduction hook (why this matters)</li><li>3-5 main sections</li><li>Visual anchors for each section</li><li>Conclusion/CTA</li><li>Source citations</li><li>Branding</li></ol><h3>AI Prompts for Infographics</h3><pre>Create an infographic outline about [topic].\n\nType: [statistical/timeline/process/list]\nTarget audience: [who]\nGoal: [educate/persuade/entertain]\n\nProvide:\n- Headline options (3)\n- Section breakdown\n- Key stats/facts per section\n- Visual element suggestions\n- Color scheme recommendation\n- Call to action</pre><h3>Visual Balance Tips</h3><ul><li>60% visual, 40% text</li><li>Consistent icon style throughout</li><li>Clear visual hierarchy</li><li>Readable at 50% zoom</li></ul>",
  "practice": {
    "instructions": "<p>Create an infographic outline.</p><h3>Scenario:</h3><p>Create an infographic about ''The State of AI in Business 2024'' for a business blog.</p><h3>Data to Include:</h3><ul><li>65% of businesses now use AI tools</li><li>Top uses: customer service (34%), content creation (28%), data analysis (23%)</li><li>ROI: companies see 15-25% efficiency gains</li><li>Barriers: cost (45%), skills gap (38%), trust (27%)</li><li>2025 prediction: 80% adoption expected</li></ul><h3>Your Task:</h3><p>Write a prompt for a complete infographic outline.</p>",
    "hints": [
      "Think about visual flow - top to bottom",
      "Each section needs a visual anchor",
      "End with a forward-looking CTA"
    ],
    "examples": [
      "Create a complete infographic outline: ''The State of AI in Business 2024''\n\nTYPE: Statistical/data-driven\nAUDIENCE: Business leaders, decision makers\nPLATFORM: Blog post, social media sharing\nGOAL: Educate and encourage AI adoption\n\nDATA:\n- 65% of businesses now use AI tools\n- Top uses: customer service (34%), content creation (28%), data analysis (23%)\n- ROI: 15-25% efficiency gains\n- Barriers: cost (45%), skills gap (38%), trust (27%)\n- 2025 prediction: 80% adoption\n\n---\n\nProvide:\n\n1. HEADLINE OPTIONS (3)\n- Attention-grabbing\n- Include a key stat\n\n2. INTRODUCTION SECTION\n- Hook text (1-2 sentences)\n- Visual: animated stat or icon\n\n3. MAIN SECTIONS (4-5)\nFor each section:\n- Section headline\n- Key stat(s) to feature\n- Supporting text (max 25 words)\n- Visual suggestion (chart type, icon set, illustration)\n\n4. VISUAL FLOW\n- How sections connect\n- Suggested icons/imagery\n- Color scheme (tech-forward but approachable)\n\n5. CONCLUSION\n- Key takeaway\n- CTA (what should reader do?)\n\n6. FOOTER\n- Source citations format\n- Branding placement\n\n7. SIZE RECOMMENDATIONS\n- Pinterest-friendly ratio (2:3 or 1:2.5)\n- Readable on mobile\n\nSTYLE: Modern, clean, tech-forward but not cold. Use blue/purple palette."
    ]
  }
}'::jsonb);

-- Quest 7: Proposal Design
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'proposal-design',
'Business Proposals',
'Create winning business proposals with AI',
'advanced', 25, 200, 'lesson', 6, true,
'{
  "theory": "<h2>AI-Powered Business Proposals</h2><p>Proposals win (or lose) business. AI helps you create professional, persuasive proposals faster.</p><h3>Proposal Structure</h3><ol><li><strong>Cover page</strong> - Professional first impression</li><li><strong>Executive summary</strong> - TL;DR of value</li><li><strong>Problem understanding</strong> - Show you get it</li><li><strong>Proposed solution</strong> - Your approach</li><li><strong>Scope & deliverables</strong> - What they get</li><li><strong>Timeline</strong> - When it happens</li><li><strong>Investment</strong> - Pricing (at the end!)</li><li><strong>Why us</strong> - Your differentiators</li><li><strong>Case studies</strong> - Proof</li><li><strong>Next steps</strong> - Clear CTA</li></ol><h3>AI Prompts for Proposals</h3><pre>Create a proposal outline for [service/project].\n\nClient: [company name and industry]\nProject: [what they need]\nBudget range: [if known]\nTimeline: [desired completion]\n\nFor each section provide:\n- Section header\n- Key content points\n- Persuasion angle\n- Proof points to include</pre><h3>Proposal Psychology</h3><ul><li><strong>Problem before solution</strong> - They need to feel the pain</li><li><strong>Options, not ultimatums</strong> - Give 2-3 packages</li><li><strong>Value before price</strong> - Stack value first</li><li><strong>Social proof</strong> - ''Companies like yours...''</li></ul>",
  "practice": {
    "instructions": "<p>Create a proposal outline.</p><h3>Scenario:</h3><p>You run a content marketing agency. A SaaS startup (project management tool) wants a content strategy and 3 months of blog content.</p><h3>Details:</h3><ul><li>They''re new and need to build authority</li><li>Target: SMB project managers</li><li>Budget: ~$5,000/month</li><li>Goal: organic traffic and leads</li></ul><h3>Your Task:</h3><p>Write a prompt for a complete proposal outline.</p>",
    "hints": [
      "Show you understand their market (PM tools space)",
      "Include content strategy, not just execution",
      "Consider tiered pricing options"
    ],
    "examples": [
      "Create a complete proposal outline for a content marketing engagement.\n\nCLIENT: TaskFlow - a new SaaS project management tool\nINDUSTRY: B2B SaaS, competing with Asana, Monday, etc.\n\nPROJECT SCOPE:\n- Content strategy development\n- 3 months of blog content creation\n- SEO optimization\n\nTARGET AUDIENCE: SMB project managers and team leads\nBUDGET: ~$5,000/month\nGOAL: Build organic traffic and generate leads\n\n---\n\nFor each proposal section, provide:\n\n1. COVER PAGE\n- Suggested title/headline\n- Design elements\n\n2. EXECUTIVE SUMMARY\n- Key value proposition\n- What they get\n- Expected outcomes\n\n3. UNDERSTANDING THEIR CHALLENGE\n- Market context (competitive space)\n- Content challenges for new SaaS\n- Why content matters for PM tools\n\n4. OUR APPROACH\n- Strategy methodology\n- Content pillars recommended\n- SEO approach\n\n5. SCOPE & DELIVERABLES\n- List everything they get\n- Format it for maximum perceived value\n\n6. TIMELINE\n- Month-by-month breakdown\n- Key milestones\n\n7. INVESTMENT OPTIONS\n- 3 tiers: Good/Better/Best\n- What''s in each\n- Monthly pricing\n- Recommended option highlighted\n\n8. WHY US\n- Differentiators\n- Relevant experience\n\n9. CASE STUDY SUGGESTION\n- What type of past work to include\n\n10. NEXT STEPS\n- Clear CTA\n- Urgency element if appropriate\n\nTONE: Confident, knowledgeable, partner-focused (not salesy)"
    ]
  }
}'::jsonb);

-- Quest 8: Template Systems
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'template-systems',
'Template Systems',
'Build reusable design systems with AI',
'advanced', 30, 225, 'lesson', 7, true,
'{
  "theory": "<h2>Building Template Systems</h2><p>Templates multiply your productivity. Create once, reuse infinitely with AI-assisted customization.</p><h3>Template Types Worth Building</h3><ul><li><strong>Presentation templates</strong> - Company deck, client deck, training</li><li><strong>Document templates</strong> - Proposals, reports, SOWs</li><li><strong>Email templates</strong> - Outreach sequences, responses</li><li><strong>Social templates</strong> - Post types, stories</li><li><strong>Content templates</strong> - Blog structures, scripts</li></ul><h3>Template Anatomy</h3><ol><li><strong>Fixed elements</strong> - Logo, colors, fonts (never change)</li><li><strong>Semi-fixed</strong> - Section headers, layouts (rarely change)</li><li><strong>Variable</strong> - Content, images, data (always change)</li></ol><h3>AI Prompt for Template Creation</h3><pre>Create a reusable template system for [document type].\n\nPurpose: [what it''s used for]\nFrequency: [how often used]\nUsers: [who will fill it in]\n\nProvide:\n- Fixed elements\n- Variable fields with placeholder text\n- Instructions for each section\n- Variation options\n- Example filled-in version</pre><h3>Template Documentation</h3><p>Each template needs:</p><ul><li>Purpose and use case</li><li>Step-by-step instructions</li><li>Examples of good vs. bad</li><li>Where to find assets</li></ul>",
  "practice": {
    "instructions": "<p>Create a template system.</p><h3>Scenario:</h3><p>Your team gives monthly client update presentations. They currently create from scratch each time, leading to inconsistency and wasted hours.</p><h3>Your Task:</h3><p>Write a prompt to create a reusable monthly client update template system.</p>",
    "hints": [
      "Think about what stays the same every month",
      "Consider different client types or situations",
      "Include guidance for presenters"
    ],
    "examples": [
      "Create a reusable template system for monthly client update presentations.\n\nCONTEXT:\n- Agency gives monthly updates to 15 clients\n- Currently takes 2-3 hours each to create\n- Inconsistent quality and branding\n- Multiple team members create these\n\nGOALS:\n- Reduce creation time to 30 minutes\n- Ensure brand consistency\n- Make it easy for anyone to use\n\n---\n\nProvide:\n\n1. TEMPLATE STRUCTURE\n- Slide-by-slide breakdown\n- Which slides are always included vs. optional\n- Order flexibility rules\n\n2. FIXED ELEMENTS\n- Branding (where logos go, colors)\n- Font rules\n- Layout grids\n\n3. VARIABLE FIELDS\nFor each section:\n- Placeholder text (that guides the user)\n- Character/length limits\n- Examples of good content\n- Common mistakes to avoid\n\n4. SLIDE VARIATIONS\n- Different versions for different client types\n- When to use each variation\n- How to choose\n\n5. INSTRUCTIONS DOCUMENT\n- Step-by-step process\n- Time estimate per section\n- Where to get data/assets\n- Review checklist\n\n6. EXAMPLE SLIDES\n- Show 3 completed slide examples\n- Annotate what makes them good\n\n7. CUSTOMIZATION GUIDE\n- What CAN be changed (safely)\n- What should NEVER change\n- How to request new variations\n\nDELIVERABLE FORMAT: Template deck + 1-page instruction guide"
    ]
  }
}'::jsonb);

-- Quest 9: Design System Boss Quest
INSERT INTO quests (subtrack_id, slug, title, description, difficulty, estimated_minutes, xp_reward, quest_type, order_index, is_published, content) VALUES
((SELECT id FROM subtracks WHERE slug = 'presentations-design'),
'design-system-boss',
'Complete Design System',
'Build a comprehensive AI-assisted design system',
'advanced', 45, 350, 'boss', 8, true,
'{
  "theory": "<h2>The Complete Design System</h2><p>A design system is your visual brand operating system. It ensures everything looks cohesive and saves countless hours.</p><h3>Design System Components</h3><ul><li><strong>Brand foundations</strong> - Mission, values, personality</li><li><strong>Visual identity</strong> - Logo, colors, typography</li><li><strong>Design tokens</strong> - Spacing, sizing, shadows</li><li><strong>Components</strong> - Buttons, cards, forms</li><li><strong>Patterns</strong> - Page layouts, navigation</li><li><strong>Templates</strong> - Ready-to-use documents</li><li><strong>Guidelines</strong> - Usage rules</li></ul><h3>AI for Design Systems</h3><p>AI can help with:</p><ul><li>Generating color palette variations</li><li>Writing component documentation</li><li>Creating usage examples</li><li>Identifying inconsistencies</li><li>Generating template content</li></ul><h3>Documenting Your System</h3><pre>Document this design element: [element]\n\nProvide:\n- Definition and purpose\n- When to use / when not to use\n- Visual examples (describe)\n- Code/implementation notes if applicable\n- Accessibility considerations\n- Common mistakes</pre>",
  "practice": {
    "instructions": "<p>This is your Boss Quest! Create a mini design system.</p><h3>The Challenge:</h3><p>Create a design system brief for a fictional company called ''Streamline'' - a B2B project management SaaS.</p><h3>Deliver:</h3><ol><li>Brand foundations (personality, voice)</li><li>Color system (primary, secondary, semantic colors)</li><li>Typography system (headings, body, code)</li><li>3 component specifications (button, card, alert)</li><li>2 page layout patterns (dashboard, settings)</li><li>Documentation template</li></ol>",
    "hints": [
      "B2B SaaS = professional, trustworthy, efficient",
      "Project management = organized, clear, productive",
      "Think about accessibility from the start"
    ],
    "examples": [
      "Create a complete mini design system for Streamline B2B project management SaaS.\n\nCOMPANY CONTEXT:\n- B2B SaaS for project management\n- Target: Mid-size companies (50-500 employees)\n- Competitors: Asana, Monday, ClickUp\n- Positioning: Simpler, less overwhelming, focused on what matters\n- Values: Clarity, efficiency, collaboration, reliability\n\n---\n\nDELIVERABLES:\n\n1. BRAND FOUNDATIONS\n- Brand personality (5 traits with explanations)\n- Brand voice and tone guide\n- Key messaging pillars\n- Dos and don''ts\n\n2. COLOR SYSTEM\n- Primary palette (main brand color + variations)\n- Secondary palette (complementary colors)\n- Semantic colors (success, warning, error, info)\n- Neutral palette (grays)\n- For each color: hex code, usage, accessibility notes\n\n3. TYPOGRAPHY SYSTEM\n- Font family recommendations (heading + body)\n- Type scale (sizes for H1-H6, body, small, caption)\n- Line heights\n- Font weights usage\n- Code/monospace font\n\n4. COMPONENT SPECIFICATIONS (3)\n\nA. BUTTON COMPONENT\n- Variants (primary, secondary, outline, text)\n- States (default, hover, active, disabled, loading)\n- Sizes (sm, md, lg)\n- Icon usage rules\n- Accessibility requirements\n\nB. CARD COMPONENT\n- Variants (default, interactive, elevated)\n- Anatomy (header, body, footer, media)\n- Spacing tokens\n- When to use vs. alternatives\n\nC. ALERT COMPONENT\n- Types (info, success, warning, error)\n- Variants (inline, banner, toast)\n- Icon usage\n- Dismissibility rules\n\n5. PAGE LAYOUT PATTERNS (2)\n\nA. DASHBOARD LAYOUT\n- Header, sidebar, main content areas\n- Responsive behavior\n- Navigation patterns\n- Widget grid system\n\nB. SETTINGS LAYOUT\n- Side navigation for sections\n- Form layout patterns\n- Save/cancel patterns\n\n6. DOCUMENTATION TEMPLATE\n- Structure for documenting new components\n- Required sections\n- Example format\n\n---\n\nFORMAT: Present as a design system document with clear sections, visual descriptions where helpful, and practical usage guidelines.\n\nTONE: Professional but not stuffy, practical, designer-friendly"
    ]
  }
}'::jsonb);

-- Update documentation with quest counts
-- Total: 25 quests (8 + 8 + 9)
