import React from 'react';
import BounceCards from '@/components/ui/BounceCards';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export default function SipUpSection() {
  const images = [
    '/photos/sugar.png',
    '/photos/tender.png',
    '/photos/pomo.png',
    '/photos/pineapple.png',
    '/photos/passion.png',
    '/photos/Mango.png',
    '/photos/lychee.png',
    '/photos/Grapes.png',
    '/photos/gova.png',
  ];

  // Creates a scattered stack of 9 cards
  const transformStyles = [
    'rotate(15deg) translate(-280px)',
    'rotate(-10deg) translate(-210px)',
    'rotate(5deg) translate(-140px)',
    'rotate(-8deg) translate(-70px)',
    'rotate(0deg) translate(0px)',
    'rotate(12deg) translate(70px)',
    'rotate(-5deg) translate(140px)',
    'rotate(10deg) translate(210px)',
    'rotate(-15deg) translate(280px)'
  ];

  // Fallback for smaller screens if needed, but the container handles overflow.
  
  return (
    <ScrollReveal hideMask={true}>
      <section className="w-full relative overflow-x-clip py-20 sm:py-32 bg-[#FDFCFD]">
        <div className="container-responsive">
          <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display text-gray-900 leading-none tracking-tight uppercase">
              Signature <span className="text-primary">SipUps</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mt-4 sm:mt-6">
              Experience our vibrant and refreshing SipUps. Handcrafted to perfection, each flavor bursts with natural goodness.
            </p>
          </div>

          <div className="w-full flex justify-center py-10 sm:py-20 mt-10">
            <div className="w-full max-w-5xl flex justify-center transform scale-75 sm:scale-100">
              <BounceCards
                images={images}
                containerWidth="100%"
                containerHeight={400}
                animationDelay={0.5}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.8)"
                transformStyles={transformStyles}
                enableHover={true}
              />
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
