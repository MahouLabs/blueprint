drop policy "Enable delete for users based on user_id" on "public"."bookmarks";

drop policy "Enable insert for users based on user_id" on "public"."bookmarks";

drop policy "Enable read for users based on user_id" on "public"."bookmarks";

drop policy "Enable update for users based on user_id" on "public"."bookmarks";

set check_function_bodies = off;

create policy "Enable insert for authenticated users only"
on "public"."bookmarks"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read for authenticated users only"
on "public"."bookmarks"
as permissive
for select
to authenticated
using (true);