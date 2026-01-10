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