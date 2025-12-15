INSERT INTO public.links (logo, website, name) VALUES
('http://localhost:8000/uploads/links/1719513467825-etf-logo__old.png', 'https://www.etf.bg.ac.rs/', 'Електротехнички факултет'),
('http://localhost:8000/uploads/links/1719513515341-eestec-logo.png', 'http://eestec.etf.rs/', 'ИСТЕК Београд'),
('http://localhost:8000/uploads/links/1719513561324-best-logo.png', 'https://best.rs/', 'БЕСТ Београд'),
('http://localhost:8000/uploads/links/1719513578384-elektron-logo.png', 'https://elektron.org.rs/', 'Електрон'),
('http://localhost:8000/uploads/links/1719513603633-ieee-logo.png', 'https://www.ieee.org/', 'ИЕЕЕ');
SELECT setval('links_id_seq', (SELECT MAX(id) FROM public.links));