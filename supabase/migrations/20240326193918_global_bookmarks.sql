create table "public"."bookmarks" (
    "id" uuid not null default gen_random_uuid(),
    "url" text not null,
    "metadata" json
);


alter table "public"."bookmarks" enable row level security;

create table "public"."user_bookmarks" (
    "user_id" uuid not null,
    "bookmark_id" uuid not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


CREATE UNIQUE INDEX bookmarks_id_key ON public.bookmarks USING btree (id);

CREATE UNIQUE INDEX bookmarks_pkey ON public.bookmarks USING btree (id);

CREATE UNIQUE INDEX user_bookmarks_pkey ON public.user_bookmarks USING btree (user_id, bookmark_id);

alter table "public"."bookmarks" add constraint "bookmarks_pkey" PRIMARY KEY using index "bookmarks_pkey";

alter table "public"."user_bookmarks" add constraint "user_bookmarks_pkey" PRIMARY KEY using index "user_bookmarks_pkey";

alter table "public"."bookmarks" add constraint "bookmarks_id_key" UNIQUE using index "bookmarks_id_key";

alter table "public"."user_bookmarks" add constraint "user_bookmarks_bookmark_id_fkey" FOREIGN KEY (bookmark_id) REFERENCES bookmarks(id) ON DELETE CASCADE not valid;

alter table "public"."user_bookmarks" validate constraint "user_bookmarks_bookmark_id_fkey";

alter table "public"."user_bookmarks" add constraint "user_bookmarks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_bookmarks" validate constraint "user_bookmarks_user_id_fkey";

grant delete on table "public"."bookmarks" to "anon";

grant insert on table "public"."bookmarks" to "anon";

grant references on table "public"."bookmarks" to "anon";

grant select on table "public"."bookmarks" to "anon";

grant trigger on table "public"."bookmarks" to "anon";

grant truncate on table "public"."bookmarks" to "anon";

grant update on table "public"."bookmarks" to "anon";

grant delete on table "public"."bookmarks" to "authenticated";

grant insert on table "public"."bookmarks" to "authenticated";

grant references on table "public"."bookmarks" to "authenticated";

grant select on table "public"."bookmarks" to "authenticated";

grant trigger on table "public"."bookmarks" to "authenticated";

grant truncate on table "public"."bookmarks" to "authenticated";

grant update on table "public"."bookmarks" to "authenticated";

grant delete on table "public"."bookmarks" to "service_role";

grant insert on table "public"."bookmarks" to "service_role";

grant references on table "public"."bookmarks" to "service_role";

grant select on table "public"."bookmarks" to "service_role";

grant trigger on table "public"."bookmarks" to "service_role";

grant truncate on table "public"."bookmarks" to "service_role";

grant update on table "public"."bookmarks" to "service_role";

grant delete on table "public"."user_bookmarks" to "anon";

grant insert on table "public"."user_bookmarks" to "anon";

grant references on table "public"."user_bookmarks" to "anon";

grant select on table "public"."user_bookmarks" to "anon";

grant trigger on table "public"."user_bookmarks" to "anon";

grant truncate on table "public"."user_bookmarks" to "anon";

grant update on table "public"."user_bookmarks" to "anon";

grant delete on table "public"."user_bookmarks" to "authenticated";

grant insert on table "public"."user_bookmarks" to "authenticated";

grant references on table "public"."user_bookmarks" to "authenticated";

grant select on table "public"."user_bookmarks" to "authenticated";

grant trigger on table "public"."user_bookmarks" to "authenticated";

grant truncate on table "public"."user_bookmarks" to "authenticated";

grant update on table "public"."user_bookmarks" to "authenticated";

grant delete on table "public"."user_bookmarks" to "service_role";

grant insert on table "public"."user_bookmarks" to "service_role";

grant references on table "public"."user_bookmarks" to "service_role";

grant select on table "public"."user_bookmarks" to "service_role";

grant trigger on table "public"."user_bookmarks" to "service_role";

grant truncate on table "public"."user_bookmarks" to "service_role";

grant update on table "public"."user_bookmarks" to "service_role";



