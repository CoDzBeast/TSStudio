import React from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Taylor Martinez',
      title: 'Co-Founder & Master Stylist',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Specializing in precision cuts and innovative color techniques with 8+ years of experience.',
      specialty: 'Precision Cuts & Color'
    },
    {
      name: 'Sophia Chen',
      title: 'Co-Founder & Color Specialist',
      image: 'https://images.pexels.com/photos/3992649/pexels-photo-3992649.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Expert in balayage and dimensional color work, bringing artistic vision to every client.',
      specialty: 'Balayage & Highlights'
    },
    {
      name: 'Emma Rodriguez',
      title: 'Senior Stylist',
      image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Passionate about creating modern styles that enhance natural beauty and lifestyle.',
      specialty: 'Modern Styling & Cuts'
    },
    {
      name: 'Olivia Kim',
      title: 'Color Technician',
      image: 'https://images.pexels.com/photos/3992662/pexels-photo-3992662.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Dedicated to achieving perfect color results with meticulous attention to detail.',
      specialty: 'Color Correction & Treatments'
    },
    {
      name: 'Isabella Johnson',
      title: 'Special Events Stylist',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Creates stunning looks for weddings, proms, and special occasions.',
      specialty: 'Bridal & Event Styling'
    },
    {
      name: 'Ava Thompson',
      title: 'Junior Stylist',
      image: 'https://images.pexels.com/photos/3992651/pexels-photo-3992651.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Rising talent with fresh ideas and enthusiasm for creating beautiful transformations.',
      specialty: 'Cuts & Basic Color'
    }
  ];

  return (
    <section id="team" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Meet Our Artists</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Our talented team of professional stylists is dedicated to bringing out your unique beauty 
            through personalized service and expert artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-rose-400 font-medium mb-2">
                  {member.title}
                </p>
                <div className="bg-rose-50 rounded-lg px-3 py-1 text-sm text-rose-600 font-medium mb-4 inline-block">
                  {member.specialty}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                <button className="w-full bg-gray-800 text-cream py-2 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                  Book with {member.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;