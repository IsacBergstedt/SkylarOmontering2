"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShopSignIcon,
  Car01Icon,
  Layers01Icon,
  Building04Icon,
  SpotlightIcon,
  ToolboxIcon,
} from "@hugeicons/core-free-icons";

const SERVICES = [
  {
    icon: ShopSignIcon,
    title: "Skyltmontering",
    description:
      "Professionell montering av alla typer av skyltar – fasad, stolpe eller vägg. Vi säkerställer att skylten sitter rätt, säkert och varaktigt.",
    href: "#kontakt",
  },
  {
    icon: Car01Icon,
    title: "Fordonsfoliering",
    description:
      "Heltäckande eller delvis foliering av bilar, skåpbilar och lastbilar. Perfekt för reklam, varumärkesprofilering eller lackskydd.",
    href: "#kontakt",
  },
  {
    icon: Layers01Icon,
    title: "Fönsterfoliering",
    description:
      "Solavskärmning, integritetsskydd och dekorativ fönsterfilm för kontor, butiker och fordon. Stilrent och funktionellt.",
    href: "#kontakt",
  },
  {
    icon: Building04Icon,
    title: "Fasadskyltar",
    description:
      "Imponerande fasadskyltar i metall, akryl eller komposit som syns på långt håll och stärker ert varumärke dygnet runt.",
    href: "#kontakt",
  },
  {
    icon: SpotlightIcon,
    title: "Ljusskyltning",
    description:
      "LED-skyltar och ljuslådor med hög synlighet oavsett väder och tid på dygnet. Energieffektiv belysning med lång livslängd.",
    href: "#kontakt",
  },
  {
    icon: ToolboxIcon,
    title: "Butiksprofil",
    description:
      "Komplett visuell profil för din butik – från entréskylt och fönsterdekor till inredningsgrafik och banderoller.",
    href: "#kontakt",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function Services() {
  return (
    <section id="tjanster" className="bg-[#F7F8FA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full border border-brand-navy/15 bg-brand-navy/5 px-4 py-1.5 text-sm font-medium text-brand-navy">
            Våra tjänster
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
            Allt du behöver —{" "}
            <span className="text-brand-orange">på ett ställe</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            Vi erbjuder ett komplett utbud av skylt- och folieringstjänster för
            företag i alla storlekar. Kvalitet och precision i varje projekt.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.li
              key={service.title}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-5 inline-flex w-fit items-center justify-center rounded-xl bg-brand-orange/10 p-3 transition-colors duration-300 group-hover:bg-brand-orange/15">
                <HugeiconsIcon
                  icon={service.icon}
                  size={26}
                  className="text-brand-orange"
                  strokeWidth={1.6}
                />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-brand-navy">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                {service.description}
              </p>

              {/* Link */}
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Begär offert
                <ArrowUpRight size={15} />
              </div>

              {/* Subtle orange left border on hover */}
              <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-2xl bg-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
