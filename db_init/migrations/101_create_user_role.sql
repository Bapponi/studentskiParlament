CREATE TABLE IF NOT EXISTS public.user_role (
    id integer NOT NULL DEFAULT nextval('userrole_id_seq'::regclass),
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT userrole_pkey PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.user_role OWNER to postgres;