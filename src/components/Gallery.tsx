import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const works = [
  { id: 1, title: "Life Moments", category: "Photography", img: gallery1 },
  { id: 2, title: "Artistic Vision", category: "Creative", img: gallery2 },
  { id: 3, title: "Deep Focus", category: "Perspective", img: gallery3 },
  { id: 4, title: "Playful Spirit", category: "Lifestyle", img: gallery4 },
];

export default function Gallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section id="works" ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-24 pr-24">
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] h-[60vh] flex flex-col justify-center">
             <h2 className="font-display text-6xl md:text-8xl font-bold leading-none text-white">
               Visual <br /><span className="text-white/30">Diary</span>
             </h2>
             <p className="mt-8 text-muted-foreground text-lg max-w-sm">
               A glimpse into my world—capturing moments, exploring aesthetics, and embracing the journey.
             </p>
          </div>
          
          {works.map((work) => (
            <div key={work.id} className="group relative w-[80vw] md:w-[40vw] h-[60vh] flex-shrink-0 bg-muted overflow-hidden">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{work.category}</span>
                <h3 className="font-display text-3xl font-bold text-white">{work.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
