CREATE TABLE IF NOT EXISTS public.news (
    id integer NOT NULL DEFAULT nextval('news_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    banner character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT '../ztf.png'::character varying,
    clip character varying(255) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT news_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.news OWNER to postgres;