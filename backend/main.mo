import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor FilmmakerPortfolio {
    // Types
    public type FilmProject = {
        id: Nat;
        title: Text;
        description: Text;
        releaseDate: Int;
        posterUrl: Text;
    };

    public type Testimonial = {
        id: Nat;
        author: Text;
        content: Text;
    };

    // State
    stable var nextProjectId: Nat = 0;
    stable var nextTestimonialId: Nat = 0;
    stable var filmProjects: [FilmProject] = [];
    stable var testimonials: [Testimonial] = [];

    // Film Project Management
    public func addFilmProject(title: Text, description: Text, releaseDate: Int, posterUrl: Text) : async Nat {
        let id = nextProjectId;
        nextProjectId += 1;
        let newProject: FilmProject = {
            id;
            title;
            description;
            releaseDate;
            posterUrl;
        };
        filmProjects := Array.append(filmProjects, [newProject]);
        id
    };

    public query func getFilmProjects() : async [FilmProject] {
        filmProjects
    };

    public func updateFilmProject(id: Nat, title: Text, description: Text, releaseDate: Int, posterUrl: Text) : async Bool {
        let updateIndex = Array.indexOf<FilmProject>(
            { id = id; title = ""; description = ""; releaseDate = 0; posterUrl = "" },
            filmProjects,
            func(a, b) { a.id == b.id }
        );
        switch (updateIndex) {
            case (?index) {
                let updatedProject: FilmProject = {
                    id;
                    title;
                    description;
                    releaseDate;
                    posterUrl;
                };
                filmProjects := Array.tabulate(filmProjects.size(), func (i: Nat) : FilmProject {
                    if (i == index) { updatedProject } else { filmProjects[i] }
                });
                true
            };
            case null { false };
        }
    };

    public func deleteFilmProject(id: Nat) : async Bool {
        let initialLength = filmProjects.size();
        filmProjects := Array.filter(filmProjects, func(p: FilmProject) : Bool { p.id != id });
        filmProjects.size() != initialLength
    };

    // Testimonial Management
    public func addTestimonial(author: Text, content: Text) : async Nat {
        let id = nextTestimonialId;
        nextTestimonialId += 1;
        let newTestimonial: Testimonial = {
            id;
            author;
            content;
        };
        testimonials := Array.append(testimonials, [newTestimonial]);
        id
    };

    public query func getTestimonials() : async [Testimonial] {
        testimonials
    };

    // System functions
    system func preupgrade() {
        Debug.print("Preparing to upgrade. Saving state...");
    };

    system func postupgrade() {
        Debug.print("Upgrade complete. Restoring state...");
    };
}
