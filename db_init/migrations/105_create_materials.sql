CREATE TABLE IF NOT EXISTS public.materials (
    id integer NOT NULL DEFAULT nextval('materials_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    document_link character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT materials_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.materials OWNER to postgres;