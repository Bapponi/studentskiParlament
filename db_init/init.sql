-- -----------------------------------------------------------
-- SEQUENCE CREATION
-- -----------------------------------------------------------
CREATE SEQUENCE links_id_seq START 1;
CREATE SEQUENCE materials_id_seq START 1;
CREATE SEQUENCE member_id_seq START 1;
CREATE SEQUENCE news_id_seq START 1;
CREATE SEQUENCE news_section_id_seq START 1;
CREATE SEQUENCE password_reset_tokens_id_seq START 1;
CREATE SEQUENCE poll_options_id_seq START 1;
CREATE SEQUENCE polls_id_seq START 1;
CREATE SEQUENCE userrole_id_seq START 1;
CREATE SEQUENCE votes_id_seq START 1;

-- -----------------------------------------------------------
-- SCHEMA CREATION (Ordered by dependency)
-- -----------------------------------------------------------

-- 1. Base Tables (user_role, news, polls - needed by others)
CREATE TABLE IF NOT EXISTS public.user_role (
    id integer NOT NULL DEFAULT nextval('userrole_id_seq'::regclass),
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT userrole_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.user_role OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.news (
    id integer NOT NULL DEFAULT nextval('news_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    banner character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT '../ztf.png'::character varying,
    clip character varying(255) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT news_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.news OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.polls (
    id integer NOT NULL DEFAULT nextval('polls_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL DEFAULT true,
    CONSTRAINT polls_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.polls OWNER to postgres;

-- 2. Tables dependent on user_role
CREATE TABLE IF NOT EXISTS public.members (
    id integer NOT NULL DEFAULT nextval('member_id_seq'::regclass),
    "position" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    bio text COLLATE pg_catalog."default",
    member_img character varying(255) COLLATE pg_catalog."default",
    role_id integer NOT NULL,
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT member_pkey PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY (role_id)
        REFERENCES public.user_role (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.members OWNER to postgres;

-- 3. Tables dependent on news
CREATE TABLE IF NOT EXISTS public.news_sections (
    id integer NOT NULL DEFAULT nextval('news_section_id_seq'::regclass),
    type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    news_id integer NOT NULL,
    ordering integer NOT NULL,
    CONSTRAINT news_section_pkey PRIMARY KEY (id),
    CONSTRAINT news_section_news_id_fkey FOREIGN KEY (news_id)
        REFERENCES public.news (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);
ALTER TABLE IF EXISTS public.news_sections OWNER to postgres;

-- 4. Tables dependent on polls
CREATE TABLE IF NOT EXISTS public.poll_options (
    id integer NOT NULL DEFAULT nextval('poll_options_id_seq'::regclass),
    option_name text COLLATE pg_catalog."default" NOT NULL,
    poll_id integer NOT NULL,
    votes_num integer NOT NULL DEFAULT 0,
    CONSTRAINT poll_options_pkey PRIMARY KEY (id),
    CONSTRAINT poll_options_poll_id_fkey FOREIGN KEY (poll_id)
        REFERENCES public.polls (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.poll_options OWNER to postgres;

-- 5. Tables dependent on members and/or polls
CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
    id integer NOT NULL DEFAULT nextval('password_reset_tokens_id_seq'::regclass),
    user_id integer NOT NULL,
    token character varying(64) COLLATE pg_catalog."default" NOT NULL,
    expiration timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.members (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE CASCADE
);
ALTER TABLE IF EXISTS public.password_reset_tokens OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.votes (
    id integer NOT NULL DEFAULT nextval('votes_id_seq'::regclass),
    poll_id integer NOT NULL,
    member_id integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT votes_pkey PRIMARY KEY (id),
    CONSTRAINT votes_id_member_fkey FOREIGN KEY (member_id)
        REFERENCES public.members (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT votes_id_poll_fkey FOREIGN KEY (poll_id)
        REFERENCES public.polls (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.votes OWNER to postgres;

-- 6. Simple tables (links, materials)
CREATE TABLE IF NOT EXISTS public.links (
    id integer NOT NULL DEFAULT nextval('links_id_seq'::regclass),
    logo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    website character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT links_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.links OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.materials (
    id integer NOT NULL DEFAULT nextval('materials_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    document_link character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT materials_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.materials OWNER to postgres;


-- -----------------------------------------------------------
-- DATA INSERTION
-- -----------------------------------------------------------

-- User Role Data
INSERT INTO public.user_role (id, role) VALUES 
(1, 'администратор'),
(2, 'студент продекан'),
(3, 'члан');
SELECT setval('userrole_id_seq', (SELECT MAX(id) FROM public.user_role));

-- Member Data
INSERT INTO public.members ("position", name, bio, member_img, role_id, email, password) VALUES
('члан', 'Соња Војиновић', NULL, NULL, 3, 'korisnik5', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Рајко Лапчевић', NULL, NULL, 3, 'korisnik2', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Анастасија Глигоров', NULL, NULL, 3, 'korisnik3', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Лука Царевић', NULL, NULL, 3, 'korisnik4', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Лазар Вујчић', NULL, NULL, 3, 'korisnik6', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Ена Грубор', NULL, NULL, 3, 'korisnik7', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Милица Стефановић', NULL, NULL, 3, 'korisnik8', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Андреј Донев', NULL, NULL, 3, 'korisnik9', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Лазар Бељић', NULL, NULL, 3, 'korisnik10', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Анђела Нинковић', NULL, NULL, 3, 'korisnik11', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Вукашин Јевремовић', NULL, NULL, 3, 'korisnik12', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Милан Тошић', NULL, NULL, 3, 'korisnik13', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Лука Томовић', NULL, NULL, 3, 'korisnik14', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Сара Гојковић', NULL, NULL, 3, 'korisnik15', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Босиљка Радовановић', NULL, NULL, 3, 'korisnik16', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Вељко Гајић', NULL, NULL, 3, 'korisnik17', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Томислав Беновић', NULL, NULL, 3, 'korisnik1@gmail.com', NULL),
('председник', 'Станко Вуковић', 'Биографија корисника овде треба да се налази и да се састоји од око 2 реченице, не више.', 'http://localhost:8000/uploads/members/1720624305175-person.png', 1, 'aleksandarbubalo99@gmail.com', '$2a$10$XrmeMpjuApbrajUwAAGXyOf3.f2GZZlT0R4AclAQC6s461qM7GJgW'),
('заменик председник', 'Душан Калуђеровић', 'Биографија корисника овде треба да се налази и да се састоји од око 2 реченице, не више.', 'http://localhost:8000/uploads/members/1720553429283-person.png', 1, 'pr@awdad.com', '$2a$10$gM1na5QXz.L755CFwvl.I.iVcDwjhAM5XsdV9Xu3M8anDQ/P4A8.K'),
('члан', 'Никола Лапчевић', NULL, NULL, 3, 'markobubalo1605@gmail.com', '$2a$10$w4pqqL4Gc7dMNDtqDw8RHuxMievfkFgHEnp58q4mM9jQJ3nTdkJfC');
SELECT setval('member_id_seq', (SELECT MAX(id) FROM public.members));

-- Links Data
INSERT INTO public.links (logo, website, name) VALUES
('http://localhost:8000/uploads/links/1719513467825-etf-logo__old.png', 'https://www.etf.bg.ac.rs/', 'Електротехнички факултет'),
('http://localhost:8000/uploads/links/1719513515341-eestec-logo.png', 'http://eestec.etf.rs/', 'ИСТЕК Београд'),
('http://localhost:8000/uploads/links/1719513561324-best-logo.png', 'https://best.rs/', 'БЕСТ Београд'),
('http://localhost:8000/uploads/links/1719513578384-elektron-logo.png', 'https://elektron.org.rs/', 'Електрон'),
('http://localhost:8000/uploads/links/1719513603633-ieee-logo.png', 'https://www.ieee.org/', 'ИЕЕЕ');
SELECT setval('links_id_seq', (SELECT MAX(id) FROM public.links));

-- Materials Data
INSERT INTO public.materials (title, document_link) VALUES
('Правилник студентског парламента', 'http://localhost:8000/uploads/materials/1723823670137-pravilinik_studentskog_parlamenta.pdf'),
('Пословник студентског парламента', 'http://localhost:8000/uploads/materials/1719840198575-poslovnik.pdf'),
('Правилник о одржавању избора за студентски парламент', 'http://localhost:8000/uploads/materials/1719840347556-pravilnik_o_odrzavanju_izbora_za_studentski_parlament.pdf'),
('Биографија предложеног кандидата за студента продекана', 'http://localhost:8000/uploads/materials/1723823787597-biografija.pdf'),
('Правилник о предлагању и правима и обавезама студента продекана', 'http://localhost:8000/uploads/materials/1719840377238-pravilnik_o_predlaganju_i_pravima_i_obavezama_studenta_prodekana.pdf');
SELECT setval('materials_id_seq', (SELECT MAX(id) FROM public.materials));

-- Placeholder Data for News and Polls (as you had no initial data for these)
-- Adding minimal placeholder data ensures tables exist and basic queries don't fail immediately.
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