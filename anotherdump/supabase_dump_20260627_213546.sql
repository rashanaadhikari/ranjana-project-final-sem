--
-- PostgreSQL database dump
--

\restrict 9MisBr6LbURX5o4zv70R8yfDeBoSVH6PsLjtHTmUKIxzRPPQxF56EbmhcH6eHYt

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA auth;


--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA extensions;


--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql;


--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql_public;


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pgbouncer;


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA realtime;


--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA storage;


--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA vault;


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


--
-- Name: booking_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.booking_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'cancelled'
);


--
-- Name: room_type_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.room_type_enum AS ENUM (
    'Single Room',
    '2/3 Rooms Flat',
    '1 BHK',
    '2 BHK',
    '3 BHK',
    'Office Space',
    'Business Shutter'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: action; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in',
    'like',
    'ilike',
    'is',
    'match',
    'imatch',
    'isdistinct'
);


--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: -
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: graphql(text, text, jsonb, jsonb); Type: FUNCTION; Schema: graphql_public; Owner: -
--

CREATE FUNCTION graphql_public.graphql("operationName" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: -
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
    -- Regclass of the table e.g. public.notes
    entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

    -- I, U, D, T: insert, update ...
    action realtime.action = (
        case wal ->> 'action'
            when 'I' then 'INSERT'
            when 'U' then 'UPDATE'
            when 'D' then 'DELETE'
            else 'ERROR'
        end
    );

    -- Is row level security enabled for the table
    is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

    subscriptions realtime.subscription[] = array_agg(subs)
        from
            realtime.subscription subs
        where
            subs.entity = entity_
            -- Filter by action early - only get subscriptions interested in this action
            -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
            and (subs.action_filter = '*' or subs.action_filter = action::text);

    -- Subscription vars
    working_role regrole;
    working_selected_columns text[];
    claimed_role regrole;
    claims jsonb;

    subscription_id uuid;
    subscription_has_access bool;
    visible_to_subscription_ids uuid[] = '{}';

    -- structured info for wal's columns
    columns realtime.wal_column[];
    -- previous identity values for update/delete
    old_columns realtime.wal_column[];

    error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

    -- Primary jsonb output for record
    output jsonb;

    -- Loop record for iterating unique roles (outer loop)
    role_record record;
    -- Loop record for iterating unique selected_columns within a role (inner loop)
    cols_record record;
    -- Subscription ids visible at the role level (before fanning out by selected_columns)
    visible_role_sub_ids uuid[] = '{}';

begin
    perform set_config('role', null, true);

    columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'columns') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    old_columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'identity') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    for role_record in
        select claims_role
        from (select distinct claims_role from unnest(subscriptions)) t
        order by claims_role::text
    loop
        working_role := role_record.claims_role;

        -- Update `is_selectable` for columns and old_columns (once per role)
        columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(columns) c;

        old_columns =
                array_agg(
                    (
                        c.name,
                        c.type_name,
                        c.type_oid,
                        c.value,
                        c.is_pkey,
                        pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                    )::realtime.wal_column
                )
                from
                    unnest(old_columns) c;

        if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
            -- Fan out 400 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 400: Bad Request, no primary key']
                )::realtime.wal_rls;
            end loop;

        -- The claims role does not have SELECT permission to the primary key of entity
        elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
            -- Fan out 401 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 401: Unauthorized']
                )::realtime.wal_rls;
            end loop;

        else
            -- Create the prepared statement (once per role)
            if is_rls_enabled and action <> 'DELETE' then
                if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                    deallocate walrus_rls_stmt;
                end if;
                execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
            end if;

            -- Collect all visible subscription IDs for this role (filter check + RLS check)
            visible_role_sub_ids = '{}';

            for subscription_id, claims in (
                    select
                        subs.subscription_id,
                        subs.claims
                    from
                        unnest(subscriptions) subs
                    where
                        subs.entity = entity_
                        and subs.claims_role = working_role
                        and (
                            realtime.is_visible_through_filters(columns, subs.filters)
                            or (
                              action = 'DELETE'
                              and realtime.is_visible_through_filters(old_columns, subs.filters)
                            )
                        )
            ) loop

                if not is_rls_enabled or action = 'DELETE' then
                    visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                else
                    -- Check if RLS allows the role to see the record
                    perform
                        -- Trim leading and trailing quotes from working_role because set_config
                        -- doesn't recognize the role as valid if they are included
                        set_config('role', trim(both '"' from working_role::text), true),
                        set_config('request.jwt.claims', claims::text, true);

                    execute 'execute walrus_rls_stmt' into subscription_has_access;

                    if subscription_has_access then
                        visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                    end if;
                end if;
            end loop;

            perform set_config('role', null, true);

            -- Inner loop: per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;

                output = jsonb_build_object(
                    'schema', wal ->> 'schema',
                    'table', wal ->> 'table',
                    'type', action,
                    'commit_timestamp', to_char(
                        ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                        'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
                    ),
                    'columns', (
                        select
                            jsonb_agg(
                                jsonb_build_object(
                                    'name', pa.attname,
                                    'type', pt.typname
                                )
                                order by pa.attnum asc
                            )
                        from
                            pg_attribute pa
                            join pg_type pt
                                on pa.atttypid = pt.oid
                            left join (
                                select unnest(conkey) as pkey_attnum
                                from pg_constraint
                                where conrelid = entity_ and contype = 'p'
                            ) pk on pk.pkey_attnum = pa.attnum
                        where
                            attrelid = entity_
                            and attnum > 0
                            and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
                            and (working_selected_columns is null or pa.attname = any(working_selected_columns) or pk.pkey_attnum is not null)
                    )
                )
                -- Add "record" key for insert and update
                || case
                    when action in ('INSERT', 'UPDATE') then
                        jsonb_build_object(
                            'record',
                            (
                                select
                                    jsonb_object_agg(
                                        -- if unchanged toast, get column name and value from old record
                                        coalesce((c).name, (oc).name),
                                        case
                                            when (c).name is null then (oc).value
                                            else (c).value
                                        end
                                    )
                                from
                                    unnest(columns) c
                                    full outer join unnest(old_columns) oc
                                        on (c).name = (oc).name
                                where
                                    coalesce((c).is_selectable, (oc).is_selectable)
                                    and (working_selected_columns is null or coalesce((c).name, (oc).name) = any(working_selected_columns) or coalesce((c).is_pkey, (oc).is_pkey))
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            )
                        )
                    else '{}'::jsonb
                end
                -- Add "old_record" key for update and delete
                || case
                    when action = 'UPDATE' then
                        jsonb_build_object(
                                'old_record',
                                (
                                    select jsonb_object_agg((c).name, (c).value)
                                    from unnest(old_columns) c
                                    where
                                        (c).is_selectable
                                        and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                        and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                )
                            )
                    when action = 'DELETE' then
                        jsonb_build_object(
                            'old_record',
                            (
                                select jsonb_object_agg((c).name, (c).value)
                                from unnest(old_columns) c
                                where
                                    (c).is_selectable
                                    and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                    and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                            )
                        )
                    else '{}'::jsonb
                end;

                -- Filter visible_role_sub_ids to those matching the current selected_columns group
                visible_to_subscription_ids = coalesce(
                    (
                        select array_agg(s.subscription_id)
                        from unnest(subscriptions) s
                        where s.claims_role = working_role
                          and (s.selected_columns is not distinct from working_selected_columns)
                          and s.subscription_id = any(visible_role_sub_ids)
                    ),
                    '{}'::uuid[]
                );

                return next (
                    output,
                    is_rls_enabled,
                    visible_to_subscription_ids,
                    case
                        when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                        else '{}'
                    end
                )::realtime.wal_rls;
            end loop;

        end if;
    end loop;

    perform set_config('role', null, true);
end;
$$;


--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
/*
Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
*/
declare
    op_symbol text = (
        case
            when op = 'eq' then '='
            when op = 'neq' then '!='
            when op = 'lt' then '<'
            when op = 'lte' then '<='
            when op = 'gt' then '>'
            when op = 'gte' then '>='
            when op = 'in' then '= any'
            else 'UNKNOWN OP'
        end
    );
    res boolean;
begin
    execute format(
        'select %L::'|| type_::text || ' ' || op_symbol
        || ' ( %L::'
        || (
            case
                when op = 'in' then type_::text || '[]'
                else type_::text end
        )
        || ')', val_1, val_2) into res;
    return res;
end;
$$;


--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
/*
Should the record be visible (true) or filtered out (false) after *filters* are applied
*/
    select
        -- Default to allowed when no filters present
        $2 is null -- no filters. this should not happen because subscriptions has a default
        or array_length($2, 1) is null -- array length of an empty array is null
        or bool_and(
            coalesce(
                realtime.check_equality_op(
                    op:=f.op,
                    type_:=coalesce(
                        col.type_oid::regtype, -- null when wal2json version <= 2.4
                        col.type_name::regtype
                    ),
                    -- cast jsonb to text
                    val_1:=col.value #>> '{}',
                    val_2:=f.value
                ),
                false -- if null, filter does not match
            )
        )
    from
        unnest(filters) f
        join unnest(columns) col
            on f.column_name = col.name;
$_$;


--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS TABLE(wal jsonb, is_rls_enabled boolean, subscription_ids uuid[], errors text[], slot_changes_count bigint)
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
  WITH pub AS (
    SELECT
      concat_ws(
        ',',
        CASE WHEN bool_or(pubinsert) THEN 'insert' ELSE NULL END,
        CASE WHEN bool_or(pubupdate) THEN 'update' ELSE NULL END,
        CASE WHEN bool_or(pubdelete) THEN 'delete' ELSE NULL END
      ) AS w2j_actions,
      coalesce(
        string_agg(
          realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
          ','
        ) filter (WHERE ppt.tablename IS NOT NULL),
        ''
      ) AS w2j_add_tables
    FROM pg_publication pp
    LEFT JOIN pg_publication_tables ppt ON pp.pubname = ppt.pubname
    WHERE pp.pubname = publication
    GROUP BY pp.pubname
    LIMIT 1
  ),
  -- MATERIALIZED ensures pg_logical_slot_get_changes is called exactly once
  w2j AS MATERIALIZED (
    SELECT x.*, pub.w2j_add_tables
    FROM pub,
         pg_logical_slot_get_changes(
           slot_name, null, max_changes,
           'include-pk', 'true',
           'include-transaction', 'false',
           'include-timestamp', 'true',
           'include-type-oids', 'true',
           'format-version', '2',
           'actions', pub.w2j_actions,
           'add-tables', pub.w2j_add_tables
         ) x
  ),
  slot_count AS (
    SELECT count(*)::bigint AS cnt
    FROM w2j
    WHERE w2j.w2j_add_tables <> ''
  ),
  rls_filtered AS (
    SELECT xyz.wal, xyz.is_rls_enabled, xyz.subscription_ids, xyz.errors
    FROM w2j,
         realtime.apply_rls(
           wal := w2j.data::jsonb,
           max_record_bytes := max_record_bytes
         ) xyz(wal, is_rls_enabled, subscription_ids, errors)
    WHERE w2j.w2j_add_tables <> ''
      AND xyz.subscription_ids[1] IS NOT NULL
  )
  SELECT rf.wal, rf.is_rls_enabled, rf.subscription_ids, rf.errors, sc.cnt
  FROM rls_filtered rf, slot_count sc

  UNION ALL

  SELECT null, null, null, null, sc.cnt
  FROM slot_count sc
  WHERE NOT EXISTS (SELECT 1 FROM rls_filtered)
$$;


--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  SELECT
    realtime.wal2json_escape_identifier(nsp.nspname::text)
    || '.'
    || realtime.wal2json_escape_identifier(pc.relname::text)
  FROM pg_class pc
  JOIN pg_namespace nsp ON pc.relnamespace = nsp.oid
  WHERE pc.oid = entity
$$;


--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: send_binary(bytea, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, binary_payload, event, topic, private, extension)
    VALUES (generated_id, payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
    col_names text[] = coalesce(
            array_agg(a.attname order by a.attnum),
            '{}'::text[]
        )
        from
            pg_catalog.pg_attribute a
        where
            a.attrelid = new.entity
            and a.attnum > 0
            and not a.attisdropped
            and pg_catalog.has_column_privilege(
                (new.claims ->> 'role'),
                a.attrelid,
                a.attnum,
                'SELECT'
            );
    filter realtime.user_defined_filter;
    col_type regtype;
    in_val jsonb;
    selected_col text;
begin
    for filter in select * from unnest(new.filters) loop
        if not filter.column_name = any(col_names) then
            raise exception 'invalid column for filter %', filter.column_name;
        end if;

        col_type = (
            select atttypid::regtype
            from pg_catalog.pg_attribute
            where attrelid = new.entity
                  and attname = filter.column_name
        );
        if col_type is null then
            raise exception 'failed to lookup type for column %', filter.column_name;
        end if;

        if filter.op = 'in'::realtime.equality_op then
            in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
            if coalesce(jsonb_array_length(in_val), 0) > 100 then
                raise exception 'too many values for `in` filter. Maximum 100';
            end if;
        else
            perform realtime.cast(filter.value, col_type);
        end if;
    end loop;

    if new.selected_columns is not null then
        for selected_col in select * from unnest(new.selected_columns) loop
            if not selected_col = any(col_names) then
                raise exception 'invalid column for select %', selected_col;
            end if;
        end loop;
    end if;

    new.filters = coalesce(
        array_agg(f order by f.column_name, f.op, f.value),
        '{}'
    ) from unnest(new.filters) f;

    new.selected_columns = (
        select array_agg(c order by c)
        from unnest(new.selected_columns) c
    );

    return new;
end;
$$;


--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


--
-- Name: wal2json_escape_identifier(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.wal2json_escape_identifier(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  -- Prefix `\`, `,`, `.`, and any whitespace with `\`
  SELECT regexp_replace(name, '([\\,.[:space:]])', '\\\1', 'g')
$$;


--
-- Name: allow_any_operation(text[]); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.allow_any_operation(expected_operations text[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT CASE
      WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
      ELSE raw_operation
    END AS current_operation
    FROM current_operation
  )
  SELECT EXISTS (
    SELECT 1
    FROM normalized n
    CROSS JOIN LATERAL unnest(expected_operations) AS expected_operation
    WHERE expected_operation IS NOT NULL
      AND expected_operation <> ''
      AND n.current_operation = CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END
  );
$$;


--
-- Name: allow_only_operation(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.allow_only_operation(expected_operation text) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT
      CASE
        WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
        ELSE raw_operation
      END AS current_operation,
      CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END AS requested_operation
    FROM current_operation
  )
  SELECT CASE
    WHEN requested_operation IS NULL OR requested_operation = '' THEN FALSE
    ELSE COALESCE(current_operation = requested_operation, FALSE)
  END
  FROM normalized;
$$;


--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Get the last path segment (the actual filename)
    SELECT _parts[array_length(_parts, 1)] INTO _filename;
    -- Extract extension: reverse, split on '.', then reverse again
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint)::bigint as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: -
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: -
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


--
-- Name: blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blogs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    author_id uuid NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text,
    content text,
    blog_image text,
    is_published boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: favourites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favourites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    property_id uuid,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    full_name text NOT NULL,
    email text NOT NULL,
    phone_number text,
    subject text NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    owner_id uuid,
    title text NOT NULL,
    description text,
    room_type public.room_type_enum NOT NULL,
    room_type_slug text NOT NULL,
    price_per_month integer NOT NULL,
    bedrooms integer DEFAULT 1,
    kitchens integer DEFAULT 1,
    floor_number text,
    is_living_room_available boolean DEFAULT true,
    rent_design text,
    tags text,
    detailed_address text,
    rating numeric(2,1) DEFAULT 0,
    review_count integer DEFAULT 0,
    image_urls text[] DEFAULT '{}'::text[],
    badge text,
    contact_phone text,
    contact_email text,
    location text NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    rejection_reason text,
    blocked_reason text,
    is_active boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    property_id uuid NOT NULL,
    user_id uuid NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    google_id text,
    role public.user_role DEFAULT 'user'::public.user_role NOT NULL,
    name text,
    email text,
    phone_number text,
    address text,
    is_blocked boolean DEFAULT false NOT NULL,
    blocked_reason text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
)
PARTITION BY RANGE (inserted_at);


--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    selected_columns text[],
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: -
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: objects; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb,
    metadata jsonb
);


--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
498ed734-6e22-44b0-bb8c-7f2d1071314d	\N	2293403a-2afa-4f83-bcc5-4c16ced5f6ea	s256	u1EGfwVLDEaaKI6a8R3GxIOPiJzmHw3bOlRzJ2LvQfE	google			2026-04-10 04:25:20.794608+00	2026-04-10 04:25:20.794608+00	oauth	\N	\N	https://ss-rental.vercel.app/auth/login?callback=true	\N	\N	f
983b9764-bc6b-41c6-a58b-c1dce78ecd4f	\N	7047a6ad-43f2-4079-bf65-089a5d3c0502	s256	LUSo1b7JAODHZYyqz5jj0UQ7saobCNuvSzETEQuotaQ	google			2026-04-10 05:38:19.948179+00	2026-04-10 05:38:19.948179+00	oauth	\N	\N	https://ss-rental.vercel.app/auth/google-login?callback=true	\N	\N	f
37061f36-b89f-4068-8c98-36c93922b092	3e50868a-d461-4a0f-a2bc-8ba435d3767c	d799a4e7-c9f2-49bf-8f8d-96529b0a675d	s256	aO0qmUz67GpQhnNXaTyqFqmMAg-WgkcOnaUC4_Bh-do	google	ya29.a0Aa7MYiqETZlnHYzQFH8wPpjGODf0CRYYJ30Rmsd3B4-PmrhZl7FFFxdrodikzrrBGQ0F3eQAUZNu9nqKZQcFtRnA7HMKuH8dptclkR3VJyb_RiJ5H2uYkR4PpKLlQvnRiUln5WtmwzDXsC7pWdy6IKT7h0PevEczH6ntQLofSqmoBu0H2Y1JSL48x9hhocB4p0HOWuMYQm73n5pu6VV7UajUUNB0tkl4ml2ZidfxT12uaXlVuEiXr1aUZfyVkmLzw8n_vOF1YJHU4AW67BCK1Vb7nK6kSpYaCgYKAYISARYSFQHGX2Mi5gvXjw5Y4PB3P3R7I26Faw0294		2026-04-09 11:35:58.223423+00	2026-04-09 11:36:03.333909+00	oauth	2026-04-09 11:36:03.333851+00	\N	http://localhost:3000	\N	\N	f
3329bf20-7150-4d9b-88c0-7a8998385fa5	5435da01-ffa3-4aa2-8762-7338c632b64f	5b6f337f-66bf-4d1c-b322-7700ab1786f9	s256	pbUAYtgYbRsWXfiKDvcEIlqO2eSPxLfkXnt9wapp2lU	google	ya29.a0Aa7MYiqAkaVQK1HApty7TNfaJgpSP-PtJXMfXCbehOmB2KReMTvAfW-3-JYeCTldRd1XGdxhRlI3MnhoPnI2v4QCSBNS3v16BzY3DjjhnjVejPzST64pOXipYEA-jROxzbhpwOhjgbBuhVKys-0_LmZBqmSuSOvVu8O8i57dOMZ6nBZLk7iZG5dqT9LHL0LF_cNP-h1KCE1v11i1d9iRDMDMz8Jvx3grXUuokHfDbH0xoSbaAv30qUsbPM51z_gpaetLYdSzoC6inZt5Lx7sr6I8Foa3R2MaCgYKAYoSARASFQHGX2Mi2OknYWDtg6xQdFjqDqpxQA0294		2026-04-09 11:37:45.390254+00	2026-04-09 11:37:51.129406+00	oauth	2026-04-09 11:37:51.12935+00	\N	http://localhost:3000	\N	\N	f
909b2107-edca-48e6-96e9-744602c08908	5435da01-ffa3-4aa2-8762-7338c632b64f	958a2441-d3b2-4580-8421-d6ccfca75395	s256	6ht1ltL6eMDwPnugJaEUpdVIV3VKEjGF-Z6A2W_498Y	google	ya29.a0Aa7MYiq7rSLjvq2HsMhXYSnnR5CvC4r6JcK_EVWhqNwQlC1-uB3pQ9I_FYS7Oec2nkN5DCm95kKLKKUMEGYnr6a9flxv7r3r0gcjtdr8Fb1LDSHQdKzPdba6aCHfh9Ll7QeS3FMnJ7BcUdD_lY3NJK0mhj8x4frhw_wg0XDFQ-qKSFgFXQGPa5CG9ng77upanqOmFCea4qvnDolvjPeZt0n6gXsjfiC0i4J25hJa_McK689ROe6eC3Chg_1O3sVlrtn4y6A0lpFODHqWr1He6KYuk1YzQUIaCgYKAWUSARASFQHGX2Miv6ma3NCilP5v8N-sFtDjMw0294		2026-04-09 11:40:06.204802+00	2026-04-09 11:40:11.153932+00	oauth	2026-04-09 11:40:11.15388+00	\N	http://localhost:3000	\N	\N	f
a8e97ab8-a81d-4688-8b84-ebdf5a06e45c	5435da01-ffa3-4aa2-8762-7338c632b64f	80960654-4724-44f4-97c4-089d4d1ce12e	s256	7NcmlfH_gizObEkx8pywzpXQkgvpwXbqIj_Aahm5wTc	google	ya29.a0Aa7MYioWGpE2jvxrMK4v1zca4AM4M6GdDXj31cUbw911oY7FZNbhEocf5zQiTYSaY9OaBgHvEs5iVHCmf5ls_L2xwUVhcle4poF531pgeCsIzlGLYr1XImCi3Xq6IK8ggT9HfnZYYCSaUjiCTz1k2lcWj5OwrPxfBV8fT89crAZdiJUfRILCi4d0Mqq1sBEZvQYissi00ulZruW4rwrrNx2SUh3cLl3ykS61ImZYltcFOzX71t5rPxp24_69zOScS0-46rDVZe_RZzMaoWkA1aoCy380dwaCgYKAdoSARASFQHGX2Mi9sAUKVvPw9TGZjbnAjThmw0293		2026-04-09 11:48:36.594768+00	2026-04-09 11:48:42.469085+00	oauth	2026-04-09 11:48:42.469032+00	\N	http://localhost:3000	\N	\N	f
8c559783-2f08-4a8a-9085-667a2f8d8f27	c698a53a-399a-48bf-ad36-b44606650f34	ab90e59d-9385-4857-9caa-251cec735674	s256	zAS3X42Zgf4GKCNqUl8rvHdM-WO_YyiNrQZDkd8EvMU	google	ya29.a0Aa7MYipKMxh-C-y7NV6M-_jGplhDQ-I6tGlLWyMInB1zfuBlfxdr6T45Ycq-kBzXy3jhNaEq36jTRZv5E7U9Zg2nm_EjWrsuwtHHaKjaT-4Qz-n1YKVWz0ySz7TJWHA2kGad3B6Ewu_PK__2MVsxesj1KJ9j0z5FfrB8z0qAjzCQKn-pOZEkNbzlW_0vcZ3Eke3kODxCHbQhnBEKs2pLWNolzqhVkwPmEr_kWKxYd5C0QEkE0ZTDED_c1v-WmW8cAWb2Kjf9buHaP8x5VG2AU4j27pEZcUEaCgYKAfYSARcSFQHGX2Mi6c1xG-Dfpcgt2zsAt5shOg0294		2026-04-09 12:02:53.703819+00	2026-04-09 12:03:26.096021+00	oauth	2026-04-09 12:03:26.095967+00	\N	http://localhost:3000	\N	\N	f
6935a349-3758-4c72-a7c4-36c2cae5e120	\N	5e18bd9a-0d08-483d-8495-2c8af78d8752	s256	k1miTZ_t-lMm5GxJu2cFF72s7Zd1rjP-szK354-Frs0	google			2026-04-06 12:13:59.604478+00	2026-04-06 12:13:59.604478+00	oauth	\N	\N	http://localhost:3000/auth/login?callback=true	\N	\N	f
6af5329f-5c15-4237-88a5-7ee00fefa227	3e50868a-d461-4a0f-a2bc-8ba435d3767c	196e9d23-96d2-404a-9d77-04e16bb55a81	s256	k68u4s5CqvNxe21LwjNWyqhf-mgDe0IvD_mCq0rjOLU	google	ya29.a0Aa7MYio7iq5C7wj4s50tbo04c0AXVskxI6zrLWNQPgiMj5W-h0o8mkcBdH_XwnYOuCF_JAecq4lZbgz29VsPlkhYBVqN4xx8CSuflRNVev5xs2L7gP4Zz1ILAYhB1fpmGharEAWOZXmCjK61jLq-7XE3I6tUWOMkZV7uK4ruzV96Vyf3mrWIFUX63y1BOl1_N-o98x2mvPGF1krmgXZI0SC2cthFW2Tdzu5mRewlI-PiZ0KU9s1ExB61KTWar0Alg2dbc8L58lbM6AmXkUwXjJaI9l1oBWIaCgYKAVISARYSFQHGX2MiWzhFgSGTBFIWCZYADxKHOA0294		2026-04-09 12:08:30.504689+00	2026-04-09 12:08:40.067978+00	oauth	2026-04-09 12:08:40.067924+00	\N	http://localhost:3000	\N	\N	f
2fb4d333-16bf-45fa-b3c9-d1d2cbb47341	3e50868a-d461-4a0f-a2bc-8ba435d3767c	32f042ad-6c12-4f14-b408-e92330f05c81	s256	HEs-LVTT7UaIT0dyrrIih5E9dp8YlKel7qpIAxZfW_I	google	ya29.a0Aa7MYiq2dpTsRRahisF8xxN3jRcwO_gkDxOTFWN1WQ2AdKu5JEgwQEGKO09eFSCqRiQrDRGied0Q9Ym0MBaxTj7mxbXwG6if0ToBSi40nc02_X5axXlC-F6IetGY6DJ2bSPkTzvE6NtaznDQtBBvm6vOdImlmvpBxccuxQO-a-O9o5rfJgDnYkGKUqOyK21_nDNr2D4Fzbwpl_XPw9034-czSIF_Xy1L_cIuJ1Rn1W3pGgcXbeAIVge8YQxqVhKa4mgKgFOG26MY2Z9nC3iL4D2sdnzWDcEaCgYKAZoSARYSFQHGX2MiAcU-7tLc3Rkp0JiR4ZRzuw0294		2026-04-09 12:11:43.004381+00	2026-04-09 12:11:47.698321+00	oauth	2026-04-09 12:11:47.698264+00	\N	https://ss-rental.vercel.app	\N	\N	f
288ca792-1dfd-41fa-9277-76b23d2089f4	\N	25e8502e-de2e-4dd4-b65e-fbed32cc5511	s256	LLuCBw5SrunKaBYzXl3onL90SlxBjt77W2kVayWdX7w	google			2026-04-07 05:48:08.729181+00	2026-04-07 05:48:08.729181+00	oauth	\N	\N	http://localhost:3000/auth/login?callback=true	\N	\N	f
9b117d28-3657-4904-89ea-bd0f150b9afb	\N	c953d42f-f5d4-4986-8a7d-21633503ff94	s256	rtVKxuPGxtHx2o2gScLy9r6fHD0S9mji7l-5W3Ax9Js	google			2026-04-26 11:39:42.501345+00	2026-04-26 11:39:42.501345+00	oauth	\N	\N	https://ss-rental.vercel.app/auth/google-login?callback=true	\N	\N	f
9ab4b37d-7e39-4bf9-b30e-e728fc5cf3c7	\N	0324a517-476e-450a-b516-12b8728d150e	s256	BOjT0KtNACWtTBmZeWdJ72GiazkIt5tAl6n5WQe4jCg	google			2026-04-09 12:14:33.426653+00	2026-04-09 12:14:33.426653+00	oauth	\N	\N	https://ss-rental.vercel.app/auth/login?callback=true	\N	\N	f
48f1ddbc-b3d6-4026-8f6f-2f12aace44ab	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	55d49c48-98a3-43ab-90c5-532605e032cd	s256	ZIVK5s90EWx-a39TbfzuXdr1JJyhE6fk1dyS0vH4O1Y	google	ya29.a0Aa7MYipjY5OT7G_R26njaQjNd-1EHBt1nd_7_8PI8BGAYqSwzvxxmZY5EwW6ieZabdnUgjTzpychn8gW-PSRse2p01883hybFUztMcs13jl80YvQCUa2cojTYjRjHK94p1PpG7Z_3jYI49UKZ7_c3g1MKso34P-fh2UY3BG6V9fGT71rlX56DnvOjdeFNsp32sPU6bztCmZV2qqkLsk1_Ch1srVhQR2SxhHygLZGYgAhv3Q9CU0pNrX7dQfy1J_lhh6UahcwFuW45-8GFBIPSBf2U__PqL4aCgYKATgSARASFQHGX2Mi5lggGAZNS0HoYQ1DfjB5ng0294		2026-04-09 12:16:06.889045+00	2026-04-09 12:16:14.073583+00	oauth	2026-04-09 12:16:14.073516+00	\N	https://ss-rental.vercel.app	\N	\N	f
bc144555-f325-42a2-ba98-3b7b2a06e4a0	\N	bcb53237-4726-4164-b72e-99d675dcb918	s256	lf0sx1bvGNS87PJSg_4ogFdRE4PlqwTFC2KdMiALcD8	google			2026-05-02 06:06:55.230491+00	2026-05-02 06:06:55.230491+00	oauth	\N	\N	https://ss-rental.vercel.app/auth/login?callback=true	\N	\N	f
a043c4f5-1b7e-4882-8f01-73128dce3bde	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	cfe74429-4608-479e-927f-5547a820858e	s256	vmc6TS-nOvkvIlPvRc4z5S1LvnWDc51MufY8tZbAvwM	google	ya29.a0Aa7MYirda7dEN4-6itvzWR0JBUyVWdc39lu2b1mrx7Uo9offg4B7MPXb2Oh0W_Xi8Sm9naKXy60xFDmyimmfIbDl1Rrpi3WhSXvZ-fngDVQlonCbaECBRpFvwK647HsMTvIOsSn3b8RAhigFKcYeF6eQF8MspUCwWQxcL9xZVhQXVjOe4cYA0gxU7IzSmupieLE6LqSpBe1txfmyESdHaioMxLsoL8CUtvap2wDKgvGXhSTQwSE6TIwnmqq30A0EXeoGqw5NnzpSOAStA-aHEaTUeDyuWgYaCgYKAbESARASFQHGX2Mirhl2CQM9XjF2onihxYbgZw0294		2026-04-09 23:40:27.269056+00	2026-04-09 23:40:31.983301+00	oauth	2026-04-09 23:40:31.983245+00	\N	https://ss-rental.vercel.app	\N	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
109262100972269033045	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{"iss": "https://accounts.google.com", "sub": "109262100972269033045", "name": "Ayush", "email": "aayushpradhan789@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKV07OFU90ebn6E7Tuebn6skYootTmPMGGxSf-k0-PRQy6FeoPh=s96-c", "full_name": "Ayush", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKV07OFU90ebn6E7Tuebn6skYootTmPMGGxSf-k0-PRQy6FeoPh=s96-c", "provider_id": "109262100972269033045", "email_verified": true, "phone_verified": false}	google	2026-04-08 05:38:26.278278+00	2026-04-08 05:38:26.278327+00	2026-04-09 23:45:26.223835+00	a3f2ff89-3041-4a15-b03c-8adb6a9e2576
113668888158112136673	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	{"iss": "https://accounts.google.com", "sub": "113668888158112136673", "name": "Aayush Pradhan", "email": "aplabdotcom@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocL4ad5qnN-zBh6sWQPQ74tXx6eLeD93qTM9AvLBhPULyWa7rQ4=s96-c", "full_name": "Aayush Pradhan", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocL4ad5qnN-zBh6sWQPQ74tXx6eLeD93qTM9AvLBhPULyWa7rQ4=s96-c", "provider_id": "113668888158112136673", "email_verified": true, "phone_verified": false}	google	2026-05-02 06:07:23.894359+00	2026-05-02 06:07:23.894408+00	2026-05-02 06:46:43.938961+00	22546306-819f-4fe4-99a8-2d80982cdd38
104859458339852128477	0f89330d-23fb-4a3d-8bdd-515fe8483685	{"iss": "https://accounts.google.com", "sub": "104859458339852128477", "name": "Aashish Pokhrel", "email": "dellizulter@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJKDmYDCyCkrqQI8yP9tdv-HOUO667UUI4bCBoqIQ8BKvO70c5g=s96-c", "full_name": "Aashish Pokhrel", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJKDmYDCyCkrqQI8yP9tdv-HOUO667UUI4bCBoqIQ8BKvO70c5g=s96-c", "provider_id": "104859458339852128477", "email_verified": true, "phone_verified": false}	google	2026-04-27 06:38:17.015723+00	2026-04-27 06:38:17.015779+00	2026-04-27 06:39:33.466892+00	66b9bd5a-4346-4af7-9d5d-7bc1905a4465
108410259414616030986	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{"iss": "https://accounts.google.com", "sub": "108410259414616030986", "name": "Aayush", "email": "mentorsknowledge8976@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocLWmDV9m7SvOkc-DCta7oxCj0l023nCHEHuvY4c09eo5Y1Tx7E=s96-c", "full_name": "Aayush", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocLWmDV9m7SvOkc-DCta7oxCj0l023nCHEHuvY4c09eo5Y1Tx7E=s96-c", "provider_id": "108410259414616030986", "email_verified": true, "phone_verified": false}	google	2026-04-05 09:10:06.036135+00	2026-04-05 09:10:06.036182+00	2026-04-10 06:10:36.178411+00	4be5e531-372d-4f51-9c1d-b3cdd6f69124
115503492594378075549	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	{"iss": "https://accounts.google.com", "sub": "115503492594378075549", "name": "Rashana Adhikari", "email": "rashanaadhikari0@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocIRR-iPZ1iM9zYCKJMZC2i3Q-WoVPHd6IvOq1T3zpTmRS0blA=s96-c", "full_name": "Rashana Adhikari", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocIRR-iPZ1iM9zYCKJMZC2i3Q-WoVPHd6IvOq1T3zpTmRS0blA=s96-c", "provider_id": "115503492594378075549", "email_verified": true, "phone_verified": false}	google	2026-04-26 11:37:49.962388+00	2026-04-26 11:37:49.962438+00	2026-04-26 11:55:05.021057+00	ce3b8c4b-9048-4320-a470-9391bcdf78df
108556875402454320253	5435da01-ffa3-4aa2-8762-7338c632b64f	{"iss": "https://accounts.google.com", "sub": "108556875402454320253", "name": "Abish Pradhan", "email": "pradhanayushandabish@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocI14QAqeoqpq_Kwua4Noqg3RuFbxExvOUpdzsNYV0MbMk_JPel6=s96-c", "full_name": "Abish Pradhan", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocI14QAqeoqpq_Kwua4Noqg3RuFbxExvOUpdzsNYV0MbMk_JPel6=s96-c", "provider_id": "108556875402454320253", "email_verified": true, "phone_verified": false}	google	2026-04-05 09:10:48.181469+00	2026-04-05 09:10:48.181524+00	2026-04-14 14:30:34.71524+00	e7121658-e7c2-4e6f-9bac-daf2a650c9a8
104710185019620464001	c698a53a-399a-48bf-ad36-b44606650f34	{"iss": "https://accounts.google.com", "sub": "104710185019620464001", "name": "Mr.Rounder", "email": "girimahesh614@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocLi6cBF1Q4TRKoPxEKrkS8YNHhFSdk1zA50SqcftmkiZVqVJ9f0=s96-c", "full_name": "Mr.Rounder", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocLi6cBF1Q4TRKoPxEKrkS8YNHhFSdk1zA50SqcftmkiZVqVJ9f0=s96-c", "provider_id": "104710185019620464001", "email_verified": true, "phone_verified": false}	google	2026-04-05 09:07:03.306195+00	2026-04-05 09:07:03.306244+00	2026-05-02 06:31:49.129098+00	52a93e80-db6e-4bcb-897e-5a26303cd38d
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
57c4c1a6-48de-494c-ad7d-01398b52e01a	2026-04-10 06:11:44.932893+00	2026-04-10 06:11:44.932893+00	oauth	502003c7-f523-497b-8753-727f9d347bc9
deedbc9a-930f-4f34-b7e6-df87365cc270	2026-04-12 05:09:11.898668+00	2026-04-12 05:09:11.898668+00	oauth	ac77c212-7850-4186-b6fd-920dcd2af346
d9baf33a-27f7-4cc0-80ca-d58aa9292563	2026-04-14 14:30:36.798018+00	2026-04-14 14:30:36.798018+00	oauth	6111f1e2-ef73-4446-95db-f0248eb3f127
8b0302d7-75e9-42f9-81d3-1d0c52c8bd9d	2026-04-26 11:55:05.202497+00	2026-04-26 11:55:05.202497+00	oauth	abc3b539-f801-4428-8fba-f91b65e6f08d
89c8cd54-2dcf-4338-9fe1-251fb4499450	2026-04-27 06:39:34.224185+00	2026-04-27 06:39:34.224185+00	oauth	4830543c-f972-4560-9774-4cd804db12b2
b3600213-2b80-4fc4-82ff-234ebbad26a9	2026-05-02 06:46:44.911035+00	2026-05-02 06:46:44.911035+00	oauth	b63909c0-740d-456b-963e-1b136829d7d9
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	104	e6qhtbdlt5fu	5435da01-ffa3-4aa2-8762-7338c632b64f	t	2026-04-10 06:11:44.930482+00	2026-04-13 04:29:58.54056+00	\N	57c4c1a6-48de-494c-ad7d-01398b52e01a
00000000-0000-0000-0000-000000000000	106	pk5ant5qaix7	5435da01-ffa3-4aa2-8762-7338c632b64f	t	2026-04-13 04:29:58.548493+00	2026-04-26 05:56:29.955066+00	e6qhtbdlt5fu	57c4c1a6-48de-494c-ad7d-01398b52e01a
00000000-0000-0000-0000-000000000000	114	4rsp2de2ijki	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	t	2026-04-26 11:55:05.200673+00	2026-04-27 05:23:17.227623+00	\N	8b0302d7-75e9-42f9-81d3-1d0c52c8bd9d
00000000-0000-0000-0000-000000000000	115	azalrhw5qi2y	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	f	2026-04-27 05:23:17.249537+00	2026-04-27 05:23:17.249537+00	4rsp2de2ijki	8b0302d7-75e9-42f9-81d3-1d0c52c8bd9d
00000000-0000-0000-0000-000000000000	105	djl6lcefmq7c	5435da01-ffa3-4aa2-8762-7338c632b64f	t	2026-04-12 05:09:11.88275+00	2026-04-27 06:39:37.443313+00	\N	deedbc9a-930f-4f34-b7e6-df87365cc270
00000000-0000-0000-0000-000000000000	119	bwqbcgq23k6s	5435da01-ffa3-4aa2-8762-7338c632b64f	f	2026-04-27 06:39:37.44488+00	2026-04-27 06:39:37.44488+00	djl6lcefmq7c	deedbc9a-930f-4f34-b7e6-df87365cc270
00000000-0000-0000-0000-000000000000	118	h3pe2aqembio	0f89330d-23fb-4a3d-8bdd-515fe8483685	t	2026-04-27 06:39:34.222852+00	2026-04-27 09:14:32.377055+00	\N	89c8cd54-2dcf-4338-9fe1-251fb4499450
00000000-0000-0000-0000-000000000000	120	sncgctyclhht	0f89330d-23fb-4a3d-8bdd-515fe8483685	f	2026-04-27 09:14:32.398558+00	2026-04-27 09:14:32.398558+00	h3pe2aqembio	89c8cd54-2dcf-4338-9fe1-251fb4499450
00000000-0000-0000-0000-000000000000	108	z2kobvgar4re	5435da01-ffa3-4aa2-8762-7338c632b64f	t	2026-04-26 05:56:29.969677+00	2026-05-02 06:03:38.855153+00	pk5ant5qaix7	57c4c1a6-48de-494c-ad7d-01398b52e01a
00000000-0000-0000-0000-000000000000	126	x2o3rwao45pm	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	f	2026-05-02 06:46:44.907905+00	2026-05-02 06:46:44.907905+00	\N	b3600213-2b80-4fc4-82ff-234ebbad26a9
00000000-0000-0000-0000-000000000000	121	4px66nfh3dun	5435da01-ffa3-4aa2-8762-7338c632b64f	t	2026-05-02 06:03:38.88187+00	2026-05-02 07:04:23.944075+00	z2kobvgar4re	57c4c1a6-48de-494c-ad7d-01398b52e01a
00000000-0000-0000-0000-000000000000	127	arouh2yyc3t7	5435da01-ffa3-4aa2-8762-7338c632b64f	f	2026-05-02 07:04:23.959652+00	2026-05-02 07:04:23.959652+00	4px66nfh3dun	57c4c1a6-48de-494c-ad7d-01398b52e01a
00000000-0000-0000-0000-000000000000	107	i3k7tob5zjhj	5435da01-ffa3-4aa2-8762-7338c632b64f	t	2026-04-14 14:30:36.783537+00	2026-06-22 01:46:40.271819+00	\N	d9baf33a-27f7-4cc0-80ca-d58aa9292563
00000000-0000-0000-0000-000000000000	128	ow2xrzzyo7x2	5435da01-ffa3-4aa2-8762-7338c632b64f	f	2026-06-22 01:46:40.298566+00	2026-06-22 01:46:40.298566+00	i3k7tob5zjhj	d9baf33a-27f7-4cc0-80ca-d58aa9292563
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
8b0302d7-75e9-42f9-81d3-1d0c52c8bd9d	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	2026-04-26 11:55:05.199334+00	2026-04-27 05:23:17.27564+00	\N	aal1	\N	2026-04-27 05:23:17.275515	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	103.98.130.217	\N	\N	\N	\N	\N
deedbc9a-930f-4f34-b7e6-df87365cc270	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-12 05:09:11.862874+00	2026-04-27 06:39:38.057039+00	\N	aal1	\N	2026-04-27 06:39:38.056922	node	3.88.202.247	\N	\N	\N	\N	\N
89c8cd54-2dcf-4338-9fe1-251fb4499450	0f89330d-23fb-4a3d-8bdd-515fe8483685	2026-04-27 06:39:34.221827+00	2026-04-27 09:14:32.422431+00	\N	aal1	\N	2026-04-27 09:14:32.422321	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	103.98.130.217	\N	\N	\N	\N	\N
b3600213-2b80-4fc4-82ff-234ebbad26a9	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	2026-05-02 06:46:44.904945+00	2026-05-02 06:46:44.904945+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0	113.199.239.253	\N	\N	\N	\N	\N
57c4c1a6-48de-494c-ad7d-01398b52e01a	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-10 06:11:44.928295+00	2026-05-02 07:04:23.979603+00	\N	aal1	\N	2026-05-02 07:04:23.979462	node	3.80.250.173	\N	\N	\N	\N	\N
d9baf33a-27f7-4cc0-80ca-d58aa9292563	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-14 14:30:36.770322+00	2026-06-22 01:46:49.800179+00	\N	aal1	\N	2026-06-22 01:46:49.800092	node	44.223.87.80	\N	\N	\N	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	authenticated	authenticated	rashanaadhikari0@gmail.com	\N	2026-04-26 11:37:49.973375+00	\N		\N		\N			\N	2026-04-26 11:55:05.198162+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "115503492594378075549", "name": "Rashana Adhikari", "email": "rashanaadhikari0@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocIRR-iPZ1iM9zYCKJMZC2i3Q-WoVPHd6IvOq1T3zpTmRS0blA=s96-c", "full_name": "Rashana Adhikari", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocIRR-iPZ1iM9zYCKJMZC2i3Q-WoVPHd6IvOq1T3zpTmRS0blA=s96-c", "provider_id": "115503492594378075549", "email_verified": true, "phone_verified": false}	\N	2026-04-26 11:37:49.943117+00	2026-04-27 05:23:17.263486+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	5435da01-ffa3-4aa2-8762-7338c632b64f	authenticated	authenticated	pradhanayushandabish@gmail.com	\N	2026-04-05 09:10:48.184386+00	\N		\N		\N			\N	2026-04-14 14:30:36.768949+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "108556875402454320253", "name": "Abish Pradhan", "email": "pradhanayushandabish@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocI14QAqeoqpq_Kwua4Noqg3RuFbxExvOUpdzsNYV0MbMk_JPel6=s96-c", "full_name": "Abish Pradhan", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocI14QAqeoqpq_Kwua4Noqg3RuFbxExvOUpdzsNYV0MbMk_JPel6=s96-c", "provider_id": "108556875402454320253", "email_verified": true, "phone_verified": false}	\N	2026-04-05 09:10:48.179589+00	2026-06-22 01:46:40.309662+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	authenticated	authenticated	aayushpradhan789@gmail.com	\N	2026-04-08 05:38:26.283896+00	\N		\N		\N			\N	2026-04-09 23:45:27.045995+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "109262100972269033045", "name": "Ayush", "email": "aayushpradhan789@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKV07OFU90ebn6E7Tuebn6skYootTmPMGGxSf-k0-PRQy6FeoPh=s96-c", "full_name": "Ayush", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKV07OFU90ebn6E7Tuebn6skYootTmPMGGxSf-k0-PRQy6FeoPh=s96-c", "provider_id": "109262100972269033045", "email_verified": true, "phone_verified": false}	\N	2026-04-08 05:38:26.269082+00	2026-04-09 23:45:27.047969+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3e50868a-d461-4a0f-a2bc-8ba435d3767c	authenticated	authenticated	mentorsknowledge8976@gmail.com	\N	2026-04-05 09:10:06.039072+00	\N		\N		\N			\N	2026-04-10 06:10:37.735701+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "108410259414616030986", "name": "Aayush", "email": "mentorsknowledge8976@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocLWmDV9m7SvOkc-DCta7oxCj0l023nCHEHuvY4c09eo5Y1Tx7E=s96-c", "full_name": "Aayush", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocLWmDV9m7SvOkc-DCta7oxCj0l023nCHEHuvY4c09eo5Y1Tx7E=s96-c", "provider_id": "108410259414616030986", "email_verified": true, "phone_verified": false}	\N	2026-04-05 09:10:06.0313+00	2026-04-10 06:10:37.744607+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c698a53a-399a-48bf-ad36-b44606650f34	authenticated	authenticated	girimahesh614@gmail.com	\N	2026-04-05 09:07:03.316284+00	\N		\N		\N			\N	2026-05-02 06:31:50.359131+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "104710185019620464001", "name": "Mr.Rounder", "email": "girimahesh614@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocLi6cBF1Q4TRKoPxEKrkS8YNHhFSdk1zA50SqcftmkiZVqVJ9f0=s96-c", "full_name": "Mr.Rounder", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocLi6cBF1Q4TRKoPxEKrkS8YNHhFSdk1zA50SqcftmkiZVqVJ9f0=s96-c", "provider_id": "104710185019620464001", "email_verified": true, "phone_verified": false}	\N	2026-04-05 09:07:03.284373+00	2026-05-02 06:31:50.375113+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	authenticated	authenticated	aplabdotcom@gmail.com	\N	2026-05-02 06:07:23.906495+00	\N		\N		\N			\N	2026-05-02 06:46:44.902942+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "113668888158112136673", "name": "Aayush Pradhan", "email": "aplabdotcom@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocL4ad5qnN-zBh6sWQPQ74tXx6eLeD93qTM9AvLBhPULyWa7rQ4=s96-c", "full_name": "Aayush Pradhan", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocL4ad5qnN-zBh6sWQPQ74tXx6eLeD93qTM9AvLBhPULyWa7rQ4=s96-c", "provider_id": "113668888158112136673", "email_verified": true, "phone_verified": false}	\N	2026-05-02 06:07:23.873506+00	2026-05-02 06:46:44.910557+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0f89330d-23fb-4a3d-8bdd-515fe8483685	authenticated	authenticated	dellizulter@gmail.com	\N	2026-04-27 06:38:17.021941+00	\N		\N		\N			\N	2026-04-27 06:39:34.221745+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "104859458339852128477", "name": "Aashish Pokhrel", "email": "dellizulter@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJKDmYDCyCkrqQI8yP9tdv-HOUO667UUI4bCBoqIQ8BKvO70c5g=s96-c", "full_name": "Aashish Pokhrel", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJKDmYDCyCkrqQI8yP9tdv-HOUO667UUI4bCBoqIQ8BKvO70c5g=s96-c", "provider_id": "104859458339852128477", "email_verified": true, "phone_verified": false}	\N	2026-04-27 06:38:17.004653+00	2026-04-27 09:14:32.408413+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blogs (id, author_id, title, slug, excerpt, content, blog_image, is_published, created_at, updated_at) FROM stdin;
f2bade3e-a9cd-40aa-b05b-7cec14f0f0ce	5435da01-ffa3-4aa2-8762-7338c632b64f	कोठा सफा राख्ने सजिलो तरिका	-0756	कोठा सफा राख्ने सजिलो तरिका	घरलाई सधैं सफा राख्न सजिलो तरिका अपनाउन सकिन्छ।\r\n\r\nदैनिक बानी बसाल्नुहोस्: बिहान उठ्नेबित्तिकै ओछ्यान मिलाउनु, कपडा आफ्नै ठाउँमा राख्नु।\r\n\r\nछोटो समयमै सफाइ: १०–१५ मिनेटको छोटो सफाइले ठूलो काम सजिलो हुन्छ।\r\n\r\nअनावश्यक सामान हटाउनुहोस्: प्रयोगमा नआउने वस्तु हटाउँदा कोठा खुला देखिन्छ।\r\n\r\nफोहोर तुरुन्तै व्यवस्थापन: सानो डस्टबिन राखेर फोहोर तुरुन्तै फ्याँक्ने बानी बसाल्नुहोस्।\r\n\r\nसाप्ताहिक गहिरो सफाइ: झ्याल, ढोका, पंखा, फर्निचर सफा गर्ने।\r\n\r\nसफा कोठाले मानसिक शान्ति दिन्छ, काममा ध्यान केन्द्रित गर्न सजिलो हुन्छ, र पाहुनाले पनि राम्रो अनुभव गर्छन्।\r\n	https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/blog_image/5435da01-ffa3-4aa2-8762-7338c632b64f/blogs/1776054760352.webp	t	2026-04-13 04:32:40.901979+00	2026-04-13 04:32:40.901979+00
\.


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.favourites (id, user_id, property_id, created_at) FROM stdin;
ac577a06-6d2c-44dd-9b13-2ad80e0703ed	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	e26fc1f4-c74e-4289-9ab8-599700262c24	2026-04-26 11:42:21.711543
ad065482-e959-4afe-8824-7a96491f0a95	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	e26fc1f4-c74e-4289-9ab8-599700262c24	2026-05-02 06:21:28.558976
fc61f76b-e7b0-4749-a317-6e0d7edb9c54	5435da01-ffa3-4aa2-8762-7338c632b64f	2a84a998-5356-4df6-a37f-dec4460ff06e	2026-06-22 01:47:46.535739
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages (id, user_id, full_name, email, phone_number, subject, message, created_at) FROM stdin;
4255d68e-a44c-4000-b73f-def949a375c2	\N	Ayush	aayushpradhan789@gmail.com	9812345678	issue in admin number	when ever i try to contact them the response is very late, it is affecting my business & clients are fustrated	2026-04-09 06:45:49.002075+00
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties (id, owner_id, title, description, room_type, room_type_slug, price_per_month, bedrooms, kitchens, floor_number, is_living_room_available, rent_design, tags, detailed_address, rating, review_count, image_urls, badge, contact_phone, contact_email, location, latitude, longitude, rejection_reason, blocked_reason, is_active, created_at, updated_at) FROM stdin;
0d3661f6-88ad-411f-bbcf-c495415db3d4	\N	property 2	asdrfqwerqwer	2 BHK	2-bhk	9000	6	2	3rd Floor	f	business-shutter	tag property	Halgada chowk	0.0	0	{https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775553804664-69xeyfc.jpg,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775553805354-92pa8vg.jpg}	\N	N/A	\N	Itahari-2	27.70831700	85.32058170	\N	\N	t	2026-04-07 09:23:32.661367+00	2026-04-12 05:12:29.488674+00
e26fc1f4-c74e-4289-9ab8-599700262c24	5435da01-ffa3-4aa2-8762-7338c632b64f	2BHK room	serqwerqwerqwer	1 BHK	1-bhk	5000	1	1	Ground Floor	t	residential	2BHK	Raj Devi Temple	0.0	0	{https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/5435da01-ffa3-4aa2-8762-7338c632b64f/1775970828936-tcmpkeq.jpg,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/5435da01-ffa3-4aa2-8762-7338c632b64f/1775970829501-o0ikioe.webp,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/5435da01-ffa3-4aa2-8762-7338c632b64f/1775970829838-507r3gl.jpg}	\N	N/A	\N	Itahari-1	26.68517250	87.27823520	\N	\N	t	2026-04-12 05:13:50.825867+00	2026-04-12 05:13:50.825867+00
2a84a998-5356-4df6-a37f-dec4460ff06e	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	3BHK	Description	3 BHK	3-bhk	3000	2	1	1st Floor	t	residential	#3BHK	Sankitchowk	0.0	0	{https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703064757-35xo41i.webp,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703065108-go0wnvk.webp,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703065435-yu5vkbo.webp,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703065755-v7gya58.webp,https://tkypeknufszxllhirlfw.supabase.co/storage/v1/object/public/image_url/c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703066118-yl5ruzv.jpg}	\N	N/A	\N	Itahari-10	26.66660000	87.27360000	\N	\N	t	2026-05-02 06:24:27.595335+00	2026-05-02 06:47:24.77063+00
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, property_id, user_id, rating, comment, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, google_id, role, name, email, phone_number, address, is_blocked, blocked_reason, avatar_url, created_at, updated_at) FROM stdin;
0f89330d-23fb-4a3d-8bdd-515fe8483685	0f89330d-23fb-4a3d-8bdd-515fe8483685	admin	Aashish Pokhrel	dellizulter@gmail.com	9824345069	Itahari	f	\N	https://lh3.googleusercontent.com/a/ACg8ocJKDmYDCyCkrqQI8yP9tdv-HOUO667UUI4bCBoqIQ8BKvO70c5g=s96-c	2026-04-27 06:39:34.53465+00	2026-04-27 06:39:34.537+00
5435da01-ffa3-4aa2-8762-7338c632b64f	5435da01-ffa3-4aa2-8762-7338c632b64f	admin	Abish Pradhan	pradhanayushandabish@gmail.com	9819030363	Ilam, Nepal	f	\N	https://lh3.googleusercontent.com/a/ACg8ocI14QAqeoqpq_Kwua4Noqg3RuFbxExvOUpdzsNYV0MbMk_JPel6=s96-c	2026-04-05 09:10:44.409+00	2026-04-07 08:31:09.375+00
c698a53a-399a-48bf-ad36-b44606650f34	c698a53a-399a-48bf-ad36-b44606650f34	user	Mr.Rounder	girimahesh614@gmail.com	9874561235	Itahari-2, sunsari	t	Voilation In Articles and proraties addition	https://lh3.googleusercontent.com/a/ACg8ocLi6cBF1Q4TRKoPxEKrkS8YNHhFSdk1zA50SqcftmkiZVqVJ9f0=s96-c	2026-05-02 06:31:51.164016+00	2026-05-02 06:32:56.519+00
c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	user	Aayush Pradhan	aplabdotcom@gmail.com	9856412358	lserqwer	f	\N	https://lh3.googleusercontent.com/a/ACg8ocL4ad5qnN-zBh6sWQPQ74tXx6eLeD93qTM9AvLBhPULyWa7rQ4=s96-c	2026-05-02 06:07:25.650646+00	2026-05-02 06:06:00.778+00
72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	72c1b4a0-7cd4-41e3-bdaa-de9744075a1b	admin	Rashana Adhikari	rashanaadhikari0@gmail.com	9867993102	fafaf	f	\N	https://lh3.googleusercontent.com/a/ACg8ocIRR-iPZ1iM9zYCKJMZC2i3Q-WoVPHd6IvOq1T3zpTmRS0blA=s96-c	2026-04-26 11:39:10.054246+00	2026-04-26 11:39:10.063+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-04-03 06:53:48
20211116045059	2026-04-03 06:53:48
20211116050929	2026-04-03 06:53:49
20211116051442	2026-04-03 06:53:50
20211116212300	2026-04-03 06:53:51
20211116213355	2026-04-03 06:53:51
20211116213934	2026-04-03 06:53:52
20211116214523	2026-04-03 06:53:53
20211122062447	2026-04-03 06:53:53
20211124070109	2026-04-03 06:53:54
20211202204204	2026-04-03 06:53:55
20211202204605	2026-04-03 06:53:55
20211210212804	2026-04-03 06:53:57
20211228014915	2026-04-03 06:53:58
20220107221237	2026-04-03 06:53:59
20220228202821	2026-04-03 06:53:59
20220312004840	2026-04-03 06:54:00
20220603231003	2026-04-03 06:54:01
20220603232444	2026-04-03 06:54:02
20220615214548	2026-04-03 06:54:03
20220712093339	2026-04-03 06:54:03
20220908172859	2026-04-03 06:54:04
20220916233421	2026-04-03 06:54:04
20230119133233	2026-04-03 06:54:05
20230128025114	2026-04-03 06:54:06
20230128025212	2026-04-03 06:54:07
20230227211149	2026-04-03 06:54:07
20230228184745	2026-04-03 06:54:08
20230308225145	2026-04-03 06:54:09
20230328144023	2026-04-03 06:54:09
20231018144023	2026-04-03 06:54:10
20231204144023	2026-04-03 06:54:11
20231204144024	2026-04-03 06:54:12
20231204144025	2026-04-03 06:54:12
20240108234812	2026-04-03 06:54:13
20240109165339	2026-04-03 06:54:14
20240227174441	2026-04-03 06:54:15
20240311171622	2026-04-03 06:54:16
20240321100241	2026-04-03 06:54:17
20240401105812	2026-04-03 06:54:19
20240418121054	2026-04-03 06:54:20
20240523004032	2026-04-03 06:54:22
20240618124746	2026-04-03 06:54:23
20240801235015	2026-04-03 06:54:23
20240805133720	2026-04-03 06:54:24
20240827160934	2026-04-03 06:54:25
20240919163303	2026-04-03 06:54:26
20240919163305	2026-04-03 06:54:26
20241019105805	2026-04-03 06:54:27
20241030150047	2026-04-03 06:54:29
20241108114728	2026-04-03 06:54:30
20241121104152	2026-04-03 06:54:31
20241130184212	2026-04-03 06:54:32
20241220035512	2026-04-03 06:54:32
20241220123912	2026-04-03 06:54:33
20241224161212	2026-04-03 06:54:34
20250107150512	2026-04-03 06:54:34
20250110162412	2026-04-03 06:54:35
20250123174212	2026-04-03 06:54:36
20250128220012	2026-04-03 06:54:36
20250506224012	2026-04-03 06:54:37
20250523164012	2026-04-03 06:54:37
20250714121412	2026-04-03 06:54:38
20250905041441	2026-04-03 06:54:39
20251103001201	2026-04-03 06:54:39
20251120212548	2026-04-03 06:54:40
20251120215549	2026-04-03 06:54:41
20260218120000	2026-04-03 06:54:41
20260326120000	2026-04-10 05:44:23
20260514120000	2026-06-18 08:40:00
20260527120000	2026-06-18 08:40:02
20260528120000	2026-06-18 08:40:03
20260603120000	2026-06-18 08:40:03
20260605120000	2026-06-18 08:40:04
20260606110000	2026-06-18 08:40:05
20260616120000	2026-06-27 15:42:01
20260624120000	2026-06-27 15:42:03
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter, selected_columns) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
image_url	image_url	\N	2026-04-05 07:50:48.730135+00	2026-04-05 07:50:48.730135+00	t	f	10485760	\N	\N	STANDARD
blog_image	blog_image	\N	2026-04-07 09:35:47.016338+00	2026-04-07 09:35:47.016338+00	t	f	\N	\N	\N	STANDARD
user_profile	user_profile	\N	2026-04-08 11:41:18.207069+00	2026-04-08 11:41:18.207069+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-04-03 05:20:03.739872
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-04-03 05:20:03.778728
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-04-03 05:20:03.783903
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-04-03 05:20:03.807186
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-04-03 05:20:03.819483
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-04-03 05:20:03.82488
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-04-03 05:20:03.830834
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-04-03 05:20:03.836738
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-04-03 05:20:03.842125
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-04-03 05:20:03.847508
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-04-03 05:20:03.853428
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-04-03 05:20:03.859093
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-04-03 05:20:03.866659
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-04-03 05:20:03.873636
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-04-03 05:20:03.880095
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-04-03 05:20:03.91651
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-04-03 05:20:03.923747
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-04-03 05:20:03.929334
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-04-03 05:20:03.934907
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-04-03 05:20:03.941896
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-04-03 05:20:03.94765
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-04-03 05:20:03.955361
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-04-03 05:20:03.974442
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-04-03 05:20:03.985877
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-04-03 05:20:03.991727
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-04-03 05:20:03.999165
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-04-03 05:20:04.006703
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-04-03 05:20:04.011775
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-04-03 05:20:04.017411
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-04-03 05:20:04.025486
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-04-03 05:20:04.030941
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-04-03 05:20:04.036322
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-04-03 05:20:04.041647
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-04-03 05:20:04.046822
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-04-03 05:20:04.05439
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-04-03 05:20:04.059439
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-04-03 05:20:04.064363
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-04-03 05:20:04.069295
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-04-03 05:20:04.076723
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-04-03 05:20:04.091137
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-04-03 05:20:04.096145
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-04-03 05:20:04.101192
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-04-03 05:20:04.106348
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-04-03 05:20:04.111336
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-04-03 05:20:04.11632
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-04-03 05:20:04.122272
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-04-03 05:20:04.13365
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-04-03 05:20:04.139471
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-04-03 05:20:04.144782
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-04-03 05:20:04.161668
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-04-03 05:20:04.167725
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-04-03 05:20:04.818823
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-04-03 05:20:04.821123
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-04-03 05:20:04.833125
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-04-03 05:20:04.836452
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-04-03 05:20:04.838616
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-04-06 23:37:40.340519
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-04-06 23:37:40.360692
56	fix-optimized-search-function	b823ed1e418101032fa01374edc9a436e54e3ed4	2026-04-03 05:20:04.844898
59	drop-unused-functions	38456f13e39691c2bbb4b5151d0d1cdbabd4a8c4	2026-06-18 08:39:56.59208
60	optimize-existing-functions-again	db35e1c91a9201e59f4fef8d972c2f277d68b157	2026-06-18 08:39:56.604452
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
a3add38b-977a-45ce-8a64-4ff6bf5d62bd	image_url	c698a53a-399a-48bf-ad36-b44606650f34/1775479610527-f8xa8zn.webp	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-06 12:46:55.768057+00	2026-04-06 12:46:55.768057+00	2026-04-06 12:46:55.768057+00	{"eTag": "\\"a58b0f82e68b4678b618d341ae449de7\\"", "size": 18182, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T12:46:56.000Z", "contentLength": 18182, "httpStatusCode": 200}	288a002b-9aff-4063-997d-71936cd66ff7	c698a53a-399a-48bf-ad36-b44606650f34	{}
181d9266-f270-41a1-994b-dc2fb63c276b	image_url	c698a53a-399a-48bf-ad36-b44606650f34/1775479611220-lovracx.jpg	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-06 12:46:56.087482+00	2026-04-06 12:46:56.087482+00	2026-04-06 12:46:56.087482+00	{"eTag": "\\"7242b020848b9a49b70001b472edc2f9\\"", "size": 125772, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T12:46:57.000Z", "contentLength": 125772, "httpStatusCode": 200}	72113946-d6ba-4f17-9713-857049b17f7f	c698a53a-399a-48bf-ad36-b44606650f34	{}
5ddbac7a-8ceb-4ebf-af42-45303deb72d7	image_url	c698a53a-399a-48bf-ad36-b44606650f34/1775479611560-flx2own.jpg	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-06 12:46:56.499359+00	2026-04-06 12:46:56.499359+00	2026-04-06 12:46:56.499359+00	{"eTag": "\\"7242b020848b9a49b70001b472edc2f9\\"", "size": 125772, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-06T12:46:57.000Z", "contentLength": 125772, "httpStatusCode": 200}	43484435-94d0-48a0-9ab4-b2d0c6645894	c698a53a-399a-48bf-ad36-b44606650f34	{}
396ac86c-265b-4e05-8495-242c3b498ab2	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775550252813-hjvzoiz.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 08:24:20.103218+00	2026-04-07 08:24:20.103218+00	2026-04-07 08:24:20.103218+00	{"eTag": "\\"b143a2cfb8cfa97b5b377ee084eec91e\\"", "size": 40151, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T08:24:21.000Z", "contentLength": 40151, "httpStatusCode": 200}	9ef665f3-288d-4fcf-ab76-c59d5857cc5e	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
893faefc-ad04-4b8e-92f8-a695c6a6ffb5	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775550253487-6fxxrx7.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 08:24:20.333868+00	2026-04-07 08:24:20.333868+00	2026-04-07 08:24:20.333868+00	{"eTag": "\\"4b985e6457dac6b5af499a9274021138\\"", "size": 38634, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T08:24:21.000Z", "contentLength": 38634, "httpStatusCode": 200}	a296b05a-ae14-4d38-8424-32257a978da2	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
141dae0d-521b-4b5f-b9f0-5854b8cd7f49	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775550253689-1k7e0za.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 08:24:20.571967+00	2026-04-07 08:24:20.571967+00	2026-04-07 08:24:20.571967+00	{"eTag": "\\"368f8dc47d9ad7bae9546246922869e4\\"", "size": 84532, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T08:24:21.000Z", "contentLength": 84532, "httpStatusCode": 200}	dcda3a43-7bca-4a07-a671-b9588defff11	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
620dd059-0416-4a08-9d36-33930f8d089e	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775550253943-rdq6n6u.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 08:24:20.813999+00	2026-04-07 08:24:20.813999+00	2026-04-07 08:24:20.813999+00	{"eTag": "\\"a670bb11057c6ab11d0754995ff3cab3\\"", "size": 34900, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T08:24:21.000Z", "contentLength": 34900, "httpStatusCode": 200}	e4935cc8-cea8-48d8-8439-574259629b70	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
e60090a7-d751-439e-a80e-1eb280ea0ca5	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/blogs/1775550902090.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 08:35:09.501081+00	2026-04-07 08:35:09.501081+00	2026-04-07 08:35:09.501081+00	{"eTag": "\\"1ccd11d5dd1077a0a0fa28802fb258c7\\"", "size": 139157, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T08:35:10.000Z", "contentLength": 139157, "httpStatusCode": 200}	86cc8801-6aea-4ad4-a7e7-19c80c9fc751	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
0faf4eab-b962-454c-8e76-18585ed0af45	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/blogs/1775550909341.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 08:35:16.338018+00	2026-04-07 08:35:16.338018+00	2026-04-07 08:35:16.338018+00	{"eTag": "\\"1ccd11d5dd1077a0a0fa28802fb258c7\\"", "size": 139157, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T08:35:17.000Z", "contentLength": 139157, "httpStatusCode": 200}	81af2a1d-3b73-4cee-a2fc-06dd4840dbc8	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
e434e22f-3dcc-4fdd-bfbd-f7aa4f2c2069	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775553804664-69xeyfc.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 09:23:32.005665+00	2026-04-07 09:23:32.005665+00	2026-04-07 09:23:32.005665+00	{"eTag": "\\"e66891a97418ad6e966c1610449cd5f0\\"", "size": 65479, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T09:23:32.000Z", "contentLength": 65479, "httpStatusCode": 200}	1fe5e14d-3306-4547-a815-4850ada3dcd8	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
dc31b0a0-8e89-4907-9904-ed28e3809fd6	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775553805354-92pa8vg.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 09:23:32.276467+00	2026-04-07 09:23:32.276467+00	2026-04-07 09:23:32.276467+00	{"eTag": "\\"e66891a97418ad6e966c1610449cd5f0\\"", "size": 65479, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T09:23:33.000Z", "contentLength": 65479, "httpStatusCode": 200}	225c7793-a363-496c-8e40-a2bc797ec35e	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
66976633-3183-4dec-b1e0-a80c6c38ced3	image_url	3e50868a-d461-4a0f-a2bc-8ba435d3767c/1775555040640-24zcp4a.jpg	3e50868a-d461-4a0f-a2bc-8ba435d3767c	2026-04-07 09:44:07.783476+00	2026-04-07 09:44:07.783476+00	2026-04-07 09:44:07.783476+00	{"eTag": "\\"27e561f812cf9b4dddf7159edfcd6b4d\\"", "size": 61098, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-07T09:44:08.000Z", "contentLength": 61098, "httpStatusCode": 200}	bf890726-d2f8-4ce1-9222-86b95de5f3be	3e50868a-d461-4a0f-a2bc-8ba435d3767c	{}
f6a0f519-8fe2-4de5-a28d-bb4846c1c604	image_url	94785cc6-b487-426b-8e07-d4ff8cbeeaf8/1775638685623-6uht46j.jfif	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	2026-04-08 08:58:16.636513+00	2026-04-08 08:58:16.636513+00	2026-04-08 08:58:16.636513+00	{"eTag": "\\"ebec2f25c9a4676b0274deee6be5dbfe\\"", "size": 60224, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T08:58:17.000Z", "contentLength": 60224, "httpStatusCode": 200}	69eb8fa4-a891-42a0-837f-2c2144f79417	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{}
554a319e-557f-4d3b-a6fd-ba04324e1e36	image_url	94785cc6-b487-426b-8e07-d4ff8cbeeaf8/1775639099710-l01xdq5.png	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	2026-04-08 09:05:10.920179+00	2026-04-08 09:05:10.920179+00	2026-04-08 09:05:10.920179+00	{"eTag": "\\"167969ef63d3cff14cb59f1bbc044b83\\"", "size": 575708, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T09:05:11.000Z", "contentLength": 575708, "httpStatusCode": 200}	31ccaf48-19d1-4519-84ac-1ee05940122c	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{}
74da30e8-4de9-4582-a514-252084ab3958	blog_image	94785cc6-b487-426b-8e07-d4ff8cbeeaf8/blogs/1775641619500.jfif	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	2026-04-08 09:47:10.19869+00	2026-04-08 09:47:10.19869+00	2026-04-08 09:47:10.19869+00	{"eTag": "\\"2b2b2f2754a0435256c22634d1b7c893\\"", "size": 25836, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T09:47:11.000Z", "contentLength": 25836, "httpStatusCode": 200}	dd75fce2-3b5e-4dfd-9e8b-a64e836dcc5e	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{}
92a8de4d-7156-4aa9-8f32-79d40522db3b	image_url	94785cc6-b487-426b-8e07-d4ff8cbeeaf8/1775643056439-9x4oj04.webp	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	2026-04-08 10:11:07.898764+00	2026-04-08 10:11:07.898764+00	2026-04-08 10:11:07.898764+00	{"eTag": "\\"d8257cb48b87220e158b5a59b454136c\\"", "size": 676738, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T10:11:08.000Z", "contentLength": 676738, "httpStatusCode": 200}	532d7b1f-6bbb-4d79-bec6-49132efdd38b	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{}
0f292844-36b1-4373-b64d-fc3f7811c862	image_url	94785cc6-b487-426b-8e07-d4ff8cbeeaf8/1775647748052-790c1to.jfif	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	2026-04-08 11:29:19.507+00	2026-04-08 11:29:19.507+00	2026-04-08 11:29:19.507+00	{"eTag": "\\"32e47de282e3d5b429a88cdc71ad73f4\\"", "size": 56242, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T11:29:20.000Z", "contentLength": 56242, "httpStatusCode": 200}	a9cf608d-664c-4162-8b62-59567c2a59d3	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{}
bdd129fa-2ec4-4ab3-9e0e-73335ff26e09	blog_image	94785cc6-b487-426b-8e07-d4ff8cbeeaf8/blogs/1775648549351.jfif	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	2026-04-08 11:42:40.469228+00	2026-04-08 11:42:40.469228+00	2026-04-08 11:42:40.469228+00	{"eTag": "\\"ebec2f25c9a4676b0274deee6be5dbfe\\"", "size": 60224, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T11:42:41.000Z", "contentLength": 60224, "httpStatusCode": 200}	7b287850-e20a-4b15-b5fd-342ec738a20d	94785cc6-b487-426b-8e07-d4ff8cbeeaf8	{}
f6acf96a-5cfe-404b-b6e3-2578c23f5db6	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775652001225-4x9paju.png	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-08 12:40:12.742206+00	2026-04-08 12:40:12.742206+00	2026-04-08 12:40:12.742206+00	{"eTag": "\\"67da7ff75cbd16e4e2211615546b8e95\\"", "size": 1363934, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T12:40:13.000Z", "contentLength": 1363934, "httpStatusCode": 200}	050ea420-dd49-4d42-8b76-62a2756bf1e5	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
aa8698b2-11fd-4159-84aa-d838e881f4cd	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775652002434-0yfr3n3.jfif	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-08 12:40:13.032026+00	2026-04-08 12:40:13.032026+00	2026-04-08 12:40:13.032026+00	{"eTag": "\\"2b2b2f2754a0435256c22634d1b7c893\\"", "size": 25836, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T12:40:13.000Z", "contentLength": 25836, "httpStatusCode": 200}	e7776ec1-a1d1-4034-bcb8-c4529dc569b4	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
dfed7a88-e933-4af2-a53e-c6cc402d72f1	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775652002712-hfspqmr.jfif	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-08 12:40:13.26793+00	2026-04-08 12:40:13.26793+00	2026-04-08 12:40:13.26793+00	{"eTag": "\\"ebec2f25c9a4676b0274deee6be5dbfe\\"", "size": 60224, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T12:40:14.000Z", "contentLength": 60224, "httpStatusCode": 200}	d53f0a4a-b7ab-4ce9-b3de-376fd01a8076	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
27259494-187f-4974-9b0b-8398ba35ee4e	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775652002930-rwixah9.webp	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-08 12:40:13.465689+00	2026-04-08 12:40:13.465689+00	2026-04-08 12:40:13.465689+00	{"eTag": "\\"74cb7a5944b15881cd4c7b5c150e3187\\"", "size": 9398, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T12:40:14.000Z", "contentLength": 9398, "httpStatusCode": 200}	6ba171b3-0fb4-45d2-9131-4acbb335a5d2	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
fb97d8ca-0cf5-4658-93c4-875331968ea7	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775652003125-vsytasj.webp	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-08 12:40:13.670372+00	2026-04-08 12:40:13.670372+00	2026-04-08 12:40:13.670372+00	{"eTag": "\\"14a2319738cce54a005a7e8eb62457cd\\"", "size": 9254, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-08T12:40:14.000Z", "contentLength": 9254, "httpStatusCode": 200}	c5568ca0-1a7b-4f1b-bcd8-c8a0056c86d3	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
0ef351ae-1fac-4a56-90e8-f845f3490b81	image_url	c698a53a-399a-48bf-ad36-b44606650f34/1775720407777-y2gt9f0.jpeg	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-09 07:40:21.703799+00	2026-04-09 07:40:21.703799+00	2026-04-09 07:40:21.703799+00	{"eTag": "\\"928de741c1e97d5ce4701a0cfe5e0543\\"", "size": 92184, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-09T07:40:22.000Z", "contentLength": 92184, "httpStatusCode": 200}	25cee61b-1218-4045-a738-5631f3822861	c698a53a-399a-48bf-ad36-b44606650f34	{}
1954195d-f833-48ed-9509-ebad485c1980	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775720497351-k62avtk.png	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-09 07:41:51.100475+00	2026-04-09 07:41:51.100475+00	2026-04-09 07:41:51.100475+00	{"eTag": "\\"22d68e255f2d01e02684307c2088a2ad\\"", "size": 60644, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-09T07:41:52.000Z", "contentLength": 60644, "httpStatusCode": 200}	67dcd961-bec9-4561-a346-938726503fe2	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
ac59b62e-0125-4264-831c-c42cfe14771d	image_url	c698a53a-399a-48bf-ad36-b44606650f34/1775720511706-wg7ta96.jpeg	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-09 07:42:05.467845+00	2026-04-09 07:42:05.467845+00	2026-04-09 07:42:05.467845+00	{"eTag": "\\"928de741c1e97d5ce4701a0cfe5e0543\\"", "size": 92184, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-09T07:42:06.000Z", "contentLength": 92184, "httpStatusCode": 200}	ca4128cb-4c23-4553-8d87-ed3f0ec608e8	c698a53a-399a-48bf-ad36-b44606650f34	{}
97928c9d-57f5-43cc-a93b-951f2f070813	image_url	c698a53a-399a-48bf-ad36-b44606650f34/1775724144776-8h8qglk.png	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-09 08:42:38.550647+00	2026-04-09 08:42:38.550647+00	2026-04-09 08:42:38.550647+00	{"eTag": "\\"cf46bbe15c4d09d12b4323409e580e64\\"", "size": 32800, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-09T08:42:39.000Z", "contentLength": 32800, "httpStatusCode": 200}	e4a5e77b-de8d-47cb-855c-c1ba98b07498	c698a53a-399a-48bf-ad36-b44606650f34	{}
bb90de05-9dfa-4f0d-9c6a-05650f803ef3	blog_image	c698a53a-399a-48bf-ad36-b44606650f34/blogs/1775724187833.png	c698a53a-399a-48bf-ad36-b44606650f34	2026-04-09 08:43:21.88662+00	2026-04-09 08:43:21.88662+00	2026-04-09 08:43:21.88662+00	{"eTag": "\\"d3eca8e780e12395b0facf26eb719df7\\"", "size": 587656, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-09T08:43:22.000Z", "contentLength": 587656, "httpStatusCode": 200}	2f3a3f55-9a6f-4c83-92aa-403c3ce0bf53	c698a53a-399a-48bf-ad36-b44606650f34	{}
343d09a3-e72b-42c8-acdf-81be8f8bee43	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775970828936-tcmpkeq.jpg	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-12 05:13:49.342562+00	2026-04-12 05:13:49.342562+00	2026-04-12 05:13:49.342562+00	{"eTag": "\\"27b7e406f6735dc6ee995fa8d5fa2d64\\"", "size": 82748, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T05:13:50.000Z", "contentLength": 82748, "httpStatusCode": 200}	a47d5030-1b41-4b49-8b37-6cb91d910a42	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
a211b0d1-b993-4e02-8a42-e84669b3e3fa	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775970829501-o0ikioe.webp	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-12 05:13:49.682779+00	2026-04-12 05:13:49.682779+00	2026-04-12 05:13:49.682779+00	{"eTag": "\\"942a52b25461ca8c3399e1ef9dea4275\\"", "size": 3684, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T05:13:50.000Z", "contentLength": 3684, "httpStatusCode": 200}	0d92485c-670b-4b04-b57a-a4e1f397f6e5	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
fa81fcd6-b5ae-49ea-84b8-38db4e89dd3f	image_url	5435da01-ffa3-4aa2-8762-7338c632b64f/1775970829838-507r3gl.jpg	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-12 05:13:50.185221+00	2026-04-12 05:13:50.185221+00	2026-04-12 05:13:50.185221+00	{"eTag": "\\"e66891a97418ad6e966c1610449cd5f0\\"", "size": 65479, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-12T05:13:51.000Z", "contentLength": 65479, "httpStatusCode": 200}	192b9816-3b03-4f3d-a09e-2c1dd199fc3a	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
578b4954-bdab-498d-baeb-e17588944148	blog_image	5435da01-ffa3-4aa2-8762-7338c632b64f/blogs/1776054760352.webp	5435da01-ffa3-4aa2-8762-7338c632b64f	2026-04-13 04:32:40.610252+00	2026-04-13 04:32:40.610252+00	2026-04-13 04:32:40.610252+00	{"eTag": "\\"124ba612d90a60f8e776179a8165b363\\"", "size": 4796, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-13T04:32:41.000Z", "contentLength": 4796, "httpStatusCode": 200}	2f91bf9d-66c0-42af-9724-f52f5d1c9f97	5435da01-ffa3-4aa2-8762-7338c632b64f	{}
0dad18ee-0121-455e-b256-231fbf8f36fa	image_url	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703064757-35xo41i.webp	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	2026-05-02 06:24:24.971849+00	2026-05-02 06:24:24.971849+00	2026-05-02 06:24:24.971849+00	{"eTag": "\\"fbb83b1453b70b16149cec3542001d82\\"", "size": 8758, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-05-02T06:24:25.000Z", "contentLength": 8758, "httpStatusCode": 200}	31d7c3ef-3e50-48a2-980b-11f70caad4a0	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	{}
861ae39b-7077-4619-b2cd-a5ce95df06a5	image_url	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703065108-go0wnvk.webp	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	2026-05-02 06:24:25.292352+00	2026-05-02 06:24:25.292352+00	2026-05-02 06:24:25.292352+00	{"eTag": "\\"124ba612d90a60f8e776179a8165b363\\"", "size": 4796, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-05-02T06:24:26.000Z", "contentLength": 4796, "httpStatusCode": 200}	cf73b305-9ed7-4777-b511-47d43f7b85d1	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	{}
3e1e2957-9973-48a0-8632-35ac5b9f057a	image_url	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703065435-yu5vkbo.webp	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	2026-05-02 06:24:25.623076+00	2026-05-02 06:24:25.623076+00	2026-05-02 06:24:25.623076+00	{"eTag": "\\"df79dd16b45f420ccea8666348664335\\"", "size": 7344, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-05-02T06:24:26.000Z", "contentLength": 7344, "httpStatusCode": 200}	ce83a018-e74f-452f-9fc9-0c8c86f91977	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	{}
dfc4faac-350a-4541-b6f4-dae39ca73b63	image_url	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703065755-v7gya58.webp	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	2026-05-02 06:24:25.989282+00	2026-05-02 06:24:25.989282+00	2026-05-02 06:24:25.989282+00	{"eTag": "\\"d9c541a37dd8aac99d370696b251ed82\\"", "size": 14404, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-05-02T06:24:26.000Z", "contentLength": 14404, "httpStatusCode": 200}	e323e299-eb84-449e-a450-9e5888100cb3	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	{}
61b7211f-967e-4d0e-9f55-c260a94fd4b1	image_url	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0/1777703066118-yl5ruzv.jpg	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	2026-05-02 06:24:27.293589+00	2026-05-02 06:24:27.293589+00	2026-05-02 06:24:27.293589+00	{"eTag": "\\"2ef73b569f3c83d750fb072f96e1c497\\"", "size": 301781, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-02T06:24:28.000Z", "contentLength": 301781, "httpStatusCode": 200}	96e26b75-cfa6-479b-a9f2-3283aa050bd5	c4f63fb6-a70b-42ac-82e9-ee6b71cec8c0	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 128, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: blogs blogs_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_slug_key UNIQUE (slug);


--
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY (id);


--
-- Name: favourites favourites_user_id_property_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_user_id_property_id_key UNIQUE (user_id, property_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: messages messages_payload_exclusive; Type: CHECK CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages
    ADD CONSTRAINT messages_payload_exclusive CHECK (((payload IS NULL) OR (binary_payload IS NULL))) NOT VALID;


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- Name: idx_blogs_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blogs_author_id ON public.blogs USING btree (author_id);


--
-- Name: idx_properties_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_active ON public.properties USING btree (is_active);


--
-- Name: idx_properties_location; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_location ON public.properties USING gin (to_tsvector('english'::regconfig, location));


--
-- Name: idx_properties_price; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_price ON public.properties USING btree (price_per_month);


--
-- Name: idx_properties_room_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_room_type ON public.properties USING btree (room_type_slug);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_selec; Type: INDEX; Schema: realtime; Owner: -
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_selec ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter, COALESCE(selected_columns, '{}'::text[]));


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: properties trg_properties_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: -
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: blogs blogs_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favourites favourites_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: favourites favourites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: properties properties_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: messages Admins can delete messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete messages" ON public.messages FOR DELETE USING ((auth.uid() IN ( SELECT users.id
   FROM public.users
  WHERE (users.role = 'admin'::public.user_role))));


--
-- Name: messages Admins can view all messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all messages" ON public.messages FOR SELECT USING ((auth.uid() IN ( SELECT users.id
   FROM public.users
  WHERE (users.role = 'admin'::public.user_role))));


--
-- Name: messages Anyone can insert messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);


--
-- Name: reviews Users can create reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: reviews Users can delete own reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: users Users can insert own data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert own data" ON public.users FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: reviews Users can update own reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: reviews Users can view all reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view all reviews" ON public.reviews FOR SELECT USING (true);


--
-- Name: users Users can view own data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING ((auth.uid() = id));


--
-- Name: messages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Allow authenticated users to upload images 1kih8qz_0; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Allow authenticated users to upload images 1kih8qz_0" ON storage.objects FOR INSERT TO authenticated, anon, service_role WITH CHECK ((bucket_id = 'image_url'::text));


--
-- Name: objects Allow authenticated users to upload images 1kih8qz_1; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Allow authenticated users to upload images 1kih8qz_1" ON storage.objects FOR UPDATE TO authenticated, anon, service_role USING ((bucket_id = 'image_url'::text));


--
-- Name: objects Allow authenticated users to upload images 1kih8qz_2; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Allow authenticated users to upload images 1kih8qz_2" ON storage.objects FOR SELECT TO authenticated, anon, service_role USING ((bucket_id = 'image_url'::text));


--
-- Name: objects Allow authenticated users to upload images 1kih8qz_3; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Allow authenticated users to upload images 1kih8qz_3" ON storage.objects FOR DELETE TO authenticated, anon, service_role USING ((bucket_id = 'image_url'::text));


--
-- Name: objects Authenticated users can upload blog images 3fa072_0; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Authenticated users can upload blog images 3fa072_0" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'blog_image'::text));


--
-- Name: objects Public can view blog images 3fa072_0; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Public can view blog images 3fa072_0" ON storage.objects FOR SELECT USING ((bucket_id = 'blog_image'::text));


--
-- Name: objects Users can delete their own blog images 3fa072_0; Type: POLICY; Schema: storage; Owner: -
--

CREATE POLICY "Users can delete their own blog images 3fa072_0" ON storage.objects FOR DELETE TO authenticated USING (((bucket_id = 'blog_image'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


--
-- PostgreSQL database dump complete
--

\unrestrict 9MisBr6LbURX5o4zv70R8yfDeBoSVH6PsLjtHTmUKIxzRPPQxF56EbmhcH6eHYt

