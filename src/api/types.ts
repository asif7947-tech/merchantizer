export type T_MOVIE = {
  adult: boolean;
  backdrop_path: string;
  
};

export type T_NOW_PLAYING_API_RESPONSE = {
  dates: {
    maximum: string;
    minimum: string;
  };
 
  results: T_MOVIE[];

};

export type User = {
  custom_code: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  phone_no: string;
  profile_pic: string;
  qac_id: number;
  region: string;
  role: number;
  status: number;
  token: string;
  updated_at: string;
  created_at: string;
}

export interface STORE_LISTING_RRESPONSE {
  status: boolean
  message: string
  data: STORE_LISTING_DATA[]
}

export interface STORE_LISTING_DATA {
  id: number
  name: string
  region: string
}

export interface STORE_DEATILS_RESPONSE {
  status: boolean
  message: string
  data: STORE_DETAILS
}

export interface STORE_DETAILS {
  brick_code_name: string
  city: string
  created_at: string
  id: number
  landmark: any
  locallaty: string
  march: March
  merc_id: number
  name: string
  new_address: any
  new_store: number
  owner_contact_no: any
  owner_name: any
  pop_code: string
  pop_market_name: string
  pop_name: string
  project: string
  region: string
  status: number
  sub_locallaty: string
  supervisor: Supervisor
  supervisor_id: number
  town: string
  updated_at: string
}


export interface March {
  id: number
  name: string
}

export interface Supervisor {
  id: number
  name: string
}


export interface STORE_REGION_DATA {
  id: number
  name: string
}

export interface STORE_COUNT_DATA {
  existingStore: number;
  newStore: number;
  ncStore: number;
  outStockStore: number;
  rejectedStore: number;
  successStore: number;
}