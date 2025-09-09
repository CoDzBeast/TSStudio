export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // Taylor's new client fields
  hairLength: string;
  hairStrands: string;
  hairColor: string;
  greyPercentage: string;
  boxDye: string;
  lightened: string;
  colorChangeFrequency: string;
  idealMaintenance: string;
  age: string;
  preferredDays: string[];
  howHeard: string;
  currentHairPhoto: File | null;
  inspirationPhotos: File | null;
  // Taylor's extension consultation fields
  everWornExtensions: string;
  extensionMethod: string;
  currentlyHaveExtensions: string;
  currentExtensionType: string;
  naturalHairLength: string;
  hairDescription: string;
  currentHairColor: string;
  extensionGoals: string[];
  wantColorChange: string;
  // Shantel's fields (many are arrays)
  s_hairLength: string[];
  s_hairStrands: string[];
  s_hairColor: string[];
  s_greyPercentage: string[];
  s_boxDye: string[];
  s_lightened: string[];
  s_colorChangeFrequency: string[];
  s_idealMaintenance: string[];
  s_age: string[];
  s_preferredDays: string[];
  s_howHeard: string[];
  s_currentHairPhoto: File | null;
  s_inspirationPhotos: File | null;
  // Shantel's additional fields
  silentAppointment: string;
  // Shantel's extension consultation fields
  s_everWornExtensions: string[];
  s_extensionMethod: string[];
  s_currentlyHaveExtensions: string[];
  s_currentExtensionType: string[];
  s_naturalHairLength: string[];
  s_hairDescription: string[];
  s_currentHairColor: string[];
  s_extensionGoals: string[];
  s_wantColorChange: string[];
}

export interface JotFormConfig {
  formId: string;
  apiKey: string;
}

export type StylistType = 'owner' | 'coworker';
export type AppointmentType = 'new-client' | 'color-consultation';