import { useMemo } from 'react';
import { eventsForInvite, rsvpEnabledForInvite, rsvpEventOptions } from './content';

// What this visitor sees, decided by the ?invite= parameter on their link: the
// events, the matching RSVP checkboxes, and whether the RSVP section is shown
// at all (office invites are not asked to reply). Read once per mount: the
// query cannot change without a reload, and every consumer must agree on the
// same answer.
export function useInviteEvents() {
  const search = typeof window === 'undefined' ? '' : window.location.search;
  return useMemo(
    () => ({
      events: eventsForInvite(search),
      options: rsvpEventOptions(search),
      showRsvp: rsvpEnabledForInvite(search),
    }),
    [search]
  );
}
