-- Public schema only restore (Supabase-compatible)
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET session_replication_role = replica;

DROP TABLE IF EXISTS public.favourites CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.blogs CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at() CASCADE;
DROP TYPE IF EXISTS public.booking_status CASCADE;
DROP TYPE IF EXISTS public.room_type_enum CASCADE;
DROP TYPE IF EXISTS public.user_role CASCADE;

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
CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
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
CREATE TRIGGER trg_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
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

DROP POLICY IF EXISTS "Admins can delete messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can view all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;

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
SET session_replication_role = DEFAULT;

-- Refresh PostgREST schema cache so embedded selects (e.g. favourites -> properties) work
NOTIFY pgrst, 'reload schema';
