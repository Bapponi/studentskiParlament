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