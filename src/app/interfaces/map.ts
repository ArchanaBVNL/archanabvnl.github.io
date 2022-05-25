export interface Map {
    info: Info;
    options: Options;
    results?: (ResultsEntity)[] | null;
  }
  export interface Info {
    statuscode: number;
    copyright: Copyright;
    messages?: (null)[] | null;
  }
  export interface Copyright {
    text: string;
    imageUrl: string;
    imageAltText: string;
  }
  export interface Options {
    maxResults: number;
    thumbMaps: boolean;
    ignoreLatLngInput: boolean;
  }
  export interface ResultsEntity {
    providedLocation: ProvidedLocation;
    locations?: (LocationsEntity)[] | null;
  }
  export interface ProvidedLocation {
    latLng: LatLngOrDisplayLatLng;
  }
  export interface LatLngOrDisplayLatLng {
    lat: number;
    lng: number;
  }
  export interface LocationsEntity {
    street: string;
    adminArea6: string;
    adminArea6Type: string;
    adminArea5: string;
    adminArea5Type: string;
    adminArea4: string;
    adminArea4Type: string;
    adminArea3: string;
    adminArea3Type: string;
    adminArea1: string;
    adminArea1Type: string;
    postalCode: string;
    geocodeQualityCode: string;
    geocodeQuality: string;
    dragPoint: boolean;
    sideOfStreet: string;
    linkId: string;
    unknownInput: string;
    type: string;
    latLng: LatLngOrDisplayLatLng;
    displayLatLng: LatLngOrDisplayLatLng;
    mapUrl: string;
    roadMetadata: RoadMetadata;
  }
  export interface RoadMetadata {
    speedLimitUnits: string;
    tollRoad?: null;
    speedLimit: number;
  }
  