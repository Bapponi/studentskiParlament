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