CREATE TABLE IF NOT EXISTS public.polls (
    id integer NOT NULL DEFAULT nextval('polls_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL DEFAULT true,
    CONSTRAINT polls_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.polls OWNER to postgres;