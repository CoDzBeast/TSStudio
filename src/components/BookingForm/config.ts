// JotForm configuration
export const JOTFORM_CONFIG = {
  owner: {
    'new-client': {
      formId: '252445285616057',
      apiKey: 'b4e8860fbb4274019d25438a0e8da8a8'
    },
    'color-consultation': {
      formId: '252445322843051',
      apiKey: 'b4e8860fbb4274019d25438a0e8da8a8'
    }
  },
  coworker: {
    'new-client': {
      formId: '240910497358059',
      apiKey: '148ba1b274230fae1439ba7fbe14db9f'
    },
    'color-consultation': {
      formId: '243017852134047',
      apiKey: '148ba1b274230fae1439ba7fbe14db9f'
    }
  }
};

// Form field mappings
export const FORM_FIELDS = {
  // Basic contact information
  firstName: 'q3_name[first]',
  lastName: 'q3_name[last]',
  phone: 'q5_phoneNumber[full]',
  email: 'q6_email',
  
  // Owner - New Client fields
  ownerNewClient: {
    hairLength: 'q16_whatIs',
    hairStrands: 'q17_whatBest',
    hairColor: 'q18_howWould',
    greyPercentage: 'q19_whatPercentage',
    boxDye: 'q20_haveYou',
    lightened: 'q21_haveYou21',
    colorChangeFrequency: 'q22_howOften',
    idealMaintenance: 'q23_whatIs23',
    age: 'q24_howOld',
    preferredDays: 'q25_whatDays[]',
    howHeard: 'q26_howDid',
    currentHairPhoto: 'q27_pleaseUpload[]',
    inspirationPhotos: 'q28_finallyUpload[]'
  },
  
  // Owner - Color Consultation fields
  ownerColorConsultation: {
    everWornExtensions: 'q7_everWornExtensions',
    extensionMethod: 'q8_extensionMethod',
    currentlyHaveExtensions: 'q9_currentlyHaveExtensions',
    currentExtensionType: 'q10_currentExtensionType',
    naturalHairLength: 'q11_naturalHairLength',
    hairDescription: 'q12_hairDescription',
    currentHairColor: 'q13_currentHairColor',
    extensionGoals: 'q14_extensionGoals[]',
    wantColorChange: 'q15_wantColorChange',
    currentHairPhoto: 'q16_currentHairPhoto[]',
    inspirationPhotos: 'q17_inspirationPhotos[]'
  },
  
  // Coworker - New Client fields
  coworkerNewClient: {
    hairLength: 'q7_hairLength',
    hairStrands: 'q8_hairStrands',
    hairColor: 'q9_hairColor',
    greyPercentage: 'q10_greyPercentage',
    boxDye: 'q11_boxDye',
    lightened: 'q12_lightened',
    colorChangeFrequency: 'q13_colorChangeFrequency',
    idealMaintenance: 'q14_idealMaintenance',
    age: 'q15_age',
    preferredDays: 'q16_preferredDays[]',
    howHeard: 'q17_howHeard[]',
    currentHairPhoto: 'q18_currentHairPhoto[]',
    inspirationPhotos: 'q19_inspirationPhotos[]'
  },
  
  // Coworker - Color Consultation fields
  coworkerColorConsultation: {
    everWornExtensions: 'q7_haveYou[]',
    extensionMethod: 'q8_ifSo[]',
    currentlyHaveExtensions: 'q9_doYou[]',
    currentExtensionType: 'q10_ifSo10[]',
    naturalHairLength: 'q11_whatsThe[]',
    hairDescription: 'q12_whatBest[]',
    currentHairColor: 'q13_whatDescribes[]',
    extensionGoals: 'q14_whatAre[]',
    wantColorChange: 'q15_doYou15[]',
    currentHairPhoto: 'q16_pleaseSubmit[]',
    inspirationPhotos: 'q17_pleaseSubmit17[]'
  }
};