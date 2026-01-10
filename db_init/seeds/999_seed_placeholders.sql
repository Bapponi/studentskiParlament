INSERT INTO public.news (id, title, clip) VALUES
(1, 'Прва вест (Placeholder)', 'Ово је клип прве вести.');
SELECT setval('news_id_seq', (SELECT MAX(id) FROM public.news));

INSERT INTO public.polls (id, title, active) VALUES
(1, 'Пример анкете (Placeholder)', TRUE);
SELECT setval('polls_id_seq', (SELECT MAX(id) FROM public.polls));

INSERT INTO public.poll_options (option_name, poll_id, votes_num) VALUES
('Опција 1', 1, 0),
('Опција 2', 1, 0);
SELECT setval('poll_options_id_seq', (SELECT MAX(id) FROM public.poll_options));