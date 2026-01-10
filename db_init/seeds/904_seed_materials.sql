INSERT INTO public.materials (title, document_link) VALUES
('Правилник студентског парламента', 'http://localhost:8000/uploads/materials/1723823670137-pravilinik_studentskog_parlamenta.pdf'),
('Пословник студентског парламента', 'http://localhost:8000/uploads/materials/1719840198575-poslovnik.pdf'),
('Правилник о одржавању избора за студентски парламент', 'http://localhost:8000/uploads/materials/1719840347556-pravilnik_o_odrzavanju_izbora_za_studentski_parlament.pdf'),
('Биографија предложеног кандидата за студента продекана', 'http://localhost:8000/uploads/materials/1723823787597-biografija.pdf'),
('Правилник о предлагању и правима и обавезама студента продекана', 'http://localhost:8000/uploads/materials/1719840377238-pravilnik_o_predlaganju_i_pravima_i_obavezama_studenta_prodekana.pdf');
SELECT setval('materials_id_seq', (SELECT MAX(id) FROM public.materials));