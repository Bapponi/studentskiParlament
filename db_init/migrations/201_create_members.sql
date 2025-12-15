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