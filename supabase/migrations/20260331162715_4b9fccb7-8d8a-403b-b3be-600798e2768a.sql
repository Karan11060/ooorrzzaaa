
DROP POLICY "Subscribers can view their own entry" ON public.newsletter_subscribers;

CREATE POLICY "No public read on newsletter"
  ON public.newsletter_subscribers FOR SELECT
  USING (false);
