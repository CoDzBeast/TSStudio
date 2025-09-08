import React, { useState } from 'react';
import { Scissors, Palette, Sparkles, Calendar, Droplets, MessageCircle, Zap, Layers, Heart } from 'lucide-react';

const Services: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Map service IDs to appropriate icons
  const getIconForService = (id: string) => {
    const iconMap: Record<string, any> = {
      'partial-highlight': Sparkles,
      'full-highlight': Sparkles,
      'balayage': Sparkles,
      'mini-highlight': Sparkles,
      'all-over-color': Palette,
      'root-touch-up': Palette,
      'toner-gloss': Palette,
      'haircut': Scissors,
      'cut-with-color': Scissors,
      'shampoo-blowdry': Droplets,
      'extra-color': Palette,
      'k18': Heart,
      'conditioning-treatment': Droplets,
      'weft-initial-install': Layers,
      'bump-up': Zap,
      'weft-full-maintenance': Layers,
      'extension-removal': Layers,
      'extension-consultation': MessageCircle,
      'extension-blowout': Droplets
    };
    return iconMap[id] || Scissors; // Default to Scissors icon if not found
  };

  const servicesData = {
    "notes_caption": "“+” indicates starting price. Prices may vary based on hair length, density, and condition. Final quotes provided at consultation.",
    "services": [
      {
        "id": "partial-highlight",
        "title": "Partial Highlight",
        "summary": "Face-frame and crown foils for brightness and soft dimension.",
        "price_taylor": "$120+",
        "price_shantel": "$150+",
        "details": {
          "description": "Brightens the face-frame and crown using foils for soft, natural-looking dimension. This is a great option if you want noticeable brightness in the areas that matter most without committing to a full highlight.",
          "includes": "Foils in strategic areas, toner/gloss if needed.",
          "ideal_for": "Clients maintaining between full highlight sessions or those looking for subtle enhancement.",
          "maintenance": "Every 6–8 weeks for consistent brightness."
        }
      },
      {
        "id": "full-highlight",
        "title": "Full Highlight",
        "summary": "Foils throughout for maximum brightness and all-over dimension.",
        "price_taylor": "$170+",
        "price_shantel": "$200+",
        "details": {
          "description": "Foils are placed throughout the entire head for maximum brightness and a uniform blonde look from root to tip. This creates the most dramatic transformation with balanced dimension all over.",
          "includes": "Toner/gloss to refine tone.",
          "ideal_for": "Those wanting bold, all-over brightness or a big seasonal change.",
          "maintenance": "Every 8–12 weeks depending on grow-out."
        }
      },
      {
        "id": "balayage",
        "title": "Balayage",
        "summary": "Hand-painted highlights for a natural, sun-kissed grow-out.",
        "price_taylor": "$185+",
        "price_shantel": "$215+",
        "details": {
          "description": "A hand-painted highlighting technique that creates a sun-kissed, blended effect with soft grow-out. Balayage offers a lower-maintenance option compared to traditional foils while still delivering impactful lightness.",
          "includes": "Gloss/toner, hand-painted placement customized for your cut.",
          "ideal_for": "Clients who want a natural “lived-in” look that grows out seamlessly.",
          "maintenance": "3–6 months with toners in between."
        }
      },
      {
        "id": "mini-highlight",
        "title": "Mini Highlight",
        "summary": "Strategic foils (money piece/part line) for a quick refresh.",
        "price_taylor": "$90+",
        "price_shantel": "$120+",
        "details": {
          "description": "A few foils around the part line or face-frame for a quick brightness refresh. Perfect for in-between appointments or before special events.",
          "includes": "Toner/gloss if needed.",
          "ideal_for": "Busy clients who want a touch-up without a full process.",
          "maintenance": "Every 6–8 weeks as desired."
        }
      },
      {
        "id": "all-over-color",
        "title": "All Over Color",
        "summary": "Single shade from roots to ends for rich, even coverage.",
        "price_taylor": "$115+",
        "price_shantel": "$115+",
        "details": {
          "description": "A single shade applied from roots to ends to create a consistent, even color. Ideal for going darker, refreshing faded tones, or covering uneven color.",
          "includes": "Full-head application. Blow-dry/style not included unless added.",
          "ideal_for": "Clients who want depth, shine, or one solid tone.",
          "maintenance": "Every 4–6 weeks to maintain vibrancy."
        }
      },
      {
        "id": "root-touch-up",
        "title": "Root Touch-Up",
        "summary": "Covers new growth to blend grays or refresh natural base.",
        "price_taylor": "$85+",
        "price_shantel": "$90+",
        "details": {
          "description": "Color applied just to the regrowth area (about 1 inch) to cover grays or maintain a base shade.",
          "includes": "Root application only.",
          "ideal_for": "Clients with gray coverage needs or noticeable new growth.",
          "maintenance": "Every 4–6 weeks."
        }
      },
      {
        "id": "toner-gloss",
        "title": "Toner / Gloss",
        "summary": "Adds shine and refines tone between color services.",
        "price_taylor": "$55",
        "price_shantel": "$60",
        "details": {
          "description": "Adds shine and refines color tone in just one step. Used to cancel brassiness, refresh blonde, or add depth and gloss to natural hair.",
          "includes": "Toner application + quick dry finish.",
          "ideal_for": "Blonde, balayage, or colored hair that's fading or turning brassy.",
          "maintenance": "Every 4–6 weeks between color services."
        }
      },
      {
        "id": "haircut",
        "title": "Haircut",
        "summary": "Customized haircut with cleanse and basic styling.",
        "price_taylor": "$55",
        "price_shantel": "$65",
        "details": {
          "description": "A customized haircut tailored to your face shape, hair type, and lifestyle. Includes a cleanse and blow-dry for a polished finish.",
          "ideal_for": "Trims, reshaping your cut, or creating a brand-new look.",
          "maintenance": "Every 6–10 weeks depending on style and length."
        }
      },
      {
        "id": "cut-with-color",
        "title": "Cut with Color (Add-On)",
        "summary": "Discounted haircut when booked with any color service.",
        "price_taylor": "$35",
        "price_shantel": "$35",
        "details": {
          "description": "Receive a haircut at a discounted rate when paired with a color or highlight service. Perfect for refreshing both your color and cut in the same visit.",
          "includes": "Wash and style.",
          "maintenance": "Matches your color schedule."
        }
      },
      {
        "id": "shampoo-blowdry",
        "title": "Shampoo & Blow-Dry",
        "summary": "Lux cleanse and smooth blowout for a polished finish.",
        "price_taylor": "$60",
        "price_shantel": "$50",
        "details": {
          "description": "A luxurious cleanse followed by a blowout styled to your preference—sleek, smooth, or bouncy with volume.",
          "ideal_for": "Events, nights out, or weekly maintenance.",
          "maintenance": "As often as you'd like for that fresh-salon finish."
        }
      },
      {
        "id": "extra-color",
        "title": "Extra Color / Bowl (Add-On)",
        "summary": "Additional color/lightener for length, density, or transformations.",
        "price_taylor": "$15",
        "price_shantel": "$15",
        "details": {
          "description": "Additional product required for longer, thicker, or denser hair types, or when performing a full transformation.",
          "includes": "One additional bowl of color or lightener.",
          "note": "This is added on top of your base color service."
        }
      },
      {
        "id": "k18",
        "title": "K18 Add-On",
        "summary": "Molecular repair treatment to strengthen compromised hair.",
        "price_taylor": "$40",
        "price_shantel": "$50",
        "details": {
          "description": "A revolutionary molecular repair treatment that rebuilds broken bonds inside the hair to restore strength, softness, and elasticity. Especially effective on lightened or chemically treated hair.",
          "includes": "Leave-in formula applied during your color or cut service.",
          "ideal_for": "Compromised, damaged, or over-processed hair.",
          "maintenance": "Add to each color session for best results."
        }
      },
      {
        "id": "conditioning-treatment",
        "title": "Conditioning Treatment",
        "summary": "Intense hydration and softness with a custom mask.",
        "price_taylor": "—",
        "price_shantel": "$35",
        "details": {
          "description": "A deep, nourishing mask designed to hydrate and smooth hair while restoring shine.",
          "includes": "Treatment application, often under heat for deeper penetration.",
          "ideal_for": "Dry, brittle, frizzy, or curly hair in need of softness.",
          "maintenance": "Every 2–4 weeks as needed."
        }
      },
      {
        "id": "weft-initial-install",
        "title": "Weft Extensions — Initial Install",
        "summary": "Custom install of hand-tied or machine wefts. Hair not included.",
        "price_taylor": "$150+",
        "price_shantel": "$185+",
        "details": {
          "description": "Professional application of hand-tied or machine wefts using a bead-and-sew method that blends seamlessly with your natural hair. Includes a custom placement plan and installation. (Hair not included.)",
          "ideal_for": "Adding length, fullness, or filling in thin sides.",
          "maintenance": "Move-ups recommended every 6–10 weeks."
        }
      },
      {
        "id": "bump-up",
        "title": "Bump Up (Move-Up)",
        "summary": "Reposition rows closer to the scalp between full maintenance.",
        "price_taylor": "$60+",
        "price_shantel": "$60+",
        "details": {
          "description": "Repositions your extension rows closer to the scalp to maintain comfort and discreetness between full maintenance sessions.",
          "ideal_for": "Clients looking for a quick refresh between larger appointments.",
          "maintenance": "Every 4–6 weeks."
        }
      },
      {
        "id": "weft-full-maintenance",
        "title": "Weft Full Maintenance",
        "summary": "Remove, refresh, and reinstall extensions for best comfort and wear.",
        "price_taylor": "$100+",
        "price_shantel": "$150+",
        "details": {
          "description": "Complete removal and reinstall of extension rows. Keeps extensions feeling light, comfortable, and secure while maintaining healthy natural hair.",
          "includes": "Detangling, track clean-up, and reinstall.",
          "ideal_for": "Regular upkeep to maximize longevity of extensions.",
          "maintenance": "Every 6–10 weeks."
        }
      },
      {
        "id": "extension-removal",
        "title": "Extension Removal",
        "summary": "Safe removal of extensions while protecting natural hair.",
        "price_taylor": "$75+",
        "price_shantel": "$60+",
        "details": {
          "description": "Safe and gentle removal of extensions to protect your natural hair. Includes cleansing and detangling after removal.",
          "ideal_for": "Clients transitioning out of extensions or changing methods."
        }
      },
      {
        "id": "extension-blowout",
        "title": "Extension Blowout",
        "summary": "Blowout tailored for extensions with smooth, polished finish.",
        "price_taylor": "$75",
        "price_shantel": "$70",
        "details": {
          "description": "A blow-dry service tailored to extensions for a smooth, polished finish. Ensures seamless blending between natural hair and added wefts.",
          "ideal_for": "Events, photoshoots, or whenever you want a flawless finish."
        }
      }
    ]
  };

  const openModal = (service: any) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-rose-100 to-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Our Premium Hair Services</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of premium hair services. 
            Each service is expertly crafted with artistic precision and personalized attention 
            by our talented women-owned salon team.
          </p>
          <div className="mt-4 text-sm text-gray-600 italic">
            {servicesData.notes_caption}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service, index) => {
            const IconComponent = getIconForService(service.id);
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
              >
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Taylor</span>
                    <span className="text-rose-400 font-semibold">
                      {service.price_taylor}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Shantel</span>
                    <span className="text-rose-400 font-semibold">
                      {service.price_shantel}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(service);
                    }}
                    className="text-gray-800 hover:text-rose-400 transition-colors duration-300 font-medium"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal implementation */}
        {showModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                      {React.createElement(getIconForService(selectedService.id), { className: "w-8 h-8 text-rose-400" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-800">
                        {selectedService.title}
                      </h3>
                      <div className="flex space-x-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500">Taylor</p>
                          <p className="text-rose-400 font-semibold">
                            {selectedService.price_taylor}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Shantel</p>
                          <p className="text-rose-400 font-semibold">
                            {selectedService.price_shantel}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {selectedService.summary}
                </p>
                
                {selectedService.details && (
                  <div className="space-y-4 mb-6">
                    {selectedService.details.description && (
                      <p className="text-gray-700">
                        {selectedService.details.description}
                      </p>
                    )}
                    
                    {selectedService.details.includes && (
                      <div className="bg-rose-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Includes:</h4>
                        <p className="text-gray-700">
                          {selectedService.details.includes}
                        </p>
                      </div>
                    )}
                    
                    {selectedService.details.ideal_for && (
                      <div className="bg-rose-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Ideal For:</h4>
                        <p className="text-gray-700">
                          {selectedService.details.ideal_for}
                        </p>
                      </div>
                    )}
                    
                    {selectedService.details.maintenance && (
                      <div className="bg-rose-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Maintenance:</h4>
                        <p className="text-gray-700">
                          {selectedService.details.maintenance}
                        </p>
                      </div>
                    )}
                    
                    {selectedService.details.note && (
                      <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                        <h4 className="font-semibold text-gray-800 mb-2">Note:</h4>
                        <p className="text-gray-700">
                          {selectedService.details.note}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="bg-rose-50 p-6 rounded-lg mb-6">
                  <p className="text-sm text-gray-800 italic">
                    {servicesData.notes_caption}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gray-800 text-cream px-6 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16 hidden">
          <button className="bg-gray-800 text-cream px-8 py-4 rounded-full hover:bg-gray-700 transition-all duration-300 font-medium">
            View Full Service Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;