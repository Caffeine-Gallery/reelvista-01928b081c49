export const idlFactory = ({ IDL }) => {
  const FilmProject = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'posterUrl' : IDL.Text,
    'releaseDate' : IDL.Int,
  });
  const Testimonial = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'addFilmProject' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'addTestimonial' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'deleteFilmProject' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getFilmProjects' : IDL.Func([], [IDL.Vec(FilmProject)], ['query']),
    'getTestimonials' : IDL.Func([], [IDL.Vec(Testimonial)], ['query']),
    'updateFilmProject' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
