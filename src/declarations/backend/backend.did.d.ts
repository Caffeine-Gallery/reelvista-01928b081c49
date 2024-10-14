import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface FilmProject {
  'id' : bigint,
  'title' : string,
  'description' : string,
  'posterUrl' : string,
  'releaseDate' : bigint,
}
export interface Testimonial {
  'id' : bigint,
  'content' : string,
  'author' : string,
}
export interface _SERVICE {
  'addFilmProject' : ActorMethod<[string, string, bigint, string], bigint>,
  'addTestimonial' : ActorMethod<[string, string], bigint>,
  'deleteFilmProject' : ActorMethod<[bigint], boolean>,
  'getFilmProjects' : ActorMethod<[], Array<FilmProject>>,
  'getTestimonials' : ActorMethod<[], Array<Testimonial>>,
  'updateFilmProject' : ActorMethod<
    [bigint, string, string, bigint, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
