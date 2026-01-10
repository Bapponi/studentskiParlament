INSERT INTO public.user_role (id, role) VALUES 
(1, 'администратор'),
(2, 'студент продекан'),
(3, 'члан');
SELECT setval('userrole_id_seq', (SELECT MAX(id) FROM public.user_role));