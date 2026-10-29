import {
  Accessibility,
  Armchair,
  CalendarClock,
  CircleParking,
  Coffee,
  DoorOpen,
  Phone,
  Ruler,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HallSpotlight } from "@/components/hall-hire/HallSpotlight";

/**
 * Shern Hall's Caulkwell Hall came free on Mondays and Wednesdays in
 * October 2026. Enquiries go straight to the church's Office Manager, who
 * runs their bookings, rather than through the circuit form: that is how the
 * church asked for it, and it saves a hop for someone ready to book.
 *
 * Regular bookings only, so the note says so up front to spare the office
 * party enquiries.
 */
const OFFICE_EMAIL = "office.shernhall@forestcircuit.org.uk";
const OFFICE_PHONE = "07746 540193";

const FEATURES = [
  { icon: CalendarClock, label: "Mondays and Wednesdays, 8am to 10pm" },
  { icon: Ruler, label: "11.7m x 5.8m hall" },
  { icon: CircleParking, label: "Private car park, free for hirers" },
  { icon: Coffee, label: "Kitchen for light refreshments" },
  { icon: Accessibility, label: "Disabled access and baby changing" },
  { icon: Armchair, label: "Tables, chairs and some storage" },
  { icon: Truck, label: "Side door for loading" },
  { icon: DoorOpen, label: "Annex available at weekends" },
];

export function ShernHallSpotlight() {
  return (
    <HallSpotlight
      id="shern-hall"
      badge="Newly available"
      title="Shern Hall: a bright hall, free two days a week"
      teaser="Caulkwell Hall in Walthamstow is open for regular hire on Mondays and Wednesdays, with free parking for hirers."
      imageSrc="/images/shern-hall.jpg"
      imageAlt="Shern Hall Methodist Church on Shernhall Street"
      features={FEATURES}
      note="We take regular bookings only, so we are unable to accept parties or other one-off events."
      actions={
        <>
          <Button href={`mailto:${OFFICE_EMAIL}?subject=Hiring%20Caulkwell%20Hall`} variant="primary">
            Email the office
          </Button>
          <a
            href={`tel:${OFFICE_PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:text-forest-700"
          >
            <Phone size={14} aria-hidden="true" />
            {OFFICE_PHONE}
          </a>
        </>
      }
    >
      <p>
        Caulkwell Hall at Shern Hall Methodist Church is light, airy and spacious, and it is now available for
        regular hire on Mondays and Wednesdays from 8am to 10pm.
      </p>
      <p>
        It suits classes, exercise groups, parent and baby sessions, meetings and more, with a large entrance hall
        to welcome your group.
      </p>
      <p className="text-sm">Shernhall Street, Walthamstow, E17 9HX</p>
    </HallSpotlight>
  );
}
