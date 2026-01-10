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