INSERT INTO public.courses (course_id, title, required_lessons) VALUES
('midjourney','Midjourney',12),('dall-e','DALL·E',8),('notion-ai','Notion AI',9),('canva-ai','Canva AI',8),('copy-ai','Copy.ai',7),('perplexity','Perplexity AI',8),('ai-business','AI for Business',14)
ON CONFLICT (course_id) DO UPDATE SET title = EXCLUDED.title, required_lessons = EXCLUDED.required_lessons;