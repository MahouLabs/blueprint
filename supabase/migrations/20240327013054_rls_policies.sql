alter table "public"."user_bookmarks" enable row level security;

set check_function_bodies = off;

create policy "Enable delete for users based on user_id"
on "public"."bookmarks"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for users based on user_id"
on "public"."bookmarks"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Enable read for users based on user_id"
on "public"."bookmarks"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Enable update for users based on user_id"
on "public"."bookmarks"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Enable delete for users based on user_id"
on "public"."user_bookmarks"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for users based on user_id"
on "public"."user_bookmarks"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Enable read access based on user_id"
on "public"."user_bookmarks"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Enable update for users based on user_id"
on "public"."user_bookmarks"
as permissive
for update
to public
using ((auth.uid() = user_id));