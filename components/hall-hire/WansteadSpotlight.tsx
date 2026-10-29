import { ExternalLink, Train, Utensils, Theater, DoorOpen, CircleParking } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HallSpotlight } from "@/components/hall-hire/HallSpotlight";

/**
 * Wanstead is a circuit priority in its own right: the building no longer
 * holds Sunday services, and the Mission Strategy 2025-28 commits to
 * developing it as a venue with a missional element. So it gets a spotlight
 * above the general enquiry form rather than sitting as one option among ten
 * in the dropdown.
 */
const FEATURES = [
  { icon: Theater, label: "Main hall with a stage end" },
  { icon: DoorOpen, label: "Smaller additional rooms" },
  { icon: Utensils, label: "Kitchen and servery" },
  { icon: CircleParking, label: "Parking, including accessible bays" },
  { icon: Train, label: "5 minutes from Snaresbrook" },
];

export function WansteadSpotlight({ website }: { website?: string }) {
  return (
    <HallSpotlight
      id="wanstead"
      badge="Now seeking hirers"
      title="Wanstead: a venue with room for more"
      teaser="A community hub with a main hall and stage end, five minutes from Snaresbrook, and we are actively looking for regular hirers."
      imageSrc="/images/wanstead.jpg"
      imageAlt="Wanstead Methodist Church on Hermon Hill"
      features={FEATURES}
      note="Please note this is a no-alcohol venue, and we are unable to take birthday party bookings."
      actions={
        <>
          <Button href="/venue-hire?church=wanstead#enquiry" variant="primary">
            Enquire about Wanstead
          </Button>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:text-forest-700"
            >
              {website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </>
      }
    >
      <p>
        Wanstead stopped holding Sunday services a few years ago, but the building never went quiet. It is now a
        community hub and home to The Wanstead Curtain theatre company, and we are actively looking for more regular
        hirers to fill the week.
      </p>
      <p>
        It suits rehearsals, classes, workshops, committees and performance, and we would love to hear from arts
        groups in particular.
      </p>
    </HallSpotlight>
  );
}
