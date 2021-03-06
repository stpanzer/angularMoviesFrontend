import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './Movie';
import { Observable } from '../../node_modules/rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private Address = environment.apiAddress;
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.Address + 'movies');

  }

  public getMovie(id): Observable<Movie> {
    return this.http.get<Movie>(this.Address + 'movies/' + id);
  }

  public deleteMovie(id): Observable<Object> {
    return this.http.delete(this.Address + 'movies/' + id);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    // Lets check if this movie has circular references
    movie.usersWatched.forEach(x => x.moviesWatched = null);
    return this.http.put<Movie>(this.Address + 'movies/' + movie.id, JSON.stringify(movie), {headers: this.headers});
  }

  public addMovie(movie: Movie) : Observable<Movie> {
    return this.http.post<Movie>(this.Address + 'movies', JSON.stringify(movie), {headers: this.headers});

  }
}
