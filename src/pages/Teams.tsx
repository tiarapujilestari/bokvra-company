import AnimatedSection from "@/components/AnimatedSection";
import type { TeamMember } from "@/types";

const members: TeamMember[] = [
  {
    id: "1",
    name: "Lee Hyeri",
    role: "Head Barista",
    bio: "Crafting every cup with passion.",
    photo: "/images/leehyeri.jpg",
    email: "tiara@bokvra.com",
  },
  {
    id: "2",
    name: "IU",
    role: "Roast Master",
    bio: "Responsible for every coffee bean we roast.",
    photo: "/images/iu.jpg",
    email: "john@bokvra.com",
  },
  {
    id: "3",
    name: "Suzy",
    role: "Head Barista",
    bio: "Good taste for good vibes.",
    photo: "/images/suzy.jpg",
    email: "suzy@bokvra.com",
  },
  {
    id: "4",
    name: "Jisoo",
    role: "Brand Ambassador",
    bio: "Coffee makes every day a little brighter.",
    photo: "/images/jisoo.jpg",
    email: "jisoo@bokvra.com",
  },
  {
    id: "5",
    name: "Jennie",
    role: "Customer",
    bio: "Every day is a coffee day here. It really feels like home.",
    photo: "/images/jennie.jpg",
    email: "jennie@bokvra.com",
  },
  {
    id: "6",
    name: "Kim Taehyung",
    role: "Founder",
    bio: "Making everyone happy is my mission. Borahae 💜",
    photo: "/images/kimtaehyun.jpg",
    email: "kimtaehyung@bokvra.com",
  },
];

export default function Teams() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="absolute inset-0 bg-grain opacity-30" />

        <div className="container-wide relative py-24 md:py-28">
          <AnimatedSection>
            <p className="eyebrow !text-caramel mb-6">Tim Kami</p>

            <h1 className="max-w-2xl font-display text-4xl md:text-6xl font-medium leading-tight">
              Orang-orang di balik setiap cangkir yang kamu nikmati.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Members */}
      <section className="container-wide py-24 md:py-28">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <AnimatedSection
              key={member.id}
              delay={i * 0.08}
              className="group rounded-3xl border border-espresso/10 bg-white/70 p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-espresso/10"
            >
              <div className="mb-5 aspect-square overflow-hidden rounded-2xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="font-display text-lg text-espresso">
                {member.name}
              </h3>

              <p className="eyebrow !text-caramel-dark !normal-case !tracking-normal !text-xs font-medium mb-3">
                {member.role}
              </p>

              <p className="text-sm leading-relaxed text-ink/70">
                {member.bio}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink/40">
          Meet the amazing people behind Bokvra Coffee & Resto.
        </p>
      </section>
    </div>
  );
}
