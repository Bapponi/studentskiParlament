CREATE TABLE IF NOT EXISTS public.links (
    id integer NOT NULL DEFAULT nextval('links_id_seq'::regclass),
    logo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    website character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT links_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.links OWNER to postgres;